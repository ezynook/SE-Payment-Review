package Passenger

import (
	"net/http"
	"SE/config"
	"SE/entity"

	"github.com/gin-gonic/gin"
)

// CreatePassenger handles the creation of a new passenger
func CreatePassenger(c *gin.Context) {
	var passenger entity.Passenger
	if err := c.ShouldBindJSON(&passenger); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&passenger).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create passenger"})
		return
	}

	c.JSON(http.StatusCreated, passenger)
}

// GetPassenger retrieves a passenger by ID
func GetPassenger(c *gin.Context) {
	id := c.Param("id")
	var passenger entity.Passenger

	if err := config.DB().First(&passenger, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Passenger not found"})
		return
	}

	c.JSON(http.StatusOK, passenger)
}

// ListPassengers retrieves all passengers
func ListPassengers(c *gin.Context) {
	var passengers []entity.Passenger
	if err := config.DB().Find(&passengers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch passengers"})
		return
	}

	c.JSON(http.StatusOK, passengers)
}

// UpdatePassenger updates a passenger's information
func UpdatePassenger(c *gin.Context) {
	id := c.Param("id")
	var passenger entity.Passenger

	if err := config.DB().First(&passenger, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Passenger not found"})
		return
	}

	if err := c.ShouldBindJSON(&passenger); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Save(&passenger).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update passenger"})
		return
	}

	c.JSON(http.StatusOK, passenger)
}

// DeletePassenger deletes a passenger by ID
func DeletePassenger(c *gin.Context) {
	id := c.Param("id")
	if err := config.DB().Delete(&entity.Passenger{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete passenger"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Passenger deleted successfully"})
}
