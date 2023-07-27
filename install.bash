#!/usr/bin/env bash


cwd=$(dirname $0)
path=$(readlink -f $cwd)


function addpath() {
    if [[ -e $HOME/$1 ]]; then
        echo >> $HOME/$1
        echo "export NOTE_INSTALL=\"$path\"" >> $HOME/$1
        echo 'export PATH="$PATH:$NOTE_INSTALL"' >> $HOME/$1
    fi
}


function addcompletion() {
    cp -f $cwd/_note_completion /etc/bash_completion.d/

    if [[ -d /usr/share/zsh/vendor-completions/ ]]; then
        cp -f $cwd/_note /usr/share/zsh/vendor-completions/
    fi
}


if [[ ! -e $cwd/tags ]]; then
    echo "[ Create file of tags ]"
    vi $cwd/tags
fi


if [[ ! -e $cwd/tags ]]; then
    echo "Can\`t create 'tags' file"
    exit
fi


$cwd/create_dir.bash


addpath ".bashrc"
addpath ".zshrc"


addcompletion


execfiles=$(echo $cwd/*.bash)
chmod +x $execfiles

isExist=$(whereis npm | cut -d: -f2)
[[ -z $isExist ]] && echo "Please run 'npm ci' manual"
