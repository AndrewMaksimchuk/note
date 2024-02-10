#!/usr/bin/env bash


# show all notes without markdown header (symbol #)
# grep -rn -e '^# ' -v content/**/*.md | grep ':1:' | cut -d: -f1 | sort | uniq


# add markdown header to all notes that have only 1 line of text
# add symbols '# ' before text in first line
grep -rn -e '^# ' -v content/**/*.md \
    | grep ':1:' \
    | cut -d: -f1 \
    | sort \
    | uniq \
    | xargs wc -l \
    | grep ' 1 ' \
    | rev \
    | cut -f1 -d' ' \
    | rev \
    | xargs sed -i '1s/^/# /'