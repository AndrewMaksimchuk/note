#!/usr/bin/env bash


cwd=$(dirname $0)
tags=$(cat $cwd/tags)
quite="exit"
PS3="Select tag: "


. $cwd/colors.bash


select tag in $quite $tags
do
    if [[ $tag = $quite ]]; then
        exit
    fi

    if [[ -n $tag ]]; then
        dir=$(echo $cwd/content/$tag)
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
    fi
done
