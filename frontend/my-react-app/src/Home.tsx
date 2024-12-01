import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [promotionCode, setPromotionCode] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [totalCost, setTotalCost] = useState(120.0);
  const [estimatedCost] = useState(141.0);

  const menuItems = [
    { name: "Home", icon: "https://cdn-icons-png.flaticon.com/128/18390/18390765.png", route: "/" },
    { name: "Payment", icon: "https://cdn-icons-png.flaticon.com/128/18209/18209461.png", route: "/payment" },
    { name: "Review", icon: "https://cdn-icons-png.flaticon.com/128/7656/7656139.png", route: "/review" },
    { name: "History", icon: "https://cdn-icons-png.flaticon.com/128/9485/9485945.png", route: "/review/history" },
  ];

  const handleMenuClick = (item: { name: string; icon: string; route: string }) => {
    navigate(item.route);
  };
  const handleMapClick = () => {
    window.open("https://www.google.com/maps", "_blank"); // Replace with actual map URL
  };
  const handleProceed = () => {
    if (isUsed || !promotionCode) {
      console.log("Proceeding with payment...");
      navigate("/payment");
    } else {
      alert("Please use or validate the promotion code before proceeding.");
    }
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setIsUsed(false);
  };
  
  const handleUpdate = () => {
    if (!promotionCode.trim()) {
      // Handle blank promotion code
      setPromotionCode("None"); // Reset to "None" if blank
      alert("Promotion code cannot be blank. Resetting to 'None'.");
      navigate("/payment"); // Allow navigation to the payment page
    } else if (promotionCode === "PROMO123") {
      setTotalCost(estimatedCost * 0.85); // Apply a 15% discount
      alert("Promotion code applied successfully!");
      setIsUsed(true);
    } else {
      alert("Invalid Promotion Code. Please try again.");
    }
    setIsEditMode(false);
  };
  
  const handleUsed = () => {
    if (!promotionCode.trim() || promotionCode === "None") {
      alert("No valid promotion code applied.");
    } else if (promotionCode === "PROMO123") {
      alert("This promotion code has already been used.");
    } else {
      alert("Promotion code is not valid or not applied.");
    }
  };
  
  

  return (
    <div className="payment-page">
      {/* Sidebar */}
      <div className="sidebar">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="menu-item"
            onClick={() => handleMenuClick(item)}
          >
            <img src={item.icon} alt={item.name} className="menu-icon" />
            <p className="menu-text">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>PAYMENT</h1>
          <div className="progress-indicator">
            <div className="circle filled"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
        <div className="content-wrapper">
  <div className="information-container">
    <h2>INFORMATION</h2>
    <div className="information-details">
  <div className="row">
    <span className="label-with-icon">
      <img
        src="https://cdn-icons-png.flaticon.com/128/854/854904.png"
        alt="Starting Point Icon"
        className="info-icon"
      />
      Starting Point:
    </span>
    <span>Bangkok</span>
  </div>
  <div className="row">
    <span className="label-with-icon">
      <img
        src="https://cdn-icons-png.flaticon.com/128/1257/1257385.png"
        alt="Destination Icon"
        className="info-icon"
      />
      Destination:
    </span>
    <span>London</span>
  </div>
  <div className="row">
    <span className="label-with-icon">
      <img
        src="https://cdn-icons-png.flaticon.com/128/5488/5488668.png"
        alt="Vehicle Type Icon"
        className="info-icon"
      />
      Vehicle Type:
    </span>
    <span>Economy</span>
  </div>
  <div className="row">
    <span className="label-with-icon">
      <img
        src="https://cdn-icons-png.flaticon.com/128/2382/2382625.png"
        alt="Estimated Cost Icon"
        className="info-icon"
      />
      Estimated Cost:
    </span>
    <span>{estimatedCost.toFixed(2)} Baht</span>
  </div>
      <div className="row">
  <span className="promotion-label">
    
    <img
      src="https://cdn-icons-png.flaticon.com/128/6632/6632881.png"
      alt="Promo Code Icon"
      className="promo-code-icon"
    />
    Promotion Code:
  </span>
  {isEditMode ? (
    <input
      type="text"
      value={promotionCode}
      onChange={(e) => setPromotionCode(e.target.value)}
      className="promo-input"
    />
  ) : (
    <span className="promo-value">{promotionCode || "None"}</span>
  )}
</div>


      {/* Buttons moved to a separate container */}
      <div className="promotion-actions">
        <button className="used-button" onClick={handleUsed}>
          Used
        </button>
        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>
        <button
          className="update-button"
          onClick={handleUpdate}
          disabled={!isEditMode}
        >
          Update
        </button>
      </div>
      <div className="row">
        <span>Total Cost:</span>
        <span>{totalCost.toFixed(2)} Baht</span>
      </div>
    </div> 
          </div>
          <div className="avatar-container">
            <div
              className="avatar-frame"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="blinking-light"></div> {/* Blinking Light */}
              <img
                src={
                  hovered
                    ? "https://cdn-icons-png.flaticon.com/128/854/854878.png"
                    : "https://cdn-icons-png.flaticon.com/512/16802/16802273.png"
                }
                alt="User Avatar"
                className="avatar-img"
              />
            </div>
            <p className="booking-text">
              Booking: <span>12</span>
            </p>
              <p className="distance-text">
        Distance: <span>20 KM</span>
      </p>
      <div className="map-container" onClick={handleMapClick}>
        <img
          src="https://img.freepik.com/premium-vector/map-with-destination-location-point-city-map-with-street-river-gps-map-navigator-concept_34645-1078.jpg"
          alt="Map Preview"
          className="map-img"
        />
        
      </div>
      <p className="map-label">View Map</p>
          </div>
        </div>

        <div className="buttons">
          <button className="proceed-button" onClick={handleProceed}>
            Proceed to Payment
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
