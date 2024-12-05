package config
import (
    "fmt"
    "SE/entity" // Adjust the import path to your actual project structure

)

// SetupPaymentDatabase migrates the Payment schema and inserts sample data
func SetupPassengerDatabase() {
    // Migrate the Payment schema
    err := DB().AutoMigrate(&entity.Passenger{})
    if err != nil {
        fmt.Println("Error migrating Payment table:", err)
        return
    }

	passenger := []entity.Passenger{
		{
			UserName:    "john_doe",
			FirstName:   "John",
			LastName:    "Doe",
			PhoneNumber: "1234567890",
			Email:       "john.doe@example.com",
			Password:    "password123",
		},
		{
			UserName:    "jane_smith",
			FirstName:   "Jane",
			LastName:    "Smith",
			PhoneNumber: "0987654321",
			Email:       "jane.smith@example.com",
			Password:    "password123",
		},
	}

    // Insert sample data into the database
    result := DB().Create(&passenger)
    if result.Error != nil {
        fmt.Println("Error adding sample PAYMENT data:", result.Error)
    } else {
        fmt.Println("Pasenger data has been added to the database.")
    }
}