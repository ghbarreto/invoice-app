package invoices

import (
	api "backend-api/api/utils"
	"backend-api/auth"
	"backend-api/db"
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

var GET_INVOICE = `SELECT invoices.id, date_due, currency_code, 
description, status, first_name, last_name, price, address, country, city, client_email, zip_code 
FROM invoices 
LEFT JOIN invoice_address ON invoices.id = invoice_address.invoice_id
WHERE invoices.user_id = $1 AND is_visible = true`

func GetInvoices(w http.ResponseWriter, r *http.Request) {
	var invoices []invoice
	uid := r.Context().Value(auth.UidContextKey).(string)

	get_filters := r.URL.Query().Get("f")
	filters := strings.Split(get_filters, ",")

	var rows *sql.Rows

	if get_filters != "" {
		if len(filters) > 0 {
			var placeholders []string
			var values []interface{}
			values = append(values, uid)

			for i, str := range filters {
				var start_at = 1 + i
				placeholders = append(placeholders, "$"+strconv.Itoa(start_at+1))
				values = append(values, str)
			}

			filter := strings.Join(placeholders, ", ")
			query := GET_INVOICE + " AND status IN (" + filter + ")"

			fmt.Println(query)
			i, err := db.Db().Query(query, values...)

			if err != nil {
				fmt.Println(err)
			}
			defer i.Close()
			rows = i
		}

	} else {
		i, err := db.Db().Query(GET_INVOICE, uid)

		if err != nil {
			fmt.Println(err)
		}
		defer i.Close()
		rows = i
	}

	for rows.Next() {
		var i invoice

		rows.Scan(&i.Id, &i.Date_due, &i.Currency_code,
			&i.Description, &i.Status,
			&i.First_name, &i.Last_name, &i.Price, &i.Address,
			&i.Country, &i.City, &i.Client_Email, &i.Zip_Code)

		i.Items = getInvoiceItems(i.Id)

		for _, items := range i.Items {
			i.Total += items.Total
		}

		invoices = append(invoices, i)

	}

	defer db.Db().Close()

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

func getInvoiceStatus(uid string) invoiceStatus {
	var status = invoiceStatus{}

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
		} else if s == "draft" {
			status.Draft = c
		}
	}

	return status
}
