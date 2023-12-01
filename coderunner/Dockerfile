FROM andreysenov/node-gyp
COPY package*.json .
COPY . .
RUN npm ci
CMD [ "npm","start" ]