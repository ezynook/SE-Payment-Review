package config

import (
	"SE/entity"
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

// DB returns the database instance
func DB() *gorm.DB {
	return db
}

// ConnectionDB initializes the SQLite database connection
func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("project-sa67.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("Connected to database")
	db = database
}

// SetupDatabase migrates schemas and adds sample data
func SetupDatabase() {
	// Call AutoMigrate to set up your database schema for all entities
	err := db.AutoMigrate(&entity.Review{}, &entity.Payment{}) // Add other entities as needed
	if err != nil {
		fmt.Println("Error migrating tables:", err)
		return
	}

	// Call setup functions to add sample data
	SetupReviewDatabase()
	SetupPaymentDatabase()
	fmt.Println("Sample data has been added to the database.")
}
