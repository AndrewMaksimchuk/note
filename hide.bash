#!/usr/bin/env bash

# Move note from tag directory
# to hidden directory with saved
# origine position for restore
# Arguments:
#    $1 - absolute path to note
#         or restore flag(--restore | -r)

projectdir=$(dirname $0)
hidden_directory="$projectdir/hidden"

function restore {
    echo "Write tag and note name(file name)"
    read tag_name note_name

    local file="$hidden_directory/$tag_name/$note_name"

    if [[ ! -f $file ]]; then
        echo "This note not exist or not hidden"
        exit
    fi

    mv -i $file "$projectdir/content/$tag_name/$note_name"
    exit
}

if [[ $1 = '-r' || $1 = '--restore' ]]; then
    restore
fi

if [[ ! -f $1 ]]; then
    echo "This note is not exist, check the path to file"
    exit
fi

tag=$(basename $(dirname $1))
note=$(basename $1)

mkdir -p $hidden_directory/$tag
cat $1 >$hidden_directory/$tag/$note
rm $1
