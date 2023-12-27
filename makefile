install: 
	npm ci

lint:
	npx eslint .

lintfix:
	npx eslint . --fix

test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js