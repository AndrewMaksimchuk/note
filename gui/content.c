#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <string.h>
#include <errno.h>
#include "content.h"

int skip_files_by_name(char *d_name)
{
    return '.' == d_name[0] || '_' == d_name[0];
}

int skip_files_regular(struct dirent *file)
{
    return DT_REG == file->d_type || skip_files_by_name(file->d_name);
}

void app_get_files(Tag *tag_entity)
{
    errno = 0;
    int counter = 0;
    Note notes[tag_entity->length];
    struct dirent *note;

    DIR *dir_content = opendir(tag_entity->path);

    if (dir_content == NULL)
    {
        printf("%s\n", strerror(errno));
        fprintf(stderr, "%s\n", strerror(errno));
        return;
    }

    while (NULL != (note = readdir(dir_content)))
    {
        if (skip_files_by_name(note->d_name))
        {
            continue;
        }

        char *note_path = (char *)malloc(strlen(tag_entity->path) + strlen(DELIMITER) + strlen(note->d_name) + 1);
        strcpy(note_path, tag_entity->path);
        strcat(note_path, DELIMITER);
        strcat(note_path, note->d_name);

        int index = counter++;
        strcpy(notes[index].name, note->d_name);
        strcpy(notes[index].path, note_path);
    }
    closedir(dir_content);
    tag_entity->files = notes;
}

int app_count_tags()
{
    struct dirent *tag_directory;
    int tags_counter = 0;
    DIR *dir_content = opendir(DIR_CONTENT);

    if (dir_content == NULL)
    {
        printf("Directory cannot be opened!\n");
        return 0;
    }

    while (NULL != (tag_directory = readdir(dir_content)))
    {
        if (skip_files_regular(tag_directory))
        {
            continue;
        }
        tags_counter++;
    }

    closedir(dir_content);
    return tags_counter;
}

char *app_tag_directory_path_abs(char *d_name)
{
    char *filepath = (char *)malloc(strlen(DIR_CONTENT) + strlen(d_name) + 1);
    char *abs_path = (char *)malloc(PATH_MAX);

    strcpy(filepath, DIR_CONTENT);
    strcat(filepath, d_name);
    realpath(filepath, abs_path);

    return abs_path;
}

int app_notes_length_in_tag_directory(char *tag_directory_path_abs)
{
    struct dirent *tag_directory;
    int notes_counter = 0;
    DIR *dir_content = opendir(tag_directory_path_abs);

    if (dir_content == NULL)
    {
        printf("Directory cannot be opened!\n");
        return 0;
    }

    while (NULL != (tag_directory = readdir(dir_content)))
    {
        if (skip_files_by_name(tag_directory->d_name))
        {
            continue;
        }
        notes_counter++;
    }

    closedir(dir_content);
    return notes_counter;
}

void app_get_tags(Content *content)
{
    int tags_length = app_count_tags();
    Tag tags[tags_length];

    struct dirent *tag_directory;
    int tags_counter = 0;
    DIR *dir_content = opendir(DIR_CONTENT);

    if (dir_content == NULL)
    {
        printf("Directory cannot be opened!\n");
        return;
    }

    while (NULL != (tag_directory = readdir(dir_content)))
    {
        if (skip_files_regular(tag_directory))
        {
            continue;
        }

        int index = tags_counter++;
        char *path_abs = app_tag_directory_path_abs(tag_directory->d_name);
        tags[index].length = app_notes_length_in_tag_directory(path_abs);
        strcpy(tags[index].name, tag_directory->d_name);
        strcpy(tags[index].path, path_abs);
        app_get_files(&tags[index]);
    }

    closedir(dir_content);
    content->length = tags_length;
    content->tags = tags;
}

Content *app_get_content()
{
    Content *content = malloc(sizeof(Content));
    app_get_tags(content);
    return content;
}
