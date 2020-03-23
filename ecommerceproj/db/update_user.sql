UPDATE users
    SET
        first_name = $2,
        last_name = $3,
        company = $4,
        address = $5,
        city = $6,
        state = $7,
        zip_code = $8,
        phone = $9,
        email = $10
    WHERE id = $1
;