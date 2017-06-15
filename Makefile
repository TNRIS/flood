PASSWORD_FILE := vault-password.txt
SECRETS_BUCKET := "tnris-secrets"
APP_NAME := flood

FORCE:

.vault/.push/%: FORCE
	mkdir -p $(dir $@)
	cp src/keys/$(notdir $@) $@
	ansible-vault encrypt --vault-password-file $(PASSWORD_FILE) $@
	aws s3 cp $@ s3://$(SECRETS_BUCKET)/$(APP_NAME)/.vault/$(notdir $@)

push-secrets: \
	.vault/.push/secrets.es 

.vault/.pull/%: FORCE
	mkdir -p $(dir $@)
	aws s3 cp s3://$(SECRETS_BUCKET)/$(APP_NAME)/.vault/$(notdir $@) $@

src/keys/%: .vault/.pull/%
	mkdir -p $(dir $@)
	ansible-vault decrypt --vault-password-file $(PASSWORD_FILE) $<
	mv $< $@

pull-secrets: \
	src/keys/secrets.es
