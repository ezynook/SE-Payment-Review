package driver
import (
	"net/http"
	"SE/config"
	"SE/entity"

	"github.com/gin-gonic/gin"
)

// CreateDriver handles creating a new driver
func CreateDriver(c *gin.Context) {
	var driver entity.Driver
	if err := c.ShouldBindJSON(&driver); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Create(&driver).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create driver"})
		return
	}

	c.JSON(http.StatusCreated, driver)
}

// GetDriver handles fetching a driver by ID
func GetDriver(c *gin.Context) {
	id := c.Param("id")
	var driver entity.Driver

	if err := config.DB().Preload("Gender").Preload("Location").Preload("Vehicle").Preload("Status").Preload("Role").First(&driver, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Driver not found"})
		return
	}

	c.JSON(http.StatusOK, driver)
}

// UpdateDriver handles updating an existing driver
func UpdateDriver(c *gin.Context) {
	id := c.Param("id")
	var driver entity.Driver

	if err := config.DB().First(&driver, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Driver not found"})
		return
	}

	if err := c.ShouldBindJSON(&driver); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB().Save(&driver).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update driver"})
		return
	}

	c.JSON(http.StatusOK, driver)
}

// DeleteDriver handles deleting a driver by ID
func DeleteDriver(c *gin.Context) {
	id := c.Param("id")
	var driver entity.Driver

	if err := config.DB().First(&driver, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Driver not found"})
		return
	}

	if err := config.DB().Delete(&driver).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete driver"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Driver deleted successfully"})
}

// ListDrivers handles listing all drivers
func ListDrivers(c *gin.Context) {
	var drivers []entity.Driver

	if err := config.DB().Preload("Gender").Preload("Location").Preload("Vehicle").Preload("Status").Preload("Role").Find(&drivers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch drivers"})
		return
	}

	c.JSON(http.StatusOK, drivers)
}
