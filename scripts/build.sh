#!/usr/bin/env sh

dist_folder="dist"

rm -rf $dist_folder
babel --extensions '.ts,.tsx' src --out-dir $dist_folder --ignore 'src/**/*.spec.tsx'
