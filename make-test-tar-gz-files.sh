#!/bin/bash
for f in resources/test/*; do
  cd $f
  tar -czvf archive.tar.gz *
done
