#!/usr/bin/bash

cwd=$(dirname $0)
. $cwd/colors.bash

length=$(cat $cwd/tags | wc -l)
echo -e "${yellow}You have $length tags/directory${reset}"
cat $cwd/tags | sort | column
