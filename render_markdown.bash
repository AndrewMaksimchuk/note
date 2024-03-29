#!/usr/bin/env bash

# Render *.md file in terminal
# $1 - absolute path to file *.md
#
# Hints:
# https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797
# https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences

projectdir=$(dirname $0)
cols=$(tput cols)

function header
{
    perl -pe 's:^#.*:\e[1m$&\e[0m:g' $1 | sed -E 's/#+\s//g'
}

function code
{
    $projectdir/render_markdown_code_block.mjs $1 $cols
}

function bold_italic
{
    $projectdir/render_markdown_bold_italic.mjs $1
}

function bold
{
    $projectdir/render_markdown_bold.mjs $1
}

function italic
{
    $projectdir/render_markdown_italic.mjs $1
}

function blockquotes
{
    $projectdir/render_markdown_blockquotes.mjs $1 $cols
}

function link
{
    $projectdir/render_markdown_link.mjs $1
}

function horizontal_rule
{
    $projectdir/render_markdown_horizontal_rule.mjs $1 $cols
}

# Order important
header $1 | horizontal_rule | link | bold_italic | bold | italic | blockquotes | code
