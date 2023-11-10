#!/usr/bin/bash


# Show one random note, default behavior
# Arguments:
#    $1 - number of notes to show(option)


dir=`dirname $0`


. $dir/colors.bash


files=$(find $dir/content/ -name '*.md')

function get_random_note
{
    local randomfile=$(echo $files | xargs shuf -n1 -e)
    echo -e "${yellow}[ NOTE ] $randomfile ${reset}"
    cat $randomfile | fold -w 80 -s
}


function show_random_note
{
    if [[ -n $1 ]]; then
        local re='^[0-9]+$'
        
        if ! [[ $1 =~ $re ]]; then
            echo "Enter the number"
            exit
        fi

        for ((i=1; i<=$1; i++))
        do
            get_random_note
        done
        exit
    fi

    get_random_note
}


show_random_note $1
