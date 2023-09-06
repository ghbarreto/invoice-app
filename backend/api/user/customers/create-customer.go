package customers

import (
	api "backend-api/api/utils"
	"backend-api/db"
	"database/sql"
	"net/http"
)

type CC struct {
	Customer
	Uid string `json:"uid"`
}

func CreateCustomer(w http.ResponseWriter, r *http.Request) {
	var customer CC
	api.JsonDecode(r, &customer)

	insertUser :=
		`INSERT INTO customers (user_id, first_name, last_name, ` +
			`address, country, city, client_email, zip_code, phone) ` +
			`VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`

	row := db.Db().QueryRow(insertUser, customer.Uid, customer.First_name,
		customer.Last_name, customer.Address, customer.Country, customer.City, customer.Client_email, customer.Zip_code, customer.Phone)
	err := row.Scan(&customer.Id)

	if err != nil && err != sql.ErrNoRows {
		api.Resp(w, 500, err)
	} else {
		db.Db().Close()
		api.Resp(w, 200, customer)
	}

}
