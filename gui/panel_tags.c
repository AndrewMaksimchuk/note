#include "note.h"

void app_panel_tags_set_notes_cb(GtkListBox *self, GtkListBoxRow *row, Content *notes_content)
{
	(void)(self);
	int index = gtk_list_box_row_get_index(row);
	Tag tag = notes_content->tags[index];
	app_panel_notes_set(&tag);
}

void app_panel_tags_set(Content *notes_content, GtkWidget *list)
{
	for (int i = 0; i < notes_content->length; i++)
	{
		Tag tag = notes_content->tags[i];

		char length[4];
		sprintf(length, "%d", tag.length);

		GtkWidget *label_tag_name = gtk_label_new(tag.name);
		gtk_label_set_xalign(GTK_LABEL(label_tag_name), 0.01);
		gtk_widget_set_hexpand(label_tag_name, TRUE);

		GtkWidget *label_tag_length = gtk_label_new(length);
		gtk_label_set_xalign(GTK_LABEL(label_tag_length), 0.9);
		gtk_label_set_width_chars(GTK_LABEL(label_tag_length), 8);

		GtkWidget *tag_item = gtk_box_new(GTK_ORIENTATION_HORIZONTAL, 0);
		gtk_box_append(GTK_BOX(tag_item), label_tag_name);
		gtk_box_append(GTK_BOX(tag_item), label_tag_length);

		gtk_list_box_append(GTK_LIST_BOX(list), tag_item);
	}
}

GtkWidget *app_panel_tags_create()
{
	GtkWidget *list = gtk_list_box_new();
	Content *notes_content = app_get_content();
	GtkWidget *panel = gtk_scrolled_window_new();
	gtk_scrolled_window_set_min_content_width(GTK_SCROLLED_WINDOW(panel), PANEL_TAGS_WIDTH);
	gtk_scrolled_window_set_child(GTK_SCROLLED_WINDOW(panel), list);
	app_panel_tags_set(notes_content, list);

	GtkAdjustment *scroll_adj = gtk_scrolled_window_get_hadjustment (panel);

	g_signal_connect(list, "row-activated", G_CALLBACK(app_panel_tags_set_notes_cb), notes_content);
	return panel;
}
