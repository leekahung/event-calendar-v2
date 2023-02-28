import closeBtn from "../../assets/img/close.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

interface Props {
  openModal: boolean;
  onClose: () => void;
  children: JSX.Element;
}

export default function ModalContent({ openModal, onClose, children }: Props) {
  if (!openModal) {
    return null;
  }

  const buttonImgStyle: React.CSSProperties = {
    width: "15px",
    height: "15px",
  };

  return (
    <Dialog open>
      <Box>
        {children}
        <Button
          sx={{
            position: "absolute",
            minWidth: "15px",
            top: "25px",
            right: "20px",
            backgroundColor: "rgb(210, 210, 210)",
            borderRadius: "20px",
          }}
          onClick={onClose}
        >
          <img
            style={buttonImgStyle}
            src={closeBtn}
            alt="icon of close button"
          />
        </Button>
      </Box>
    </Dialog>
  );
}
