#include <limits.h>

#ifndef STRUCTURS_H
#define STRUCTURS_H

#define HEADER_LENGTH 100
#define PANEL_TAGS_WIDTH 200
#define PANEL_NOTES_WIDTH 500

typedef struct
{
	char name[NAME_MAX];
	char path[PATH_MAX];
	char header_first_line[HEADER_LENGTH];
} Note;

typedef struct
{
	char name[NAME_MAX];
	char path[PATH_MAX];
	int length;
	Note files[1000];
} Tag;

typedef struct
{
	int length;
	Tag tags[100];
} Content;

#endif
