#include <gtk/gtk.h>
#include "layout.h"
// static void
// click_cb(GtkButton *btn, GtkWindow *win)
// {
//   g_print("Clicked.\n");
//   gtk_window_destroy(win);
// }

// static void
// click1_cb(GtkButton *btn)
// {
//   const char *s;

//   s = gtk_button_get_label(btn);
//   if (g_strcmp0(s, "Hello.") == 0)
//     gtk_button_set_label(btn, "Good-bye.");
//   else
//     gtk_button_set_label(btn, "Hello.");
// }

// static void
// click2_cb(GtkButton *btn, GtkWindow *win)
// {
//   gtk_window_destroy(win);
// }

const int APP_WIDTH = 800;
const int APP_HEIGHT = 600;

static void
app_activate(GApplication *app, gpointer user_data)
{
  // GtkWidget *win;
  // GtkWidget *lab;
  // GtkWidget *btn;
  // GtkWidget *box;
  // GtkWidget *btn1;
  // GtkWidget *btn2;

  // win = gtk_window_new();
  // gtk_window_set_application(GTK_WINDOW(win), GTK_APPLICATION(app));
  // gtk_window_present(GTK_WINDOW(win));

  GtkWidget *win = gtk_application_window_new(GTK_APPLICATION(app));
  gtk_window_set_title(GTK_WINDOW(win), "note");
  gtk_window_set_default_size(GTK_WINDOW(win), APP_WIDTH, APP_HEIGHT);

  GtkWidget *layout = app_layout_set();

  gtk_window_set_child(GTK_WINDOW(win), layout);

  // gtk_widget_set_size_request (hpaned, 200, -1);

  // gtk_paned_set_start_child (GTK_PANED (hpaned), paned_left);
  // gtk_paned_set_resize_start_child (GTK_PANED (hpaned), TRUE);
  // gtk_paned_set_shrink_start_child (GTK_PANED (hpaned), FALSE);
  // gtk_widget_set_size_request(paned_left, APP_PANEL_LEFT_WIDTH, -1);
  // gtk_widget_set_size_request (frame1, 50, -1);

  // gtk_paned_set_end_child (GTK_PANED (hpaned), paned_right);
  // gtk_paned_set_resize_end_child (GTK_PANED (hpaned), FALSE);
  // gtk_paned_set_shrink_end_child (GTK_PANED (hpaned), FALSE);
  // gtk_widget_set_size_request(paned_left, 600, -1);
  // gtk_widget_set_size_request (frame2, 50, -1);

  // gtk_window_set_child(GTK_WINDOW(win), hpaned);

  // lab = gtk_label_new("Select note");
  // gtk_window_set_child(GTK_WINDOW(win), lab);

  // btn = gtk_button_new_with_label("Click me");
  // gtk_window_set_child(GTK_WINDOW(win), btn);
  // g_signal_connect(btn, "clicked", G_CALLBACK(click_cb), NULL);
  // g_signal_connect(btn, "clicked", G_CALLBACK(click_cb), win);

  // box = gtk_box_new(GTK_ORIENTATION_VERTICAL, 5);
  // gtk_box_set_homogeneous(GTK_BOX(box), TRUE);
  // gtk_window_set_child(GTK_WINDOW(win), box);

  // btn1 = gtk_button_new_with_label("Hello.");
  // g_signal_connect(btn1, "clicked", G_CALLBACK(click1_cb), NULL);

  // btn2 = gtk_button_new_with_label("Close");
  // g_signal_connect(btn2, "clicked", G_CALLBACK(click2_cb), win);

  // gtk_box_append(GTK_BOX(box), btn1);
  // gtk_box_append(GTK_BOX(box), btn2);

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
