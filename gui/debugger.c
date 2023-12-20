#include "content.h"

#ifndef DEBUGGER_H
#define DEBUGGER_H

void app_print_tag(Tag *tag)
{
	g_print("name: %s\n", tag->name);
	g_print("length: %d\n", tag->length);
	g_print("path: %s\n", tag->path);
	g_print("files: %d\n", tag->files);
}

void app_print_tags(Tag *tags, int length)
{
	for (int i = 0; i < length; i++)
	{
		app_print_tag(&tags[i]);
	}
}

#endif // DEBUGGER_H
