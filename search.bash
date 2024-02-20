#!/usr/bin/env bash


# search notes that contain word/pattern
# Arguments:
#    $1 - word/pattern grep
#    $2 - tag(option)
# 
# If $1 is "open" then open file from result 
# table, saved in ".search_history" file
# where $2 is number of file from COUNT column

projectdir=$(dirname $0)


. $projectdir/echo_header.bash
. $projectdir/editors.bash

SCREEN_WIDTH=`tput cols`
HISTORY_FILE="$projectdir/.search_history"

function open_file
{
    if [[ $1 = "open" ]]; then
        if [[ -n $2 ]]; then
            local file_path=$(tail -n+2 $HISTORY_FILE | grep -w -e "^ *$2" | cut -f2 -d'|' | sed 's/file:\/\///g')
            vi $file_path
            exit
        fi
    fi
}

function use_search
{
    echo "For open file from search use next command:"
    echo "note search open number_of_file_COUNT_column"
}

function save
{
    cat $1 > "$HISTORY_FILE"
}

function output
{
    if [[ -z $1 ]]; then
        echo "Nothing found"
        exit
    fi
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
    local TABLE_COUNTER=$(mktemp)
    echo "$1" | nl  -v1 -w3 -s". " | cut -f1 -d. > $TABLE_COUNTER
    echo "$1"  | tr -s '[:blank:]' > $TABLE_LEFT_FILE
    res=$(paste -d "|" $TABLE_COUNTER $TABLE_LEFT_FILE)
    echo "$res" > $TABLE_LEFT_FILE
    echo -e "$first_lines" > $TABLE_RIGHT_FILE

    paste -d "" $TABLE_LEFT_FILE $TABLE_RIGHT_FILE \
    | column -t -s "|" --output-separator " | " \
    -T 4 -c $SCREEN_WIDTH \
    --table-columns COUNT,FILE,LINE,CONTENT,HEADER \
    --table-right LINE --table-right COUNT \
    > $TABLE_RESULT_FILE

    cat $TABLE_RESULT_FILE
    save $TABLE_RESULT_FILE
    use_editor
    use_search
}

function format_left_table
{
    if [[ -z $1 ]]; then
        exit
    fi
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
        files_list=$(grep --exclude-dir=_* -I -e $1 -rwn $projectdir/content/**/*)
        format_left_table "$files_list"
    )
    output "$result"
}

open_file $1 $2
search_note $1 $2
