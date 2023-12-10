#!/bin/bash

# Show all notes selected by tag
# Arguments:
#    $1 - tag name, if not exist - show menu
#    $2 - option flag(--oneline)

projectdir=$(dirname $0)

function hr {
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
}

quite="exit"
tags=$(cat $projectdir/tags)
PS3="Select tag notes: "

function default
{
    for file in $1; do
        hr
        echo $(basename $file)
        cat $file
    done
}

function oneline_print
{
    for file in $1; do
        printf '%7.7s  %s\n' $(basename $file) "$(head -n1 $file)"
    done
}

function oneline
{
    if [[ "$1" = "--oneline" ]]; then
        oneline_print "$2" | sort -h
        exit
    fi
}

function read_all
{
    dir=$(echo $projectdir/content/$1)
    
    if [[ ! -d $dir ]]; then
        echo "This '$1' tag not exist"
        exit
    fi
    
    files=$(echo $dir/*.md | sort)
    oneline $2 "$files" 
    default "$files"
    exit
}

if [ $# -ge 1 ]; then
    read_all $1 $2
fi

select tag in $quite $tags; do
    if [[ $tag = $quite ]]; then
        exit
    fi

    if [[ -n $tag ]]; then
        read_all $tag
    fi
done
