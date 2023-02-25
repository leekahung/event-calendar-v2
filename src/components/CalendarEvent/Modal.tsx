import closeBtn from "../../assets/img/close.png";

interface Props {
  openModal: boolean;
  onClose: () => void;
  children: JSX.Element;
}

export default function Modal({ openModal, onClose, children }: Props) {
  if (!openModal) {
    return null;
  }

  const modalStyle: React.CSSProperties = {
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
    zIndex: 3,
  };

  const buttonStyle: React.CSSProperties = {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    backgroundColor: "lightgrey",
    border: "none",
    cursor: "pointer",
  };

  const buttonImgStyle: React.CSSProperties = {
    width: "15px",
    height: "15px",
  };

  return (
    <div style={modalStyle}>
      {children}
      <button style={buttonStyle} onClick={onClose}>
        <img style={buttonImgStyle} src={closeBtn} alt="icon of close button" />
      </button>
    </div>
  );
}
