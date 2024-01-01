#include "note.h"

GtkWidget *app_layout_set()
{
	GtkWidget *hpaned = gtk_paned_new(GTK_ORIENTATION_HORIZONTAL);
	gtk_paned_set_position(GTK_PANED(hpaned), PANEL_TAGS_WIDTH + PANEL_NOTES_WIDTH);
	gtk_paned_set_resize_start_child(GTK_PANED(hpaned), 1);
	gtk_paned_set_shrink_start_child(GTK_PANED(hpaned), 0);

	GtkWidget *paned_left = app_panel_left_create();
	GtkWidget *paned_right = app_panel_right_create();

	gtk_paned_set_start_child(GTK_PANED(hpaned), paned_left);
	gtk_paned_set_end_child(GTK_PANED(hpaned), paned_right);

	return hpaned;
}
