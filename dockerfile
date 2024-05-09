FROM node 

WORKDIR /fedemusci/projectbackend:1.0.4

COPY package*json ./

RUN npm install 

COPY . .

EXPOSE 8080

CMD ["npm","run","test"]

