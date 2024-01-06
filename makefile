install: install-deps
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10

install-deps:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish
