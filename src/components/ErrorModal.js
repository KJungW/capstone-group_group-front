import React from "react";

const ErrorModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: "1000",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default ErrorModal;
