#!/usr/bin/env bash


# search notes that contain word/pattern
# Arguments:
#    $1 - word/pattern grep
#    $2 - tag(option)


projectdir=$(dirname $0)


. $projectdir/echo_header.bash


function search_note
{
    if [[ -z $1 ]]; then
        echo "Missing first argument, put word/pattern as first argument"
        exit
    fi

    if [[ -n $2 ]]; then
        tags=$(cat $projectdir/tags)
        for tag in $tags
        do
            if [[ $tag = $2 ]]; then
                grep $1 -r $projectdir/content/$2/ | column -t -s: -W 2
                exit
            fi
        done

        echo "\"$2\" tag not exist"
        echo_header "Write one of this:"
        echo "$tags" | sort | pr -ts" " --columns 3 | column -t
        exit
    fi

    grep $1 -r $projectdir/content/ | column -t -s: -W 2
}


search_note $1 $2
