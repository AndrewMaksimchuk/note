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

function add_complition_bash() {
    if [[ -f ~/.bashrc ]]; then
        echo '[ Add complition bash ]'
        echo >> ~/.bashrc
        echo ". $path/_note_completion # complition for 'note' application" >> ~/.bashrc
    fi
}

function add_complition_zsh() {
    if [[ -f ~/.zshrc ]]; then
        local complition_directory=$HOME/.oh-my-zsh/completions
        echo '[ Add complition zsh ]'
        if [[ -d $complition_directory ]]; then
            cp -f $path/_note $complition_directory
        else
            mkdir $complition_directory
            cp -f $path/_note $complition_directory
        fi
    fi
}

function addcompletion() {
    add_complition_bash
    add_complition_zsh
}

function install_desktop_file() {
    file_name="note.desktop"

    file_content="
    [Desktop Entry]
    Name=note
    Type=Application
    Comment=Read notes
    Terminal=false
    Categories=Education;"

    desktop_file="$path/$file_name"

    echo "$file_content" > $desktop_file
    echo "Exec=$path/note-gui" >> $desktop_file
    echo "Icon=$path/note.png" >> $desktop_file

    desktop-file-install --dir=$HOME/.local/share/applications $desktop_file
    update-desktop-database -v $HOME/.local/share/applications
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
install_desktop_file


execfiles=$(echo $cwd/*.bash)
chmod +x $execfiles

isExist=$(whereis npm | cut -d: -f2)
[[ -z $isExist ]] && echo "Please run 'npm ci' manual"
