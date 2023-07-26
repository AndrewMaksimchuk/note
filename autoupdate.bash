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

echo "00 10 * * 1-5 $update_script_file" >>$cron_file

crontab $cron_file
