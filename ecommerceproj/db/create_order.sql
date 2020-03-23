  
INSERT INTO orders (email, order_date, order_price, payment_type)
    VALUES
        ($1, $2, $3, $4)
;

-- SELECT DISTINCT * FROM orders
--     AND user_id = $2
--     AND order_date = $4
-- ;