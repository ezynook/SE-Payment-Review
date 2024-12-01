import React from 'react';
import { useNavigate } from 'react-router-dom';
import './payment_success.css';

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-success-container">
            <h2>Payment System</h2>
            <h3>Payment Successful!</h3>
            <p>Your booking has been confirmed and the payment has been processed.</p>
            <p>Your driver has been notified and will be on their way shortly.</p>
            <button className="close-btn" onClick={() => navigate('/review')}>Close</button>
        </div>
    );
};

export default PaymentSuccess;
