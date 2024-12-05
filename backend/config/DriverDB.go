package config

import (
	"fmt"
	"SE/entity" // Adjust the import path to your actual project structure
)

// SetupDriverDatabase migrates the Driver schema and inserts sample data
func SetupDriverDatabase() {
	// Migrate the Driver schema
	err := DB().AutoMigrate(&entity.Driver{})
	if err != nil {
		fmt.Println("Error migrating Driver table:", err)
		return
	}

	// Helper function to convert uint to *uint
	toUintPtr := func(i uint) *uint {
		return &i
	}

	// Example driver
	driver := entity.Driver{
		Name:             "John Doe",
		DriverLicenseNum: "DL123456789",
		PhoneNumber:      "123-456-7890",
		Password:         "password123",
		Profile:          "https://example.com/profiles/john_doe.jpg",
		Income:           2500.00,
		GenderID:         toUintPtr(1), // Assuming Male has ID 1
		LocationID:       toUintPtr(1), // Assuming Bangkok has ID 1
		VehicleID:        toUintPtr(1), // Assuming Toyota Camry has ID 1
		StatusID:         toUintPtr(1), // Assuming Active has ID 1
		RoleID:           1,            // Assuming Role ID 1
	}

	// Insert sample data into the database
	result := DB().Create(&driver)
	if result.Error != nil {
		fmt.Println("Error adding sample DRIVER data:", result.Error)
	} else {
		fmt.Println("Driver data has been added to the database.")
	}
}
