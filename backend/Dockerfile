FROM node

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3333

RUN npx prisma generate && \
    apt update

CMD ["npm", "run", "dev"]