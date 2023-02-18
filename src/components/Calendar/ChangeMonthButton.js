import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useMediaQuery } from "../../hooks";

const ChangeMonthButton = ({ handleChangeMonth, direction }) => {
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
        <KeyboardArrowLeftIcon xs={{ color: "black" }} />
      ) : (
        <KeyboardArrowRightIcon xs={{ color: "black" }} />
      )}
    </IconButton>
  );
};

export default ChangeMonthButton;
