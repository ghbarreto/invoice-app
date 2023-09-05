package invoices

import (
	"backend-api/db"
	"fmt"
)

type InvoiceStatus struct {
	Paid      string `json:"paid"`
	Completed string `json:"completed"`
	Pending   string `json:"pending"`
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
		var c int

		row.Scan(&s, &c)

		if s == "paid" {
			status.Paid = fmt.Sprintf("%d", c)
		} else if s == "completed" {
			status.Completed = fmt.Sprintf("%d", c)
		} else if s == "pending" {
			status.Pending = fmt.Sprintf("%d", c)
		}
	}

	db.Db().Close()

	return status
}
