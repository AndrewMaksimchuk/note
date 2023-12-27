#include <stdio.h>
#include <stdlib.h>
#ifndef	__USE_MISC
#define __USE_MISC
#include <dirent.h>
#undef __USE_MISC
#endif
#include <string.h>
#include <ctype.h>
#include "note.h"

int skip_files_by_name(char *d_name)
{
	return '.' == d_name[0] || '_' == d_name[0];
}

int skip_files_regular(struct dirent *file)
{
	return DT_REG == file->d_type || skip_files_by_name(file->d_name);
}

void scan_for_newline()
{
	// https://github.com/GNOME/glib/blob/686ab492cfd8a63f38e8c04e80119794e90b9efa/gio/gdatainputstream.c#L619C1-L619C17
}

void read_line()
{

}

char *app_note_get_header(char *path)
{
	gsize length;
	char *contents;

	GFile *note = g_file_new_for_path(path);
	g_file_load_contents(note, NULL, &contents, &length, NULL, NULL);
	char *header = malloc(length + 1);

	for (gsize i = 0; i < length; i++)
	{
		if(contents[i] == '\n')
		{
			header[i] = '\0';
			break;
		}
		header[i] = contents[i];
	}

	g_free(contents);
	g_object_unref(note);

	return header;
}

int strcmpbynum(const char *s1, const char *s2)
{
	for (;;)
	{
		if (*s2 == '\0')
			return *s1 != '\0';
		else if (*s1 == '\0')
			return 1;
		else if (!(isdigit(*s1) && isdigit(*s2)))
		{
			if (*s1 != *s2)
				return (int)*s1 - (int)*s2;
			else
				(++s1, ++s2);
		}
		else
		{
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
		printf("Directory cannot be opened! %s\n", tag_entity->path);
		return;
	}

	while (NULL != (note = readdir(dir_content)))
	{
		if (skip_files_by_name(note->d_name))
		{
			continue;
		}

		int index = counter++;
		char *note_path = (char *)malloc(strlen(tag_entity->path) + strlen(G_DIR_SEPARATOR_S) + strlen(note->d_name) + 1);
		strcpy(note_path, tag_entity->path);
		strcat(note_path, G_DIR_SEPARATOR_S);
		strcat(note_path, note->d_name);
		strcpy(tag_entity->files[index].name, note->d_name);
		strcpy(tag_entity->files[index].path, note_path);
		strcpy(tag_entity->files[index].header_first_line, app_note_get_header(note_path));
	}

	app_sort_notes(tag_entity->files, tag_entity->length);

	closedir(dir_content);
}

int app_count_tags()
{
	struct dirent *tag_directory;
	int tags_counter = 0;
	DIR *dir_content = opendir(app_path_content_get());

	if (dir_content == NULL)
	{
		printf("Directory of content(tags with notes) cannot be opened!\n");
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
	const char *DIR_CONTENT = app_path_content_get();
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
		printf("Directory cannot be opened! %s\n", tag_directory_path_abs);
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
	DIR *dir_content = opendir(app_path_content_get());

	if (dir_content == NULL)
	{
		printf("Directory of content(tags with notes) cannot be opened!\n");
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
