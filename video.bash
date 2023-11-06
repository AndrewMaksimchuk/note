#!/usr/bin/env bash

# Save video from: youtube
# Arguments:
#    $1 - url
#    $2 - name(option)

project_dir=$(dirname $0)
video_dir="$project_dir/content/_video"

if [[ ! -d $video_dir ]]; then
    mkdir -p $video_dir
fi

if [[ -z $1 ]]; then
    echo "Add url on video"
    exit
fi

node $project_dir/save_video.mjs $1 $2
