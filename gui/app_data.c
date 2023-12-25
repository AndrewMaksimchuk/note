#include <stdlib.h>
#include <limits.h>
#include "note.h"

const gchar *const *app_data_dir;
const gchar *app_user_dir;
gchar *app_current_dir;

void app_data_get(int argc, char **argv)
{
	app_data_dir = g_get_system_config_dirs();
	app_user_dir = g_get_user_config_dir();
	app_current_dir = g_get_current_dir();

	g_print("app_data_dir: %s\n", *app_data_dir);
	g_print("app_user_dir: %s\n", app_user_dir);
	g_print("app_current_dir: %s\n", app_current_dir);

	g_print("argc: %d\n", argc);
	g_print("argc: %s\n", argv[0]);
	char abs_path[PATH_MAX];
	realpath(argv[0], abs_path);
	g_print("abs_path: %s\n", abs_path);
}
