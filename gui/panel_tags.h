#include <gtk/gtk.h>

void app_panel_tags_set_notes_cb(GtkListBox *self, GtkListBoxRow *row, Content *user_data);
void app_panel_tags_set(Content *notes_content, GtkWidget *list);
GtkWidget *app_panel_tags_create(Content *notes_content);
