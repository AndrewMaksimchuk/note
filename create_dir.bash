#!/bin/bash


dirs=$(cat ./tags)
mkdir -p content
cd content
mkdir -p $dirs