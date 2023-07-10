#!/usr/bin/env bash


# Without argument this script show menu 
# to select tag
# 
# With argument(tag name) - show random note 
# from tag
# $1 - tag name(option)
# $2 - number of notes to show(option)


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


function shownote() {
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


if [ $# -ge 1 ]; then
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
