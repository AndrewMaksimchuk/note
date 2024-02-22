#!/usr/bin/env bash

# Set random wallpaper
# 

projectdir=$(dirname $0)
path_to_app=$projectdir/out/note-linux-x64/note

function setWallpaper
{
    gsettings \
        set \
        org.gnome.desktop.background \
        "$1" \
        file://$projectdir/image_of_page.png
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

exec $path_to_app $projectdir $randomfile 2>/dev/null

color_scheme=$(gsettings get org.gnome.desktop.interface color-scheme)

# Dark style
if [[ $color_scheme = 'prefer-dark' ]]; then
    setWallpaper 'picture-uri-dark'
    exit
fi

# Default style
setWallpaper 'picture-uri'
