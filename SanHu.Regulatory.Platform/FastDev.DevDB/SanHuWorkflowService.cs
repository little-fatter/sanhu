using Jurassic;
using FastDev.Common;
using FastDev.DevDB.Model;
using FastDev.DevDB.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
namespace FastDev.DevDB
{
    /// <summary>
    /// 三湖项目关于工作流的实现
    /// </summary>
    public class SanHuWorkflowService : IWorkflowService
    {
        #region
        public class user
        {
            public string Id
            {
                get;
                set;
            }
            public string Name
            {
                get;
                set;
            }
            public string AccountId
            {
                get;
                set;
            }
            public string TenantId
            {
                get;
                set;
            }
            public string Sex
            {
                get;
                set;
            }
            public string Mobile
            {
                get;
                set;
            }
            public string Email
            {
                get;
                set;
            }
            public string Avatar
            {
                get;
                set;
            }
            public string Remark
            {
                get;
                set;
            }
        }

        public class work_task
        {
            public string ID
            {
                get;
                set;
            }
            public string EventInfoId
            {
                get;
                set;
            }
            public string MainHandler
            {
                get;
                set;
            }
            public string CoOrganizer
            {
                get;
                set;
            }
            public string WorkAddress
            {
                get;
                set;
            }
            public string TaskContent
            {
                get;
                set;
            }
            public string AssignUsersID
            {
                get;
                set;
            }
            public DateTime? InitiationTime
            {
                get;
                set;
            }
            public DateTime? ExpectedCompletionTime
            {
                get;
                set;
            }
            public string TaskType
            {
                get;
                set;
            }
            public int? TaskStatus
            {
                get;
                set;
            }
            public string RejectReason
            {
                get;
                set;
            }
            public string Tasknumber
            {
                get;
                set;
            }

            public string RefTable
            {
                get;
                set;
            }
            public DateTime? CompleteTime
            {
                get;
                set;
            }
            public string RefRecordID
            {
                get;
                set;
            }

            public string LocalLinks
            {
                get;
                set;
            }
            public string RemoteLinks
            {
                get;
                set;
            }
            public string WorkflowtaskID
            {
                get;
                set;
            }
            public byte? IsRootTask
            {
                get;
                set;
            }
            public DateTime? CreateDate
            {
                get;
                set;
            }
            public string CreateUserID
            {
                get;
                set;
            }
            public DateTime? ModifyDate
            {
                get;
                set;
            }
            public string ModifyUserID
            {
                get;
                set;
            }
            public string Status
            {
                get;
                set;
            }
        }

        #endregion

        private const string TAB_NAME_CORE_WORKFLOWEXECUTORSTATUS = "core_workflowExecutorStatus";
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
        private DbContext fwContext;//三湖框架的数据库

