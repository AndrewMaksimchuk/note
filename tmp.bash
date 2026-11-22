#!/usr/bin/env bash

# Temporary write some notes
#
# Arguments:
#   $1 - optional parameter, word: create
#
# If $1 argument is "create" - create new notes from content of temporary_note.md
#
# Special comment/mark for separate content of temporary note file: "> New note:tag_name:title"
# Used in creation new notes


PROGRAM_DIR=$(dirname "$0")
readonly PROGRAM_DIR
readonly NOTE_FILE_NAME="temporary_note.md"
readonly NOTE_TMP_PARAMETER_CREATE="create"
NOTE_PATH="$PROGRAM_DIR/$NOTE_FILE_NAME"
readonly NOTE_PATH


function create_notes
{
    echo "Run function: create_notes"
}


function note_tmp
{
    if [ "$1" = "$NOTE_TMP_PARAMETER_CREATE" ]; then
        create_notes
        exit 0
    fi

    vi "$NOTE_PATH"
}

note_tmp "$1"
