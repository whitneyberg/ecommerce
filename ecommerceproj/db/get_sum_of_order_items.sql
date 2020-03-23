SELECT SUM(price) FROM order_items
WHERE order_id = $1
;