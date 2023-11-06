#!/usr/bin/env bash


# search notes that contain word/pattern
# Arguments:
#    $1 - word/pattern grep
#    $2 - tag(option)


projectdir=$(dirname $0)


. $projectdir/echo_header.bash
. $projectdir/editors.bash


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
                grep -e $1 -rwn $projectdir/content/$2 \
                | awk -F ":" '{print "file://"$1, "|"$2, "|"$3}' \
                | column -t -s "|" --output-separator " | " \
                --table-columns FILE,LINE,CONTENT \
                --table-right LINE \
                | sort -u -t '|' -k1,1
                exit
            fi
        done

        echo "\"$2\" tag not exist"
        echo_header "Write one of this:"
        echo "$tags" | sort | pr -ts" " --columns 3 | column -t
        exit
    fi

    local result=$(
        grep -I -e $1 -rwn $projectdir/content/**/* \
        | awk -F ":" '{print "file://"$1, "|"$2, "|"$3}' \
        | column -t -s "|" --output-separator " | " \
        --table-columns FILE,LINE,CONTENT \
        --table-right LINE \
        | sort -u -t '|' -k1,1
    )

    echo "$result"
    [[ -n "$result" ]] && use_editor
}


search_note $1 $2
