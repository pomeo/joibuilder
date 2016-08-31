MOCHA_PATH=node_modules/.bin/_mocha

test:
	NODE_ENV=test $(MOCHA_PATH) -w -G --reporter spec

test-debug:
	NODE_ENV=test $(MOCHA_PATH) -w -G --reporter spec debug

test-once:
	echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	NODE_ENV=test $(MOCHA_PATH) --reporter spec
