package invoices

import (
	api "backend-api/api/utils"
	"backend-api/auth"
	"backend-api/db"
	"fmt"
	"net/http"
)

func GetInvoices(w http.ResponseWriter, r *http.Request) {
	var invoices []Invoice
	uid := r.Context().Value(auth.UidContextKey).(string)

	rows, err := db.Db().Query(`SELECT invoices.id, date_due, currency_code, 
		description, status, first_name, last_name, price, address, country, city, client_email, zip_code 
		FROM invoices 
		LEFT JOIN invoice_address ON invoices.id = invoice_address.invoice_id
		WHERE invoices.user_id = $1 AND is_visible = true`, uid)

	if err != nil {
		fmt.Println(err)
	}

	defer rows.Close()

	for rows.Next() {
		var i Invoice

		rows.Scan(&i.Id, &i.Date_due, &i.Currency_code,
			&i.Description, &i.Status,
			&i.First_name, &i.Last_name, &i.Price, &i.Address,
			&i.Country, &i.City, &i.Client_Email, &i.Zip_Code)

		i.Items = getInvoiceItems(i.Id)

		invoices = append(invoices, i)

	}

	res := map[string]interface{}{
		"invoices_status": getInvoiceStatus(uid),
		"invoices":        invoices,
		"invoices_count":  getInvoicesCount(uid),
	}

	api.Resp(w, http.StatusOK, res)
}

func getInvoicesCount(uid string) int {
	var count int

	row := db.Db().QueryRow("SELECT COUNT(*) as count from invoices where user_id = $1 AND is_visible = true", uid)

	row.Scan(&count)

	db.Db().Close()

	return count
}

func getInvoiceStatus(uid string) InvoiceStatus {
	var status = InvoiceStatus{}

	row, err := db.Db().Query("SELECT status, COUNT(*) from invoices where user_id = $1 AND is_visible = true GROUP BY status ", uid)

	if err != nil {
		fmt.Println(err)
	}

	defer row.Close()

	for row.Next() {
		var s string
		var c *int

		row.Scan(&s, &c)

		if s == "paid" {
			status.Paid = c
		} else if s == "completed" {
			status.Completed = c
		} else if s == "pending" {
			status.Pending = c
		}
	}

	db.Db().Close()

	return status
}
