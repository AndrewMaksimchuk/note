#!/usr/bin/bash


cwd=$(dirname $0)
. $cwd/commit.bash

function update() {
  commit
  echo "[ Push to remote repository ]"
  git push origin main
}


result=$(cd $cwd && update)
echo -e "$result"

