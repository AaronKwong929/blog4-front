FROM node:latest

EXPOSE 8000

WORKDIR /project/blog-front

COPY . .

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]