#!/bin/bash


if [ $# -eq 0 ]
  then
    echo "Add path to file note"
    exit
fi


vi $1
