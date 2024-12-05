package booking

import (
	"SE/config"
	"SE/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetBooking retrieves a single booking by ID
func GetBooking(c *gin.Context) {
	id := c.Param("id")
	var booking entity.Booking

	// Fetch booking from the database
	if err := config.DB().Preload("Passenger").Preload("Driver").First(&booking, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	c.JSON(http.StatusOK, booking)
}

// ListBookings retrieves all bookings
func ListBookings(c *gin.Context) {
	var bookings []entity.Booking

	// Fetch all bookings from the database
	if err := config.DB().Preload("Passenger").Preload("Driver").Find(&bookings).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch bookings"})
		return
	}

	c.JSON(http.StatusOK, bookings)
}

// CreateBooking adds a new booking
func CreateBooking(c *gin.Context) {
	var booking entity.Booking

	// Bind JSON payload to the booking entity
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Save the booking to the database
	if err := config.DB().Create(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking"})
		return
	}

	c.JSON(http.StatusCreated, booking)
}

// UpdateBooking updates an existing booking
func UpdateBooking(c *gin.Context) {
	id := c.Param("id")
	var booking entity.Booking

	// Find the booking in the database
	if err := config.DB().First(&booking, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	// Bind JSON payload to the booking entity
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Save the updated booking to the database
	if err := config.DB().Save(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update booking"})
		return
	}

	c.JSON(http.StatusOK, booking)
}

// DeleteBooking deletes a booking by ID
func DeleteBooking(c *gin.Context) {
	id := c.Param("id")
	var booking entity.Booking

	// Find the booking in the database
	if err := config.DB().First(&booking, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	// Delete the booking
	if err := config.DB().Delete(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete booking"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Booking deleted successfully"})
}
