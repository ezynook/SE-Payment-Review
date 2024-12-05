package entity


import "gorm.io/gorm"


type StatusPromotion struct {

   gorm.Model

   StatusPromorion string  `json:"status_promotion"` // ชื่อประเภทส่วนลด เช่น "amount" หรือ "percent"

}