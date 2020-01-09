import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText, Container, Divider, Card } from "@material-ui/core";
import { Delete, AddCircle } from "@material-ui/icons";

export default function Sidebar(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        margin: "0",
        padding: "0",
        height: "70%"
      }}
    >
      <Container maxWidth="md" style={{ textAlign: "center" }}>
        <Typography variant="h4">Notes</Typography>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 2fr)"
          }}
        >
          {props.loading === false ? (
            props.notes.map(note => {
              return (
                <div key={note._id}>
                  <Card
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                      height: "5.5em",
                      width: "5em"
                    }}
                    onClick={() => props.selectNote(note._id)}
                    button="true"
                  >
                    <Typography style={{ paddingBottom: "2rem" }}>
                      {note.title}
                    </Typography>
                    <Button onClick={() => props.deleteNote(note._id)}>
                      <Delete />
                    </Button>
                  </Card>
                </div>
              );
            })
          ) : (
            <Typography>loading notes...</Typography>
          )}
        </div>
      </Container>

      {open === true ? (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={() => handleClose()}
          style={{
            display: "flex",
            justifyContent: "center",
            height: "20%"
          }}
        >
          <div style={{ outline: "none" }}>
            <div
              style={{
                backgroundColor: "gray",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <TextField
                variant="filled"
                label="Title of your note"
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <Button
              onClick={() => props.createNote(title)}
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Create your note
            </Button>
          </div>
        </Modal>
      ) : null}
      <div style={{ textAlign: "center" }}>
        <Button style={{ alignItems: "center" }} onClick={() => setOpen(true)}>
          <AddCircle color="primary" />
        </Button>
      </div>
    </div>
  );
}
