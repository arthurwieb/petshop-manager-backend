FROM node:22
 
WORKDIR /usr/src/app
 
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate
 
COPY . .
 
RUN yarn build
 
EXPOSE 8080
CMD [ "yarn", "start", "--memory=1g", "--memory-swap=2g" ]