#include <stdlib.h>
#include <limits.h>
#include "note.h"

const gchar app_path[PATH_MAX];
const gchar *const *app_data_dir;
const gchar *app_user_dir;
const gchar *app_current_dir;
const gchar *app_content_dir;
const gchar *DIR_CONTENT = "content";

const gchar *app_path_content_get()
{
	return app_content_dir;
}

void app_path_content_set()
{
	gchar *app_content_dir = g_strconcat(app_path, DIR_CONTENT);
}

void app_path_get(int argc, char **argv)
{
	g_print("argc: %d\n", argc);
	g_print("argc: %s\n", argv[0]);
	realpath(argv[0], app_path);
	app_path = g_path_get_dirname(app_path);
	g_print("abs_path: %s\n", app_path);
}

void app_data_set(int argc, char **argv)
{
	app_data_dir = g_get_system_config_dirs();
	app_user_dir = g_get_user_config_dir();
	app_current_dir = g_get_current_dir();

	g_print("app_data_dir: %s\n", *app_data_dir);
	g_print("app_user_dir: %s\n", app_user_dir);
	g_print("app_current_dir: %s\n", app_current_dir);
}
