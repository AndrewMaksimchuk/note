#!/usr/bin/env bash

# Render *.md file in terminal
# $1 - absolute path to file *.md
# Example: perl -pe 's:^#.*:\e[1m $& \e[0m:g' $1 

function header
{
    # start with 1 to many # symbol
    perl -pe 's:^#.*:\e[1m$&\e[0m:g' $1 | sed -E 's/#+\s//g'
}

function code_block
{
    # ` or ``` symbols
    # corect work with inline "`" symbol
    # ``` remove from, but need fix to select lines betwen thiw symbols
    perl -pe 's:`\S+`:\e[100m$&\e[0m:g' $1 | sed 's/`//g'
}

header $1 | code_block
