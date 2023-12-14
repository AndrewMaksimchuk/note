GUI=./gui/main.c
APP_NAME='note-gui'

gui-update: gui-build
	@echo "\033[30m\033[42m[ GUI RUN   ]\033[39m\033[49m"
	./${APP_NAME}

gui-build:
	@echo "\033[30m\033[42m[ GUI BUILD ]\033[39m\033[49m"
	$ gcc `pkg-config --cflags gtk4` ${GUI} -o ${APP_NAME} `pkg-config --libs gtk4`
