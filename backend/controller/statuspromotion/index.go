// controller/status/status.go
package statuspromotion

import (
	"net/http"
	"SE/config"
	"SE/entity"

	"github.com/gin-gonic/gin"
)

func GetAllStatusPromotion(c *gin.Context) {

	db := config.DB()


	var status []entity.Status
 
	db.Find(&status)
 
 
	c.JSON(http.StatusOK, &status)

}