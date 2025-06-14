# NOTE

## How to use (not all commands)

```sh
$ note create
1) exit			 7) express_typescript	13) redis		19) vim			25) electron		31) heap		37) physics		43) sqlite
2) page			 8) git			14) node.js_typescript	20) vscode		26) computer_science	32) curl		38) war			44) playwright
3) c			 9) gjs			15) python		21) math		27) html		33) electronics		39) law			45) auto
4) common		10) javascript		16) terminal_bash	22) react		28) github-gitlab	34) makefile		40) useful_know
5) css			11) linux		17) tmux		23) vue			29) scss		35) gnome		41) nginx
6) express_javascript	12) node.js		18) typescript		24) markdown		30) bun			36) regexp		42) ed
Select tag: 23
```

```sh
$ note random
[ NOTE ] /code/note/content/playwright/3.md
Locate by CSS or XPath

If you absolutely must use CSS or XPath locators,
you can use page.locator() to create a locator
that takes a selector describing how to find an
element in the page. Playwright supports CSS and
XPath selectors, and auto-detects them if you omit
css= or xpath= prefix.

await page.locator('css=button').click();
await page.locator('xpath=//button').click();

await page.locator('button').click();
await page.locator('//button').click();
```

```sh
$ note select_all vue --oneline
   1.md  # Vue test utils setProps()
   2.md  # Testing Composables
   3.md  # Composables
   4.md  # Directive v-text
   5.md  # Directive v-show
   6.md  # Directive v-if
   7.md  # Directive v-for
```

```sh
$ note history
     1	# JSDoc mark variable as const like in typescript as const                       file:///code/note/content/javascript/53.md
     2	# Repeat find next character                                                     file:///code/note/content/vim/76.md
     3	# tailwindcss Detecting classes in source files                                  file:///code/note/content/css/410.md
     4	# nvimtree plugin                                                                file:///code/note/content/vim/77.md
     5	# Array.from({ length: 10 })                                                     file:///code/note/content/javascript/54.md
```

```sh
$ note search sizeof
COUNT | FILE                                           | LINE | CONTENT                                                                                                             | HEADER
    1 | file:///code/note/content/c/15.md  | 3    | size_t is a special unsigned integer type defined in the standard library of C and C++ languages. It is the type of | # Type size_t
    2 | file:///code/note/content/c/28.md  | 25   | 	uint16_t *wide = malloc(needed * sizeof(uint16_t));                                                                 | # Example of code
    3 | file:///code/note/content/c/30.md  | 6    | #define ELEMENTLEN(x) (sizeof(x) / sizeof(x[0]))                                                                    | # Example of code
    4 | file:///code/note/content/c/6.md   | 21   |  struct foobar *ptr = malloc(sizeof *ptr);                                                                          | # Dynamic Memory Allocation
For open file in specific line in editor
vi/vim: vi +line file
vscode: code --goto <file:line[:character]>
For open file from search use next command:
note search open number_of_file_COUNT_column
```

```sh
$ note learn

1) exit			 6) express_typescript	11) node.js		16) tmux		21) react		26) html		31) curl		36) physics		41) ed
2) c			 7) git			12) redis		17) typescript		22) vue			27) github-gitlab	32) electronics		37) war			42) sqlite
3) common		 8) gjs			13) node.js_typescript	18) vim			23) markdown		28) scss		33) makefile		38) law			43) playwright
4) css			 9) javascript		14) python		19) vscode		24) electron		29) bun			34) gnome		39) useful_know		44) auto
5) express_javascript	10) linux		15) terminal_bash	20) math		25) computer_science	30) heap		35) regexp		40) nginx
Select tag: 31

[ NOTE ] [ 1/2 ] /home/andrew/code/note/content/curl/1.md -----------------------------------------------------------------------------------------------------------------------------------

GET request method with headers

curl -i URL_REQUEST

Continue? [y/n]
```

```sh
$ note stat
bun                 13   #############
c                   34   ##################################
common              53   #####################################################
computer_science    24   ########################
css                 417  #########################################################################################################
curl                2    ##
ed                  4    ####
electronics         2    ##
express_typescript  1    #
git                 48   ################################################
github-gitlab       3    ###
gjs                 1    #
```

```sh
$ note tag
You have 42 tags/directory
auto			css			express_javascript	gnome			linux			node.js			react			terminal_bash		vscode
bun			curl			express_typescript	heap			makefile		node.js_typescript	redis			tmux			vue
c			ed			git			html			markdown		physics			regexp			typescript		war
common			electron		github-gitlab		javascript		math			playwright		scss			useful_know
computer_science	electronics		gjs			law			nginx			python			sqlite			vim
```

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

Run `bash ./install.bash` script

This script add path to this directory in  
`$PATH` env for you can run `note` in terminal.  
Also add shell completion for bash/zsh.

### Git

For update git repository, run `update.bash`  
Or if you want autoupdate, run `autoupdate.bash`

### Github

Published on "Github Pages" on: https://andrewmaksimchuk.github.io/note/  
Used "Github Actions".

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
- gnome-terminal(default) or alacritty terminal

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

### Website

For build web site as static `html` pages, run  
command `npm run build-static`.  
This create `dist/` folder with `html` pages.  
Also, this project contain github action, that  
build and deploy to "Github Pages" on `push`  
event on branch `main`.

### Wallpaper

For create image from note in markdown format i  
use generated `html` files of note and then use  
`electron` to take a screenshot of html page.

That screenshot have name `image_of_page.png`  
and save in root path of this application.

Command for set random wallpaper is:  
`note wallpaper`
