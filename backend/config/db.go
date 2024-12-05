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

func SetupDatabase() {
	// Automatically migrate schemas for all entities
	err := db.AutoMigrate(
		&entity.Review{},
		&entity.Payment{},
		&entity.Booking{},
		&entity.Promotion{},
		&entity.StatusPromotion{},
		&entity.DiscountType{},
		&entity.Passenger{},
		&entity.Driver{},
	)
	if err != nil {
		fmt.Println("Error migrating tables:", err)
		return
	}

	// Seed sample data for each entity
	SetupReviewDatabase()
	SetupPaymentDatabase()
	SetupBookingDatabase()
	SetupDriverDatabase()
	SetupPassengerDatabase()
	SetupPromotionDatabase()

	fmt.Println("Database setup and sample data seeding completed.")
}