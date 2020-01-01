import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText, Container, Divider } from "@material-ui/core";
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
        padding: "0"
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4">Notes</Typography>
        <List>
          {props.loading === false ? (
            props.notes.map(note => {
              return (
                <div key={note._id}>
                  <ListItem
                    alignItems="flex-start"
                    style={{ cursor: "pointer", textAlign: "center" }}
                    onClick={() => props.selectNote(note._id)}
                    button
                  >
                    <ListItemText>{note.title}</ListItemText>
                    <Button onClick={() => props.deleteNote(note._id)}>
                      <Delete />
                    </Button>
                  </ListItem>
                  <Divider />
                </div>
              );
            })
          ) : (
            <Typography>loading notes...</Typography>
          )}
          {props.notes.length === 0 ? (
            <Typography>
              You dont have any notes, create a note by clicking the plus button
            </Typography>
          ) : null}
        </List>
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
          <div>
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
              size="large"
              variant="contained"
              color="primary"
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
