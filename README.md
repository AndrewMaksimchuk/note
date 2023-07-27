# NOTE


### Description

Note-taking cli application  
Support markdown, html, images, video  
Markdown and html files save in git,  
images and video not.  

Platform: linux  
Require: `bash`, `nvim`  


### Config nvim

For work use local nvim config file `.nvimrc`  

1.  In .config/nvim/init.vim set option `set exrc`  
    For use local nvim config in note directory  


### Config bash

Set all bash script files to be executable
`chmod +x script_name.bash`  


### Install

Run `sudo ./install.bash` script  

This script add path to this directory in  
$PATH env for you can run `note` in terminal.  
Also add shell completion for bash/zsh.  


### Git

For update git repository, run `update.bash`  
Or if you want autoupdate, run `autoupdate.bash`


### Usage

Run `./dashboard` from project directory  
`tags` file must be sorted  

See [usage](usage.md)  


### Web server

Support commands:
- [?] create
- [x] random
- [x] select
- [x] select_all
- [x] tag
- [ ] edit
- [ ] clear
- [ ] update
- [ ] search
- [ ] hide
- [ ] image
- [ ] video
- [ ] notification
