#include <gtk/gtk.h>
#include "content.h"
#include "panel_right.c"

GtkWidget *panel;
GtkWidget *list;

void gtk_list_box_remove_all(GtkListBox *box)
{
	GtkWidget *widget = GTK_WIDGET(box);
	GtkWidget *child;

	g_return_if_fail(GTK_IS_LIST_BOX(box));

	while ((child = gtk_widget_get_first_child(widget)) != NULL)
		gtk_list_box_remove(box, child);
}

void app_panel_notes_clean()
{
	gtk_list_box_remove_all(GTK_LIST_BOX(list));
}

void app_panel_notes_message(char *text)
{
	GtkWidget *lab = gtk_label_new(text);
	gtk_list_box_append(GTK_LIST_BOX(list), lab);
}

void app_panel_notes_show_cb(
    GtkListBox *self,
    GtkListBoxRow *row,
    Tag *tag)
{
	int index = gtk_list_box_row_get_index(row);
	Note note = tag->files[index];
	app_panel_right_read_file(note.path);
}

void app_panel_notes_set(Tag *tag)
{
	app_panel_notes_clean();

	if (0 == tag->length)
	{
		app_panel_notes_message("Empty");
		return;
	}

	for (int i = 0; i < tag->length; i++)
	{
		Note note = tag->files[i];
		char *label_text = note.name;
		GtkWidget *lab = gtk_label_new(label_text);
		gtk_label_set_xalign(GTK_LABEL(lab), 0.01);
		gtk_list_box_append(GTK_LIST_BOX(list), lab);
	}

	g_signal_connect(list, "row-activated", G_CALLBACK(app_panel_notes_show_cb), tag);
}

GtkWidget *app_panel_notes_create(Content *notes_content)
{
	panel = gtk_scrolled_window_new();
	list = gtk_list_box_new();
	gtk_scrolled_window_set_child(GTK_SCROLLED_WINDOW(panel), list);
	app_panel_notes_message("Choose tag in left panel");
	return panel;
}

GtkWidget *app_panel_notes_get_list(GtkWidget *panel)
{
	return gtk_scrolled_window_get_child(GTK_SCROLLED_WINDOW(panel));
}
