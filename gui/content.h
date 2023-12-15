#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <string.h>

#define DT_REG 8 /* File types for `d_type'.  */
#define NAME_MAX 255
#define PATH_MAX 4096

const char *DIR_CONTENT = "./content/";
const char *DELIMITER = "/";

// посилання на масив структур Tag[]
struct Tag *content[500];

struct Note
{
    char name[NAME_MAX];
    char path[PATH_MAX];
};

struct Tag
{
    char name[NAME_MAX];
    char path[PATH_MAX];
    struct Note *files;
};

int skip_files_by_name(char *d_name)
{
    return '.' == d_name[0] || '_' == d_name[0];
}

int skip_files_regular(struct dirent *file)
{
    return DT_REG == file->d_type || skip_files_by_name(file->d_name);
}

void app_get_files(struct Tag *tag_entity)
{
    int counter = 0;
    struct Note *note_files[500];
    struct dirent *files;
    DIR *dir_content = opendir(tag_entity->path);

    if (dir_content == NULL)
    {
        printf("Directory cannot be opened!\n");
        return;
    }

    while (NULL != (files = readdir(dir_content)))
    {
        if (skip_files_by_name(files->d_name))
        {
            continue;
        }
        char *filepath = (char *)malloc(strlen(tag_entity->path) + strlen(DELIMITER) + strlen(files->d_name) + 1);
        strcpy(filepath, tag_entity->path);
        strcat(filepath, DELIMITER);
        strcat(filepath, files->d_name);

        struct Note note_entity;
        strcpy(note_entity.name, files->d_name);
        strcpy(note_entity.path, filepath);

        printf("%s\n", note_entity.name);
        printf("%s\n", note_entity.path);

        note_files[counter++] = &note_entity;

        free(filepath);
    }

    tag_entity->files = &note_files;

    closedir(dir_content);
}

void app_get_content()
{
    struct dirent *files;
    DIR *dir_content = opendir(DIR_CONTENT);

    if (dir_content == NULL)
    {
        printf("Directory cannot be opened!\n"); // TODO: Show notification
        return;
    }

    while (NULL != (files = readdir(dir_content)))
    {
        if (skip_files_regular(files))
        {
            continue;
        }

        struct Tag tag_entity;

        char *filepath = (char *)malloc(strlen(DIR_CONTENT) + strlen(files->d_name) + 1);
        char *abs_path = (char *)malloc(PATH_MAX);

        strcpy(tag_entity.name, files->d_name);

        strcpy(filepath, DIR_CONTENT);
        strcat(filepath, files->d_name);
        realpath(filepath, abs_path);

        strcpy(tag_entity.path, abs_path);

        printf("%s\n", tag_entity.name);
        printf("%s\n", tag_entity.path);

        free(filepath);
        free(abs_path);

        app_get_files(&tag_entity);
        // debbuger
    }

    closedir(dir_content);
}
