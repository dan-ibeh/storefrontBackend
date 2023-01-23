# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 


### Database Schema

#### Users table

| id        | username  | first_name | last_name |  password  |
| :-------- | :-------- | :--------- | :-------- | :--------- |
| `integer` | `VARCHAR` | `VARCHAR`  | `VARCHAR` |  `VARCHAR` |

#### Products table

| id        | name      | price     | category       |
| :-------- | :-------- | :-------- | :------------- |
| `integer` | `VARCHAR` | `integer` | `VARCHAR`      |

#### Orders table

| id        |  status       | user_id(fkey) |
| :-------- | :------------ | :----------- |
| `integer` | `VARCHAR`     | `integer`    |

#### Order-products table

| id        |  quantity  | order_id(fkey) | product_id(fkey)  |
| :-------- | :--------- | :-------------- | :---------------- |
| `integer` | `integer`  | `integer`       | `integer`         |
## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## API Reference
### Product routes
#### Get Products
```http
  GET /products/
```

Returns all products

#### Get Product By Id
```http
  GET /products/:id
```

Returns a product using the id parameter

#### Get Product By Category
```http
  GET /products/category/:category
```

Returns all product using the id parameter

#### Create Product
```http
  POST /products
```

Creates a product

!! Requires token in the request headers object.

| Body       | Type     | Description             |
| :--------- | :------- | :---------------------- |
| `name`     | `string` | Name of the product     |
| `price`    | `number` | price of the product    |
| `category` | `string` | category of the product |

#### Edit Product
```http
  PUT /products/:id
```

Edits a product based using the id parameter

| Body       | Type     | Description             |
| :--------- | :------- | :---------------------- |
| `name`     | `string` | Name of the product     |
| `price`    | `number` | price of the product    |
| `category` | `string` | category of the product |

#### Delete Product
```http
  DELETE /products/:id
```

Deletes a product based using the id parameter

!! Requires token in the request headers object.

### User routes
#### Get Users
```http
  GET /users
```

Returns all users

!! Requires token in the request headers object.

#### Get User By Id
```http
  GET /users/:id
```

Returns a user using the id parameter

!! Requires token in the request headers object.

#### Create User
```http
  POST /users
```

Creates a user

!! Requires token in the request headers object.

| Body         | Type     | Description             |
| :----------- | :------- | :---------------------- |
| `username`   | `string` | username of the user    |
| `first_name` | `string` | first name of the user  |
| `last_name`  | `string` | last name of the user   |
| `password`   | `string` | password of the user    |

#### Edit User
```http
  PUT /users/:id
```

Edits a user based using the id parameter

| Body         | Type     | Description             |
| :----------- | :------- | :---------------------- |
| `username`   | `string` | username of the user    |
| `first_name` | `string` | first name of the user  |
| `last_name`  | `string` | last name of the user   |
| `password`   | `string` | password of the user    |

#### Delete User
```http
  DELETE /users/:id
```

Deletes a user based using the id parameter

!! Requires token in the request headers object.

### Order routes
#### Get Orders
```http
  GET /orders
```

Returns all orders

#### Get Order By Id
```http
  GET /orders/:id
```

Returns an order using the id parameter

#### Create Order
```http
  POST /orders
```

Creates an order

!! Requires token in the request headers object.

| Body       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `status`   | `string` | status of the order   |
| `user_id`  | `number` | user id of the order  |

#### Create Order-Products
```http
  POST /orders
```

Creates an order

!! Requires token in the request headers object.

| Body          | Type     | Description             |
| :------------ | :------- | :---------------------- |
| `quantity`    | `number` | quantity of the order   |
| `order_id`    | `number` | order id of the order   |
| `product_id`  | `number` | product id of the order |

#### Edit Order
```http
  PUT /orders/:id
```

Edits an order based using the id parameter

| Body       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `status`   | `string` | status of the order   |
| `user_id`  | `number` | user id of the order  |

#### Delete Order
```http
  DELETE /orders/:id
```

Deletes an order based using the id parameter

!! Requires token in the request headers object.

#### Get Current Order By User Id
```http
  GET /orders/active/:user_id
```

Returns an active order using the user_id parameter

!! Requires token in the request headers object.

#### Get Current Order By User Id
```http
  GET /orders/completed/:user_id
```

Returns all completed orders using the user_id parameter

!! Requires token in the request headers object.

### Dashboard routes
#### Get Five Most Popular Pproducts
```http
  GET /five_most_popular
```

Returns the five most popular products