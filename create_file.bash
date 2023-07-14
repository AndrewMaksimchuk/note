#!/usr/bin/env bash


cwd=$(dirname $0)
quite="exit"
page="page"
tags=$(cat $cwd/tags)
PS3="Select tag: "


function from_web_page
{
    echo "Write url and associated name(not required)"
    read url name

    local is_url=$(echo "$url" | grep "^http")
    if [[ -z $is_url ]]; then
        echo "Write valid url that start on http or https"
        exit
    fi

    local target_directory="$cwd/content/_pages"
    local target_file="$target_directory"

    if [[ -n $name ]]; then
        local target_file="$target_directory/$name"
    fi

    wget --directory-prefix=$target_file "$url"
    exit
}


# if [[ -n $1 ]]; then
#     echo "$1"
#     exit
# fi


select tag in $quite $page $tags
do
    if [[ $tag = $quite ]]; then
        exit
    fi

    if [[ $tag = $page ]]; then
        from_web_page
    fi

    if [[ -n $tag ]]; then
        dir=$(echo $cwd/content/$tag)
        list=$(ls $dir)
        if [[ -n $list ]]; then
            file_max_name=$(echo "$list" | sort -n | tail -1)
            max=$(basename -s .md $file_max_name)
            new_filename=$(($max + 1))
            to_new_file=$(echo "$dir/$new_filename.md")
            vi $to_new_file
        else
            to_new_file=$(echo "$dir/1.md")
            vi $to_new_file
        fi
    fi
done
