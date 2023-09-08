package invoices

import (
	"backend-api/db"
)

func getInvoiceItems(invoice_id *string) []invoiceItems {
	var items []invoiceItems

	query := `
		SELECT invoice_items.invoice_id, items.id as item_id, items.name, invoice_items.item_amount,  items.price
			FROM invoice_items
			FULL JOIN items ON invoice_items.item_id = items.id
			WHERE invoice_items.invoice_id = $1
	`

	rows, err := db.Db().Query(query, invoice_id)

	if err != nil {
		panic(query)
	}

	for rows.Next() {
		var i invoiceItems

		err := rows.Scan(&i.Invoice_id, &i.Item_id, &i.Name, &i.Item_amount, &i.Price)

		if err != nil {
			panic(err)
		}

		i.Total = float64(i.Item_amount) * i.Price

		items = append(items, i)
	}

	return items
}
