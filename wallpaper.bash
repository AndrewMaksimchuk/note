#!/usr/bin/env bash


# Set random wallpaper
# $1 - path to html page


projectdir=$(dirname $0)
path_to_app=$projectdir/out/note-linux-x64/note

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

exec $path_to_app $randomfile 2>/dev/null

gsettings \
    set \
    org.gnome.desktop.background \
    picture-uri \
    file://$projectdir/image_of_page.png
