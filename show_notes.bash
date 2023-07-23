#!/bin/bash

# Show all notes selected by tag
# Arguments:
#    $1 - tag name, if not exist - show menu

projectdir=$(dirname $0)

function hr {
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
}

quite="exit"
tags=$(cat $projectdir/tags)
PS3="Select tag notes: "

function read_all
{
    dir=$(echo $projectdir/content/$1)
    
    if [[ ! -d $dir ]]; then
        echo "This '$1' tag not exist"
        exit
    fi
    
    files=$(echo $dir/*.md | sort)
    for file in $files; do
        hr
        echo $(basename $file)
        cat $file
    done
    exit
}

if [ $# -eq 1 ]; then
    read_all $1
fi

select tag in $quite $tags; do
    if [[ $tag = $quite ]]; then
        exit
    fi

    if [[ -n $tag ]]; then
        read_all $tag
    fi
done
