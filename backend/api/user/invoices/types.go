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

	Items []InvoiceItems `json:"items"`
}

type Body struct {
	Uid string `json:"uid"`
}

type InvoiceStatus struct {
	Paid      *int `json:"paid"`
	Completed *int `json:"completed"`
	Pending   *int `json:"pending"`
}
