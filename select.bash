#!/usr/bin/env bash


# Without argument this script show menu 
# to select tag
# 
# With argument(tag name) - show random note 
# from tag


cwd=$(dirname $0)
tags=$(cat $cwd/tags)
quite="exit"
PS3="Select tag: "


. $cwd/colors.bash


function shownote() {
    dir=$(echo $cwd/content/$1)
    isEmpty=$(ls -A $dir)
    if [[ -z $isEmpty ]]; then
        echo "You don\`t have note in selected tag"
        exit
    fi
    files=($dir/*)
    randomfile=$(printf "%s\n" "${files[RANDOM % ${#files[@]}]}")
    echo
    echo -e "${yellow}Note: $randomfile ${reset}"
    cat $randomfile | fold -w 80 -s
    exit
}


if [ $# -eq 1 ]; then
    shownote $1    
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
