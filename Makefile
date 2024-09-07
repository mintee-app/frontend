check: lint-js validate-html format-html

dev:
	python3 -m http.server --bind 0.0.0.0 --directory app

lint-js:
	npx eslint app/modules

validate-html:
	npx html-validate app/index.html

format-html:
	npx prettier --check app/index.html
