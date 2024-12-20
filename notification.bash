#!/usr/bin/env bash

# Add cron job for repeateble run notifications
# Default behavior - show random note
# 
# note for how show notification from cron job
# * * * * *  XDG_RUNTIME_DIR=/run/user/$(id -u) notify-send Hey "this is dog!"
# 
# If alacritty terminal not show from cron job,
# add next evironment variables befor path to this script
# WAYLAND_DISPLAY=wayland-0
# GNOME_SETUP_DISPLAY=:1
# DISPLAY=:0

cwd=$(realpath $(dirname $0))

function use_editor
{
    echo "vi -S $cwd/.nvimrc $1"
}

function use_terminal_gnome
{
    gnome-terminal \
        --title "$2 - $(date +'%H:%M:%S')" \
        --hide-menubar \
        --geometry=$3 \
        -- $(use_editor $1)
    exit
}

function use_terminal_alacritty
{
    if command -v alacritty &> /dev/null
    then
        alacritty \
        --option window.startup_mode=Windowed \
        --option window.padding.x=15 \
        --option window.padding.y=15 \
        --option window.decorations="None" \
        --option window.dimensions.columns=80 \
        --option window.dimensions.lines=$2 \
        --command $(use_editor $1)
        exit
    fi
}

function show
{
    local files=($cwd/content/**/*.md)
    local randomfile=$(printf "%s\n" "${files[RANDOM % ${#files[@]}]}")
    local randomfile_height=$(cat $randomfile | wc -l)
    local window_height=$(bc <<< "$randomfile_height + 3")
    local window_size="80x$window_height"
    local tag=$(dirname $randomfile | rev | cut -d '/' -f1 | rev)
 
    use_terminal_alacritty $randomfile $window_height
    use_terminal_gnome $randomfile $tag $window_size
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
    echo "*/$minutes */$hours * * * WAYLAND_DISPLAY=wayland-0 GNOME_SETUP_DISPLAY=:1 XDG_RUNTIME_DIR=/run/user/$(id -u) $path_abs" >>$cron_file

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
