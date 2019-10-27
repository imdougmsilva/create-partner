FROM node:11.12-alpine

ENV NODE_PATH=/app

RUN mkdir -p /app

WORKDIR /app
COPY ./src /app

RUN npm install

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm start

EXPOSE 3030



