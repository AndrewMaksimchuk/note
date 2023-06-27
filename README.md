## In this project use `bash` and `nvim`


### Config nvim

For work use local nvim config file `.nvimrc`  

1.  In .config/nvim/init.vim set option `set exrc`  
    For use local nvim config in note directory  


### Config bash

Set all bash script files to be executable
`chmod +x script_name.bash`  


### Git

For update git repository, run `update.bash`  

### Usage

Run `./dashboard` from project directory  

First use:  
  - create/update 'tag' text file with list of tags  
  - run './create_dir.bash'  

Create new note run './create_file.bash'  
Show notes in one selected tag run './show_notes.bash'  
Show note by file path, run './show_note.bash file_path'  
Edit note by file path, run './edit.bash file_path'  
Remove all notes, run './clear.bash'  

Also you can run './show_random_note.bash'  
for show one random selected note  
