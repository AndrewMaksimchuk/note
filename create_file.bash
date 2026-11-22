#!/usr/bin/env bash


# Create new note/save web page
# Arguments:
#    $1 - name of tag
#    $2 - option flag(-r) 
# 
# If $1 argument is empty - show menu
# If $1 is not exist tag - show menu
# If $2 is "-r" - repeat this command


cwd=$(dirname $0)
quite="exit"
page="page"
tags=$(cat $cwd/tags)
PS3="Select tag: "

function save_to_history
{
    local first_line=$(head -n1 $1)
    local history_file="$cwd/.history"
    echo "$first_line $1" >> $history_file
}

function editor_open
{
    vim -S $cwd/.create-nvimrc +start $1
}

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


# $1 - tag name
# $2 - optional, note content
function from_tag
{
    local dir=$(echo "$cwd/content/$1")
    local list=$(ls $dir)
    if [[ -n $list ]]; then
        local file_max_name=$(echo "$list" | sort -n | tail -1)
        local max=$(basename -s .md $file_max_name)
        local new_filename=$(($max + 1))
        local to_new_file=$(echo "$dir/$new_filename.md")
    else
        local to_new_file=$(echo "$dir/1.md")
    fi

    if [[ -n "$2" ]]; then
        printf '%s' "$2" > "$to_new_file"
    else
        editor_open $to_new_file
    fi
    
    if [[ -e $to_new_file ]]; then
        echo "New note added"
        echo "$to_new_file"
        save_to_history "$to_new_file"
    fi
}


# Main entry point
if [[ -n $1 ]]; then
    if [[ $1 = $page ]]; then
        from_web_page
    fi

    target_directory_tag=$(echo "$cwd/content/$1")
    if [[ -d $target_directory_tag ]]; then

        # Create new note from terminal but with provided 
        # tag name as $1 and note content as $2 variable
        # This is why it exit after
        if [[ -n "$2" && "$2" != '-r' ]]; then
            from_tag "$1" "$2"
            exit 0
        fi

        from_tag "$1"
        if [[ $2 = '-r' ]]; then
            echo "Continue? [y/n]"
            read answer
            if [[ $answer = "y" ]]; then
                note create $1 -r
            fi
        fi
        exit
    else
        echo "Tag not found, select from list"
    fi
fi


# Show menu for select tag
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
