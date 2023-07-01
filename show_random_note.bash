#!/usr/bin/bash


dir=`dirname $0`


. $dir/colors.bash


files=($dir/content/**/*)
randomfile=$(printf "%s\n" "${files[RANDOM % ${#files[@]}]}")
echo
echo -e "${yellow}Note: $randomfile ${reset}"
cat $randomfile | fold -w 80 -s
