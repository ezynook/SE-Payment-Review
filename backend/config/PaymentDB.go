package config
import (
    "fmt"
    "SE/entity" // Adjust the import path to your actual project structure
    "time"
)

// SetupPaymentDatabase migrates the Payment schema and inserts sample data
func SetupPaymentDatabase() {
    // Migrate the Payment schema
    err := DB().AutoMigrate(&entity.Payment{})
    if err != nil {
        fmt.Println("Error migrating Payment table:", err)
        return
    }

    // Create sample payment data
    paymentData := entity.Payment{
        PaymentAmount:  500.00,
    	PaymentMethod:  "Credit/Debit Card",
        PaymentDate:    time.Now(),
        BookingID:      1,
    }

    // Insert sample data into the database
    result := DB().Create(&paymentData)
    if result.Error != nil {
        fmt.Println("Error adding sample PAYMENT data:", result.Error)
    } else {
        fmt.Println("PAYMENT data has been added to the database.")
    }
}