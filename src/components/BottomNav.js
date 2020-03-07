import React, { useState } from "react";
import {
  BottomNavigation,
  Fab,
  Modal,
  TextField,
  Button
} from "@material-ui/core";
import { Add, ListAlt, Note } from "@material-ui/icons";

export default function BottomNav(props) {
  const [noteOpen, setNoteOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [buttonOpen, setButtonOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleClose = () => {
    setNoteOpen(false);
  };

  return (
    <div>
      <BottomNavigation style={{ width: "100%", position: "fixed", bottom: 0 }}>
        <Fab
          color="secondary"
          style={{ position: "absolute", right: "0px" }}
          size="large"
          title="Add a new note"
          onClick={e => setButtonOpen(true)}
        >
          <Add fontSize="large" />
        </Fab>
        {buttonOpen === true ? (
          <div style={{ position: "absolute", right: "50px" }}>
            <Button title="Create new list" onClick={() => setListOpen(true)}>
              <ListAlt />
            </Button>
            <Button title="Create a new note" onClick={() => setNoteOpen(true)}>
              <Note />
            </Button>
          </div>
        ) : null}
      </BottomNavigation>

      {listOpen === true ? (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={listOpen}
          onClose={() => setListOpen(false)}
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
                label="Title of your list"
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                props.createList(title);
                setTimeout(1000, setListOpen(false));
              }}
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Create your list
            </Button>
          </div>
        </Modal>
      ) : (
        false
      )}

      {noteOpen === true ? (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={setNoteOpen}
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
              onClick={() => {
                props.createNote(title);
                setTimeout(1000, setNoteOpen(false));
              }}
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Create your note
            </Button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
