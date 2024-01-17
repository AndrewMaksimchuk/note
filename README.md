# NOTE


### Description

Note-taking cli application  
Support markdown, man-pages, html, images, video  
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
`$PATH` env for you can run `note` in terminal.  
Also add shell completion for bash/zsh.  


### Git

For update git repository, run `update.bash`  
Or if you want autoupdate, run `autoupdate.bash`


### Usage

Run `./dashboard` from project directory  
`tags` file must be sorted  

See [usage](usage.md)  


### Dependencies

- bash
- wget
- vim/nvim
- Deno
- Node.js
- gnome-terminal


### GUI

#### Debug
To enable the [GTK inspector](https://docs.gtk.org/gtk4/running.html#interactive-debugging), you can use the  
`Control+Shift+I` or `Control+Shift+D`  
keyboard shortcuts, or set the  
`GTK_DEBUG=interactive` environment variable.  

To launch the GTK Inspector, focus your GTK  
application and press `Control-Shift-D`.  

Alternatively, move your mouse cursor to your  
desired widget and press `Control-Shift-I` to  
specifically inspect the widget under the mouse  
cursor.  

#### Resources

- https://docs.gtk.org/glib/func.locale_to_utf8.html

- https://docs.gtk.org/glib/index.html
- https://docs.gtk.org/gtk4/question_index.html

- https://docs.gtk.org/gtk4/input-handling.html
- https://docs.gtk.org/gtk4/section-text-widget.html
- https://docs.gtk.org/Pango/pango_markup.html
- https://docs.gtk.org/gtk4/class.TextTag.html
- https://docs.gtk.org/gtk4/class.CssProvider.html
- https://docs.gtk.org/gtk4/class.EventControllerMotion.html
- https://docs.gtk.org/gtk4/class.EventControllerKey.html
- https://docs.gtk.org/gtk4/method.Widget.add_controller.html
- https://docs.gtk.org/gtk4/class.EventController.html
- https://docs.gtk.org/gdk4/index.html#constants


### vi/vim/nvim

When show note and you need change some text  
in `INSERT` mode show line numbers, status line  
and vertical rule on 50 column.  
In `NORMAL` mode editor view is clean.  

#### Resources

- https://vimhelp.org/usr_40.txt.html#40.3


### Markdown

For commands: `random` `select` `select_all`  
output files will be rendered corresponding  
to markdown syntax(simple version).  

Support:
- [x] header
- [x] bold
- [x] italic
- [x] bold and italic
- [x] blockquotes
- [ ] lists
- [x] code
- [x] horizontal rules
- [x] link
- [ ] image
- [ ] escaping characters
