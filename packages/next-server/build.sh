#!/usr/bin/env sh


dist_folder="dist"

rm -rf $dist_folder
babel . --out-dir $dist_folder
cp -r . $dist_folder/_temp


rm -rf $dist_folder/_temp

if [ $# -eq 0 ]
then
  cp -r $dist_folder/* .
fi
