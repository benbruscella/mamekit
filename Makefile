# Thin wrappers over the npm scripts, plus the DreamObjects ROM bucket sync.
#
# Credentials come from .env (gitignored): DH_ACCESS_KEY_ID / DH_SECRET_KEY.
# The bucket keeps its listing private and its objects public-read — the app's
# /romsearch/<game>.zip proxy (src/serve.ts) fetches objects anonymously, so an
# upload without public-read ACL is invisible to it.
SHELL := /bin/bash

DH_ENDPOINT ?= https://s3.us-east-005.dream.io
DH_BUCKET   ?= mamehistory
ROM_DIR     ?= roms/arcade
ROM_PREFIX  ?= roms/arcade
SYNC_FLAGS  ?=

# Load .env and map the DreamHost keys onto the names the aws CLI expects.
# Region is unused by DreamObjects but the CLI refuses to sign without one.
define dh_env
set -euo pipefail; \
[[ -f .env ]] || { echo "Makefile: .env is missing (needs DH_ACCESS_KEY_ID / DH_SECRET_KEY)" >&2; exit 1; }; \
set -a; . ./.env; set +a; \
[[ -n "$${DH_ACCESS_KEY_ID:-}" && -n "$${DH_SECRET_KEY:-}" ]] || { echo "Makefile: .env has no DH_ACCESS_KEY_ID / DH_SECRET_KEY" >&2; exit 1; }; \
export AWS_ACCESS_KEY_ID="$$DH_ACCESS_KEY_ID"; \
export AWS_SECRET_ACCESS_KEY="$$DH_SECRET_KEY"; \
export AWS_DEFAULT_REGION="$${AWS_DEFAULT_REGION:-us-east-1}";
endef

AWS_S3 = aws --endpoint-url $(DH_ENDPOINT) s3
AWS_S3API = aws --endpoint-url $(DH_ENDPOINT) s3api

.PHONY: help sync-roms sync-roms-dry list-roms verify-roms gen test test-games deploy deploy-art serve

help:
	@echo "ROM bucket ($(DH_BUCKET) at $(DH_ENDPOINT)):"
	@echo "  make sync-roms       upload $(ROM_DIR)/*.zip to $(ROM_PREFIX)/ as public-read"
	@echo "  make sync-roms-dry   show what sync-roms would upload, change nothing"
	@echo "  make list-roms       list what the bucket currently holds"
	@echo "  make verify-roms     anonymous GET of every local zip's bucket copy"
	@echo ""
	@echo "Build and test:"
	@echo "  make gen | test | test-games | deploy | deploy-art | serve"
	@echo ""
	@echo "Overrides: ROM_DIR= ROM_PREFIX= DH_BUCKET= SYNC_FLAGS=  (e.g. SYNC_FLAGS=--delete)"

# Comparison is the aws default (size, then local mtime) rather than
# --size-only, so swapping in a different dump of the same size still uploads.
# --delete is deliberately not the default: it would prune bucket-only dumps.
sync-roms:
	@$(dh_env) \
	$(AWS_S3) sync "$(ROM_DIR)/" "s3://$(DH_BUCKET)/$(ROM_PREFIX)/" \
		--acl public-read --exclude '*' --include '*.zip' $(SYNC_FLAGS)

sync-roms-dry:
	@$(MAKE) sync-roms SYNC_FLAGS="--dryrun $(SYNC_FLAGS)"

list-roms:
	@$(dh_env) \
	$(AWS_S3) ls "s3://$(DH_BUCKET)/$(ROM_PREFIX)/"

# The bucket is only useful to the app if objects are anonymously readable, so
# check the way the app does rather than trusting the upload.
verify-roms:
	@set -euo pipefail; \
	fail=0; \
	for zip in $(ROM_DIR)/*.zip; do \
		name="$$(basename "$$zip")"; \
		code="$$(curl -s -o /dev/null -w '%{http_code}' \
			"https://$(DH_BUCKET).$(DH_ENDPOINT:https://%=%)/$(ROM_PREFIX)/$$name")"; \
		printf '%-16s %s\n' "$$name" "$$code"; \
		[[ "$$code" == 200 ]] || fail=1; \
	done; \
	exit $$fail

gen:            ; npm run gen:all
test:           ; npm run test:unit && npm run test:current
test-games:     ; npm run test:games
deploy:         ; npm run deploy:noart
deploy-art:     ; npm run deploy
serve:          ; npm run serve
