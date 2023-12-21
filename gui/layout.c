#include <gtk/gtk.h>
#include "panel.c"

GtkWidget *app_layout_set(int APP_WIDTH)
{
    GtkWidget *hpaned = gtk_paned_new(GTK_ORIENTATION_HORIZONTAL);
    GtkWidget *paned_left = app_panel_left_create();
    GtkWidget *paned_right = app_panel_right_create();

    gtk_paned_set_start_child(GTK_PANED(hpaned), paned_left);
    gtk_paned_set_end_child(GTK_PANED(hpaned), paned_right);

    gtk_paned_set_position(hpaned, APP_WIDTH / 2);

    return hpaned;
}
