FROM node:16


WORKDIR /app

COPY package.json /app/package.json

RUN npm install

ADD . /app
# Bundle app source
COPY . ./app

EXPOSE 8000
CMD [ "npm","run", "start" ]