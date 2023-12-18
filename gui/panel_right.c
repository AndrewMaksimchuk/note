#include <gtk/gtk.h>

GtkTextBuffer *tb;

void app_panel_text_buffer_set(gchar *text) {
    gtk_text_buffer_set_text(tb, text, -1);
}

GtkWidget *app_panel_right_create()
{
    GtkWidget *panel = gtk_scrolled_window_new();

    gchar *text =
        "Once upon a time, there was an old man who was called Taketori-no-Okina. "
        "It is a japanese word that means a man whose work is making bamboo baskets.\n"
        "One day, he went into a hill and found a shining bamboo. "
        "\"What a mysterious bamboo it is!,\" he said. "
        "He cut it, then there was a small cute baby girl in it. "
        "The girl was shining faintly. "
        "He thought this baby girl is a gift from Heaven and took her home.\n"
        "His wife was surprized at his story. "
        "They were very happy because they had no children. ";

    GtkWidget *tv = gtk_text_view_new();
    tb = gtk_text_view_get_buffer(GTK_TEXT_VIEW(tv));

    gtk_text_buffer_set_text(tb, text, -1);
    gtk_text_view_set_wrap_mode(GTK_TEXT_VIEW(tv), GTK_WRAP_WORD_CHAR);
    gtk_widget_set_margin_start(tv, 5);

    gtk_scrolled_window_set_child(GTK_SCROLLED_WINDOW(panel), tv);

    return panel;
}
