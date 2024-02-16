project_name = documentation-site

DUNE = dune

.DEFAULT_GOAL := help

.PHONY: help
help: ## Print this help message
	@echo "List of available make commands";
	@echo "";
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2}';
	@echo "";

.PHONY: create-switch
create-switch: ## Create opam switch
	opam switch create . 5.1.1 -y --deps-only

.PHONY: init
init: create-switch install ## Configure everything to develop this repository in local

.PHONY: install
install: ## Install development dependencies
	opam update
	opam install -y . --deps-only
	opam pin -y add $(project_name).dev .

.PHONY: check-reason
check-reason: ## Checks that Reason syntax snippets are well formed
	$(DUNE) build @re

.PHONY: 
update-extracted-code-blocks: ## Updates the code blocks extracted from markdown
	$(DUNE) build @extract-code-blocks --auto-promote || true
	$(DUNE) build @runtest --auto-promote || true

.PHONY: check-extracted-code-blocks
check-extracted-code-blocks: update-extracted-code-blocks ## Checks that code blocks extracted from markdown have been updated to latest
	@status=$$(git status --porcelain); \
	if [ ! -z "$${status}" ]; \
	then \
		echo "Error - working directory is dirty. Make sure the auto-generated tests are updated ('make update-extracted-code-blocks')"; \
		exit 1; \
	fi

.PHONY: test
test: ## Runs @runtest alias
	$(DUNE) build @runtest

.PHONY: clean
clean: ## Clean build artifacts and other generated files
	$(DUNE) clean

.PHONY: format
format: ## Format the codebase with ocamlformat
	$(DUNE) build @fmt --auto-promote

.PHONY: format-check
format-check: ## Checks if format is correct
	$(DUNE) build @fmt

.PHONY: build-playground
build-playground: ## Builds the playground
	$(DUNE) build @playground-assets
	cd playground && yarn && yarn build

.PHONY: build-site
build-site: build-playground ## Builds the whole site (including playground)
	yarn && yarn docs:build

.PHONY: build-blog
build-blog: ## Builds the blog
	cd blog && yarn && yarn build
