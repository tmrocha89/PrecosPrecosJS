#FROM alpine:3.3
#WORKDIR /tmp
#RUN wget http://nodejs.org/dist/v6.9.4/node-v6.9.4-linux-x86.tar.xz
#RUN tar -xf node-v6.9.4-linux-x86.tar.xz
#RUN cp -r node-v6.9.4-linux-x86/bin/ /bin/
FROM node:alpine
RUN mkdir /precos
WORKDIR /precos
COPY package.json /precos
RUN npm install
COPY . /precos
EXPOSE 3000
CMD ["node", "./bin/www"]