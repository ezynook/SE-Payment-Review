//import { BookingInterface } from "../../room/booking/interfaces/IBooking";

export interface PaymentInterface {
    ID?: number;               // Optional unique identifier for the payment
    PaymentDate: Date;         // Date of the payment
    TotalAmount: number;       // Total amount paid
    PaymentMethod: string;     // Method of payment (e.g., Credit Card, Cash, etc.)
    BookingID: number;         // Foreign key linking to the booking
   // Booking?: BookingInterface; // Optional associated booking data
    PromotionID?: number;      // Optional foreign key linking to a promotion, if applicable
}
