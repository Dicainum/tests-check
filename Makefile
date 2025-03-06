test: 
	npm test

test-steps:
	node --test --test-name-pattern step1
	node --test --test-name-pattern step2
	node --test --test-name-pattern step3
	node --test --test-name-pattern step4
	node --test --test-name-pattern step5