#include "const.h"

int skip_files_by_name(char *d_name);
int skip_files_regular(struct dirent *file);
char *app_note_get_header(char *path);
int strcmpbynum(const char *s1, const char *s2);
int app_sort_notes_compar(const void *p1, const void *p2);
void app_sort_notes(Note *notes, int N);
void app_get_files(Tag *tag_entity);
int app_count_tags();
char *app_tag_directory_path_abs(char *d_name);
int app_notes_length_in_tag_directory(char *tag_directory_path_abs);
int app_sort_tags_compar(const void *p1, const void *p2);
void app_sort_tags(Tag *tags, int N);
void app_get_tags(Content *content);
Content *app_get_content();
