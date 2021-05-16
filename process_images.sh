#!/usr/bin/env sh

sizes="50 100 200 250 400 500 800"


# Automatically delete any existing image not specifed in sizes
for images in public/images/*; do
  img_folder=$(basename "$images");
  n=0
  for size in $sizes; do
    [[ $size == $img_folder ]] && n=$((n+1))
  done
  [[ $n -eq 0 ]] && rm -r $images
done

./scripts/resize_all.sh $sizes
./scripts/create_metadata.sh $sizes
