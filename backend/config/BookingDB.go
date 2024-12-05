package config

import (
	"fmt"
    "SE/entity" // Adjust the import path to your actual project structure
)

// SetupPaymentDatabase migrates the Payment schema and inserts sample data
func SetupBookingDatabase() {
    // Migrate the Payment schema
    err := DB().AutoMigrate(&entity.Booking{})
    if err != nil {
        fmt.Println("Error migrating Payment table:", err)
        return
    }

	booking := []entity.Booking{
		{
			Beginning:    "Bangkok",
			Terminus:     "London",
			StartTime:    "2024-12-01T09:00:00Z",
			EndTime:      "2024-12-01T18:00:00Z",
			Distance:     20,
			TotalPrice:   1500.00,
			BookingTime:  "2024-11-29T12:00:00Z",
			BookingStatus: "Confirmed",
		},
		{
			Beginning:    "Paris",
			Terminus:     "Rome",
			StartTime:    "2024-12-02T10:00:00Z",
			EndTime:      "2024-12-02T19:00:00Z",
			Distance:     25,
			TotalPrice:   2000.00,
			BookingTime:  "2024-11-29T14:00:00Z",
			BookingStatus: "Pending",
		},
	}

    // Insert sample data into the database
    result := DB().Create(&booking)
    if result.Error != nil {
        fmt.Println("Error adding sample PAYMENT data:", result.Error)
    } else {
        fmt.Println("Booking data has been added to the database.")
    }
}