        public SanHuWorkflowService(DbContext SanHuFrameworkDb)
        {
            fwContext = SanHuFrameworkDb;
            wfContext = null;
            wfModelName = null;
            wfModelObj = null;
            wfModelType = null;

        }
        private string _latestWorkTaskId = string.Empty;
        public string LatestWorkTaskId
        {
            get
            {
                return _latestWorkTaskId;
            }
        }
        public void Execute(WorkflowContext context)
        {
            DbContext dbContext = wfContext;
            string text = wfModelName = context.Model;
            FastDev.DevDB.Model.core_workflowTask currentTask = null;
            List<core_workflowExecutorStatus> list = null;
            core_workflowExecutorStatus core_workflowExecutorStatus = null;
            core_workflowTrack wfTrack = null;
            IService service = ServiceHelper.GetService(text);
            service.SetDb(dbContext);
            core_workflowProject wfProject = dbContext.FirstOrDefault<core_workflowProject>("where Context = @0", new object[1]
            {
                context.Context
            });
            bool IsNewStart = wfProject == null;
            if (!IsNewStart)
            {//主要是对能否往下执行做一个判断
                if (string.IsNullOrEmpty(context.TaskID))
                {
                    context.TaskID = dbContext.ExecuteScalar<string>("select ID from core_workflowTask where Status = @0 and ProjectID = @1", new object[2]
                    {
                        WFRecordStatus.Running,
                        wfProject.ID
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
                wfTrack = dbContext.FirstOrDefault<core_workflowTrack>("where ProjectID = @0 and TaskID = @1", new object[2]
                {
                    wfProject.ID,
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
            core_workflow = ((wfProject == null) ? dbContext.FirstOrDefault<core_workflow>("where ModelName = @0", new object[1]
            {
                text
            }) : dbContext.FirstOrDefault<core_workflow>("where ID = @0", new object[1]
            {
                wfProject.WorkflowID
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
            ViewNode currentNode = IsNewStart ? viewModel.nodes.FirstOrDefault(n => n.nodeType == "start") : viewModel.nodes.FirstOrDefault((ViewNode a) => a.id == currentTask.NodeID);
            if (context.CurrentAction == WorkflowAction.Advance)
            {//前进

                if (IsNewStart)
                {
                    ViewNode startNode = viewModel.nodes.FirstOrDefault(n => n.nodeType == "start");
                    wfProject = CreateNewWFProject(core_workflow.ID, context.Context);
                    wfProject.SponsorID = SysContext.WanJiangUserID;
                    currentTask = CreateNewWFTask(wfProject.ID, startNode.id, startNode.properties["text"].ToString(), startNode.nodeType);
                    currentTask.Status = WFRecordStatus.Completed;
                    currentTask.EndTime = DateTime.Now;
                    dbContext.Insert(currentTask);
                    core_workflowExecutorStatus = GenNewStatus(currentTask.ID, SysContext.WanJiangUserID);
                    core_workflowExecutorStatus.Status = WFRecordStatus.Completed;
                    core_workflowExecutorStatus.ExecutorTime = DateTime.Now;
                    core_workflowExecutorStatus.Remark = context.Remark;
                    dbContext.Insert(core_workflowExecutorStatus);
                    wfTrack = CreateWorkflowTrack(wfProject.ID, currentTask.ID, startNode.nodeType, null, null);
                    core_workflowTrackDetail poco = CreateNewTrackDetail(wfTrack.ID, core_workflowExecutorStatus.ID);
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
                        CurrentProject = wfProject,
                        CurrentTask = currentTask
                    });
                }
                else
                {//handlerType    "1"== "抢占"    "3"== "同时"   "4" == "会签"
                    if (currentNode.nodeType == WorkflowNodeType.Active)
                    {
                        ActiveNode activeNode = GetViewNodeProperties<ActiveNode>(currentNode);
                        if (activeNode.handlerType == "1")
                        {
                            foreach (core_workflowExecutorStatus item in list)
                            {
                                if (!(item.ExecutorID == SysContext.WanJiangUserID))
                                {
                                    UpdateExecutor(item, WFRecordStatus.Canceled, "");

                                    work_task tskCancelData = dbContext.FirstOrDefault<work_task>("where RefTable = @0 and RefRecordID = @1", new object[2]
                                    {
                                        TAB_NAME_CORE_WORKFLOWEXECUTORSTATUS,
                                        item.ID
                                    });
                                    UpdateWorkTask(tskCancelData, WFRecordStatus.Canceled);

                                }
                            }
                            UpdateTrackDetailIsToNext(wfTrack.ID, core_workflowExecutorStatus.ID, true);
                            UpdateWFTask(currentTask, WFRecordStatus.Completed);
                        }
                        if ((activeNode.handlerType == "2" || activeNode.handlerType == "3") && (list.Count == 1 || list.Where(l => l.ExecutorID != SysContext.WanJiangUserID).All(l => l.Status != WFRecordStatus.Running)))
                        {
                            if (context.Waitting == 1)
                            {
                                throw new UserException("工作流程异常：流程已经更新,请重新操作");
                            }
                            UpdateTrackDetailIsToNext(wfTrack.ID, core_workflowExecutorStatus.ID, true);
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
                                IList<ViewNode> list2 = CombinNodesBySource(currentNode, viewModel);
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
                                        ViewNode viewNode4 = item2;// JsonHelper.DeserializeJsonToObject<ViewNode>(JsonHelper.SerializeObject(item2));
                                        while (viewNode4.nodeType == WorkflowNodeType.Branch)
                                        {
                                            viewNode4 = GetBranchNode(context, viewModel, viewNode4);
                                        }
                                        if (viewNode4.nodeType == WorkflowNodeType.Active)
                                        {
                                            List<List<string>> executors = FindWorkflowExecutors(viewNode4, wfProject);
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
                    else if (currentNode.nodeType == WorkflowNodeType.Start)
                    {
                        UpdateWFTask(currentTask, WFRecordStatus.Completed);
                    }
                    UpdateExecutor(core_workflowExecutorStatus, WFRecordStatus.Completed, context.Remark);


                    work_task tskData = dbContext.FirstOrDefault<work_task>("where RefTable = @0 and RefRecordID = @1", new object[2]
                                   {
                                        TAB_NAME_CORE_WORKFLOWEXECUTORSTATUS,
                                        core_workflowExecutorStatus.ID
                                   });
                    UpdateWorkTask(tskData, WFRecordStatus.Completed);
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
                                    if (IsNewStart)
                                    {
                                        dbContext.Insert(wfProject);
                                        dbContext.Insert(wfTrack);
                                    }
                                    else
                                    {
                                        dbContext.Update("core_workflowProject", "ID", wfProject, new string[4]
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
                                    FastDev.DevDB.Model.core_workflowTask wfTask = CreateNewWFTask(wfProject.ID, viewNode2.id, activeNode.text, viewNode2.nodeType);
                                    wfTask.Status = WFRecordStatus.Running;
                                    dbContext.Insert(wfTask);
                                    core_workflowTrack wfTrackActive = CreateWorkflowTrack(wfProject.ID, wfTask.ID, viewNode2.nodeType, null, null);
                                    dbContext.Insert(wfTrackActive);//活动节点track
                                    if (IsNewStart)
                                    {
                                        wfTrack.NextTaskID = wfTask.ID;
                                        wfTrack.NextLinkType = "advance";
                                    }
                                    else
                                    {
                                        UpdateWFTrack(wfProject.ID, currentTask.ID, wfTask.ID, "advance");
                                    }
                                    //我觉得优化的地方应该是 每个执行者，对应一个表单
                                    //现在这里只给节点一个表单，是要求每个执行者填写同一个表单，不灵活
                                    //lyl 02-28备注
                                    string formName = viewNode2.properties["formName"].ToString();//fomeName 对应任务类型
                                    foreach (List<string> executor in eNode2.Executors)
                                    {
                                        string exeUserId = executor[0];
                                        if (string.IsNullOrEmpty(exeUserId))
                                        {
                                            throw new UserException("请选择参与者！");
                                        }
                                        core_workflowExecutorStatus wfExeStatus = GenNewStatus(wfTask.ID, exeUserId);
                                        wfExeStatus.Status = WFRecordStatus.Running;
                                        dbContext.Insert(wfExeStatus);
                                        core_workflowTrackDetail poco2 = CreateNewTrackDetail(wfTrackActive.ID, wfExeStatus.ID);
                                        dbContext.Insert(poco2);
                                        string todoTitle = activeNode.text;
                                        if (!string.IsNullOrEmpty(activeNode.toDoTitleRule))
                                        {
                                            todoTitle += GetJsTemplateResult(activeNode.toDoTitleRule, JsonHelper.SerializeObject(wfModelObj));
                                        }
                                        string linkUrl = $"web/main/?model={wfModelName}&id={wfProject.Context}&viewtype=form&taskid={wfTask.ID}";
                                        string evId = "";//下一步处理
                                        work_task wTask = CreateNewWorkTask(wfTask.ID, exeUserId, formName, linkUrl, wfModelName, wfExeStatus.ID, todoTitle, evId);
                                        dbContext.Insert(wTask);
                                        _latestWorkTaskId = wfTask.ID;
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
                    wfProject.Status = WFRecordStatus.Completed;
                    wfProject.EndTime = DateTime.Now;
                    if (IsNewStart)
                    {
                        dbContext.Insert(wfProject);
                    }
                    else
                    {
                        dbContext.Update("core_workflowProject", "ID", wfProject, new string[4]
                        {
                            "CreateDate",
                            "CreateUserID",
                            "EndTime",
                            "Status"
                        });
                    }
                    FastDev.DevDB.Model.core_workflowTask core_workflowTask2 = CreateNewWFTask(wfProject.ID, viewNode2.id, viewNode2.properties["text"].ToString(), viewNode2.nodeType);
                    core_workflowTask2.Status = WFRecordStatus.Completed;
                    core_workflowTask2.EndTime = DateTime.Now;
                    dbContext.Insert(core_workflowTask2);
                    core_workflowExecutorStatus core_workflowExecutorStatus3 = GenNewStatus(core_workflowTask2.ID, SysContext.WanJiangUserID);
                    core_workflowExecutorStatus3.Status = WFRecordStatus.Completed;
                    core_workflowExecutorStatus3.ExecutorTime = DateTime.Now;
                    dbContext.Insert(core_workflowExecutorStatus3);
                    if (IsNewStart)
                    {
                        wfTrack.NextTaskID = core_workflowTask2.ID;
                        wfTrack.NextLinkType = "advance";
                    }
                    else
                    {
                        UpdateWFTrack(wfProject.ID, currentTask.ID, core_workflowTask2.ID, "advance");
                    }
                    core_workflowTrack core_workflowTrack3 = CreateWorkflowTrack(wfProject.ID, core_workflowTask2.ID, viewNode2.nodeType, null, null);
                    dbContext.Insert(core_workflowTrack3);
                    core_workflowTrackDetail poco3 = CreateNewTrackDetail(core_workflowTrack3.ID, core_workflowExecutorStatus3.ID);
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
                        CurrentProject = wfProject,
                        CurrentTask = currentTask
                    });
                    if (IsNewStart)
                    {
                        dbContext.Insert(wfTrack);
                    }
                }
            }
            else if (context.CurrentAction == WorkflowAction.Back)
            {//后退
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


                work_task workBack = dbContext.FirstOrDefault<work_task>("where RefTable = @0 and RefRecordID = @1", new object[2]
                  {
                        TAB_NAME_CORE_WORKFLOWEXECUTORSTATUS,
                        core_workflowExecutorStatus.ID
                  });
                UpdateWorkTask(workBack, WFRecordStatus.Back);

                ViewNode viewNode2 = viewModel.nodes.FirstOrDefault((ViewNode a) => a.id == executeNode.NodeId);
                if (viewNode2.nodeType == WorkflowNodeType.Active || viewNode2.nodeType == WorkflowNodeType.Start)
                {
                    foreach (core_workflowExecutorStatus item3 in list)
                    {
                        if (!(item3.ExecutorID == SysContext.WanJiangUserID))
                        {
                            UpdateExecutor(item3, WFRecordStatus.Canceled, "");

                            work_task workCancel = dbContext.FirstOrDefault<work_task>("where RefTable = @0 and RefRecordID = @1", new object[2]
                              {
                                    TAB_NAME_CORE_WORKFLOWEXECUTORSTATUS,
                                    item3.ID
                              });
                            UpdateWorkTask(workBack, WFRecordStatus.Canceled);
                        }
                    }
                    string nodeTitle = viewNode2.properties["text"].ToString();
                    FastDev.DevDB.Model.core_workflowTask core_workflowTask = CreateNewWFTask(wfProject.ID, viewNode2.id, nodeTitle, viewNode2.nodeType);
                    core_workflowTask.Status = WFRecordStatus.Running;
                    core_workflowTask.FromReturnTaskID = currentTask.ID;
                    dbContext.Insert(core_workflowTask);
                    core_workflowTrack wfTrackBack = CreateWorkflowTrack(wfProject.ID, core_workflowTask.ID, viewNode2.nodeType, null, null);
                    dbContext.Insert(wfTrackBack);//后退的时候添加一个跟踪节点
                    UpdateWFTrack(wfProject.ID, currentTask.ID, core_workflowTask.ID, "back");
                    string formName = "";
                    if (viewNode2.nodeType == WorkflowNodeType.Active)
                        formName = viewNode2.properties["formName"].ToString();//fomeName 对应任务类型
                    foreach (List<string> executor2 in executeNode.Executors)
                    {
                        string backTitle = viewNode2.properties.ContainsKey("backToDoTitleRule") ? viewNode2.properties["backToDoTitleRule"].ToString() : "退回";
                        string uId = executor2[0];
                        core_workflowExecutorStatus core_workflowExecutorStatus2 = GenNewStatus(core_workflowTask.ID, uId);
                        core_workflowExecutorStatus2.Status = WFRecordStatus.Running;
                        dbContext.Insert(core_workflowExecutorStatus2);
                        core_workflowTrackDetail poco2 = CreateNewTrackDetail(wfTrackBack.ID, core_workflowExecutorStatus2.ID);
                        dbContext.Insert(poco2);
                        string todoTitle = nodeTitle;
                        if (wfModelObj != null)
                            if (!string.IsNullOrEmpty(backTitle))
                            {
                                todoTitle += GetJsTemplateResult(backTitle, JsonHelper.SerializeObject(wfModelObj));
                            }
                        var linkUrl = "web/main/?model=" + wfModelName + "&id=" + wfProject.Context + "&viewtype=form&tasid=" + core_workflowTask.ID;
                        string evId = "";//下一步处理
                        work_task wTask = CreateNewWorkTask(core_workflowTask.ID, uId, formName, linkUrl, wfModelName, core_workflowExecutorStatus2.ID, todoTitle, evId);
                        dbContext.Insert(wTask);
                        _latestWorkTaskId = wTask.ID;
                    }
                }
            }
            else if (context.CurrentAction == WorkflowAction.Rejected)
            {//拒绝
                bool IsRejectAll = false;
                if (currentNode.nodeType == WorkflowNodeType.Active)
                {
                    ActiveNode activeNode = GetViewNodeProperties<ActiveNode>(currentNode);
                    if (activeNode.handlerType == "2" || activeNode.handlerType == "3")
                    {
                        foreach (core_workflowExecutorStatus exeStatus in list)
                        {
                            if (!(exeStatus.ExecutorID == SysContext.WanJiangUserID))
                            {
                                UpdateExecutor(exeStatus, WFRecordStatus.Canceled, "");
                                work_task workRejectedCancel = dbContext.FirstOrDefault<work_task>("where RefTable = @0 and RefRecordID = @1", new object[2]
                                {
                                    TAB_NAME_CORE_WORKFLOWEXECUTORSTATUS,
                                    exeStatus.ID
                                });
                                UpdateWorkTask(workRejectedCancel, WFRecordStatus.Canceled);

                            }
                        }
                        IsRejectAll = true;
                    }
                    if (activeNode.handlerType == "1" && list.Where(d => d.ExecutorID != SysContext.WanJiangUserID).All(w => w.Status == WFRecordStatus.Rejected))
                    {//抢占，且 其他用户已拒绝
                        IsRejectAll = true;
                    }
                }
                UpdateWFTask(currentTask, WFRecordStatus.Rejected);
                core_workflowExecutorStatus core_workflowExecutorStatus2 = list.FirstOrDefault(l => l.ExecutorID == SysContext.WanJiangUserID);
                UpdateExecutor(core_workflowExecutorStatus2, WFRecordStatus.Rejected, context.Remark);

                work_task wTask = dbContext.FirstOrDefault<work_task>("where RefTable = @0 and RefRecordID = @1", new object[2]
                {
                    TAB_NAME_CORE_WORKFLOWEXECUTORSTATUS,
                    core_workflowExecutorStatus2.ID
                });
                UpdateWorkTask(wTask, WFRecordStatus.Rejected);
                if (IsRejectAll)
                {
                    wfProject.ModifyDate = DateTime.Now;
                    wfProject.ModifyUserID = SysContext.WanJiangUserID;
                    wfProject.Status = WFRecordStatus.Rejected;
                    wfProject.EndTime = DateTime.Now;
                    dbContext.Update("core_workflowProject", "ID", wfProject, new string[4]
                    {
                        "ModifyDate",
                        "ModifyUserID",
                        "EndTime",
                        "Status"
                    });
                }
            }
            else if (context.CurrentAction == WorkflowAction.Transfer)
            {//工作流转交

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
        private void UpdateWorkTask(work_task wTask, string strStatus)
        {
            DbContext dbContext = wfContext;
            wTask.ModifyDate = DateTime.Now;
            wTask.ModifyUserID = SysContext.WanJiangUserID;
            wTask.Status = strStatus;
            //wTask. = DateTime.Now;
            dbContext.Update(wTask, wTask.ID, new string[4]
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
            core_workflowProject wfProject = dbContext.FirstOrDefault<core_workflowProject>("where Context = @0", new object[1]
            {
                context.Context
            });
            bool flag = wfProject == null;
            if (wfProject != null && wfProject.Status == WFRecordStatus.Completed)
            {
                throw new UserException("该工作流程已经完成！");
            }
            if (wfProject != null && wfProject.Status == WFRecordStatus.Rejected)
            {
                throw new UserException("该工作流程已经驳回！");
            }
            if (!flag)
            {
                if (string.IsNullOrEmpty(context.TaskID) && wfProject != null)
                {
                    context.TaskID = dbContext.ExecuteScalar<string>("select ID from core_workflowTask where Status = @0 and ProjectID = @1", new object[2]
                    {
                        WFRecordStatus.Running,
                        wfProject.ID
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
            core_workflow mainWorkflow = null;
            mainWorkflow = ((wfProject == null) ? dbContext.FirstOrDefault<core_workflow>("where ModelName = @0", new object[1]
            {
                model
            }) : dbContext.FirstOrDefault<core_workflow>("where ID = @0", new object[1]
            {
                wfProject.WorkflowID
            }));
            if (mainWorkflow == null)
            {
                throw new UserException("工作流程未定义！");
            }
            if (string.IsNullOrEmpty(mainWorkflow.ViewData))
            {
                throw new UserException("工作流程未定义！");
            }
            wfModelType = DataAccessHelper.GetEntityType(context.Model);
            wfModelObj = dbContext.GetHelper(wfModelType).FirstOrDefault("where ID = @0", context.Context);
            ViewModel viewModel = JsonHelper.DeserializeJsonToObject<ViewModel>(mainWorkflow.ViewData);
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
                ViewNode vnReturnNode = null;
                if (currentTask != null && !string.IsNullOrEmpty(currentTask.FromReturnTaskID))
                {
                    FastDev.DevDB.Model.core_workflowTask fromTask = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_workflowTask>("where ID = @0", new object[1]
                    {
                        currentTask.FromReturnTaskID
                    });
                    ViewNode vnCurrentTaskNode = viewModel.nodes.FirstOrDefault((ViewNode a) => a.id == fromTask.NodeID);
                    if (vnCurrentTaskNode.nodeType == WorkflowNodeType.Active)
                    {
                        ActiveNode activeNode2 = GetViewNodeProperties<ActiveNode>(vnCurrentTaskNode);
                        if (activeNode2.backIsReturn == 1)
                        {
                            vnReturnNode = vnCurrentTaskNode;
                        }
                    }
                }
                object list3;
                if (vnReturnNode != null)
                {
                    List<ViewNode> list2 = new List<ViewNode>();
                    list2.Add(vnReturnNode);
                    list3 = list2;
                }
                else
                {
                    list3 = CombinNodesBySource(viewNode, viewModel);
                }
                IList<ViewNode> list4 = (IList<ViewNode>)list3;//list4是全部的节点了
                if (list4 == null || !list4.Any())
                {
                    throw new UserException("流程异常，请联系相关管理员！");
                }
                if (list4.Any(l => l.nodeType == WorkflowNodeType.End))
                {
                    Dictionary<string, object> item = FillEndNodeUsers(list4.FirstOrDefault(f => f.nodeType == WorkflowNodeType.End), wfProject);
                    dictionary["nodes"] = new List<object>
                    {
                        item
                    };
                    return dictionary;
                }
                List<object> list5 = new List<object>();
                foreach (ViewNode item2 in list4)
                {
                    ViewNode viewNode4 = item2;// JsonHelper.DeserializeJsonToObject<ViewNode>(JsonHelper.SerializeObject(item2));
                    while (viewNode4.nodeType == WorkflowNodeType.Branch)
                    {
                        viewNode4 = GetBranchNode(context, viewModel, viewNode4);
                    }
                    if (viewNode4.nodeType == WorkflowNodeType.Active || viewNode4.nodeType == WorkflowNodeType.End)
                    {
                        Dictionary<string, object> item = FillEndNodeUsers(viewNode4, wfProject);
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
                    List<core_workflowTask> list7 = dbContext.Fetch<core_workflowTask>("where ProejctID = @0", new object[1]
                    {
                        wfProject.ID
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
                        Dictionary<string, object> item = FillEndNodeUsers(item3, wfProject);
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
            List<core_workflowTrackDetail> list = wfContext.Fetch<core_workflowTrackDetail>("where TrackID = @0 order by CreateDate asc", new object[1]
            {
                core_workflowTrack_0.ID
            });
            foreach (core_workflowTrackDetail item in list)
            {
                core_workflowExecutorStatus core_workflowExecutorStatus = wfContext.FirstOrDefault<core_workflowExecutorStatus>("where ID = @0", new object[1]
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
                var sanUser = fwContext.FirstOrDefault<SanHuWorkflowService.user>("where ID = @0", new object[1]
                {
                    core_workflowExecutorStatus.ExecutorID
                });
                if (sanUser != null)
                {
                    var cu = new { RealName = sanUser.Name, LoginName = sanUser.AccountId, MyPic = sanUser.Avatar, ID = sanUser.Id };
                    dictionary["user"] = cu;
                }
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

        private FilterGroup GetUserFilterByWorkflowProject(ViewNode wfNode, core_workflowProject wfProject)
        {
            List<string> list = new List<string>();
            List<string> list2 = new List<string>();
            new List<string>();
            List<string> list3 = new List<string>();
            if (wfNode.nodeType == WorkflowNodeType.Start)
            {
                list.Add(wfProject.SponsorID);
            }
            else
            {
                if (wfNode.nodeType == WorkflowNodeType.End)
                {
                    return null;
                }
                ActiveNode activeNode = GetViewNodeProperties<ActiveNode>(wfNode);
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
                    field = "ID in (select UserID from organizationuser where OrganizationId = {0})",
                    type = "sql",
                    value = item5
                });
            }
            foreach (string item6 in list3)
            {
                filterGroup.rules.Add(new FilterRule
                {
                    field = "ID in (select UserID from roleuser where RoleId = {0})",
                    type = "sql",
                    value = item6
                });
            }
            filterGroup.op = "or";
            return filterGroup;
        }
        private List<List<string>> FindWorkflowExecutors(ViewNode wfNode, core_workflowProject wfProject)
        {
            if (wfNode.nodeType == WorkflowNodeType.End)
            {
                return new List<List<string>>();
            }
            FilterTranslator filterTranslator = new FilterTranslator();
            filterTranslator.Group = GetUserFilterByWorkflowProject(wfNode, wfProject);
            filterTranslator.Translate();
            string commandText = filterTranslator.CommandText;
            string sql = "select ID,Name from user where ";
            sql = (string.IsNullOrEmpty(commandText) ? (sql + "1=1") : (sql + commandText));
            List<List<string>> list = new List<List<string>>();
            List<SanHuWorkflowService.user> list2 = fwContext.Fetch<SanHuWorkflowService.user>(sql, filterTranslator.Parms.ToArray());
            if (list2 != null)
            {
                foreach (SanHuWorkflowService.user item in list2)
                {
                    list.Add(new List<string>
                    {
                        item.Id,
                        item.Name
                    });
                }
            }
            return list;
        }

        private void FillWorkflowUser(Dictionary<string, object> dicNodes, ViewNode viewNode_0, core_workflowProject workflowProjectItem)
        {
            new List<string>();
            List<string> lstDepartments = new List<string>();
            List<string> lstCompanys = new List<string>();
            new List<string>();
            List<List<string>> lstUsers = FindWorkflowExecutors(viewNode_0, workflowProjectItem);
            if (lstUsers.Any())
            {
                FilterTranslator filterTranslator = new FilterTranslator();
                filterTranslator.Group = new FilterGroup();
                filterTranslator.Group.op = "or";
                foreach (List<string> item in lstUsers)
                {
                    filterTranslator.Group.rules.Add(new FilterRule
                    {
                        field = "ID in (select OrganizationId from organizationuser where UserID = {0})",
                        type = "sql",
                        value = item[0]
                    });
                }
                string depSql = "select ID from organization where ";
                string commandText = filterTranslator.CommandText;
                depSql = (string.IsNullOrEmpty(commandText) ? (depSql + "1=1") : (depSql + commandText));
                List<IdItem> lstDepartmentIds = fwContext.Fetch<IdItem>(depSql, filterTranslator.Parms.ToArray());
                lstDepartments = ((lstDepartmentIds == null) ? new List<string>() : lstDepartmentIds.Select(f => f.ID).ToList());
                if (lstDepartments.Any())
                {
                    string comSql = "select ID from organization where ParentID=0";
                    List<IdItem> lstCompanyIds = fwContext.Fetch<IdItem>(comSql, filterTranslator.Parms.ToArray());
                    if (lstCompanyIds != null)
                    {
                        lstCompanyIds.Select(f => f.ID).ToList();
                    }
                    lstCompanys = ((lstCompanyIds == null) ? new List<string>() : lstCompanyIds.Select(d => d.ID).ToList());
                }
            }
            dicNodes["userFilter"] = GetUserFilterByWorkflowProject(viewNode_0, workflowProjectItem);
            dicNodes["users"] = lstUsers;
            dicNodes["departments"] = lstDepartments;
            dicNodes["companys"] = lstCompanys;
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


        private string GetJsTemplateResult(string strTemplate, string strData)
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
        /// 创建下一个任务
        /// </summary>
        /// <returns></returns>
        private work_task CreateNewWorkTask(string workflowTaskId, string exeUserId, string formName, string localLink, string objName, string recordId, string strTitle, string evId)
        {
            work_task wTask = new work_task();
            wTask.TaskType = formName;
            wTask.CreateDate = DateTime.Now;
            wTask.CreateUserID = SysContext.WanJiangUserID;
            wTask.ModifyDate = DateTime.Now;
            wTask.ModifyUserID = SysContext.WanJiangUserID;
            wTask.ID = Guid.NewGuid().ToString();
            wTask.WorkflowtaskID = workflowTaskId;
            wTask.AssignUsersID = exeUserId;
            wTask.MainHandler = fwContext.ExecuteScalar<string>("select Name from user where Id=@0", new object[] { exeUserId });
            wTask.EventInfoId = evId == null ? "" : evId;//事件Id
            wTask.ExpectedCompletionTime = DateTime.Now.AddHours(2);
            wTask.InitiationTime = DateTime.Now;
            wTask.Status = WFRecordStatus.Running;
            wTask.TaskContent = strTitle;
            wTask.RefTable = objName;
            wTask.RefTable = TAB_NAME_CORE_WORKFLOWEXECUTORSTATUS;
            wTask.RefRecordID = recordId;
            //wTask.
            wTask.LocalLinks = localLink;
            wTask.WorkAddress = "";
            wTask.TaskStatus = 0;
            wTask.IsRootTask = 0;//自动创建的任务都不是根任务
            return wTask;
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
            core_workflowTrackDetail wfTrackDetail = dbContext.FirstOrDefault<core_workflowTrackDetail>("where TrackId = @0 and ExecutorStatusID = @1", new object[2]
            {
                strTrackId,
                strStatusId
            });
            if (wfTrackDetail == null)
            {
                return null;
            }
            wfTrackDetail.ModifyDate = DateTime.Now;
            wfTrackDetail.ModifyUserID = SysContext.WanJiangUserID;
            wfTrackDetail.FromExecutorStatusID = statusId;
            dbContext.Update(wfTrackDetail, wfTrackDetail.ID, new string[3]
            {
                "ModifyDate",
                "ModifyUserID",
                "FromExecutorStatusID"
            });
            return wfTrackDetail.ID;
        }

        private string UpdateTrackDetailIsToNext(string strTrackId, string strStatusID, bool IsToNextTask)
        {
            DbContext dbContext = wfContext;
            core_workflowTrackDetail wfTrackDetail = dbContext.FirstOrDefault<core_workflowTrackDetail>("where TrackId = @0 and ExecutorStatusID = @1", new object[2]
            {
                strTrackId,
                strStatusID
            });
            if (wfTrackDetail == null)
            {
                return null;
            }
            wfTrackDetail.ModifyDate = DateTime.Now;
            wfTrackDetail.ModifyUserID = SysContext.WanJiangUserID;
            wfTrackDetail.IsToNextTask = (byte)(IsToNextTask ? 1 : 0);
            dbContext.Update(wfTrackDetail, wfTrackDetail.ID, new string[3]
            {
                "ModifyDate",
                "ModifyUserID",
                "IsToNextTask"
            });
            return wfTrackDetail.ID;
        }

        private core_workflowTrackDetail CreateNewTrackDetail(string trackId, string strStatusID)
        {
            core_workflowTrackDetail wfTrackDetail = new core_workflowTrackDetail();
            wfTrackDetail.CreateDate = DateTime.Now;
            wfTrackDetail.CreateUserID = SysContext.WanJiangUserID;
            wfTrackDetail.ModifyDate = DateTime.Now;
            wfTrackDetail.ModifyUserID = SysContext.WanJiangUserID;
            wfTrackDetail.ID = Guid.NewGuid().ToString();
            wfTrackDetail.TrackID = trackId;
            wfTrackDetail.ExecutorStatusID = strStatusID;
            return wfTrackDetail;
        }



    }
}
