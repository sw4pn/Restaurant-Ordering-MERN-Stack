# Restaurant-Ordering-MERN-Stack

- Check the Live version of the website here: `https://gilded-gaufre-eaa898.netlify.app/`

## Source Code

- Backend Directory: `restaurant_express` ExpressJS + MongoDB + Mongoose
- Frontend Directory: `restaurant_frontend` ReactJS + Redux + TailwindCSS

## Local Installation

- clone the repo with `git clone https://github.com/sw4pn/Restaurant-Ordering-MERN-Stack.git`

### Install & Run ExpressJS backend

- open cmd prompt in the project directory.
- move to expressJS folder : `cd restaurant_express`
- install npm libraries required : `npm install`
- run your expressJS server : `npm run start`
- the server should be started at `http://localhost:4000`

#### API Endpoints

- get all dishes : `GET /api/dishes`
- create order: `POST /api/orders`
- get all orders : `GET /api/orders`
- get single order with id 'ID' : `GET /api/orders/{ID}`

- other routes includes auth routes, CRUD routes for dishes and CRUD routes for orders for more information on routes check the directory: `/restaurant_express/src/routes` in expressJS Server.

### Install & Run Frontend ReactJS Application

- React application is built with Vite for faster development.
- open cmd prompt in the project directory
- Move to ReactJS directory `cd restaurant_frontend`
- install required dependencies : `npm install`
- run your react application : `npm run dev`
- open the web application at `http://localhost:3000/`

## Dependencies used

- Redux : state management
- formik: form handling
- yup: form validation
- moment: date handling
- shadcd-ui: to create custom ui
- axios: http request handling
- react-icons: show icons
- bcrypt & jsonwebtoken: auth & token handling
- mongoose: MongoDB data handling
