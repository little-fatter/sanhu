@echo off
echo ASPNETCORE_ENVIRONMENT=Development
set ASPNETCORE_ENVIRONMENT=Development
set ASPNETCORE_URLS=http://*:5000
dotnet bin/Debug/netcoreapp3.1/FastDev.RunWeb.dll