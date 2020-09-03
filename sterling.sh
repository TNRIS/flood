#!/bin/bash

pushSecrets() {
    key_id=$(aws cloudformation describe-stacks --stack-name ci-cd-secrets --query "Stacks[0].Outputs[?OutputKey=='SecretsEncryptionKeyId'].OutputValue" --output text)
    echo ${key_id};
    echo "pushing secrets.es file...";
    aws kms encrypt --key-id ${key_id} --plaintext fileb://./src/keys/secrets.es --query CiphertextBlob --output text | base64 -d | base64 -w 76 > ./tmp/flood-app-secrets.es.encrypted
    aws s3 cp ./tmp/flood-app-secrets.es.encrypted s3://tnris-artifacts/encrypted/flood-app-secrets.es.encrypted
}

pullSecrets() {
    mkdir -p tmp;
    echo "pulling secrets.es file...";
    aws s3 cp s3://tnris-artifacts/encrypted/flood-app-secrets.es.encrypted ./tmp/flood-app-secrets.es.encrypted
    aws kms decrypt --ciphertext-blob fileb://<(cat ./tmp/flood-app-secrets.es.encrypted | base64 -d) --output text --query Plaintext | base64 -d > ./src/keys/secrets.es
}

"$@"