lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run build

set-locale:
	export LANG=ru_RU.UTF-8

check-main-link:
	echo "Ensure there's a link to Hexlet Chat on every page."

	prepare: install build