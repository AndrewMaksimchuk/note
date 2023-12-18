#include <gtk/gtk.h>
#include "content.h"

GtkWidget *app_panel_notes_create(Content *notes_content)
{
    GtkWidget *panel = gtk_scrolled_window_new();
    GtkWidget *list = gtk_list_box_new();
    gtk_scrolled_window_set_child(GTK_SCROLLED_WINDOW(panel), list);
    return panel;
}

GtkWidget *app_panel_notes_get_list(GtkWidget *panel)
{
    return gtk_scrolled_window_get_child(GTK_SCROLLED_WINDOW(panel));
}
