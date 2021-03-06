using Jurassic;
using FastDev.Common;
using FastDev.DevDB.Model;
using FastDev.DevDB.Model.Mini;
using FastDev.DevDB.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB
{
    public class WorkflowService : IWorkflowService
    {
        public class WFLogItem
        {

            public string taskId
            {
                get;
                set;
            }

            public string taskTitle
            {
                get;
                set;
            }

            public string taskType
            {
                get;
                set;
            }

            public string handlerType
            {
                get;
                set;
            }

            public List<Dictionary<string, object>> items
            {
                get;
                set;
            }

            public WFLogItem()
            {


            }
        }

        private DbContext wfContext;

        private string wfModelName;

        private object wfModelObj;

        private Type wfModelType;

        public DbContext DbContext
        {
            set
            {
                wfContext = value;
            }
        }

        public WorkflowService()
        {

            wfContext = null;
            wfModelName = null;
            wfModelObj = null;
            wfModelType = null;

        }

        public void Execute(WorkflowContext context)
        {
            DbContext dbContext = wfContext;
            string text = wfModelName = context.Model;
            FastDev.DevDB.Model.core_workflowTask currentTask = null;
            List<core_workflowExecutorStatus> list = null;
            core_workflowExecutorStatus core_workflowExecutorStatus = null;
            core_workflowTrack core_workflowTrack = null;
            IService service = ServiceHelper.GetService(text);
            service.SetDb(dbContext);
            core_workflowProject core_workflowProject = dbContext.FirstOrDefault<core_workflowProject>("where Context = @0", new object[1]
            {
                context.Context
            });
            bool flag;
            if (!(flag = (core_workflowProject == null)))
            {
                if (string.IsNullOrEmpty(context.TaskID))
                {
                    context.TaskID = dbContext.ExecuteScalar<string>("select ID from core_workflowTask where Status = @0 and ProjectID = @1", new object[2]
                    {
                        WFRecordStatus.Running,
                        core_workflowProject.ID
                    });
                }
                currentTask = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_workflowTask>("where ID = @0", new object[1]
                {
                    context.TaskID
                });
                if (currentTask == null)
                {
                    throw new UserException("流程异常，请联系相关管理员！");
                }
                if (currentTask.Status != WFRecordStatus.Running)
                {
                    throw new UserException("该任务已处理，请勿重复操作！");
                }
                list = dbContext.Fetch<core_workflowExecutorStatus>("where TaskID = @0", new object[1]
                {
                    currentTask.ID
                });
                if (list == null || !list.Any() || !list.Any(l => l.ExecutorID == SysContext.WanJiangUserID))
                {
                    throw new UserException("没有权限访问！");
                }
                core_workflowExecutorStatus = list.FirstOrDefault(l => l.ExecutorID == SysContext.WanJiangUserID);
                core_workflowTrack = dbContext.FirstOrDefault<core_workflowTrack>("where ProjectID = @0 and TaskID = @1", new object[2]
                {
                    core_workflowProject.ID,
                    currentTask.ID
                });
                if (core_workflowExecutorStatus.Status == WFRecordStatus.Canceled)
                {
                    throw new UserException("任务已经取消！");
                }
                if (core_workflowExecutorStatus.Status != WFRecordStatus.Running)
                {
                    throw new UserException("任务已经被处理！");
                }
            }
            core_workflow core_workflow = null;
            core_workflow = ((core_workflowProject == null) ? dbContext.FirstOrDefault<core_workflow>("where ModelName = @0", new object[1]
            {
                text
            }) : dbContext.FirstOrDefault<core_workflow>("where ID = @0", new object[1]
            {
                core_workflowProject.WorkflowID
            }));
            if (core_workflow == null)
            {
                throw new UserException("工作流程异常：未定义流程");
            }
            if (context.Waitting != 1 && context.SignMode != 1 && (context.ExecuteNodes == null || !context.ExecuteNodes.Any()))
            {
                throw new UserException("工作流程异常：未提供参与者信息");
            }
            wfModelType = DataAccessHelper.GetEntityType(context.Model);
            wfModelObj = dbContext.GetHelper(wfModelType).FirstOrDefault("where ID = @0", context.Context);
            ViewModel viewModel = JsonHelper.DeserializeJsonToObject<ViewModel>(core_workflow.ViewData);
            ViewNode viewNode = flag ? viewModel.nodes.FirstOrDefault(n => n.nodeType == "start") : viewModel.nodes.FirstOrDefault((ViewNode a) => a.id == currentTask.NodeID);
            if (context.CurrentAction == WorkflowAction.Advance)
            {
                if (flag)
                {
                    ViewNode viewNode2 = viewModel.nodes.FirstOrDefault(n => n.nodeType == "start");
                    core_workflowProject = CreateNewWFProject(core_workflow.ID, context.Context);
                    core_workflowProject.SponsorID = SysContext.WanJiangUserID;
                    currentTask = CreateNewWFTask(core_workflowProject.ID, viewNode2.id, viewNode2.properties["text"].ToString(), viewNode2.nodeType);
                    currentTask.Status = WFRecordStatus.Completed;
                    currentTask.EndTime = DateTime.Now;
                    dbContext.Insert(currentTask);
                    core_workflowExecutorStatus = GenNewStatus(currentTask.ID, SysContext.WanJiangUserID);
                    core_workflowExecutorStatus.Status = WFRecordStatus.Completed;
                    core_workflowExecutorStatus.ExecutorTime = DateTime.Now;
                    core_workflowExecutorStatus.Remark = context.Remark;
                    dbContext.Insert(core_workflowExecutorStatus);
                    core_workflowTrack = CreateWorkflowTrack(core_workflowProject.ID, currentTask.ID, viewNode2.nodeType, null, null);
                    core_workflowTrackDetail poco = CreateNewTrack(core_workflowTrack.ID, core_workflowExecutorStatus.ID);
                    dbContext.Insert(poco);
                    dbContext.Update(wfModelName, "ID", new
                    {
                        ID = context.Context,
                        ModifyDate = DateTime.Now,
                        ModifyUserID = SysContext.WanJiangUserID,
                        Status = RecordStatus.Submitted
                    }, context.Context);
                    service.ExecuteWorkflow(new WorkflowExecuteParm
                    {
                        Context = context,
                        Define = core_workflow,
                        CurrentProject = core_workflowProject,
                        CurrentTask = currentTask
                    });
                }
                else
                {
                    if (viewNode.nodeType == WorkflowNodeType.Active)
                    {
                        ActiveNode activeNode = GetViewNodeProperties<ActiveNode>(viewNode);
                        if (activeNode.handlerType == "1")
                        {
                            foreach (core_workflowExecutorStatus item in list)
                            {
                                if (!(item.ExecutorID == SysContext.WanJiangUserID))
                                {
                                    UpdateExecutor(item, WFRecordStatus.Canceled, "");
                                    core_toDo core_toDo_ = dbContext.FirstOrDefault<core_toDo>("where RefTable = @0 and RefRecordID = @1", new object[2]
                                    {
                                        "core_workflowExecutorStatus",
                                        item.ID
                                    });
                                    UpdateToDo(core_toDo_, WFRecordStatus.Canceled);
                                }
                            }
                            UpdateTrackDetailIsToNext(core_workflowTrack.ID, core_workflowExecutorStatus.ID, true);
                            UpdateWFTask(currentTask, WFRecordStatus.Completed);
                        }
                        if ((activeNode.handlerType == "2" || activeNode.handlerType == "3") && (list.Count == 1 || list.Where(l => l.ExecutorID != SysContext.WanJiangUserID).All(l => l.Status != WFRecordStatus.Running)))
                        {
                            if (context.Waitting == 1)
                            {
                                throw new UserException("工作流程异常：流程已经更新,请重新操作");
                            }
                            UpdateTrackDetailIsToNext(core_workflowTrack.ID, core_workflowExecutorStatus.ID, true);
                            UpdateWFTask(currentTask, WFRecordStatus.Completed);
                        }
                        if (activeNode.handlerType == "4")
                        {
                            if (context.SignMode != 1 && currentTask == null)
                            {
                                throw new UserException("流程异常，请联系相关管理员！");
                            }
                            if (list.Count == 1 || list.Where(l => l.ExecutorID != SysContext.WanJiangUserID).All(l => l.Status != WFRecordStatus.Running))
                            {
                                UpdateWFTask(currentTask, WFRecordStatus.Completed);
                                context.ExecuteNodes = new List<ExecuteNode>();
                                IList<ViewNode> list2 = CombinNodesBySource(viewNode, viewModel);
                                if (list2 == null || !list2.Any())
                                {
                                    throw new UserException("流程异常，请联系相关管理员！");
                                }
                                if (list2.Any(l => l.nodeType == WorkflowNodeType.End))
                                {
                                    ViewNode viewNode3 = list2.FirstOrDefault(l => l.nodeType == WorkflowNodeType.End);
                                    context.ExecuteNodes.Add(new ExecuteNode
                                    {
                                        NodeId = viewNode3.id,
                                        Executors = new List<List<string>>()
                                    });
                                }
                                else
                                {
                                    foreach (ViewNode item2 in list2)
                                    {
                                        ViewNode viewNode4 = JsonHelper.DeserializeJsonToObject<ViewNode>(JsonHelper.SerializeObject(item2));
                                        while (viewNode4.nodeType == WorkflowNodeType.Branch)
                                        {
                                            viewNode4 = GetBranchNode(context, viewModel, viewNode4);
                                        }
                                        if (viewNode4.nodeType == WorkflowNodeType.Active)
                                        {
                                            List<List<string>> executors = FindWorkflowExecutors(viewNode4, core_workflowProject);
                                            context.ExecuteNodes.Add(new ExecuteNode
                                            {
                                                NodeId = viewNode4.id,
                                                Executors = executors
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (viewNode.nodeType == WorkflowNodeType.Start)
                    {
                        UpdateWFTask(currentTask, WFRecordStatus.Completed);
                    }
                    UpdateExecutor(core_workflowExecutorStatus, WFRecordStatus.Completed, context.Remark);
                    core_toDo toData = dbContext.FirstOrDefault<core_toDo>("where RefTable = @0 and RefRecordID = @1", new object[2]
                    {
                        "core_workflowExecutorStatus",
                        core_workflowExecutorStatus.ID
                    });
                    UpdateToDo(toData, WFRecordStatus.Completed);
                }
                if (context.ExecuteNodes != null && context.Waitting != 1)
                {
                    int num = 0;
                    ViewNode viewNode2;
                    while (true)
                    {
                        if (num >= context.ExecuteNodes.Count)
                        {
                            num = 0;
                            while (true)
                            {
                                if (num >= context.ExecuteNodes.Count)
                                {
                                    if (flag)
                                    {
                                        dbContext.Insert(core_workflowProject);
                                        dbContext.Insert(core_workflowTrack);
                                    }
                                    else
                                    {
                                        dbContext.Update("core_workflowProject", "ID", core_workflowProject, new string[4]
                                        {
                                            "CreateDate",
                                            "CreateUserID",
                                            "EndTime",
                                            "Status"
                                        });
                                    }
                                    return;
                                }
                                ExecuteNode eNode2 = context.ExecuteNodes[num];
                                if (eNode2.Executors == null || !eNode2.Executors.Any())
                                {
                                    break;
                                }
                                viewNode2 = viewModel.nodes.FirstOrDefault((ViewNode a) => a.id == eNode2.NodeId);
                                if (viewNode2.nodeType == WorkflowNodeType.Active)
                                {
                                    ActiveNode activeNode = GetViewNodeProperties<ActiveNode>(viewNode2);
                                    FastDev.DevDB.Model.core_workflowTask core_workflowTask = CreateNewWFTask(core_workflowProject.ID, viewNode2.id, activeNode.text, viewNode2.nodeType);
                                    core_workflowTask.Status = WFRecordStatus.Running;
                                    dbContext.Insert(core_workflowTask);
                                    core_workflowTrack core_workflowTrack2 = CreateWorkflowTrack(core_workflowProject.ID, core_workflowTask.ID, viewNode2.nodeType, null, null);
                                    dbContext.Insert(core_workflowTrack2);
                                    if (flag)
                                    {
                                        core_workflowTrack.NextTaskID = core_workflowTask.ID;
                                        core_workflowTrack.NextLinkType = "advance";
                                    }
                                    else
                                    {
                                        UpdateWFTrack(core_workflowProject.ID, currentTask.ID, core_workflowTask.ID, "advance");
                                    }
                                    foreach (List<string> executor in eNode2.Executors)
                                    {
                                        string text2 = executor[0];
                                        if (string.IsNullOrEmpty(text2))
                                        {
                                            throw new UserException("请选择参与者！");
                                        }
                                        core_workflowExecutorStatus core_workflowExecutorStatus2 = GenNewStatus(core_workflowTask.ID, text2);
                                        core_workflowExecutorStatus2.Status = WFRecordStatus.Running;
                                        dbContext.Insert(core_workflowExecutorStatus2);
                                        core_workflowTrackDetail poco2 = CreateNewTrack(core_workflowTrack2.ID, core_workflowExecutorStatus2.ID);
                                        dbContext.Insert(poco2);
                                        string text3 = activeNode.text;
                                        if (!string.IsNullOrEmpty(activeNode.toDoTitleRule))
                                        {
                                            text3 += GetJsResult(activeNode.toDoTitleRule, JsonHelper.SerializeObject(wfModelObj));
                                        }
                                        core_toDo core_toDo = CreateNewToDo(text3, "web/main/?model=" + wfModelName + "&id=" + core_workflowProject.Context + "&viewtype=form&taskid=" + core_workflowTask.ID, core_workflowExecutorStatus2.ID);
                                        core_toDo.UserID = text2;
                                        dbContext.Insert(core_toDo);
                                    }
                                }
                                num++;
                            }
                            throw new UserException("工作流程异常：未定义参与者");
                        }
                        ExecuteNode eNode = context.ExecuteNodes[num];
                        viewNode2 = viewModel.nodes.FirstOrDefault((ViewNode a) => a.id == eNode.NodeId);
                        if (viewNode2 == null)
                        {
                            throw new UserException("工作流程异常：流程定义已经更新");
                        }
                        if (viewNode2.nodeType == WorkflowNodeType.End)
                        {
                            break;
                        }
                        num++;
                    }
                    core_workflowProject.Status = WFRecordStatus.Completed;
                    core_workflowProject.EndTime = DateTime.Now;
                    if (flag)
                    {
                        dbContext.Insert(core_workflowProject);
                    }
                    else
                    {
                        dbContext.Update("core_workflowProject", "ID", core_workflowProject, new string[4]
                        {
                            "CreateDate",
                            "CreateUserID",
                            "EndTime",
                            "Status"
                        });
                    }
                    FastDev.DevDB.Model.core_workflowTask core_workflowTask2 = CreateNewWFTask(core_workflowProject.ID, viewNode2.id, viewNode2.properties["text"].ToString(), viewNode2.nodeType);
                    core_workflowTask2.Status = WFRecordStatus.Completed;
                    core_workflowTask2.EndTime = DateTime.Now;
                    dbContext.Insert(core_workflowTask2);
                    core_workflowExecutorStatus core_workflowExecutorStatus3 = GenNewStatus(core_workflowTask2.ID, SysContext.WanJiangUserID);
                    core_workflowExecutorStatus3.Status = WFRecordStatus.Completed;
                    core_workflowExecutorStatus3.ExecutorTime = DateTime.Now;
                    dbContext.Insert(core_workflowExecutorStatus3);
                    if (flag)
                    {
                        core_workflowTrack.NextTaskID = core_workflowTask2.ID;
                        core_workflowTrack.NextLinkType = "advance";
                    }
                    else
                    {
                        UpdateWFTrack(core_workflowProject.ID, currentTask.ID, core_workflowTask2.ID, "advance");
                    }
                    core_workflowTrack core_workflowTrack3 = CreateWorkflowTrack(core_workflowProject.ID, core_workflowTask2.ID, viewNode2.nodeType, null, null);
                    dbContext.Insert(core_workflowTrack3);
                    core_workflowTrackDetail poco3 = CreateNewTrack(core_workflowTrack3.ID, core_workflowExecutorStatus3.ID);
                    dbContext.Insert(poco3);
                    dbContext.Update(wfModelName, "ID", new
                    {
                        ID = context.Context,
                        ModifyDate = DateTime.Now,
                        ModifyUserID = SysContext.WanJiangUserID,
                        Status = RecordStatus.Completed
                    }, context.Context);
                    service.ExecuteWorkflow(new WorkflowExecuteParm
                    {
                        Context = context,
                        Define = core_workflow,
                        CurrentProject = core_workflowProject,
                        CurrentTask = currentTask
                    });
                    if (flag)
                    {
                        dbContext.Insert(core_workflowTrack);
                    }
                }
            }
            else if (context.CurrentAction == WorkflowAction.Back)
            {
                if (!context.ExecuteNodes.Any())
                {
                    throw new UserException("工作流程异常：未定义退回节点");
                }
                ExecuteNode executeNode = context.ExecuteNodes[0];
                if (executeNode.Executors == null || !executeNode.Executors.Any())
                {
                    throw new UserException("工作流程异常：未定义退回节点参与者");
                }
                UpdateWFTask(currentTask, WFRecordStatus.Back);
                UpdateExecutor(core_workflowExecutorStatus, WFRecordStatus.Back, context.Remark);
                core_toDo core_toDo_2 = dbContext.FirstOrDefault<core_toDo>("where RefTable = @0 and RefRecordID = @1", new object[2]
                {
                    "core_workflowExecutorStatus",
                    core_workflowExecutorStatus.ID
                });
                UpdateToDo(core_toDo_2, WFRecordStatus.Back);
                ViewNode viewNode2 = viewModel.nodes.FirstOrDefault((ViewNode a) => a.id == executeNode.NodeId);
                if (viewNode2.nodeType == WorkflowNodeType.Active || viewNode2.nodeType == WorkflowNodeType.Start)
                {
                    foreach (core_workflowExecutorStatus item3 in list)
                    {
                        if (!(item3.ExecutorID == SysContext.WanJiangUserID))
                        {
                            UpdateExecutor(item3, WFRecordStatus.Canceled, "");
                            core_toDo core_toDo_ = dbContext.FirstOrDefault<core_toDo>("where RefTable = @0 and RefRecordID = @1", new object[2]
                            {
                                "core_workflowExecutorStatus",
                                item3.ID
                            });
                            UpdateToDo(core_toDo_, WFRecordStatus.Canceled);
                        }
                    }
                    string text4 = viewNode2.properties["text"].ToString();
                    FastDev.DevDB.Model.core_workflowTask core_workflowTask = CreateNewWFTask(core_workflowProject.ID, viewNode2.id, text4, viewNode2.nodeType);
                    core_workflowTask.Status = WFRecordStatus.Running;
                    core_workflowTask.FromReturnTaskID = currentTask.ID;
                    dbContext.Insert(core_workflowTask);
                    core_workflowTrack core_workflowTrack2 = CreateWorkflowTrack(core_workflowProject.ID, core_workflowTask.ID, viewNode2.nodeType, null, null);
                    dbContext.Insert(core_workflowTrack2);
                    UpdateWFTrack(core_workflowProject.ID, currentTask.ID, core_workflowTask.ID, "back");
                    foreach (List<string> executor2 in executeNode.Executors)
                    {
                        string text5 = viewNode2.properties.ContainsKey("backToDoTitleRule") ? viewNode2.properties["backToDoTitleRule"].ToString() : "退回";
                        string text2 = executor2[0];
                        core_workflowExecutorStatus core_workflowExecutorStatus2 = GenNewStatus(core_workflowTask.ID, text2);
                        core_workflowExecutorStatus2.Status = WFRecordStatus.Running;
                        dbContext.Insert(core_workflowExecutorStatus2);
                        core_workflowTrackDetail poco2 = CreateNewTrack(core_workflowTrack2.ID, core_workflowExecutorStatus2.ID);
                        dbContext.Insert(poco2);
                        string text3 = text4;
                        if (!string.IsNullOrEmpty(text5))
                        {
                            text3 += GetJsResult(text5, JsonHelper.SerializeObject(wfModelObj));
                        }
                        core_toDo core_toDo = CreateNewToDo(text3, "web/main/?model=" + wfModelName + "&id=" + core_workflowProject.Context + "&viewtype=form&tasid=" + core_workflowTask.ID, core_workflowExecutorStatus2.ID);
                        core_toDo.UserID = text2;
                        dbContext.Insert(core_toDo);
                    }
                }
            }
            else if (context.CurrentAction == WorkflowAction.Rejected)
            {
                bool flag2 = false;
                if (viewNode.nodeType == WorkflowNodeType.Active)
                {
                    ActiveNode activeNode = GetViewNodeProperties<ActiveNode>(viewNode);
                    if (activeNode.handlerType == "2" || activeNode.handlerType == "3")
                    {
                        foreach (core_workflowExecutorStatus item4 in list)
                        {
                            if (!(item4.ExecutorID == SysContext.WanJiangUserID))
                            {
                                UpdateExecutor(item4, WFRecordStatus.Canceled, "");
                                core_toDo core_toDo_ = dbContext.FirstOrDefault<core_toDo>("where RefTable = @0 and RefRecordID = @1", new object[2]
                                {
                                    "core_workflowExecutorStatus",
                                    item4.ID
                                });
                                UpdateToDo(core_toDo_, WFRecordStatus.Canceled);
                            }
                        }
                        flag2 = true;
                    }
                    if (activeNode.handlerType == "1" && list.Where(d => d.ExecutorID != SysContext.WanJiangUserID).All(w => w.Status == WFRecordStatus.Rejected))
                    {
                        flag2 = true;
                    }
                }
                UpdateWFTask(currentTask, WFRecordStatus.Rejected);
                core_workflowExecutorStatus core_workflowExecutorStatus2 = list.FirstOrDefault(l => l.ExecutorID == SysContext.WanJiangUserID);
                UpdateExecutor(core_workflowExecutorStatus2, WFRecordStatus.Rejected, context.Remark);
                core_toDo core_toDo_2 = dbContext.FirstOrDefault<core_toDo>("where RefTable = @0 and RefRecordID = @1", new object[2]
                {
                    "core_workflowExecutorStatus",
                    core_workflowExecutorStatus2.ID
                });
                UpdateToDo(core_toDo_2, WFRecordStatus.Rejected);
                if (flag2)
                {
                    core_workflowProject.ModifyDate = DateTime.Now;
                    core_workflowProject.ModifyUserID = SysContext.WanJiangUserID;
                    core_workflowProject.Status = WFRecordStatus.Rejected;
                    core_workflowProject.EndTime = DateTime.Now;
                    dbContext.Update("core_workflowProject", "ID", core_workflowProject, new string[4]
                    {
                        "ModifyDate",
                        "ModifyUserID",
                        "EndTime",
                        "Status"
                    });
                }
            }
        }

        private void UpdateWFTask(FastDev.DevDB.Model.core_workflowTask workflowTaskData, string strStatus)
        {
            DbContext dbContext = wfContext;
            workflowTaskData.Status = strStatus;
            workflowTaskData.EndTime = DateTime.Now;
            workflowTaskData.CreateDate = DateTime.Now;
            workflowTaskData.CreateUserID = SysContext.WanJiangUserID;
            dbContext.Update(workflowTaskData, workflowTaskData.ID, new string[4]
            {
                "CreateDate",
                "CreateUserID",
                "EndTime",
                "Status"
            });
        }

        private void UpdateExecutor(core_workflowExecutorStatus workflowExecutorStatusData, string strStatus, string strRemark)
        {
            DbContext dbContext = wfContext;
            workflowExecutorStatusData.ModifyDate = DateTime.Now;
            workflowExecutorStatusData.ModifyUserID = SysContext.WanJiangUserID;
            workflowExecutorStatusData.Status = strStatus;
            workflowExecutorStatusData.Remark = strRemark;
            workflowExecutorStatusData.ExecutorTime = DateTime.Now;
            dbContext.Update(workflowExecutorStatusData, workflowExecutorStatusData.ID, new string[5]
            {
                "ModifyDate",
                "ModifyUserID",
                "Status",
                "Remark",
                "ExecutorTime"
            });
        }

        private void UpdateToDo(core_toDo toDoData, string strStatus)
        {
            DbContext dbContext = wfContext;
            toDoData.ModifyDate = DateTime.Now;
            toDoData.ModifyUserID = SysContext.WanJiangUserID;
            toDoData.Status = strStatus;
            toDoData.CompleteTime = DateTime.Now;
            dbContext.Update(toDoData, toDoData.ID, new string[4]
            {
                "ModifyDate",
                "ModifyUserID",
                "Status",
                "CompleteTime"
            });
        }

        public object GetContext(WorkflowContext context)
        {
            DbContext dbContext = wfContext;
            string model = context.Model;
            FastDev.DevDB.Model.core_workflowTask currentTask = null;
            List<core_workflowExecutorStatus> list = null;
            core_workflowExecutorStatus core_workflowExecutorStatus = null;
            core_workflowProject core_workflowProject = dbContext.FirstOrDefault<core_workflowProject>("where Context = @0", new object[1]
            {
                context.Context
            });
            bool flag = core_workflowProject == null;
            if (core_workflowProject != null && core_workflowProject.Status == WFRecordStatus.Completed)
            {
                throw new UserException("该工作流程已经完成！");
            }
            if (core_workflowProject != null && core_workflowProject.Status == WFRecordStatus.Rejected)
            {
                throw new UserException("该工作流程已经驳回！");
            }
            if (!flag)
            {
                if (string.IsNullOrEmpty(context.TaskID) && core_workflowProject != null)
                {
                    context.TaskID = dbContext.ExecuteScalar<string>("select ID from core_workflowTask where Status = @0 and ProjectID = @1", new object[2]
                    {
                        WFRecordStatus.Running,
                        core_workflowProject.ID
                    });
                }
                if (string.IsNullOrEmpty(context.TaskID))
                {
                    throw new UserException("流程异常，请联系相关管理员！");
                }
                currentTask = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_workflowTask>("where ID = @0", new object[1]
                {
                    context.TaskID
                });
                if (currentTask == null)
                {
                    throw new UserException("流程异常，请联系相关管理员！");
                }
                list = dbContext.Fetch<core_workflowExecutorStatus>("where TaskID = @0", new object[1]
                {
                    currentTask.ID
                });
                if (list == null || !list.Any() || !list.Any(l => l.ExecutorID == SysContext.WanJiangUserID))
                {
                    throw new UserException("没有权限访问！");
                }
                core_workflowExecutorStatus = list.FirstOrDefault(l => l.ExecutorID == SysContext.WanJiangUserID);
                if (core_workflowExecutorStatus.Status == WFRecordStatus.Canceled)
                {
                    throw new UserException("任务已经取消！");
                }
                if (core_workflowExecutorStatus.Status != WFRecordStatus.Running)
                {
                    throw new UserException("任务已经被处理！");
                }
            }
            core_workflow core_workflow = null;
            core_workflow = ((core_workflowProject == null) ? dbContext.FirstOrDefault<core_workflow>("where ModelName = @0", new object[1]
            {
                model
            }) : dbContext.FirstOrDefault<core_workflow>("where ID = @0", new object[1]
            {
                core_workflowProject.WorkflowID
            }));
            if (core_workflow == null)
            {
                throw new UserException("工作流程未定义！");
            }
            if (string.IsNullOrEmpty(core_workflow.ViewData))
            {
                throw new UserException("工作流程未定义！");
            }
            wfModelType = DataAccessHelper.GetEntityType(context.Model);
            wfModelObj = dbContext.GetHelper(wfModelType).FirstOrDefault("where ID = @0", context.Context);
            ViewModel viewModel = JsonHelper.DeserializeJsonToObject<ViewModel>(core_workflow.ViewData);
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            ViewNode viewNode = (ViewNode)(dictionary["currentNode"] = (flag ? viewModel.nodes.FirstOrDefault(f => f.nodeType == "start") : viewModel.nodes.FirstOrDefault((ViewNode a) => a.id == currentTask.NodeID)));
            dictionary["taskId"] = context.TaskID;
            if (context.CurrentAction == WorkflowAction.Advance)
            {
                if (!flag && viewNode.nodeType == WorkflowNodeType.Active)
                {
                    ActiveNode activeNode = GetViewNodeProperties<ActiveNode>(viewNode);
                    if (activeNode.handlerType == "4")
                    {
                        dictionary["signMode"] = 1;
                        return dictionary;
                    }
                    if (activeNode.handlerType != "1" && list.Any(wf => wf.ExecutorID != SysContext.WanJiangUserID && wf.Status != WFRecordStatus.Completed))
                    {
                        dictionary["waitting"] = 1;
                        return dictionary;
                    }
                }
                ViewNode viewNode2 = null;
                if (currentTask != null && !string.IsNullOrEmpty(currentTask.FromReturnTaskID))
                {
                    FastDev.DevDB.Model.core_workflowTask fromTask = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_workflowTask>("where ID = @0", new object[1]
                    {
                        currentTask.FromReturnTaskID
                    });
                    ViewNode viewNode3 = viewModel.nodes.FirstOrDefault((ViewNode a) => a.id == fromTask.NodeID);
                    if (viewNode3.nodeType == WorkflowNodeType.Active)
                    {
                        ActiveNode activeNode2 = GetViewNodeProperties<ActiveNode>(viewNode3);
                        if (activeNode2.backIsReturn == 1)
                        {
                            viewNode2 = viewNode3;
                        }
                    }
                }
                object list3;
                if (viewNode2 != null)
                {
                    List<ViewNode> list2 = new List<ViewNode>();
                    list2.Add(viewNode2);
                    list3 = list2;
                }
                else
                {
                    list3 = CombinNodesBySource(viewNode, viewModel);
                }
                IList<ViewNode> list4 = (IList<ViewNode>)list3;
                if (list4 == null || !list4.Any())
                {
                    throw new UserException("流程异常，请联系相关管理员！");
                }
                if (list4.Any(l => l.nodeType == WorkflowNodeType.End))
                {
                    Dictionary<string, object> item = FillEndNodeUsers(list4.FirstOrDefault(f => f.nodeType == WorkflowNodeType.End), core_workflowProject);
                    dictionary["nodes"] = new List<object>
                    {
                        item
                    };
                    return dictionary;
                }
                List<object> list5 = new List<object>();
                foreach (ViewNode item2 in list4)
                {
                    ViewNode viewNode4 = JsonHelper.DeserializeJsonToObject<ViewNode>(JsonHelper.SerializeObject(item2));
                    while (viewNode4.nodeType == WorkflowNodeType.Branch)
                    {
                        viewNode4 = GetBranchNode(context, viewModel, viewNode4);
                    }
                    if (viewNode4.nodeType == WorkflowNodeType.Active || viewNode4.nodeType == WorkflowNodeType.End)
                    {
                        Dictionary<string, object> item = FillEndNodeUsers(viewNode4, core_workflowProject);
                        if (viewNode4.nodeType == WorkflowNodeType.End)
                        {
                            dictionary["nodes"] = new List<object>
                            {
                                item
                            };
                            return dictionary;
                        }
                        list5.Add(item);
                    }
                }
                dictionary["nodes"] = list5;
            }
            else if (context.CurrentAction == WorkflowAction.Back)
            {
                if (viewNode.nodeType != WorkflowNodeType.Active)
                {
                    throw new UserException("当前节点无法退回！");
                }
                ActiveNode activeNode = GetViewNodeProperties<ActiveNode>(viewNode);
                List<ViewNode> list6 = new List<ViewNode>();
                List<object> list5 = new List<object>();
                if (activeNode.backType == "1")
                {
                    list6.Add(FilterNodeCanBranch(viewNode, viewModel, v => !v.All(l => l.nodeType == WorkflowNodeType.Branch)).FirstOrDefault());
                }
                else if (activeNode.backType == "2")
                {
                    list6.Add(viewModel.nodes.FirstOrDefault(v => v.nodeType == WorkflowNodeType.Start));
                }
                else if (activeNode.backType == "3")
                {
                    IList<ViewNode> source = CombinNodesByTarget(viewNode, viewModel);
                    List<FastDev.DevDB.Model.Mini.core_workflowTask> list7 = dbContext.Fetch<FastDev.DevDB.Model.Mini.core_workflowTask>("where ProejctID = @0", new object[1]
                    {
                        core_workflowProject.ID
                    });
                    if (list7 != null && list7.Any())
                    {
                        List<string> nodeids = list7.Select(l => l.NodeID).ToList();
                        list6 = (from a in source
                                 where nodeids.Contains(a.id) && a.nodeType != WorkflowNodeType.Branch
                                 select a).ToList();
                    }
                }
                else if (activeNode.backType == "4")
                {
                    IList<ViewNode> source = CombinNodesByTarget(viewNode, viewModel);
                    list6 = source.Where(l => l.nodeType != WorkflowNodeType.Branch).ToList();
                }
                else if (activeNode.backType == "5" && activeNode.backNodes != null && activeNode.backNodes.Any())
                {
                    using (IEnumerator<IList<string>> enumerator2 = activeNode.backNodes.GetEnumerator())
                    {
                        while (enumerator2.MoveNext())
                        {
                            Func<ViewNode, bool> func = null;
                            IList<string> bn = enumerator2.Current;
                            List<ViewNode> list8 = list6;
                            IList<ViewNode> nodes = viewModel.nodes;
                            func = ((ViewNode a) => a.id == bn[0]);
                            list8.Add(nodes.FirstOrDefault(func));
                        }
                    }
                }
                if (!list6.Any())
                {
                    throw new UserException("未找到可以退回的节点！");
                }
                foreach (ViewNode item3 in list6)
                {
                    if (item3 != null)
                    {
                        Dictionary<string, object> item = FillEndNodeUsers(item3, core_workflowProject);
                        list5.Add(item);
                    }
                }
                dictionary["nodes"] = list5;
            }
            return dictionary;
        }

        public object GetLog(WorkflowContext context)
        {
            DbContext dbContext = wfContext;
            string model = context.Model;
            core_workflowProject core_workflowProject = dbContext.FirstOrDefault<core_workflowProject>("where Context = @0", new object[1]
            {
                context.Context
            });
            core_workflow core_workflow = null;
            core_workflow = ((core_workflowProject == null) ? dbContext.FirstOrDefault<core_workflow>("where ModelName = @0", new object[1]
            {
                model
            }) : dbContext.FirstOrDefault<core_workflow>("where ID = @0", new object[1]
            {
                core_workflowProject.WorkflowID
            }));
            if (core_workflow == null)
            {
                throw new UserException("工作流程未定义！");
            }
            if (string.IsNullOrEmpty(core_workflow.ViewData))
            {
                throw new UserException("工作流程未定义！");
            }
            ViewModel viewModel = JsonHelper.DeserializeJsonToObject<ViewModel>(core_workflow.ViewData);
            if (core_workflowProject == null)
            {
                return new
                {
                    view = viewModel
                };
            }
            List<FastDev.DevDB.Model.core_workflowTask> source = dbContext.Fetch<FastDev.DevDB.Model.core_workflowTask>("where ProjectID = @0", new object[1]
            {
                core_workflowProject.ID
            });
            List<core_workflowTrack> source2 = dbContext.Fetch<core_workflowTrack>("where ProjectID = @0", new object[1]
            {
                core_workflowProject.ID
            });
            core_workflowTrack currentTrack = source2.OrderBy(f => f.CreateDate).FirstOrDefault(f => f.NodeType == "start");
            FastDev.DevDB.Model.core_workflowTask currentTask = source.FirstOrDefault((FastDev.DevDB.Model.core_workflowTask a) => a.ID == currentTrack.TaskID);
            List<WFLogItem> list = new List<WFLogItem>();
            list.Add(GenLogItem(currentTask, currentTrack, viewModel));
            while (currentTrack != null && currentTrack.NodeType != "end")
            {
                currentTrack = source2.FirstOrDefault((core_workflowTrack a) => a.TaskID == currentTrack.NextTaskID);
                if (currentTrack != null)
                {
                    currentTask = source.FirstOrDefault((FastDev.DevDB.Model.core_workflowTask a) => a.ID == currentTrack.TaskID);
                    list.Add(GenLogItem(currentTask, currentTrack, viewModel));
                    if (!string.IsNullOrEmpty(currentTrack.NextTaskID))
                    {
                        ViewNode viewNode_ = viewModel.nodes.FirstOrDefault((ViewNode a) => a.id == currentTask.NodeID);
                        IList<ViewNode> list2 = CombinNodesBySource(viewNode_, viewModel);
                        if (list2 != null && list2.Any())
                        {
                            foreach (ViewNode item in list2)
                            {
                                if (item.nodeType == WorkflowNodeType.Branch)
                                {
                                    item.status = WFRecordStatus.Completed;
                                }
                            }
                        }
                    }
                }
            }
            return new
            {
                tasks = list,
                view = viewModel
            };
        }

        private WFLogItem GenLogItem(FastDev.DevDB.Model.core_workflowTask core_workflowTask_0, core_workflowTrack core_workflowTrack_0, ViewModel viewModel_0)
        {
            DbContext dbContext = wfContext;
            ViewNode viewNode = viewModel_0.nodes.FirstOrDefault((ViewNode a) => a.id == core_workflowTask_0.NodeID);
            viewNode.status = core_workflowTask_0.Status;
            WFLogItem wFLogItem = new WFLogItem();
            wFLogItem.taskId = core_workflowTask_0.ID;
            wFLogItem.taskTitle = core_workflowTask_0.NodeTitle;
            wFLogItem.taskType = core_workflowTask_0.NodeType;
            wFLogItem.items = new List<Dictionary<string, object>>();
            WFLogItem wFLogItem2 = wFLogItem;
            if (viewNode.nodeType == WorkflowNodeType.End)
            {
                return wFLogItem2;
            }
            ActiveNode activeNode = GetViewNodeProperties<ActiveNode>(viewNode);
            wFLogItem2.handlerType = HandlerTypes.GetText(activeNode.handlerType);
            List<core_workflowTrackDetail> list = dbContext.Fetch<core_workflowTrackDetail>("where TrackID = @0 order by CreateDate asc", new object[1]
            {
                core_workflowTrack_0.ID
            });
            foreach (core_workflowTrackDetail item in list)
            {
                core_workflowExecutorStatus core_workflowExecutorStatus = dbContext.FirstOrDefault<core_workflowExecutorStatus>("where ID = @0", new object[1]
                {
                    item.ExecutorStatusID
                });
                Dictionary<string, object> dictionary = new Dictionary<string, object>();
                if (activeNode.handlerType == "4")
                {
                    dictionary["isToNext"] = 1;
                }
                else
                {
                    dictionary["isToNext"] = item.IsToNextTask;
                }
                dictionary["user"] = dbContext.FirstOrDefault<FastDev.DevDB.Model.Mini.core_user>("where ID = @0", new object[1]
                {
                    core_workflowExecutorStatus.ExecutorID
                });
                dictionary["status"] = "暂未处理";
                if (core_workflowExecutorStatus.Status == WFRecordStatus.Completed)
                {
                    if (activeNode.handlerType == "4")
                    {
                        dictionary["status"] = "同意";
                    }
                    else if (item.IsToNextTask == 1)
                    {
                        dictionary["status"] = "转下一步";
                    }
                    else
                    {
                        dictionary["status"] = "同意";
                    }
                }
                else if (core_workflowExecutorStatus.Status == WFRecordStatus.Canceled)
                {
                    dictionary["status"] = "取消";
                }
                else if (core_workflowExecutorStatus.Status == WFRecordStatus.Rejected)
                {
                    dictionary["status"] = "不同意";
                }
                else if (core_workflowExecutorStatus.Status == WFRecordStatus.Back)
                {
                    dictionary["status"] = "回退";
                }
                dictionary["remark"] = core_workflowExecutorStatus.Remark;
                dictionary["startDate"] = core_workflowExecutorStatus.CreateDate;
                dictionary["endDate"] = core_workflowExecutorStatus.ExecutorTime;
                if (viewNode.nodeType == WorkflowNodeType.Start)
                {
                    dictionary["status"] = "";
                }
                wFLogItem2.items.Add(dictionary);
            }
            return wFLogItem2;
        }

        private Dictionary<string, object> FillEndNodeUsers(ViewNode viewNode_0, core_workflowProject core_workflowProject_0)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            if (viewNode_0.nodeType == WorkflowNodeType.Start || viewNode_0.nodeType == WorkflowNodeType.End)
            {
                dictionary["node"] = new
                {
                    id = viewNode_0.id,
                    nodeType = viewNode_0.nodeType,
                    nodeTitle = viewNode_0.properties["text"].ToString()
                };
                FillWorkflowUser(dictionary, viewNode_0, core_workflowProject_0);
                return dictionary;
            }
            ActiveNode activeNode = GetViewNodeProperties<ActiveNode>(viewNode_0);
            dictionary["node"] = new
            {
                id = viewNode_0.id,
                nodeType = viewNode_0.nodeType,
                handlerType = activeNode.handlerType,
                nodeTitle = activeNode.text
            };
            if (viewNode_0.nodeType == WorkflowNodeType.Active)
            {
                FillWorkflowUser(dictionary, viewNode_0, core_workflowProject_0);
            }
            return dictionary;
        }

        private FilterGroup GetUserFilterByWorkflowProject(ViewNode viewNode_0, core_workflowProject core_workflowProject_0)
        {
            List<string> list = new List<string>();
            List<string> list2 = new List<string>();
            new List<string>();
            List<string> list3 = new List<string>();
            if (viewNode_0.nodeType == WorkflowNodeType.Start)
            {
                list.Add(core_workflowProject_0.SponsorID);
            }
            else
            {
                if (viewNode_0.nodeType == WorkflowNodeType.End)
                {
                    return null;
                }
                ActiveNode activeNode = GetViewNodeProperties<ActiveNode>(viewNode_0);
                if (activeNode.executorDepartment != null && activeNode.executorDepartment.Any())
                {
                    foreach (IList<string> item in activeNode.executorDepartment)
                    {
                        if (item != null && item.Any() && !string.IsNullOrEmpty(item[0]))
                        {
                            list2.Add(item[0]);
                        }
                    }
                }
                if (activeNode.executorRole != null && activeNode.executorRole.Any())
                {
                    foreach (IList<string> item2 in activeNode.executorRole)
                    {
                        if (item2 != null && item2.Any() && !string.IsNullOrEmpty(item2[0]))
                        {
                            list3.Add(item2[0]);
                        }
                    }
                }
                if (activeNode.executorUser != null && activeNode.executorUser.Any())
                {
                    foreach (IList<string> item3 in activeNode.executorUser)
                    {
                        if (item3 != null && item3.Any() && !string.IsNullOrEmpty(item3[0]))
                        {
                            list.Add(item3[0]);
                        }
                    }
                }
            }
            FilterGroup filterGroup = new FilterGroup();
            foreach (string item4 in list)
            {
                filterGroup.rules.Add(new FilterRule
                {
                    field = "ID",
                    op = "equal",
                    value = item4
                });
            }
            foreach (string item5 in list2)
            {
                filterGroup.rules.Add(new FilterRule
                {
                    field = "DepartmentID",
                    op = "equal",
                    value = item5
                });
            }
            foreach (string item6 in list3)
            {
                filterGroup.rules.Add(new FilterRule
                {
                    field = "ID in (select CoreUserID from core_userRole where CoreRoleID = {0})",
                    type = "sql",
                    value = item6
                });
            }
            filterGroup.op = "or";
            return filterGroup;
        }

        private List<List<string>> FindWorkflowExecutors(ViewNode viewNode_0, core_workflowProject core_workflowProject_0)
        {
            if (viewNode_0.nodeType == WorkflowNodeType.End)
            {
                return new List<List<string>>();
            }
            FilterTranslator filterTranslator = new FilterTranslator();
            filterTranslator.Group = GetUserFilterByWorkflowProject(viewNode_0, core_workflowProject_0);
            filterTranslator.Translate();
            string commandText = filterTranslator.CommandText;
            string sql = "select ID,RealName from core_user where ";
            sql = (string.IsNullOrEmpty(commandText) ? (sql + "1=1") : (sql + commandText));
            List<List<string>> list = new List<List<string>>();
            List<FastDev.DevDB.Model.Mini.core_user> list2 = wfContext.Fetch<FastDev.DevDB.Model.Mini.core_user>(sql, filterTranslator.Parms.ToArray());
            if (list2 != null)
            {
                foreach (FastDev.DevDB.Model.Mini.core_user item in list2)
                {
                    list.Add(new List<string>
                    {
                        item.ID,
                        item.RealName
                    });
                }
            }
            return list;
        }

        private void FillWorkflowUser(Dictionary<string, object> dicNodes, ViewNode viewNode_0, core_workflowProject workflowProjectItem)
        {
            new List<string>();
            List<string> list = new List<string>();
            List<string> value = new List<string>();
            new List<string>();
            List<List<string>> list2 = FindWorkflowExecutors(viewNode_0, workflowProjectItem);
            if (list2.Any())
            {
                FilterTranslator filterTranslator = new FilterTranslator();
                filterTranslator.Group = new FilterGroup();
                filterTranslator.Group.op = "or";
                foreach (List<string> item in list2)
                {
                    filterTranslator.Group.rules.Add(new FilterRule
                    {
                        field = "ID in (select DepartmentID from core_user where ID = {0})",
                        type = "sql",
                        value = item[0]
                    });
                }
                string str = "select ID from res_department where ";
                string commandText = filterTranslator.CommandText;
                str = (string.IsNullOrEmpty(commandText) ? (str + "1=1") : (str + commandText));
                List<IdItem> lstDepartmentIds = wfContext.Fetch<IdItem>(str, filterTranslator.Parms.ToArray());
                list = ((lstDepartmentIds == null) ? new List<string>() : lstDepartmentIds.Select(f => f.ID).ToList());
                if (list.Any())
                {
                    filterTranslator = new FilterTranslator();
                    filterTranslator.Group = new FilterGroup();
                    filterTranslator.Group.op = "or";
                    foreach (string item2 in list)
                    {
                        filterTranslator.Group.rules.Add(new FilterRule
                        {
                            field = "ID in (select CompanyID from res_department where ID = {0})",
                            type = "sql",
                            value = item2
                        });
                    }
                    string comSql = "select ID from res_company where ";
                    commandText = filterTranslator.CommandText;
                    comSql = (string.IsNullOrEmpty(commandText) ? (comSql + "1=1") : (comSql + commandText));
                    List<IdItem> lstCompanyIds = wfContext.Fetch<IdItem>(comSql, filterTranslator.Parms.ToArray());
                    if (lstCompanyIds != null)
                    {
                        lstCompanyIds.Select(f => f.ID).ToList();
                    }
                    value = ((lstCompanyIds == null) ? new List<string>() : lstCompanyIds.Select(d => d.ID).ToList());
                }
            }
            dicNodes["userFilter"] = GetUserFilterByWorkflowProject(viewNode_0, workflowProjectItem);
            dicNodes["users"] = list2;
            dicNodes["departments"] = list;
            dicNodes["companys"] = value;
        }

        private ViewNode GetBranchNode(WorkflowContext workflowContext_0, ViewModel viewModel_0, ViewNode viewNode_0)
        {
            BranchNode branchNode = GetViewNodeProperties<BranchNode>(viewNode_0);
            IList<string> trueFlowNode = branchNode.trueFlowNode;
            IList<string> falseFlowNode = branchNode.falseFlowNode;
            FilterGroup filterGroup = new FilterGroup();
            filterGroup.rules.Add(new FilterRule
            {
                field = "ID",
                value = workflowContext_0.Context
            });
            filterGroup.groups.Add(branchNode.conditionRule);
            bool flag = DbHelper.Exist(SysContext.GetCurrentDb(), wfModelType, filterGroup);
            string nextNodeId = flag ? trueFlowNode[0] : falseFlowNode[0];
            return viewModel_0.nodes.FirstOrDefault((ViewNode a) => a.id == nextNodeId);
        }

        private T GetViewNodeProperties<T>(ViewNode viewNode_0) where T : class
        {
            return DictionaryToObject<T>(viewNode_0.properties);
        }

        private T DictionaryToObject<T>(Dictionary<string, object> dicts) where T : class
        {
            string input = JsonHelper.SerializeObject(dicts);
            return JsonHelper.DeserializeJsonToObject<T>(input);
        }


        private string GetJsResult(string strTemplate, string strData)
        {
            ScriptEngine scriptEngine = new ScriptEngine();
            string code = "\r\n                function getResult()\r\n                { \r\n                    return getR(\"#template#\",#data#);\r\n                    function getR(template, data)\r\n                    {\r\n                        return template.replace(/\\{([\\w\\.]*)\\}/g, function (str, key)\r\n                        {\r\n                            var keys = key.split(\".\"), v = data[keys.shift()];\r\n                            for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];\r\n                            return (typeof v !== \"undefined\" && v !== null) ? v : \"\";\r\n                        });\r\n                    }\r\n                }\r\n            ".Replace("#template#", strTemplate).Replace("#data#", strData);
            scriptEngine.Execute(code);
            return scriptEngine.CallGlobalFunction<string>("getResult", new object[0]);
        }

        private IList<ViewNode> CombinNodesByTarget(ViewNode viewNode_0, ViewModel viewModel_0)
        {
            IList<ViewConnection> connections = viewModel_0.connections;
            List<ViewNode> list = new List<ViewNode>();
            if (connections == null || !connections.Any())
            {
                return list;
            }
            string[] endpointIds = viewNode_0.endpointIds;
            for (int i = 0; i < endpointIds.Length; i++)
            {
                Func<ViewConnection, bool> func = null;
                string endpoint = endpointIds[i];
                IList<ViewConnection> source = connections;
                func = ((ViewConnection a) => a.target == endpoint);
                if (source.Any(func))
                {
                    List<ViewConnection> sourceConnections = (from a in connections
                                                              where a.target == endpoint
                                                              select a).ToList();
                    List<ViewNode> collection = viewModel_0.nodes.Where(delegate (ViewNode n)
                    {
                        if (n == viewNode_0)
                        {
                            return false;
                        }
                        int num = 0;
                        while (true)
                        {
                            if (num >= sourceConnections.Count)
                            {
                                return false;
                            }
                            string source2 = sourceConnections[num].source;
                            if (n.endpointIds.Contains(source2))
                            {
                                break;
                            }
                            num++;
                        }
                        return true;
                    }).ToList();
                    list.AddRange(collection);
                }
            }
            return list.Distinct().ToList();
        }

        private IList<ViewNode> FilterNodeCanBranch(ViewNode viewNode_0, ViewModel viewModel_0, Func<IList<ViewNode>, bool> func)
        {
            IList<ViewNode> list = CombinNodesByTarget(viewNode_0, viewModel_0);
            while (!func(list))
            {
                list = CombinNodesByTarget(list[0], viewModel_0);
            }
            return list;
        }

        private IList<ViewNode> CombinNodesBySource(ViewNode viewNode_0, ViewModel viewModel_0)
        {
            IList<ViewConnection> connections = viewModel_0.connections;
            List<ViewNode> list = new List<ViewNode>();
            if (connections == null || !connections.Any())
            {
                return list;
            }
            string[] endpointIds = viewNode_0.endpointIds;
            for (int i = 0; i < endpointIds.Length; i++)
            {
                Func<ViewConnection, bool> func = null;
                string endpoint = endpointIds[i];
                IList<ViewConnection> source = connections;
                func = ((ViewConnection a) => a.source == endpoint);
                if (source.Any(func))
                {
                    List<ViewConnection> targetConnections = (from a in connections
                                                              where a.source == endpoint
                                                              select a).ToList();
                    List<ViewNode> collection = viewModel_0.nodes.Where(delegate (ViewNode n)
                    {
                        if (n == viewNode_0)
                        {
                            return false;
                        }
                        int num = 0;
                        while (true)
                        {
                            if (num >= targetConnections.Count)
                            {
                                return false;
                            }
                            string target = targetConnections[num].target;
                            if (n.endpointIds.Contains(target))
                            {
                                break;
                            }
                            num++;
                        }
                        return true;
                    }).ToList();
                    list.AddRange(collection);
                }
            }
            return list.Distinct().ToList();
        }
        /// <summary>
        /// 创建一个新的工作流状态
        /// </summary>
        /// <param name="strTaskId"></param>
        /// <param name="strExcutorId"></param>
        /// <returns></returns>
        private core_workflowExecutorStatus GenNewStatus(string strTaskId, string strExcutorId)
        {
            core_workflowExecutorStatus core_workflowExecutorStatus = new core_workflowExecutorStatus();
            core_workflowExecutorStatus.CreateDate = DateTime.Now;
            core_workflowExecutorStatus.CreateUserID = SysContext.WanJiangUserID;
            core_workflowExecutorStatus.ModifyDate = DateTime.Now;
            core_workflowExecutorStatus.ModifyUserID = SysContext.WanJiangUserID;
            core_workflowExecutorStatus.ID = Guid.NewGuid().ToString();
            core_workflowExecutorStatus.TaskID = strTaskId;
            core_workflowExecutorStatus.ExecutorID = strExcutorId;
            core_workflowExecutorStatus.Status = WFRecordStatus.Running;
            return core_workflowExecutorStatus;
        }
        /// <summary>
        /// 放回最新的任务id
        /// </summary>
        public string LatestWorkTaskId { get { return ""; } }
        private core_toDo CreateNewToDo(string strTitle, string strLink, string strRecordId)
        {
            core_toDo core_toDo = new core_toDo();
            core_toDo.CreateDate = DateTime.Now;
            core_toDo.CreateUserID = SysContext.WanJiangUserID;
            core_toDo.ModifyDate = DateTime.Now;
            core_toDo.ModifyUserID = SysContext.WanJiangUserID;
            core_toDo.ID = Guid.NewGuid().ToString();
            core_toDo.Title = strTitle;
            core_toDo.Link = strLink;
            core_toDo.RefTable = "core_workflowExecutorStatus";
            core_toDo.RefRecordID = strRecordId;
            core_toDo.Status = WFRecordStatus.Running;
            return core_toDo;
        }

        private core_workflowProject CreateNewWFProject(string workflowId, string strContext)
        {
            core_workflowProject core_workflowProject = new core_workflowProject();
            core_workflowProject.CreateDate = DateTime.Now;
            core_workflowProject.CreateUserID = SysContext.WanJiangUserID;
            core_workflowProject.ModifyDate = DateTime.Now;
            core_workflowProject.ModifyUserID = SysContext.WanJiangUserID;
            core_workflowProject.ID = Guid.NewGuid().ToString();
            core_workflowProject.StartTime = DateTime.Now;
            core_workflowProject.WorkflowID = workflowId;
            core_workflowProject.Context = strContext;
            core_workflowProject.Status = WFRecordStatus.Running;
            return core_workflowProject;
        }

        private FastDev.DevDB.Model.core_workflowTask CreateNewWFTask(string projectId, string nodeId, string nodeTitle, string string_4)
        {
            FastDev.DevDB.Model.core_workflowTask core_workflowTask = new FastDev.DevDB.Model.core_workflowTask();
            core_workflowTask.CreateDate = DateTime.Now;
            core_workflowTask.NodeType = string_4;
            core_workflowTask.CreateUserID = SysContext.WanJiangUserID;
            core_workflowTask.ModifyDate = DateTime.Now;
            core_workflowTask.ModifyUserID = SysContext.WanJiangUserID;
            core_workflowTask.ID = Guid.NewGuid().ToString();
            core_workflowTask.StartTime = DateTime.Now;
            core_workflowTask.ProjectID = projectId;
            core_workflowTask.NodeID = nodeId;
            core_workflowTask.NodeTitle = nodeTitle;
            core_workflowTask.Status = WFRecordStatus.Running;
            return core_workflowTask;
        }

        private string UpdateWFTrack(string projectId, string taskId, string nextTaskId, string nextLinkType)
        {
            DbContext dbContext = wfContext;
            core_workflowTrack core_workflowTrack = dbContext.FirstOrDefault<core_workflowTrack>("where ProjectID = @0 and TaskID = @1", new object[2]
            {
                projectId,
                taskId
            });
            if (core_workflowTrack == null)
            {
                return null;
            }
            core_workflowTrack.ModifyDate = DateTime.Now;
            core_workflowTrack.ModifyUserID = SysContext.WanJiangUserID;
            core_workflowTrack.NextLinkType = nextLinkType;
            core_workflowTrack.NextTaskID = nextTaskId;
            dbContext.Update(core_workflowTrack, core_workflowTrack.ID, new string[4]
            {
                "ModifyDate",
                "ModifyUserID",
                "NextLinkType",
                "NextTaskID"
            });
            return core_workflowTrack.ID;
        }

        private core_workflowTrack CreateWorkflowTrack(string projectID, string taskId, string nodeType, string nextTaskId, string nextLinkType)
        {
            core_workflowTrack core_workflowTrack = new core_workflowTrack();
            core_workflowTrack.CreateDate = DateTime.Now;
            core_workflowTrack.CreateUserID = SysContext.WanJiangUserID;
            core_workflowTrack.ModifyDate = DateTime.Now;
            core_workflowTrack.ModifyUserID = SysContext.WanJiangUserID;
            core_workflowTrack.ID = Guid.NewGuid().ToString();
            core_workflowTrack.ProjectID = projectID;
            core_workflowTrack.TaskID = taskId;
            core_workflowTrack.NodeType = nodeType;
            core_workflowTrack.NextTaskID = nextTaskId;
            core_workflowTrack.NextLinkType = nextLinkType;
            return core_workflowTrack;
        }

        private string UpdateTrackDetailStatusID(string strTrackId, string strStatusId, string statusId)
        {
            DbContext dbContext = wfContext;
            core_workflowTrackDetail core_workflowTrackDetails = dbContext.FirstOrDefault<core_workflowTrackDetail>("where TrackId = @0 and ExecutorStatusID = @1", new object[2]
            {
                strTrackId,
                strStatusId
            });
            if (core_workflowTrackDetails == null)
            {
                return null;
            }
            core_workflowTrackDetails.ModifyDate = DateTime.Now;
            core_workflowTrackDetails.ModifyUserID = SysContext.WanJiangUserID;
            core_workflowTrackDetails.FromExecutorStatusID = statusId;
            dbContext.Update(core_workflowTrackDetails, core_workflowTrackDetails.ID, new string[3]
            {
                "ModifyDate",
                "ModifyUserID",
                "FromExecutorStatusID"
            });
            return core_workflowTrackDetails.ID;
        }

        private string UpdateTrackDetailIsToNext(string strTrackId, string strStatusID, bool IsToNextTask)
        {
            DbContext dbContext = wfContext;
            core_workflowTrackDetail core_workflowTrackDetails = dbContext.FirstOrDefault<core_workflowTrackDetail>("where TrackId = @0 and ExecutorStatusID = @1", new object[2]
            {
                strTrackId,
                strStatusID
            });
            if (core_workflowTrackDetails == null)
            {
                return null;
            }
            core_workflowTrackDetails.ModifyDate = DateTime.Now;
            core_workflowTrackDetails.ModifyUserID = SysContext.WanJiangUserID;
            core_workflowTrackDetails.IsToNextTask = (byte)(IsToNextTask ? 1 : 0);
            dbContext.Update(core_workflowTrackDetails, core_workflowTrackDetails.ID, new string[3]
            {
                "ModifyDate",
                "ModifyUserID",
                "IsToNextTask"
            });
            return core_workflowTrackDetails.ID;
        }

        private core_workflowTrackDetail CreateNewTrack(string trackId, string strStatusID)
        {
            core_workflowTrackDetail core_workflowTrackDetails = new core_workflowTrackDetail();
            core_workflowTrackDetails.CreateDate = DateTime.Now;
            core_workflowTrackDetails.CreateUserID = SysContext.WanJiangUserID;
            core_workflowTrackDetails.ModifyDate = DateTime.Now;
            core_workflowTrackDetails.ModifyUserID = SysContext.WanJiangUserID;
            core_workflowTrackDetails.ID = Guid.NewGuid().ToString();
            core_workflowTrackDetails.TrackID = trackId;
            core_workflowTrackDetails.ExecutorStatusID = strStatusID;
            return core_workflowTrackDetails;
        }



    }
}
