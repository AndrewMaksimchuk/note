#!/usr/bin/env bash


# Arguments:
#    $1 - name of new tag
#         or --all(-a) flag


cwd=$(dirname $0)


if [[ $# -eq 0 ]]; then
  echo "Add name of new tag"
  exit
fi


if [[ $1 = "-a" || $1 = "--all" ]]; then
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
