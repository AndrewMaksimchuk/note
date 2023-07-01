#!/bin/bash


cwd=$(dirname $0)
path=$(readlink -f $cwd)


function addpath() {
    if [[ -e $HOME/$1 ]]; then
        echo >> $HOME/$1
        echo "export NOTE_INSTALL=\"$path\"" >> $HOME/$1
        echo 'export PATH="$PATH:$NOTE_INSTALL"' >> $HOME/$1
    fi
}


if [[ ! -e $cwd/tags ]]; then
    echo [ Create file of tags ]
    vi $cwd/tags
fi


if [[ ! -e $cwd/tags ]]; then
    echo "Can\`t create 'tags' file"
    exit
fi


$cwd/create_dir.bash


addpath ".bashrc"
addpath ".zshrc"


execfiles=$(echo $cwd/*.bash)
chmod +x $execfiles
