#!/usr/bin/bash


cwd=$(dirname $0)


function update() {
    notesfile=$(git status -s ./content)
    if [[ -n $notesfile ]]; then
        echo "[ Add notes ]"
        git add ./content/*
        counter=$(echo $notesfile | wc -l)
        message=$(echo "add/change $counter notes")
        git commit -m "$message"
    fi


    projectfiles=$(git status -s)
    if [[ -n $projectfiles ]]; then
        echo "[ Add project files ]"
        git add .
        git commit -m "add/change project files"
    fi


    echo "[ Push to remote repository ]"
    git push origin main
}


result=$(cd $cwd && update)
echo -e $result
