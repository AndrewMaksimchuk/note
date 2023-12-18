#include <gtk/gtk.h>
#include "content.h"

void app_panel_tags_set_notes_cb(
    GtkListBox *self,
    GtkListBoxRow *row,
    Content *notes_content)
{
	// Show notes for selected tag
	int index = gtk_list_box_row_get_index(row);
	Tag tag = notes_content->tags[index];
	g_print("%s\n", tag.name);
}

void app_panel_tags_set(Content *notes_content, GtkWidget *list)
{
	for (int i = 0; i < notes_content->length; i++)
	{
		Tag tag = notes_content->tags[i];
		char *label_text = tag.name;
		GtkWidget *lab = gtk_label_new(label_text);
		gtk_label_set_xalign(GTK_LABEL(lab), 0.01);
		gtk_list_box_append(GTK_LIST_BOX(list), lab);
	}
	g_signal_connect(list, "row-activated", G_CALLBACK(app_panel_tags_set_notes_cb), notes_content);
}

GtkWidget *app_panel_tags_create(Content *notes_content)
{
	GtkWidget *panel = gtk_scrolled_window_new();
	GtkWidget *list = gtk_list_box_new();
	gtk_scrolled_window_set_child(GTK_SCROLLED_WINDOW(panel), list);
	app_panel_tags_set(notes_content, list);
	return panel;
}
