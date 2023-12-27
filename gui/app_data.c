#include <stdlib.h>
#include <limits.h>
#include "note.h"

gchar *app_path;
// const gchar *const *app_data_dir;
// const gchar *app_user_dir;
// const gchar *app_current_dir;
const gchar *app_content_dir;
const gchar *DIR_CONTENT = "content";

const gchar *app_path_content_get()
{
	return app_content_dir;
}

void app_path_set(char **argv)
{
	gchar *resolved_path = malloc(PATH_MAX);
	realpath(argv[0], resolved_path);
	app_path = g_path_get_dirname(resolved_path);
}

void app_data_set(char **argv)
{
	app_path_set(argv);
	app_content_dir = g_build_path(G_DIR_SEPARATOR_S, app_path, DIR_CONTENT, G_DIR_SEPARATOR_S, NULL);

	// app_data_dir = g_get_system_config_dirs();
	// app_user_dir = g_get_user_config_dir();
	// app_current_dir = g_get_current_dir();

	// g_print("app_data_dir: %s\n", *app_data_dir);
	// g_print("app_user_dir: %s\n", app_user_dir);
	// g_print("app_current_dir: %s\n", app_current_dir);
}
