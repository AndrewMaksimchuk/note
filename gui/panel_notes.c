#include <gtk/gtk.h>
#include "content.h"


void app_panel_notes_set(GtkWidget *list)
{
    for (int i = 0; i < 20; i++)
    {
        char *label_text = "This place for note of selected tag";
        GtkWidget *lab = gtk_label_new(label_text);
        gtk_label_set_xalign(GTK_LABEL(lab), 0.01);
        gtk_list_box_append(GTK_LIST_BOX(list), lab);
    }
}

GtkWidget *app_panel_notes_create(Content *notes_content)
{
    GtkWidget *panel = gtk_scrolled_window_new();
    GtkWidget *list = gtk_list_box_new();
    gtk_scrolled_window_set_child(GTK_SCROLLED_WINDOW(panel), list);
    app_panel_notes_set(list);
    return panel;
}

GtkWidget *app_panel_notes_get_list(GtkWidget *panel)
{
    return gtk_scrolled_window_get_child(GTK_SCROLLED_WINDOW(panel));
}
