#!/usr/bin/env bash

# Set random wallpaper

projectdir=$(realpath `dirname $0`)
path_to_app=$projectdir/out/note-linux-x64/note

function getImageName
{
    local tag=$(echo "$1" | rev | cut -d'/' -f2 | rev)
    local name=$(echo "$1" | rev | cut -d'/' -f1 | rev | cut -d'.' -f1)
    local file="$projectdir/content/_images/$tag.$name.png"
    echo "$file"
}

function saveImg
{
    local file=$(getImageName "$1")
    cp -u "$projectdir/image_of_page.png" "$file"
}

function getColorScheme
{
    local color_scheme=$(gsettings get org.gnome.desktop.interface color-scheme)

    if [[ "$color_scheme" = "prefer-dark" ]]; then
        local color_scheme="picture-uri-dark"
    else
        local color_scheme="picture-uri"
    fi

    echo "$color_scheme"
}

function callActionWallpaperSet
{
    gsettings set org.gnome.desktop.background $(getColorScheme) "file://$1"
}

function setWallpaper
{
    if [[ -n $1 ]]; then
        callActionWallpaperSet "$1"
        exit
    fi

    callActionWallpaperSet "$projectdir/image_of_page.png"
}

function setFromExist
{
    local file=$(getImageName "$1")

    if [[ -e $file ]]; then
        setWallpaper "$file"
        exit
    fi
}

if [[ ! -e $path_to_app ]]; then
    echo "App for create and set wallpaper not exist!"
    echo "First you need to build it, run: npm run make"
    exit
fi

if [[ ! -d "$projectdir/dist" ]]; then
    echo "HTML pages not exist!"
    echo "First you need build static web site, run: npm run build-static"
    exit
fi

files=($projectdir/dist/**/*.html)
randomfile=$(printf "%s\n" "${files[RANDOM % ${#files[@]}]}")
setFromExist "$randomfile"
$path_to_app $projectdir $randomfile 2>/dev/null
saveImg "$randomfile"
sleep 10s
setWallpaper
