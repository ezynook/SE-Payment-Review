import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./payment_method.css";

const PaymentMethod: React.FC = () => {
  const [method, setMethod] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<string | null>(null);

  const handleCardInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const numericValue = value.replace(/\D/g, ""); // Keep only digits
      const formattedValue = numericValue
        .match(/.{1,4}/g) // Split into groups of 4
        ?.join("-")
        .substr(0, 19) || ""; // Restrict to 19 characters

      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: formattedValue,
      }));
    } else {
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const validationErrors: { [key: string]: string } = {};

    // Validate Card Number
    const cardNumberRegex = /^(\d{4}-){3}\d{4}$/;
    if (!cardNumberRegex.test(cardDetails.cardNumber)) {
      validationErrors.cardNumber =
        "Card Number must be in XXXX-XXXX-XXXX-XXXX format.";
    }

    // Validate Cardholder Name
    if (!cardDetails.cardholderName.trim().includes(" ")) {
      validationErrors.cardholderName = "Please enter a valid first and last name.";
    }
    // Validate Expiry Date
    if (!cardDetails.expiryDate) {
        validationErrors.expiryDate = "Please select an expiry date.";
      }
    // Validate Expiry Month
    if (!cardDetails.expiryMonth) {
      validationErrors.expiryMonth = "Please select an expiry month.";
    }

    // Validate Expiry Year
    if (!cardDetails.expiryYear) {
      validationErrors.expiryYear = "Please select an expiry year.";
    }

    // Validate CVV
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cardDetails.cvv)) {
      validationErrors.cvv = "CVV must be exactly 3 numeric digits.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // No errors means form is valid
  };

  const handlePayNow = () => {
    if (validateForm()) {
      navigate("/payment/success");
    }
  };

    function setDropdownOpen(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="payment-method-container">
      <h2>Payment</h2>
      <p className="payment-instructions">
        Choose your payment method and enter your details.
      </p>
      <div className="payment-options">
        {/* Credit/Debit Card Option */}
        <div
          className={`payment-option ${method === "card" ? "selected" : ""}`}
          onClick={() => setMethod("card")}
        >
          <p>Credit/Debit Card</p>
          <img
            src="https://taxidermyplanet.com/wp-content/uploads/2018/10/transparent-logos-credit-card-1.png"
            alt="Credit/Debit Card Logos"
          />
        </div>

        {/* Digital Wallet Option */}
        <div
          className={`payment-option ${method === "wallet" ? "selected" : ""}`}
          onClick={() => setMethod("wallet")}
        >
          <p>Digital Wallet</p>
        </div>
      </div>

      {method === "wallet" && (
        <div className="custom-dropdown">
          <label>Select Wallet</label>
          <div
            className="dropdown-selected"
            onClick={() => setDropdownOpen(!setDropdownOpen)}
          >
            {wallet ? (
              <div className="dropdown-item">
                <img
                  src={
                    wallet === "truemoney"
                      ? "https://play-lh.googleusercontent.com/eOzvk-ekluYaeLuvDkLb5RJ0KqfFQpodZDnppxPfpEfqEqbNo5erEkmwLBgqP-k-e2kQ"
                      : "https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png"
                  }
                  alt={wallet}
                  className="dropdown-image"
                />
                <span>{wallet === "truemoney" ? "TrueMoney" : "PromptPay"}</span>
              </div>
            ) : (
              <span>Select a Wallet</span>
            )}
          </div>
          {setDropdownOpen && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => {
                  setWallet("truemoney");
                  setDropdownOpen(false);
                }}
              >
                <img
                  src="https://play-lh.googleusercontent.com/eOzvk-ekluYaeLuvDkLb5RJ0KqfFQpodZDnppxPfpEfqEqbNo5erEkmwLBgqP-k-e2kQ"
                  alt="TrueMoney"
                  className="dropdown-image"
                />
                <span>TrueMoney</span>
              </div>
              <div
                className="dropdown-item"
                onClick={() => {
                  setWallet("promptpay");
                  setDropdownOpen(false);
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png"
                  alt="PromptPay"
                  className="dropdown-image"
                />
                <span>PromptPay</span>
              </div>
            </div>  
          )}
        </div>
      )}
      {method === "card" && (
        <div className="card-details-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234-5678-9012-3456"
              value={cardDetails.cardNumber}
              onChange={handleCardInputChange}
            />
            {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="cardholderName">Cardholder Name</label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              placeholder="John Doe"
              value={cardDetails.cardholderName}
              onChange={handleCardInputChange}
            />
            {errors.cardholderName && <div className="error-message">{errors.cardholderName}</div>}
          </div>
          <div className="form-group">
    <label htmlFor="expiryDate">Expiry Date</label>
    <select
        id="expiryDate"
        name="expiryDate"
        value={cardDetails.expiryDate}
        onChange={handleCardInputChange}
    >
        <option value="">Date</option>
        {[...Array(31).keys()].map((day) => (
            <option key={day + 1} value={String(day + 1).padStart(2, "0")}>
                {String(day + 1).padStart(2, "0")}
            </option>
        ))}
    </select>
    {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
</div>

          <div className="form-group">
            <label htmlFor="expiryMonth">Expiry Month</label>
            <select
              id="expiryMonth"
              name="expiryMonth"
              value={cardDetails.expiryMonth}
              onChange={handleCardInputChange}
            >
              <option value="">Month</option>
              {[...Array(12).keys()].map((m) => (
                <option key={m + 1} value={String(m + 1).padStart(2, "0")}>
                  {String(m + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
            {errors.expiryMonth && <div className="error-message">{errors.expiryMonth}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="expiryYear">Expiry Year</label>
            <select
              id="expiryYear"
              name="expiryYear"
              value={cardDetails.expiryYear}
              onChange={handleCardInputChange}
            >
              <option value="">Year</option>
              {Array.from({ length: 2050 - 1980 + 1 }, (_, i) => 1980 + i).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
            {errors.expiryYear && <div className="error-message">{errors.expiryYear}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              value={cardDetails.cvv}
              onChange={handleCardInputChange}
            />
            {errors.cvv && <div className="error-message">{errors.cvv}</div>}
          </div>
        </div>
      )}
      <button className="pay-now-btn" onClick={handlePayNow}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentMethod;