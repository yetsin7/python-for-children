$ErrorActionPreference = "Stop"
$port = 8765
$url = "http://127.0.0.1:$port/"
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)

try {
    $listener.Start()
    $listener.Stop()
}
catch {
    Write-Error "El puerto $port ya está ocupado. Cierra otro servidor o prueba la guía readme.md."
    exit 1
}

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Error "No encontré Python. Instálalo desde python.org o consulta readme.md."
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
            throw "El servidor local no respondió en $url"
        }
    }
}
Start-Process $url
Write-Host "Club Python está abierto."
Write-Host "Para cerrar el servidor, ejecuta: Stop-Process -Id $($server.Id)"
