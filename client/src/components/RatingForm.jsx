import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

// Exempel på etiketter för de olika rating-värdena
const labels = {
  0.5: "Utan betyg",
  1: "Betyg 1",
  1.5: "Betyg 1,5",
  2: "Betyg 2",
  2.5: "Betyg 2,5",
  3: "Betyg 3",
  3.5: "Betyg 3,5",
  4: "Betyg 4",
  4.5: "Betyg 4,5",
  5: "Betyg 5"
};

// Hjälpfunktion för att skapa rätt text
function getLabelText(value) {
  return `${value} ${value !== 1 ? "stjärnor" : "stjärna"}`;
}

function RatingForm() {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  return (
    <>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )}
    </>
  );
}

export default RatingForm;
