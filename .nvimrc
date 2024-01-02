set nonumber
set noruler
set nocursorline
set nocursorcolumn
set norelativenumber
set laststatus=0
set mouse=a

highlight Normal ctermbg=0
highlight VertSplit ctermfg=0  ctermbg=0

function InsertModeEnter()
    set number
    set laststatus=2
    set colorcolumn=50
endfunction

function InsertModeLeave()
    set nonumber
    set laststatus=0
    set colorcolumn=0
endfunction

autocmd InsertEnter * call InsertModeEnter()
autocmd InsertLeave * call InsertModeLeave()
