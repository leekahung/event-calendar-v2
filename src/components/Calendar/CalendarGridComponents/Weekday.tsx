import { useMediaQuery } from "../../../hooks";
import Box from "@mui/material/Box";

interface Props {
  index: number;
  weekday: string;
}

const Weekday = ({ index, weekday }: Props) => {
  const query900 = useMediaQuery("(min-width: 900px)");
  const query600 = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={query600 ? "10px" : ""}
      fontSize={query900 ? "16px" : "14px"}
      sx={{
        backgroundColor: index % 6 === 0 ? "rgb(220, 220, 220)" : "white",
      }}
    >
      {weekday}
    </Box>
  );
};

export default Weekday;
