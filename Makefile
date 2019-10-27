KERNEL := $$(uname | tr '[:upper:]' '[:lower:]')
DOCKER_API_NAME := api
DOCKER_DEV_RUN := docker-compose run -e NODE_ENV=development
DOCKER_DEV_RUN_WITH_PORTS := $(DOCKER_DEV_RUN) --service-ports --no-deps $(DOCKER_API_NAME)
DOCKER_DEV_RUN_WITHOUT_PORTS := $(DOCKER_DEV_RUN) --no-deps $(DOCKER_API_NAME)
DOCKER_DEV_LOCAL := docker-compose -f docker-compose.yml


.PHONY: api
api:
	$(DOCKER_DEV_RUN_WITH_PORTS) npm run dev

.PHONY: build
build:
	docker-compose build
	$(DOCKER_DEV_RUN_WITHOUT_PORTS) npm ci

# The main task to dev
.PHONY: dev
dev:
	docker-compose up --remove-orphans

down:
	docker-compose down --remove-orphans

.PHONY: lint
lint:
	$(DOCKER_DEV_RUN_WITHOUT_PORTS) npm run lint

.PHONY: lint/watch
lint/watch:
	$(DOCKER_DEV_RUN_WITHOUT_PORTS) npm run lint:watch

# The main task to run
.PHONY: run
run:
	$(DOCKER_DEV_RUN_WITH_PORTS)

.PHONY: test
test:
	$(DOCKER_DEV_RUN_WITHOUT_PORTS) npm test

.PHONY: test/watch
test/watch:
	$(DOCKER_DEV_RUN_WITHOUT_PORTS) npm run test:watch

.PHONY: test/unit
test/unit:
	$(DOCKER_DEV_RUN_WITHOUT_PORTS) npm run test:unit

.PHONY: test/unit/watch
test/unit/watch:
	$(DOCKER_DEV_RUN_WITHOUT_PORTS) npm run test:unit:watch

.PHONY: seed
seed:
	$(DOCKER_DEV_LOCAL) run -e NODE_ENV=development --no-deps api npx sequelize-cli db:seed:all

# CI/Deployment specifics
install:
	cd src && npm ci --no-audit && cd -

node-test:
	cd src && npm test && cd -

node-lint:
	cd src && npm run lint && cd -

node-migration:
	cd src && npx sequelize-cli db:migrate && cd -
