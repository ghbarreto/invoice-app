package customers

import (
	api "backend-api/api/utils"
	"backend-api/auth"
	"backend-api/db"
	"net/http"
)

// SELECT c.id, c.first_name, invoices.price from customers as c
// INNER JOIN invoices  ON c.id = invoices.customer_id
// WHERE invoices.user_id =

type Customer struct {
	Id           string  `json:"id"`
	First_name   string  `json:"first_name"`
	Last_name    string  `json:"last_name"`
	Address      *string `json:"address"`
	Country      *string `json:"country"`
	City         *string `json:"city"`
	Client_email *string `json:"email"`
	Zip_code     *string `json:"zip_code"`
	Phone        *string `json:"phone"`
}

func GetCustomers(w http.ResponseWriter, r *http.Request) {
	var customers []Customer

	uid := r.Context().Value(auth.UidContextKey).(string)

	query := "SELECT id, first_name, last_name, address, country," +
		"city, client_email as email, zip_code, phone FROM customers where user_id = $1"

	rows, err := db.Db().Query(query, uid)

	if err != nil {
		api.Resp(w, 500, err)
	}

	for rows.Next() {
		var c Customer

		rows.Scan(&c.Id, &c.First_name, &c.Last_name, &c.Address, &c.Country, &c.City, &c.Client_email, &c.Zip_code, &c.Phone)

		customers = append(customers, c)
	}

	db.Db().Close()

	api.Resp(w, 200, customers)
}
