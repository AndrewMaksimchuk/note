#!/usr/bin/env bash

# add/show/remove images
# Name of image: tag_hash.{png,jpg,gif,webp,avif}
# Arguments:
#    $1 - subcommand


project_dir=$(dirname $0)
images_dir="$project_dir/content/_images"


function show_random_image
{
    local files=($images_dir/*)
    
    if [[ -z $(ls -A $images_dir) ]]; then
        echo "Nothing to show"
        exit
    fi

    local randomfile=$(printf "%s\n" "${files[RANDOM % ${#files[@]}]}")
    xdg-open $randomfile
}

function add
{
    # $1 - url of image
    # $2 - tag for image name(option)
    #      if empty - skip
    if [[ -z $1 ]]; then
        echo "Write url of image"
        exit
    fi

    local extension="${1##*.}"
    local image_name="$images_dir/$2_$(uuidgen).$extension"
    wget -nv -O $image_name $1
    echo "New image added"
    echo `basename $image_name`
    exit
}

function show
{
    # $1 - image name
    if [[ -z $1 ]]; then
        echo "Write image name after command"
        exit
    fi

    if [[ $1 = '--random' || $1 = '-r' ]]; then
        show_random_image
        exit
    fi

    local image_path="$images_dir/$1"

    if [[ ! -e $image_path ]]; then
        echo "Image not exist, please check correct file name"
        exit
    fi

    xdg-open $image_path
    exit
}

function remove
{
    # $1 - image name
    if [[ -z $1 ]]; then
        echo "Write image name after command"
        exit
    fi

    if [[ $1 = '--all' || $1 = '-a' ]]; then
        rm -rf $images_dir
        exit
    fi
    
    local image_path="$images_dir/$1"

    if [[ ! -e $image_path ]]; then
        echo "Image not exist, please check correct file name"
        exit
    fi
    
    rm -f $image_path
    exit
}

if [[ ! -d $images_dir ]]; then
    mkdir -p $images_dir
fi

if [[ $1 = "add" ]]; then
    add $2 $3
fi

if [[ $1 = "show" ]]; then
    show $2
fi

if [[ $1 = "remove" ]]; then
    remove $2
fi

echo "Write one of commands: add, show or remove"
