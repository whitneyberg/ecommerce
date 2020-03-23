INSERT INTO users (first_name, last_name, company, address, city, state, zip_code, phone, email)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
;

-- SELECT DISTINCT * FROM users
--     WHERE first_name = $1
--     AND last_name = $2
--     AND company = $3
--     AND address = $4
--     AND city = $5
--     AND state = $6
--     AND zip_code = $7
--     AND phone = $8
--     AND emial = $9
--     AND password = $10
-- ;