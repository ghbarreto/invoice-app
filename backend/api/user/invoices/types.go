package invoices

type Invoice struct {
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
}

type Body struct {
	Uid string `json:"uid"`
}

type InvoiceStatus struct {
	Paid      string `json:"paid"`
	Completed string `json:"completed"`
	Pending   string `json:"pending"`
}
