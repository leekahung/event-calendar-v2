import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useMediaQuery } from "../../hooks";

interface Props {
  handleChangeMonth: (direction: string) => void;
  direction: string;
}

const ChangeMonthButton = ({ handleChangeMonth, direction }: Props) => {
  const query900 = useMediaQuery("(min-width: 900px)");

  return (
    <IconButton
      aria-label={direction === "left" ? "previous month" : "next month"}
      onClick={() => handleChangeMonth(direction)}
      sx={{
        height: query900 ? "40px" : "30px",
        width: query900 ? "40px" : "30px",
        backgroundColor: "white",
        borderRadius: "40px",
        "&:hover": {
          backgroundColor: "rgb(230, 230, 230)",
          "&:active": { backgroundColor: "grey" },
        },
      }}
    >
      {direction === "left" ? (
        <KeyboardArrowLeftIcon />
      ) : (
        <KeyboardArrowRightIcon />
      )}
    </IconButton>
  );
};

export default ChangeMonthButton;
