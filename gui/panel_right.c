#include <gtk/gtk.h>

#ifndef PANEL_RIGHT_H
#define PANEL_RIGHT_H

GtkTextBuffer *tb;
GtkWidget *tv;

void app_panel_right_message_set(char *text)
{
	gtk_text_buffer_set_text(tb, text, -1);
	gtk_text_buffer_set_modified(tb, FALSE);
	gtk_text_view_set_justification(tv, GTK_JUSTIFY_CENTER);
}

void app_panel_right_read_file(char *path)
{
	gtk_text_view_set_justification(tv, GTK_JUSTIFY_LEFT);
	GFile *note = g_file_new_for_path(path);
	char *contents;
	gsize length;

	g_file_load_contents(note, NULL, &contents, &length, NULL, NULL);
	gtk_text_buffer_set_text(tb, contents, length);
	g_free(contents);
}

void app_panel_text_buffer_set(gchar *text)
{
	gtk_text_buffer_set_text(tb, text, -1);
}

GtkWidget *app_panel_right_create()
{
	GtkWidget *panel = gtk_scrolled_window_new();

	tv = gtk_text_view_new();
	tb = gtk_text_view_get_buffer(GTK_TEXT_VIEW(tv));

	app_panel_right_message_set("Choose note in left panel");
	gtk_text_view_set_wrap_mode(GTK_TEXT_VIEW(tv), GTK_WRAP_WORD_CHAR);
	gtk_widget_set_margin_start(tv, 5);

	gtk_scrolled_window_set_child(GTK_SCROLLED_WINDOW(panel), tv);

	return panel;
}

#endif // PANEL_RIGHT_H
