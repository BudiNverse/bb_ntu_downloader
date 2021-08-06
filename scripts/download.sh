#!/bin/bash
echo Input URL:
read url
echo "Output filename (with extension):"
read output
ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i $url -c copy $output
