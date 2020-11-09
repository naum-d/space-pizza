# [space-pizza](http://space-pizza.naum-d.ru/) | [space-pizza.naum-d.ru](http://space-pizza.naum-d.ru/)

## API
To run this project on your machine you should have installed:

`node.js` `npm` `yarn` `mongoDB`

### Run back-end

1. Add `.env` in the root of `./back` directory with:
```.env
PORT=8000
MONGO_DB=mongodb://localhost:27017/space-pizza
JWT_SIGNATURE=PassWord
```
2. Open the terminal with start point in the root of app and type `cd ./back`
3. Type `yarn install`
4. Then `yarn run sturt`
5. To populate DB type `yarn run seed`
6. To make build, type `yarn run build`
7. To run build `node ./dist/bundle.js`

### Run front-end

1. Add `.env` in the root of `./front` directory with:
```.env
NODE_ENV=dev
REACT_APP_API_SERVER=http://localhost:8000
```
2. Open the terminal with start point in the root of app and type `cd ./front`
3. Type `yarn install`
4. Then `yarn run sturt`
5. To make build, type `yarn run build`
7. The build of front-end placed into `./build`
