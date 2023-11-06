#!/usr/bin/bash

cwd=$(dirname $0)

echo -e "${yellow}You have next tags:${reset}"
cat $cwd/tags | sort
