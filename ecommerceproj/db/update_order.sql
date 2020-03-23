UPDATE orders
    SET
        order_date = $3,
        order_price = $4,
        payment_type = $5
    WHERE email = $2
    AND id = $1
;