package product

import (
	"encoding/json"
	"net/http"
)

type P struct {
	Id               int    `json:"id"`
	Completed_orders int    `json:"completed_orders"`
	Created_on       string `json:"created_on"`
	Currency         string `json:"currency"`
	Description      string `json:"description"`
	Is_live          bool   `json:"is_live"`
	Min_rental_days  int    `json:"min_rental_days"`
	Price            int32  `json:"price"`
	User_id          int32  `json:"user_id"`
}

func Product(w http.ResponseWriter, r *http.Request) {

	// var product []P

	// rows, err := db.Db().Query("SELECT * FROM products")

	// if err != nil {
	// 	fmt.Println(err)
	// }

	// for rows.Next() {
	// 	var p_listing P

	// 	rows.Scan(&p_listing.Id, &p_listing.Completed_orders, &p_listing.Created_on,
	// 		&p_listing.Currency, &p_listing.Description, &p_listing.Is_live,
	// 		&p_listing.Min_rental_days, &p_listing.Price, &p_listing.User_id)

	// 	product = append(product, p_listing)
	// }

	// rows.Close()
	// db.Db().Close()

	// jsonData, err := json.Marshal(product)
	// if err != nil {
	// 	http.Error(w, "Error marshaling JSON", http.StatusInternalServerError)
	// 	return
	// }

	// w.Header().Set("Content-Type", "application/json")
	// w.Write(jsonData)
	type b struct {
		Id   int    `json:"id"`
		Name string `json:"name"`
	}
	mock := []b{
		{Id: 1, Name: "hello"},
	}

	jsonData, err := json.Marshal(mock)
	if err != nil {
		http.Error(w, "Error marshaling JSON", http.StatusInternalServerError)
		return
	}

	w.Write(jsonData)
}
