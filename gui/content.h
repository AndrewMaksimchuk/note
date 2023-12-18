#include <limits.h>

#ifndef STRUCTURS_H
#define STRUCTURS_H

const char *DIR_CONTENT = "./content/";
const char *DELIMITER = "/";

typedef struct
{
    char name[NAME_MAX];
    char path[PATH_MAX];
} Note;

typedef struct
{
    char name[NAME_MAX];
    char path[PATH_MAX];
    Note *files;
    int length;
} Tag;

typedef struct
{
    int length;
    Tag *tags;
} Content;

#endif // STRUCTURS_H

int skip_files_by_name(char *d_name);
int skip_files_regular(struct dirent *file);
void app_get_files(Tag *tag_entity);
int app_count_tags();
char *app_tag_directory_path_abs(char *d_name);
int app_notes_length_in_tag_directory(char *tag_directory_path_abs);
void app_get_tags(Content *content);
Content *app_get_content();
