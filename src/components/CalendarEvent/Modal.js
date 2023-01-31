export default function Modal({ openModal, onClose, children }) {
  if (!openModal) {
    return null;
  }

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "lightgrey",
    height: "300px",
    width: "250px",
  };

  const buttonStyle = {
    width: "70px",
    padding: "5px 10px",
    margin: "10px 0 0",
    borderRadius: "15px",
    borderStyle: "none",
    cursor: "pointer",
  };

  return (
    <div style={modalStyle}>
      {children}
      <button style={buttonStyle} onClick={onClose}>
        close
      </button>
    </div>
  );
}
