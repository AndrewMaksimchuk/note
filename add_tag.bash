#!/usr/bin/env bash


cwd=$(dirname $0)


if [ $# -eq 0 ]
  then
    echo "Add name of new tag"
    exit
fi


echo >> $cwd/tags
echo -n $1 >> $cwd/tags
echo "New tag '$1' is added"
