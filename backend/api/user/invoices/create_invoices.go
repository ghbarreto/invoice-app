package invoices

import (
	api "backend-api/api/utils"
	"backend-api/db"
	"net/http"
)

type ManageInvoice struct {
	Invoice
	Uid string `json:"uid"`
}

func CreateInvoice(w http.ResponseWriter, r *http.Request) {
	var invoice ManageInvoice

	api.JsonDecode(r, &invoice)

	insertInvoice := `INSERT INTO invoices (user_id, date_due, currency_code, description, 
		status, first_name, last_name, price, address, country, city, client_email, zip_code)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`

	_ = db.Db().QueryRow(insertInvoice, invoice.Uid, api.DateToUTC(invoice.Date_due), invoice.Currency_code, invoice.Description,
		invoice.Status, invoice.First_name, invoice.Last_name, invoice.Price, invoice.Address,
		invoice.Country, invoice.City, invoice.Client_Email, invoice.Zip_Code).Scan(&invoice.Id)

	api.Resp(w, 200, invoice)
}
