DROP TABLE IF EXISTS
    products,
    users,
    orders,
    order_items,
    cart
CASCADE;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    price DECIMAL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    company TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code INT,
    phone VARCHAR,
    email TEXT UNIQUE
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    email TEXT,
    order_date VARCHAR,
    order_price DECIMAL,
    payment_type TEXT
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders (id),
    product_id INT REFERENCES products (id),
    price DECIMAL,
    quantity INT
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    product_id INT REFERENCES products (id),
    quantity INT
);

INSERT INTO products (name, price)
    VALUES
        ('Rocky Road', 3.75),
        ('Pretzel Rod', 2.49),
        ('Lahna Bar',  2.49),
        ('Caramel Lollipop', 1.75),
        ('Chocolate Dipped Oreos', 0.60),
        ('Grandma’s Caramels', 0.60),
        ('Grandma’s Licorice Carmels', 0.60),
        ('Le Petite Box', 4.95),
        ('Half Pound Box', 14.95),
        ('One Pound Box', 29.95),
        ('Two Pound Box', 59.95)
;

INSERT INTO users (first_name, last_name, company, address, city, state, zip_code, phone, email)
    VALUES
        ('Austin', 'Wright', 'The Wright Company', '123 Cool Ave', 'Layton', 'UT', 84041, '(801) 555-1234', 'wright2896@gmail.com'),
        ('Timmothy', 'Burns', 'Burns Inc.', '400 Mountain St.', 'Eureka', 'UT', 84123, '(801) 123-4567', 'swdesign17@gmail.com')
;

INSERT INTO orders (email, order_date, order_price, payment_type)
    VALUES
        ('wright2896@gmail.com', '03/22/2018', 4.00, 'On Delivery'),
        ('wright2896@gmail.com', '04/03/2018', 10.56, 'Mail'),
        ('swdesign17@gmail.com', '03/27/2018', 22.31, 'On Delivery')
;

INSERT INTO order_items (order_id, product_id, price, quantity)
    VALUES
        ( 1, 1, 3.75, 1 ),
        ( 2, 8, 4.95, 2 ),
        ( 3, 8, 4.95, 1 )
;

INSERT INTO cart (user_id, product_id, quantity)
    VALUES
        (1, 1, 2),
        (1, 2, 2),
        (1, 8, 1),
        (2, 4, 4),
        (2, 5, 3),
        (2, 10, 1)
;