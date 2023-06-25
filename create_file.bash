#!/bin/bash

cwd=$(dirname $0)
quite="exit"
tags=$(cat $cwd/tags)


PS3="Select tag: "


select tag in $quite $tags
do
    if [[ $tag = $quite ]]; then
        exit
    fi

    if [[ -n $tag ]]; then
        dir=$(echo content/$tag)
        list=$(ls $dir)
        if [[ -n $list ]]; then
            file_max_name=$(echo "$list" | sort -n | tail -1)
            max=$(basename -s .md $file_max_name)
            new_filename=$(($max + 1))
            to_new_file=$(echo "$dir/$new_filename.md")
            vi $to_new_file
        else
            to_new_file=$(echo "$dir/1.md")
            vi $to_new_file
        fi
    fi
done
