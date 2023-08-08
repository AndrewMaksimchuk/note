#!/usr/bin/env bash


# Create new note/save web page
# Arguments:
#    $1 - name of tag
# 
# If $1 argument is empty - show menu
# If $1 is not exist tag - show menu


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

    wget --directory-prefix=$target_file \
    --adjust-extension \
    "$url"
    exit
}


function from_tag
{
    local dir=$(echo "$cwd/content/$1")
    local list=$(ls $dir)
    if [[ -n $list ]]; then
        local file_max_name=$(echo "$list" | sort -n | tail -1)
        local max=$(basename -s .md $file_max_name)
        local new_filename=$(($max + 1))
        local to_new_file=$(echo "$dir/$new_filename.md")
        vi $to_new_file
    else
        local to_new_file=$(echo "$dir/1.md")
        vi $to_new_file
    fi
    
    if [[ -e $to_new_file ]]; then
        echo "New note added"
        echo "$to_new_file"
    fi
}


if [[ -n $1 ]]; then
    if [[ $1 = $page ]]; then
        from_web_page
    fi

    target_directory_tag=$(echo "$cwd/content/$1")
    if [[ -d $target_directory_tag ]]; then
        from_tag "$1"
        exit
    else
        echo "Tag not found, select from list"
    fi
fi


select tag in $quite $page $tags
do
    if [[ $tag = $quite ]]; then
        exit
    fi

    if [[ $tag = $page ]]; then
        from_web_page
    fi

    if [[ -n $tag ]]; then
        from_tag "$tag"
    fi
done
