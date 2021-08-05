#!/bin/bash
echo Input URL:
read url

ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i $url -c copy video.mp4