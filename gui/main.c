#include "note.h"

const int APP_WIDTH = 800;
const int APP_HEIGHT = 600;

static void
app_activate(GApplication *app)
{
	GtkWidget *win = gtk_application_window_new(GTK_APPLICATION(app));
	gtk_window_set_title(GTK_WINDOW(win), "note");
	gtk_window_set_default_size(GTK_WINDOW(win), APP_WIDTH, APP_HEIGHT);
	gtk_window_maximize(GTK_WINDOW(win));

	GtkWidget *layout = app_layout_set(APP_WIDTH);

	gtk_window_set_child(GTK_WINDOW(win), layout);
	gtk_window_present(GTK_WINDOW(win));
}

int main(int argc, char **argv)
{
	GtkApplication *app;
	int stat;

	app_data_set(argv);
	app = gtk_application_new("com.github.AndrewMaksimchuk.note", G_APPLICATION_DEFAULT_FLAGS);
	g_signal_connect(app, "activate", G_CALLBACK(app_activate), NULL);
	stat = g_application_run(G_APPLICATION(app), argc, argv);
	g_object_unref(app);
	return stat;
}
