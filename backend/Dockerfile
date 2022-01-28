FROM node:alpine

LABEL description="This is the base docker image for the Drawex Backend."
LABEL maintainer = ["nivjayak@cisco.com", "nivjayak@cisco.com"]

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]


RUN npm install
COPY . .
EXPOSE 8000

CMD ["npm", "start"]