$url = Read-Host 'Input URL'
$filename = Read-Host 'Input Filename'
$command = 'ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i "${url}" -c copy $filename'
Write-Output $command
iex $command
