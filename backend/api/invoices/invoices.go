package product

import (
	api "backend-api/api/utils"
	"backend-api/db"
	"encoding/json"
	"fmt"
	"net/http"
)

type I struct {
	Invoice_id    string  `json:"id"`
	Date_due      string  `json:"date_due"`
	Currency_code string  `json:"currency_code"`
	Description   string  `json:"description"`
	Status        string  `json:"status"`
	First_name    string  `json:"first_name"`
	Last_name     string  `json:"last_name"`
	Price         float64 `json:"price"`
}

type Body struct {
	Uid string `json:"uid"`
}

func Invoices(w http.ResponseWriter, r *http.Request) {
	var invoices []I
	var u Body
	err := json.NewDecoder(r.Body).Decode(&u)

	if err != nil {
		fmt.Println("Error decoding JSON")
		panic(err)
	}

	rows, err := db.Db().Query("SELECT invoice_id, date_due, currency_code, "+
		"description, status, first_name, last_name, price "+
		"FROM invoices WHERE user_id = $1", u.Uid)

	if err != nil {
		fmt.Println(err)
	}

	defer rows.Close()

	for rows.Next() {
		var invoice I

		rows.Scan(&invoice.Invoice_id, &invoice.Date_due, &invoice.Currency_code,
			&invoice.Description, &invoice.Status,
			&invoice.First_name, &invoice.Last_name, &invoice.Price)
		invoices = append(invoices, invoice)
	}

	db.Db().Close()

	api.Resp(w, http.StatusOK, invoices)
}
