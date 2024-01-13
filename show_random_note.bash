#!/usr/bin/bash


# Show one random note, default behavior
# Arguments:
#    $1 - number of notes to show(option)


dir=`dirname $0`


. $dir/colors.bash
. $dir/interactive.bash


what_show=$(echo 'markdown' 'markdown' 'markdown' 'markdown' 'markdown' 'man' | xargs shuf -n1 -e)

function get_random_note
{
    if [[ $what_show = 'markdown' ]]; then
        local files=$(find $dir/content/ -name '*.md')
        local randomfile=$(echo $files | xargs shuf -n1 -e)
        echo -e "${yellow}`make_link $randomfile '[ NOTE ]' ` $randomfile ${reset}"
        cat $randomfile | fold -w 80 -s | $dir/render_markdown.bash
    fi

    if [[ $what_show = 'man' ]]; then
        local man_pages=$(ls -1 /usr/share/man/man1 /usr/share/man/man7 | cut -d. -f1)
        local randomfile=$(echo $man_pages | xargs shuf -n1 -e)
        echo -e "${yellow}[ MAN PAGE ] $randomfile ${reset}"
        man $randomfile
    fi
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
