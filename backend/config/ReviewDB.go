package config

import (
    "SE/entity" // Adjust the import path if necessary
    "fmt"
)

// SetupReviewDatabase migrates the Review schema and inserts sample data
func SetupReviewDatabase() {
    // Migrate the Review schema
    err := DB().AutoMigrate(&entity.Review{})
    if err != nil {
        fmt.Println("Error migrating Review table:", err)
        return
    }

    // Create sample review data
    review := entity.Review{
        Rating:      5,
        Comment:     "Excellent service!",
        BookingID:   1,   // Assume this Booking ID exists
        PassengerID: 101, // Assume this Passenger ID exists
        DriverID:    301, // Assume this Driver ID exists
    }

    // Insert sample data into the database
    result := DB().Create(&review)
    if result.Error != nil {
        fmt.Println("Error adding sample REVIEW data:", result.Error)
    } else {
        fmt.Println("REVIEW data has been added to the database.")
    }
}
