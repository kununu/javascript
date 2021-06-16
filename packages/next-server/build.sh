#!/usr/bin/env sh


dist_folder="dist"

rm -rf $dist_folder
babel src --out-dir $dist_folder --ignore 'src/**/*.spec.jsx'
cp -r src $dist_folder


rm -rf $dist_folder/src

if [ $# -eq 0 ]
then
  cp -r $dist_folder/* .
fi
