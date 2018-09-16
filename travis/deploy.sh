#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    # Initialize deploy ssh key
    openssl aes-256-cbc -K $encrypted_dc982276292c_key -iv $encrypted_dc982276292c_iv -in deploy_rsa_sandbox.enc -out /tmp/deploy_rsa_sandbox -d
    eval "$(ssh-agent -s)"
    chmod 600 /tmp/deploy_rsa_sandbox
    ssh-add /tmp/deploy_rsa_sandbox

    # Sync
    echo "Deploying to $1 ..."

    if [ $1 == "sandbox" ]; then
        rsync -r --delete-after --quiet -e 'ssh -p 2222' $TRAVIS_BUILD_DIR/_site/ piratipardubice@93.185.103.119:/srv/pirati-tmp
    fi

    if [ $1 == "production" ]; then
        rsync -r --delete-after --quiet -e 'ssh -p 2222' $TRAVIS_BUILD_DIR/_site/ piratipardubice@93.185.103.119:/srv/pirati
    fi
fi
