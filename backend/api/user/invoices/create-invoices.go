package invoices

import (
	api "backend-api/api/utils"
	"backend-api/db"
	"fmt"
	"net/http"
)

type ManageInvoice struct {
	Invoice
	Uid string `json:"uid"`
}

// WITH inserted_invoice AS (
// 	INSERT INTO invoices (date_due, currency_code, user_id, description, price, status)
// 	VALUES ('2023-09-07T19:38:21.178Z', 'BRL', 'sZq0R42xeSgSS4V9yK48GC4l0WD3', 'this is the description', 150.2, 'pending')
// 	RETURNING id
//   )

//   INSERT INTO invoice_address (first_name, last_name, address, country, city, client_email, zip_code, invoice_id, user_id)
//   SELECT 'Test', 'Last_test', 'this is the address', 'Brazil', 'Sao Paulo', 'test@gmail.com', '4420-5223', id, 'sZq0R42xeSgSS4V9yK48GC4l0WD3'
//   FROM inserted_invoice;

func CreateInvoice(w http.ResponseWriter, r *http.Request) {
	var invoice ManageInvoice

	api.JsonDecode(r, &invoice)

	insertInvoice := `WITH inserted_invoice AS (
		INSERT INTO invoices (user_id, date_due, currency_code, description, price, status)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id as invoice_id
	)
	INSERT INTO invoice_address (first_name, last_name, address, country, city, client_email, zip_code, invoice_id, user_id)
	SELECT $7, $8, $9, $10, $11, $12, $13, invoice_id, $14
	FROM inserted_invoice
	RETURNING invoice_id;
	
	`

	row := db.Db().QueryRow(insertInvoice, invoice.Uid, api.DateToUTC(invoice.Date_due), invoice.Currency_code, invoice.Description,
		invoice.Price, invoice.Status, invoice.First_name, invoice.Last_name, invoice.Address,
		invoice.Country, invoice.City, invoice.Client_Email, invoice.Zip_Code, invoice.Uid)

	err := row.Scan(&invoice.Id)
	fmt.Println(err)
	db.Db().Close()

	if err != nil {
		api.Resp(w, 500, err)
	} else {
		api.Resp(w, 200, invoice)
	}

}
