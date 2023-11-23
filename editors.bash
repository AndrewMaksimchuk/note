#!/usr/bin/env bash


open_by_vi='vi +line file'
open_by_vscode='code --goto <file:line[:character]>'


function use_editor
{
    echo "For open file in specific line in editor"
    echo -e "\033[1;4mvi/vim:\033[0m $open_by_vi"
    echo -e "\033[1;4mvscode:\033[0m $open_by_vscode"
}
