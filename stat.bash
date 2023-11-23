#!/usr/bin/env bash

# Show number of notes in each tag(directory)


projectdir=$(dirname $0)
tags=$(cat $projectdir/tags | sort)
result_numbers=$(mktemp)

function block
{
    echo -en "\u2588"
}

function graph
{
    printf '%*s\n' "$1" '' | tr ' ' '#'
}

for tag in $tags
do
    counter=$(ls "$projectdir/content/$tag" | wc -w)
    echo $tag $counter $(graph $counter)>> $result_numbers
done

column -t -T 3 $result_numbers
