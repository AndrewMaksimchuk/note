#!/usr/bin/env bash


# search notes that contain word/pattern
# Arguments:
#    $1 - word/pattern grep
#    $2 - tag(option)


projectdir=$(dirname $0)


. $projectdir/echo_header.bash
. $projectdir/editors.bash

SCREEN_WIDTH=`tput cols`

function output
{
    local files=$(echo "$1" | cut -f1 -d '|' | tail -n+1 | sed 's/file:\/\///g')
    local lines=""
    
    for file in $files
    do
        lines="${lines}\n$(head -n1 $file | cut -c -50)"
    done

    local first_lines=$(echo -e "$lines" | tail -n+2)
    local TABLE_LEFT_FILE=$(mktemp)
    local TABLE_RIGHT_FILE=$(mktemp)
    local TABLE_RESULT_FILE=$(mktemp)
    echo "$1" > $TABLE_LEFT_FILE
    echo -e "$first_lines" > $TABLE_RIGHT_FILE

    paste -d "" $TABLE_LEFT_FILE $TABLE_RIGHT_FILE \
    | column -t -s "|" --output-separator " | " \
    -T 3 -c $SCREEN_WIDTH \
    --table-columns FILE,LINE,CONTENT,HEADER \
    --table-right LINE \
    > $TABLE_RESULT_FILE

    cat $TABLE_RESULT_FILE
    [[ -n "$1" ]] && use_editor
}

function format_left_table
{
    echo "$1" | awk -F ":" '{print "file://"$1, "|"$2, "|"$3" |"}' \
    | sort -u -t '|' -k1,1
}

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
                local result=$(
                    local files_list=$(grep -I -e $1 -rwn $projectdir/content/$2)
                    format_left_table "$files_list"
                )
                output "$result"
                exit
            fi
        done

        echo "\"$2\" tag not exist"
        echo_header "Write one of this:"
        echo "$tags" | sort | pr -ts" " --columns 3 | column -t
        exit
    fi

    local result=$(
        local files_list=$(grep -I -e $1 -rwn $projectdir/content/**/*)
        format_left_table "$files_list"
    )

    output "$result"
}


search_note $1 $2
