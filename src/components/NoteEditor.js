import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import "../App.css";
import { Typography, Button, TextField } from "@material-ui/core";
import { Save } from "@material-ui/icons";

export default function NoteEditor(props) {
  const [body, setBody] = useState("");

  useEffect(() => {
    setBody(props.selectedNote.body);
  }, [props.selectedNote]);

  return (
    <div
      style={{
        width: "70%"
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2">{props.selectedNote.title}</Typography>
        <form>
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
        </form>
      </Container>
    </div>
  );
}
