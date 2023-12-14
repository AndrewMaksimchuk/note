#include <gtk/gtk.h>

static void
click_cb(GtkButton *btn, GtkWindow *win)
{
  g_print("Clicked.\n");
  gtk_window_destroy(win);
}

static void
app_activate(GApplication *app, gpointer user_data)
{
  GtkWidget *win;
  GtkWidget *lab;
  GtkWidget *btn;

  // win = gtk_window_new();
  // gtk_window_set_application(GTK_WINDOW(win), GTK_APPLICATION(app));
  // gtk_window_present(GTK_WINDOW(win));

  win = gtk_application_window_new(GTK_APPLICATION(app));
  gtk_window_set_title(GTK_WINDOW(win), "note");
  gtk_window_set_default_size(GTK_WINDOW(win), 400, 300);

  lab = gtk_label_new("Select note");
  gtk_window_set_child(GTK_WINDOW(win), lab);

  btn = gtk_button_new_with_label("Click me");
  gtk_window_set_child(GTK_WINDOW(win), btn);
  // g_signal_connect(btn, "clicked", G_CALLBACK(click_cb), NULL);
  g_signal_connect(btn, "clicked", G_CALLBACK(click_cb), win);

  gtk_window_present(GTK_WINDOW(win));
}

int main(int argc, char **argv)
{
  GtkApplication *app;
  int stat;

  app = gtk_application_new("com.github.AndrewMaksimchuk.note", G_APPLICATION_DEFAULT_FLAGS);
  g_signal_connect(app, "activate", G_CALLBACK(app_activate), NULL);
  stat = g_application_run(G_APPLICATION(app), argc, argv);
  g_object_unref(app);
  return stat;
}
