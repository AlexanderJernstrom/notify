import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import "../App.css";
import { Typography, Button, TextField, Modal } from "@material-ui/core";
import { Save } from "@material-ui/icons";

export default function NoteEditor(props) {
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setBody(props.selectedNote.body);
    setOpen(true);
  }, [props.selectedNote]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        width: "70%"
      }}
    >
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => handleClose()}
      >
        <div style={{ backgroundColor: "white" }}>
          <Typography style={{ fontSize: "7vw" }}>
            {props.selectedNote.title}
          </Typography>
          <form style={{ width: "100%" }}>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              value={body}
              onChange={e => {
                setBody(e.target.value);
              }}
              rows={14}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={() => props.saveNote(body, props.selectedNote._id)}
            >
              Save your note
              <Save />
            </Button>
          </form>{" "}
        </div>
      </Modal>
    </div>
  );
}
