SELECT user_id, product_id, quantity, name, price
    FROM cart JOIN products
    ON cart.product_id = products.id
    WHERE user_id = $1
;