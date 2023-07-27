#!/usr/bin/env bash

cwd=$(realpath $(dirname $0))

cron_file="$cwd/cron"
update_script_file="$cwd/update.bash"

crontab -l >$cron_file

isSetup=$(cat $cron_file | grep $update_script_file | wc -l)
if [[ $isSetup -ge 1 ]]; then
    echo "Job already setup"
    exit
fi

echo "00 10 * * 1-5 XDG_RUNTIME_DIR=/run/user/$(id -u) $update_script_file" >>$cron_file

crontab $cron_file
