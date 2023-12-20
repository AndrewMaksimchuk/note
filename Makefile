MAKEFLAGS += --no-print-directory
CC=gcc
DEBUG=-g
CFLAGS=-Wall -Wextra -pedantic $(DEBUG)
APP_ENTRY=main.c
APP_NAME='note-gui'
GUI=./gui/$(APP_ENTRY)

gui-update: gui-build
	@echo "\033[30m\033[42m[ GUI RUN   ]\033[39m\033[49m"
	@make gui-run

gui-build: gui-clear
	@clear
	@echo "\033[30m\033[42m[ GUI BUILD ]\033[39m\033[49m"
	@$(CC) $(CFLAGS) `pkg-config --cflags gtk4` $(GUI) -o $(APP_NAME) `pkg-config --libs gtk4`

gui-run:
	@./$(APP_NAME)

gui-clear:
	@echo "\033[30m\033[42m[ GUI CLEAR ]\033[39m\033[49m"
	@rm -f ./$(APP_NAME)

gui-debug:
	gdb ./$(APP_NAME)
