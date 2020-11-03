import { Button, Modal, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";

export const ImportRecipe = (props) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Import recipe </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          style={{ backgroundColor: "white", width: "50%", marginLeft: "25%" }}
        >
          <Typography align="center">Enter the url for your recipe</Typography>
          <TextField
            style={{ width: "100%" }}
            onChange={(e) => setText(e.target.value)}
            placeholder="Url for recipe"
          />
          <Button onClick={() => props.importRecipe(text)}>
            Import recipe
          </Button>
        </div>
      </Modal>
    </div>
  );
};
