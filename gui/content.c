#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <string.h>
#include <gtk/gtk.h>
#include "content.h"

int skip_files_by_name(char *d_name)
{
	return '.' == d_name[0] || '_' == d_name[0];
}

int skip_files_regular(struct dirent *file)
{
	return DT_REG == file->d_type || skip_files_by_name(file->d_name);
}

char *app_note_get_header(char *path)
{
	// GFile *note = g_file_new_for_path(path);
	// char **contents;
	// gsize length;
	// g_file_load_contents(note, NULL, &contents, &length, NULL, NULL);
	// GFileInputStream *note_stream = g_file_read (note, NULL, NULL);

	return "HEADER TEXT - FIRST LINE OF FILE";
}

void app_get_files(Tag *tag_entity)
{
	int counter = 0;
	struct dirent *note;

	DIR *dir_content = opendir(tag_entity->path);

	if (dir_content == NULL)
	{
		printf("Directory cannot be opened!\n");
		return;
	}

	while (NULL != (note = readdir(dir_content)))
	{
		if (skip_files_by_name(note->d_name))
		{
			continue;
		}

		int index = counter++;
		char *note_path = (char *)malloc(strlen(tag_entity->path) + strlen(DELIMITER) + strlen(note->d_name) + 1);
		strcpy(note_path, tag_entity->path);
		strcat(note_path, DELIMITER);
		strcat(note_path, note->d_name);
		strcpy(tag_entity->files[index].name, note->d_name);
		strcpy(tag_entity->files[index].path, note_path);
		char *header = app_note_get_header(note_path);
		strcpy(tag_entity->files[index].header_first_line, header);
	}
	closedir(dir_content);
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

int app_sort_tags_compar(const void *p1, const void *p2)
{
	// return strcmp(*(const char **) p1, *(const char **) p2);
	return 1;
}

void app_sort_tags(Tag tags[])
{
	const int size = sizeof(tags[0]);
	const int N = sizeof(tags) / size;
	qsort(tags, N, size, app_sort_tags_compar);
}

void app_get_tags(Content *content)
{
	struct dirent *tag_directory;

	int tags_counter = 0;
	int tags_length = app_count_tags();
	content->length = tags_length;
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
		content->tags[index].length = app_notes_length_in_tag_directory(path_abs);
		strcpy(content->tags[index].name, tag_directory->d_name);
		strcpy(content->tags[index].name, tag_directory->d_name);
		strcpy(content->tags[index].path, path_abs);
		app_get_files(&content->tags[index]);
	}

	closedir(dir_content);
}

Content *app_get_content()
{
	Content *content = malloc(sizeof(Content));
	app_get_tags(content);
	return content;
}
