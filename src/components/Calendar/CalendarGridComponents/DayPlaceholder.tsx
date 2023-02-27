import Box from "@mui/material/Box";

interface Props {
  index: number;
}

const DayPlaceholder = ({ index }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor:
          index % 7 === 0 || index % 7 === 6 ? "rgb(220, 220, 220)" : "white",
      }}
    />
  );
};

export default DayPlaceholder;
