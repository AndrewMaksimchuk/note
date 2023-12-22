#include "note.h"

GtkWidget *app_panel_left_create()
{
	GtkWidget *panel = gtk_box_new(GTK_ORIENTATION_HORIZONTAL, 3);
	gtk_box_set_homogeneous(GTK_BOX(panel), TRUE);
	Content *notes_content = app_get_content();
	GtkWidget *panel_tags = app_panel_tags_create(notes_content);
	GtkWidget *panel_notes = app_panel_notes_create(notes_content);
	gtk_box_append(GTK_BOX(panel), panel_tags);
	gtk_box_append(GTK_BOX(panel), panel_notes);
	
	return panel;
}
