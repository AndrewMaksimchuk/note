#!/bin/bash


dirs=$(cat ./tags)
mkdir -p content
cd content
mkdir -p $dirs
mkdir -p "_pages"
mkdir -p "_images"
mkdir -p "_video"
