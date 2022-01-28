FROM node:16.13.0-alpine

LABEL description="This is the base docker image for the Drawex Frontend"
LABEL maintainer = ["nivjayak@cisco.com", "nivjayak@cisco.com"]

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]

RUN npm install
COPY . .
EXPOSE 3000

CMD ["npm", "start"]