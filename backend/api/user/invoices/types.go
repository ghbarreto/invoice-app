package invoices

type invoice struct {
	Id            *string `json:"invoice_id"`
	Date_due      string  `json:"date_due"`
	Currency_code *string `json:"currency_code"`
	Description   string  `json:"description"`
	Status        string  `json:"status"`
	First_name    string  `json:"first_name"`
	Last_name     string  `json:"last_name"`
	Price         float64 `json:"price"`
	Address       *string `json:"address"`
	Country       *string `json:"country"`
	City          *string `json:"city"`
	Client_Email  *string `json:"client_email"`
	Zip_Code      string  `json:"zip_code"`

	Items []invoiceItems `json:"items"`
}

type invoiceItems struct {
	Invoice_id  string  `json:"invoice_id"`
	Item_id     string  `json:"item_id"`
	Name        string  `json:"name"`
	Item_amount int     `json:"item_amount"`
	Price       float64 `json:"price"`
	Total       float64 `json:"total"`
}

type body struct {
	Uid string `json:"uid"`
}

type invoiceStatus struct {
	Paid      *int `json:"paid"`
	Completed *int `json:"completed"`
	Pending   *int `json:"pending"`
}
