#include <gtk/gtk.h>
#include "content.c"
#include "panel_tags.c"
#include "panel_notes.c"

// static void
// click_cb(
//     GtkListBox *self,
//     GtkListBoxRow *row)
// // gpointer user_data)
// {
//     GtkWidget *lab = gtk_list_box_row_get_child(row);

//     if (NULL == lab)
//     {
//         g_print("[ ERROR ] List row not have child widget");
//         return;
//     }

//     const char *label_text = gtk_label_get_text(GTK_LABEL(lab));
//     g_print(label_text);
//     // printf("%s", label_text);
// }

// void app_panel_notes_set(GtkWidget *list, GtkWidget *widget)
// {
//     gtk_list_box_append(GTK_LIST_BOX(list), widget);
// }

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
