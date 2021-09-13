#!/usr/bin/env sh

dist_folder="dist"

rm -rf $dist_folder
babel src --out-dir $dist_folder --ignore 'src/**/*.spec.tsx' --extensions '.ts,.tsx'
