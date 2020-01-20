import React, { useState, useEffect } from "react";
import "../App.css";
import {
  Typography,
  Button,
  TextField,
  Modal,
  ButtonBase
} from "@material-ui/core";
import { Save, Cancel, Send } from "@material-ui/icons";

export default function NoteEditor(props) {
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setBody(props.selectedNote.body);
    setOpen(true);
  }, [props.selectedNote]);

  const handleClose = () => {
    props.clearSelectedNote();
    props.saveNote(body, props.selectedNote._id);
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
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            outline: "none"
          }}
        >
          <Typography style={{ fontSize: "6vw" }}>
            {props.selectedNote.title}
          </Typography>
          <Button
            onClick={() => handleClose()}
            style={{ position: "absolute", top: "0px", right: "0px" }}
          >
            <Cancel color="error" />
          </Button>
          <form style={{ width: "100%" }}>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              value={body}
              onChange={e => {
                setBody(e.target.value);
              }}
              rows={20}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={() => props.saveNote(body, props.selectedNote._id)}
            >
              <Save />
            </Button>
            <Button
              href={`mailto:example@email.com?subject=${props.selectedNote.title}&body=${body}`}
              color="primary"
              variant="contained"
            >
              <Send />
            </Button>
          </form>{" "}
        </div>
      </Modal>
    </div>
  );
}
