#!/usr/bin/env bash

# show notes, step by step on selected tag

project_dir=$(dirname $0)
quite="exit"
tags=$(cat $project_dir/tags)
PS3="Select tag: "
SCREEN_WIDTH=$(tput cols)

. $project_dir/colors.bash
. $project_dir/interactive.bash

function close_app
{
    kill %1 2>/dev/null
    exit
}

function pomodoro
{
    kill %1 2>/dev/null
    sleep 25m && notify-send "Take a break" "Relax and drink a cup of tea" &
}

function hr
{
    printf '%*s\n' "${1}" '' | tr ' ' -
}

function not_continue
{
    echo
    echo -n "Continue? [y/n] "
    read answer
    if [[ $answer = "n" ]]; then
        close_app
    fi
}

function show_note 
{
    current_number=$(echo "$1" | rev | cut -d'/' -f1 | rev | cut -d'.' -f1)
    local counter="[ $current_number/$total_number_of_notes ]"
    local counter_size=${#counter} 
    local note_header_text="[ NOTE ]"
    local note_header_size=${#note_header_text}
    local note_header="${black}${bg_green}\e[1m$note_header_text${reset}"
    local note_path_size=${#1}

    local line_size=$(echo "$SCREEN_WIDTH-$note_header_size-$counter_size-$note_path_size-3" | bc)
    local line=$(hr $line_size)
    clear
    echo -e "$note_header $counter $1 $line"
    echo
    cat $1 | $project_dir/render_markdown.bash
}

function main
{
    pomodoro
    clear
    select tag in $quite $tags
    do
        if [[ $tag = $quite ]]; then
            close_app
        fi

        if [[ -n $tag ]]; then
            local tag_path=$project_dir/content/$tag
            local list_of_notes=$(ls -1 $tag_path | sort -n)
            total_number_of_notes=$(echo "$list_of_notes" | wc -l)
            for note in $list_of_notes
            do
                show_note "$tag_path/$note"

                if [[ $current_number -eq $total_number_of_notes ]]; then
                    not_continue
                    main
                fi

                not_continue
            done
        fi
    done
}

main
