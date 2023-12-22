#include <gtk/gtk.h>

void gtk_list_box_remove_all(GtkListBox *box);
void app_panel_notes_clean();
void app_panel_notes_message(char *text);
void app_panel_notes_show_cb(GtkListBox *self, GtkListBoxRow *row, Tag *tag);
void app_panel_notes_set(Tag *tag);
GtkWidget *app_panel_notes_create(Content *notes_content);
GtkWidget *app_panel_notes_get_list(GtkWidget *panel);
