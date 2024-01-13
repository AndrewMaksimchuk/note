#!/usr/bin/env bash

# Containe interactive elements/components
# - link

function make_link
{
    printf '\e]8;;file://%s\e\\%7s\e]8;;\e\\\n' "$1" "$2"
}
