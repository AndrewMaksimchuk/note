#!/bin/bash


projectdir=$(dirname $0)


hr() {
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
}


quite="exit"
tags=$(cat $projectdir/tags)


PS3="Select tag notes: "


select tag in $quite $tags
do
    if [[ $tag = $quite ]]; then
        exit
    fi

    if [[ -n $tag ]]; then
        dir=$(echo $projectdir/content/$tag)
        files=$(echo $dir/*.md | sort)
        for file in $files; do
            hr
            echo $(basename $file)
            cat $file
        done
        exit
    fi
done
