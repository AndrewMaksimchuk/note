#include "note.h"

GtkWidget *app_panel_left_create()
{
	GtkWidget *panel_tags = app_panel_tags_create();
	GtkWidget *panel_notes = app_panel_notes_create();
	GtkWidget *panel = gtk_box_new(GTK_ORIENTATION_HORIZONTAL, 3);
	gtk_box_append(GTK_BOX(panel), panel_tags);
	gtk_box_append(GTK_BOX(panel), panel_notes);
	return panel;
}
