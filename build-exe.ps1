$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$distDir = Join-Path $projectRoot "dist"
$buildDir = Join-Path $projectRoot "build"
$cscPath = "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe"

if (-not (Test-Path $cscPath)) {
    throw "C# compiler not found: $cscPath"
}

New-Item -ItemType Directory -Path $distDir -Force | Out-Null
New-Item -ItemType Directory -Path $buildDir -Force | Out-Null

$launcherSource = Join-Path $projectRoot "launcher\AppLauncher.cs"
$outputExe = Join-Path $distDir "XiaoHuaTangGuoWu.exe"
$resourceIndex = Join-Path $projectRoot "index.html"
$resourceStyles = Join-Path $projectRoot "styles.css"
$resourceScript = Join-Path $projectRoot "script.js"

$cscArgs = @(
    "/nologo"
    "/target:winexe"
    "/out:$outputExe"
    "/r:System.Windows.Forms.dll"
    "/resource:$resourceIndex,AppAssets.index.html"
    "/resource:$resourceStyles,AppAssets.styles.css"
    "/resource:$resourceScript,AppAssets.script.js"
    $launcherSource
)

& $cscPath @cscArgs

if ($LASTEXITCODE -ne 0) {
    throw "EXE build failed."
}

Write-Host "Built:" $outputExe
