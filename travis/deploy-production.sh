#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    rsync -r --delete-after --quiet -e 'ssh -p 2222' $TRAVIS_BUILD_DIR/_site/ piratipardubice@93.185.103.119:/srv/pirati
fi
