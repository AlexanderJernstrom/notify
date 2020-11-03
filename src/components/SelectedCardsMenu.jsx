import React from "react";
import { Button, Typography } from "@material-ui/core";

export const SelectedCardsMenu = ({ selectedCards, deleteMultipleNotes }) => {
  console.log(selectedCards);
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="body1">
        {selectedCards.length} items selected
      </Typography>
      <Button onClick={() => deleteMultipleNotes(selectedCards)}>
        Delete selected notes
      </Button>
    </div>
  );
};
