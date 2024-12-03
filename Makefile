run:
	pipelight run ${job} 
	pipelight logs rm
	hwatch --color --no-title -n 0.1 pipelight logs -vvvv

restart:
	deno cache --reload pipelight.ts