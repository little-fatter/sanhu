tasklist |find /i "FastDev.RunWeb.exe"
if %errorlevel%==0 (goto kill) else (goto end)
:kill
TASKKILL /F /IM FastDev.RunWeb.exe /T
:end
