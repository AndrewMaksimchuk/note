#include <gtk/gtk.h>
#include "content.h"

static void
click_cb(
    GtkListBox *self,
    GtkListBoxRow *row,
    gpointer user_data)
{
    GtkWidget *lab = gtk_list_box_row_get_child(row);

    if (NULL == lab)
    {
        g_print("[ ERROR ] List row not have child widget");
        return;
    }

    const char *label_text = gtk_label_get_text(GTK_LABEL(lab));
    g_print(label_text);
}

GtkWidget *app_panel_left_create()
{
    // GtkWidget *panel = gtk_box_new(GTK_ORIENTATION_VERTICAL, 1);
    // gtk_box_set_homogeneous(GTK_BOX(panel), TRUE);

    GtkWidget *panel = gtk_scrolled_window_new();
    // gtk_widget_set_size_request(panel, 200, -1);
    GtkWidget *list = gtk_list_box_new();

    gtk_scrolled_window_set_child(GTK_SCROLLED_WINDOW(panel), list);

    app_get_content();

    for (size_t i = 0; i < 5; i++)
    {
        char *label_text = "Hello_";
        GtkWidget *lab = gtk_label_new(label_text);
        gtk_label_set_xalign(GTK_LABEL(lab), 0.01);
        gtk_list_box_append(GTK_LIST_BOX(list), lab);
        // g_signal_connect(lab, "clicked", G_CALLBACK(click_cb), label_text);
    }
    g_signal_connect(list, "row-activated", G_CALLBACK(click_cb), NULL);

    return panel;
}
