cmake_minimum_required(VERSION 3.31.6)
project(note)

set(CMAKE_C_STANDARD 23)

find_package(PkgConfig REQUIRED)
pkg_check_modules(GTK4 REQUIRED gtk4)

add_executable(note
        ./gui/main.c
        ./gui/app_data.c
        ./gui/content.c
        ./gui/layout.c
        ./gui/panel.c
        ./gui/panel_left.c
        ./gui/panel_notes.c
        ./gui/panel_right.c
        ./gui/panel_tags.c
)

target_include_directories(note PRIVATE ${GTK4_INCLUDE_DIRS})
target_include_directories(note PRIVATE ${PROJECT_SOURCE_DIR}/gui)
target_link_libraries(note ${GTK4_LIBRARIES})
target_compile_options(note PRIVATE ${GTK4_CFLAGS_OTHER})
