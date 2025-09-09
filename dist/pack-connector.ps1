# this script builds a specific project you have to provide the path to the .csproj and the version
#

param($project, $version, $suffix, $env = 'release', [switch]$push = $false)

if (-not(Test-Path -Path $project -PathType Leaf))
{
    Write-Host "Cannot find $project"
    return 
}
 
# else 
Write-Host "Building $project"

$projectFile = Get-item $project
$projectName = $projectFile.BaseName


$versionString = $version
if (![string]::IsNullOrWhiteSpace($suffix)) 
{
    $versionString = -join($version, '-', $suffix)
}

Write-Host "Version: $versionString"

$outfolder = ".\$projectName\$version\$versionString"
$buildParams = "ContinuousIntegrationBuild=true,version=$versionString"

dotnet pack $project -c $env -o $outfolder -v q /p:$buildParams

">> To Local Git"
XCOPY "$outFolder\*.nupkg" "c:\source\localgit" /q /y 

if ($push) {
    "Push"; ""
    .\nuget.exe push "$outFolder\*.nupkg" -ApiKey AzureDevOps -src https://pkgs.dev.azure.com/jumoo/Public/_packaging/nightly/nuget/v3/index.json
}

Remove-Item ".\$projectName-*.version" 
Out-File -FilePath ".\$projectName-$versionString.version" -InputObject $versionString


"" ; "Done"
"---------------"
"$projectName [$versionString]"
"---------------"


