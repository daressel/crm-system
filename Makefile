dev:
	docker-compose up -d && nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run main.go