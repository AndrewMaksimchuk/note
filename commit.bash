#!/usr/bin/env bash

function commit_content() {
    local notesfile=$(git status -s ./content)
    if [[ -n $notesfile ]]; then
        echo "[ Add notes ]"
        git add ./content/*
        local counter=$(echo $notesfile | wc -l)
        local message=$(echo "add/change $counter notes")
        git commit -m "$message"
    fi
}

function commit_project() {
    local projectfiles=$(git status -s)
    if [[ -n $projectfiles ]]; then
        echo "[ Add project files ]"
        git add .
        git commit -m "add/change project files"
    fi
}

function commit() {
  commit_content
  commit_project
}

