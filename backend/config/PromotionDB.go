package config

import (
    "fmt"
    "SE/entity" // Adjust the import path to your actual project structure
    "time"
)

// SetupPromotionDatabase migrates the Promotion schema and inserts sample data
func SetupPromotionDatabase() {
    // Migrate the Promotion schema
    err := DB().AutoMigrate(&entity.Promotion{})
    if err != nil {
        fmt.Println("Error migrating Promotion table:", err)
        return
    }
    
    // Create sample Status records
    Active := entity.StatusPromotion{StatusPromorion: "ACTIVE"}
    Expired := entity.StatusPromotion{StatusPromorion: "EXPIRED"}
    db.FirstOrCreate(&Active, &entity.StatusPromotion{StatusPromorion: "ACTIVE"})
    db.FirstOrCreate(&Expired, &entity.StatusPromotion{StatusPromorion: "EXPIRED"})

    // Create sample DiscountType records
    AmountDiscount := entity.DiscountType{DiscountType: "amount"}
    PercentDiscount := entity.DiscountType{DiscountType: "percent"}
    db.FirstOrCreate(&AmountDiscount, &entity.DiscountType{DiscountType: "amount"})
    db.FirstOrCreate(&PercentDiscount, &entity.DiscountType{DiscountType: "percent"})

    promotions := []entity.Promotion{
        {
            PromotionCode:        "DRIVE001",
            PromotionName:        "ส่งฟรี ไม่มีข้อแม้!",
            PromotionDescription: "รับบริการส่งฟรีสำหรับระยะทางไม่เกิน 10 กม.",
            Discount:             100.0, // Discount value
            EndDate:              time.Now().Add(30 * 24 * time.Hour),
            UseLimit:             5,
            UseCount:             0,
            Distance:             10.0,
            Photo:                "promo1.jpg",
            DiscountTypeID:       2, // Percent discount
            StatusPromotionID:    1, // ACTIVE
        },
        // Add other promotions here
    }

    // Save sample promotions to the database
    for _, promo := range promotions {
        db.FirstOrCreate(&promo, &entity.Promotion{PromotionCode: promo.PromotionCode})
    }
}
