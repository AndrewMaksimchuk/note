#!/usr/bin/env bash

project_dir=$(dirname $0)
history_file="$project_dir/.history"

function is_empty
{
    if [[ ! -f $history_file ]]; then
        touch $history_file
        echo "History empty"
        exit
    fi
}

function history
{
    is_empty
    cat $history_file | awk 'BEGIN { FS=" /" }; { printf "%-80s file:///%s\n", $1, $2 }' | nl
}

history
