package main

import (
	"net/http"
	"SE/config"
	"SE/controller/Payment"
	"SE/controller/review"

	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {
	// Initialize the database connection and setup
	config.ConnectionDB()
	config.SetupDatabase()

	// Create a Gin router
	r := gin.Default()

	// Apply CORS Middleware
	r.Use(CORSMiddleware())

	// Payment Routes
	r.POST("/payments", payment.CreatePayment)
	r.GET("/payments/:id", payment.GetPayment)
	r.GET("/payments", payment.ListPayments)
	r.DELETE("/payments/:id", payment.DeletePayment)
	r.PATCH("/payments/:id", payment.UpdatePayment)

	// Review Routes
	r.POST("/reviews", review.CreateReview)
	r.GET("/reviews/:id", review.GetReview)
	r.GET("/reviews", review.ListReviews)
	r.DELETE("/reviews/:id", review.DeleteReview)
	r.PATCH("/reviews/:id", review.UpdateReview)

	// Root route for health check
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Start the server
	r.Run("localhost:" + PORT)
}

// CORSMiddleware sets up CORS headers for cross-origin requests
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
