package invoices

import (
	"backend-api/db"
)

type InvoiceItems struct {
	Invoice_id  string  `json:"invoice_id"`
	Item_id     string  `json:"item_id"`
	Name        string  `json:"name"`
	Item_amount int     `json:"item_amount"`
	Price       float64 `json:"price"`
	Total       float64 `json:"total"`
}

func getInvoiceItems(invoice_id *string) []InvoiceItems {
	var items []InvoiceItems

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
		var i InvoiceItems

		err := rows.Scan(&i.Invoice_id, &i.Item_id, &i.Name, &i.Item_amount, &i.Price)

		if err != nil {
			panic(err)
		}

		i.Total = float64(i.Item_amount) * i.Price

		items = append(items, i)
	}

	return items
}
