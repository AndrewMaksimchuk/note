#!/usr/bin/env bash

# Add cron job for repeateble run notifications
# Default behavior - show random note
# 
# note for how show notification from cron job
# * * * * *  XDG_RUNTIME_DIR=/run/user/$(id -u) notify-send Hey "this is dog!"

cwd=$(realpath $(dirname $0))

function show
{
    local files=($cwd/content/**/*.md)
    local randomfile=$(printf "%s\n" "${files[RANDOM % ${#files[@]}]}")
    local randomfile_height=$(cat $randomfile | wc -l)
    local window_height=$(bc <<< "$randomfile_height + 3")
    local window_size="80x$window_height"
    local tag=$(dirname $randomfile | rev | cut -d '/' -f1 | rev)
    gnome-terminal \
        --title "$tag - $(date +'%H:%M:%S')" \
        --hide-menubar \
        --geometry=$window_size \
        -- vi -S $cwd/.nvimrc $randomfile
    # alacritty \
    # --option window.startup_mode=Windowed \
    # --command vi $randomfile
    exit
}

function set {
    # $1 - minutes
    # $2 - hours
    local cron_file="$cwd/cron"
    local minutes=15
    local hours=1

    if [[ $1 -gt 0 ]]; then
        minutes=$1
    fi

    if [[ $2 -gt 0 ]]; then
        hours=$2
    fi

    crontab -l >$cron_file

    isSetup=$(cat $cron_file | grep 'notification.bash' | wc -l)
    if [[ $isSetup -ge 1 ]]; then
        echo "Job already setup"
        exit
    fi

    local path_abs=$(realpath $0)
    echo "*/$minutes */$hours * * * XDG_RUNTIME_DIR=/run/user/$(id -u) $path_abs" >>$cron_file

    crontab $cron_file
    exit
}

if [[ $1 = 'set' ]]; then
    # $2 - minutes
    # $3 - hours
    set $2 $3
fi

if [[ $1 = 'show' ]]; then
    show
fi

show
