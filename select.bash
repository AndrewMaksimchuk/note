#!/usr/bin/env bash


# Without argument this script show menu 
# to select tag
# 
# With argument(tag name) - show random note 
# from tag
# Arguments:
#    $1 - tag name or "page"(option)
#    $2 - number of notes to show(option)
# 
# If $1 is "page" word - we open random web page
# If $1 is a valid tag - show note from this tag


cwd=$(dirname $0)
tags=$(cat $cwd/tags)
quite="exit"
PS3="Select tag: "


. $cwd/colors.bash


function get_note
{
    local randomfile=$(printf "%s\n" "${files[RANDOM % ${#files[@]}]}")
    echo
    echo -e "${yellow}Note: $randomfile ${reset}"
    cat $randomfile | fold -w 80 -s
}


function shownote
{
    dir=$(echo $cwd/content/$1)
    isEmpty=$(ls -A $dir)
    if [[ -z $isEmpty ]]; then
        echo "You don\`t have note in selected tag"
        exit
    fi
    files=($dir/*)

    if [[ -n $2 ]]; then
        local re='^[0-9]+$'
        
        if ! [[ $2 =~ $re ]]; then
            echo "Enter the number"
            exit
        fi

        for ((i=1; i<=$2; i++))
        do
            get_note
        done
        exit
    fi

    get_note
    exit
}


function get_page
{
    local randomfile=$(printf "%s\n" "${files[RANDOM % ${#files[@]}]}")
    echo -e "${yellow}Page: $randomfile ${reset}"
    xdg-open $randomfile
}


function show_page
{
    local dir=$(echo $cwd/content/_pages)
    local isEmpty=$(ls -A $dir)
    if [[ -z $isEmpty ]]; then
        echo "You don\`t have saved web pages"
        exit
    fi
    local files=($dir/**/*.html)
    get_page
    exit
}


if [ $# -ge 1 ]; then
    if [[ $1 = "page" ]]; then
        show_page
    fi

    shownote $1 $2
fi


select tag in $quite $tags
do
    if [[ $tag = $quite ]]; then
        exit
    fi

    if [[ -n $tag ]]; then
        shownote $tag
    fi
done
