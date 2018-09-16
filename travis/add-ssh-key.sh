#!/bin/bash

openssl aes-256-cbc -K $encrypted_dc982276292c_key -iv $encrypted_dc982276292c_iv -in deploy_rsa_sandbox.enc -out /tmp/deploy_rsa_sandbox -d
eval "$(ssh-agent -s)"
chmod 600 /tmp/deploy_rsa_sandbox
ssh-add /tmp/deploy_rsa_sandbox
