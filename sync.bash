#!/usr/bin/env bash

# Use in case when app work on different machines in same time

projectdir=$(dirname $0)

git pull --rebase=true origin main

. $projectdir/update.bash

