#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    # Initialize deploy ssh key
    openssl aes-256-cbc -K $encrypted_dc982276292c_key -iv $encrypted_dc982276292c_iv -in deploy_rsa_sandbox.enc -out /tmp/deploy_rsa_sandbox -d
    openssl aes-256-cbc -K $encrypted_dc982276292c_key -iv $encrypted_dc982276292c_iv -in deploy_rsa_digitalocean.enc -out /tmp/deploy_rsa_digitalocean -d
    eval "$(ssh-agent -s)"
    chmod 600 /tmp/deploy_rsa_sandbox
    chmod 600 /tmp/deploy_rsa_digitalocean

    # Sync
    echo "Deploying to $1 ..."

    if [ $1 == "sandbox" ]; then
        ssh-add /tmp/deploy_rsa_digitalocean
        rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/_site/ travis@46.101.106.19:/var/www/sandbox.piratipardubice.cz
    fi

    if [ $1 == "production" ]; then
        ssh-add /tmp/deploy_rsa_sandbox
        rsync -r --delete-after --quiet -e 'ssh -p 2222' $TRAVIS_BUILD_DIR/_site/ piratipardubice@93.185.103.119:/srv/pirati
    fi
fi
