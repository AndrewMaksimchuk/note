#!/usr/bin/env bash


cwd=$(realpath $(dirname $0 ))

cron_file="$cwd/cron"
update_script_file="$cwd/update.bash"

echo $cron_file
echo $update_script_file

crontab -l > $cron_file

echo "00 10 * * 1-5 $update_script_file" >> $cron_file

crontab $cron_file
