grep -B1 --group-separator='' '^# ' *.bash \
    | sed 's/-$//' \
    | sed 's/^.*:#//g' \
    | perl -pe 's:^.*bash$:\e[0;33m [ $& ] \e(B\e[m:g'
  