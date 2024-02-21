run:
	bin/nodejs-package.js 10

install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	npm test --watch 

publish:
	npm publish
