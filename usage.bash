#!/usr/bin/bash


dir=`dirname $0`


. $dir/colors.bash


function usage() {
    cat "$dir/usage.md"
}
