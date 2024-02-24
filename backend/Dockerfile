FROM node

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3333

RUN npx prisma generate && \
    apt update && \ 
    apt install netcat-openbsd

CMD ["bash", "-c", "until nc -z -v database 5432; do sleep 1; done && npx prisma migrate dev && npx prisma db seed && npm run dev"]