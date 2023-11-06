#!/usr/bin/env bash


# Arguments:
#    $1 - name of new tag
#         if empty show all available tags


cwd=$(dirname $0)


if [[ $# -eq 0 ]]; then
  $cwd/show_tags.bash
  exit
fi


is_exist=$(grep "$1" $cwd/tags | wc -l)
if [[ $is_exist -ge 1 ]]; then
  echo "\"$1\" tag already exist"
  exit
fi


echo >> $cwd/tags
echo -n $1 >> $cwd/tags
mkdir "$cwd/content/$1"
echo "New tag '$1' is added"
