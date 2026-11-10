$ErrorActionPreference = "Stop"
$port = 8765
$url = "http://127.0.0.1:$port/"
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)

try {
    $listener.Start()
    $listener.Stop()
}
catch {
    Write-Error "Port $port is already in use. Close the other server or review readme.md."
    exit 1
}

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Error "Python was not found. Install it from python.org or review readme.md."
    exit 1
}

$server = Start-Process -FilePath "python" -ArgumentList @("-m", "http.server", "$port", "--bind", "127.0.0.1") -WorkingDirectory $PSScriptRoot -PassThru
for ($attempt = 0; $attempt -lt 20; $attempt++) {
    Start-Sleep -Milliseconds 250
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 1
        if ($response.StatusCode -eq 200) { break }
    }
    catch {
        if ($attempt -eq 19) {
            Stop-Process -Id $server.Id
            throw "The local server did not respond at $url"
        }
    }
}
Start-Process $url
Write-Host "Python Club is open."
Write-Host "To stop the server, run: Stop-Process -Id $($server.Id)"
