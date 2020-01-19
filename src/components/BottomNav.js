import React, { useState } from "react";
import {
  BottomNavigation,
  Fab,
  Modal,
  TextField,
  Button
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

export default function BottomNav(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BottomNavigation style={{ width: "100%", position: "fixed", bottom: 0 }}>
        <Fab
          color="secondary"
          style={{ position: "absolute", right: "0px" }}
          size="large"
          title="Add a new note"
          onClick={e => setOpen(true)}
        >
          <Add fontSize="large" />
        </Fab>
      </BottomNavigation>

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
              onClick={() => {
                props.createNote(title);
                setTimeout(1000, setOpen(false));
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
