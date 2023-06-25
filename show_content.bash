#!/usr/bin/bash

[[ -n $1 ]] && tree $1 && exit
tree ./content
