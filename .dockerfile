FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8000
ENV NODE_ENV production
ENV USERNAME=${USERNAME}
ENV PASSWORD=${PASSWORD}
ENV HOST=${HOST}
ENV DBPORT=${DBPORT}
CMD ["npm", "start"]