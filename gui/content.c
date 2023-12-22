#include <stdio.h>
#include <stdlib.h>
#define __USE_MISC
#include <dirent.h>
#undef __USE_MISC
#include <string.h>
#include "note.h"


const char *DIR_CONTENT = "./content/";
const char *DELIMITER = "/";

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

int strcmpbynum(const char *s1, const char *s2) {
  for (;;) {
    if (*s2 == '\0')
      return *s1 != '\0';
    else if (*s1 == '\0')
      return 1;
    else if (!(isdigit(*s1) && isdigit(*s2))) {
      if (*s1 != *s2)
        return (int)*s1 - (int)*s2;
      else
        (++s1, ++s2);
    } else {
      char *lim1, *lim2;
      unsigned long n1 = strtoul(s1, &lim1, 10);
      unsigned long n2 = strtoul(s2, &lim2, 10);
      if (n1 > n2)
        return 1;
      else if (n1 < n2)
        return -1;
      s1 = lim1;
      s2 = lim2;
    }
  }
}

int app_sort_notes_compar(const void *p1, const void *p2)
{
	const Note *c1 = p1;
	const Note *c2 = p2;
	return strcmpbynum(c1->name, c2->name);
}

void app_sort_notes(Note *notes, int N)
{
	const int size = sizeof(notes[0]);
	qsort(notes, N, size, app_sort_notes_compar);
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

	app_sort_notes(tag_entity->files, tag_entity->length);

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
	const Tag *c1 = p1;
	const Tag *c2 = p2;
	return strcmp(c1->name, c2->name);
}

void app_sort_tags(Tag *tags, int N)
{
	const int size = sizeof(tags[0]);
	qsort(tags, N, size, app_sort_tags_compar);
}

void app_get_tags(Content *content)
{
	struct dirent *tag_directory;
	int tags_counter = 0;
	content->length = app_count_tags();
	DIR *dir_content = opendir(DIR_CONTENT);

	if (dir_content == NULL)
	{
		printf("Directory cannot be opened!\n");
		return;
	}

	while (NULL != (tag_directory = readdir(dir_content)))
	{
		if (skip_files_regular(tag_directory))
			continue;

		int index = tags_counter++;
		char *path_abs = app_tag_directory_path_abs(tag_directory->d_name);
		content->tags[index].length = app_notes_length_in_tag_directory(path_abs);
		strcpy(content->tags[index].name, tag_directory->d_name);
		strcpy(content->tags[index].path, path_abs);
		app_get_files(&content->tags[index]);
	}

	app_sort_tags(content->tags, content->length);
	closedir(dir_content);
}

Content *app_get_content()
{
	Content *content = malloc(sizeof(Content));
	app_get_tags(content);
	return content;
}
