#!/usr/bin/env bash

# Temporary write some notes
#
# Arguments:
#   $1 - optional parameter, word: create
#
# If $1 argument is "create" - create new notes from content of temporary_note.md
# If $1 argument is "new" - remove temporary_note.md and create new
#
# Special comment/mark for separate content of temporary note file: "> New note:tag_name:title"
# Used in creation new notes


PROGRAM_DIR=$(dirname "$0")
readonly PROGRAM_DIR
readonly NOTE_FILE_NAME="temporary_note.md"
readonly NOTE_TMP_PARAMETER_CREATE="create"
readonly NOTE_TMP_PARAMETER_NEW="new"
NOTE_TMP_PATH="$PROGRAM_DIR/$NOTE_FILE_NAME"
readonly NOTE_TMP_PATH
readonly NOTE_SEPARATOR="> New note"
readonly NOTE_SEPARATOR_SEPARATOR=":"


function note_tmp_file_mark_remove
{
    sed 's/^> New note://' "$1"
}


function note_tmp_file_get_tag
{
    echo "${1%%:*}"
}


function note_tmp_file_set_title
{
    echo "# ${1#*:}"
}


function note_clear
{
    rm -f "$NOTE_TMP_PATH"
}


function create_notes
{
    local temp_directory=$(mktemp -d)
    if ! csplit -z -s -f "$temp_directory/note_" -b '%02d.md' "$NOTE_TMP_PATH" '%^> New note%' '/^> New note/' '{*}' 2>/dev/null; then
        echo "Create_notes: no notes found in temporary note"
        return 1
    fi

    for tmp_file in "$temp_directory"/*; do
        local note_tmp_content=$(note_tmp_file_mark_remove "$tmp_file")
        local note_tag=$(note_tmp_file_get_tag "$note_tmp_content")
        local note_new_content=$(note_tmp_file_set_title "$note_tmp_content")
        note create "$note_tag" "$note_new_content"
    done

    exit
}


function note_tmp
{
    if [ "$1" = "$NOTE_TMP_PARAMETER_CREATE" ]; then
        create_notes
    fi

    if [ "$1" = "$NOTE_TMP_PARAMETER_NEW" ]; then
        note_clear
    fi

    vi "$NOTE_TMP_PATH"
}

note_tmp "$1"
