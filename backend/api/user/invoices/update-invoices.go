package invoices

import (
	api "backend-api/api/utils"
	"backend-api/db"
	"net/http"
)

func UpdateInvoice(w http.ResponseWriter, r *http.Request) {
	var invoice ManageInvoice

	api.JsonDecode(r, &invoice)

	updateInvoice :=
		`UPDATE invoices SET date_due = $1, currency_code = $2, 
			description = $3, status = $4, first_name = $5, last_name = $6, price = $7, 
			address = $8, country = $9, city = $10, client_email = $11, zip_code = $12 
		WHERE id = $13 AND user_id = $14 `

	_, err := db.Db().Exec(updateInvoice, invoice.Date_due, invoice.Currency_code,
		invoice.Description, invoice.Status, invoice.First_name,
		invoice.Last_name, invoice.Price, invoice.Address, invoice.Country,
		invoice.City, invoice.Client_Email, invoice.Zip_Code, invoice.Id, invoice.Uid)

	if err != nil {
		api.Resp(w, 500, err)
	}

	db.Db().Close()

	api.Resp(w, 200, invoice)
}
