import React, { useState, useEffect } from "react";
import "../App.css";
import {
  Typography,
  Button,
  TextField,
  Modal,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Save, Cancel, Send, MoreVert } from "@material-ui/icons";
import axios from "axios";

export default function NoteEditor(props) {
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

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
        width: "70%",
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
            outline: "none",
          }}
        >
          {props.selectedNote.body !== body ? (
            <Typography>Unsaved Changes</Typography>
          ) : null}
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
              onChange={(e) => {
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
              variant="contained"
              color="primary"
              onClick={(e) => {
                setMenu(true);
                handleClick(e);
              }}
            >
              <MoreVert />
            </Button>
            <Menu
              open={menu}
              onClose={() => {
                setMenu(false);
                setAnchorEl(null);
              }}
              anchorEl={anchorEl}
            >
              <Typography variant="h6">
                Send note to another Notify user
              </Typography>
              <div>
              <input
                list="users"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    axios
                      .get(
                        `https://ancient-headland-98480.herokuapp.com/api/user/search/${e.target.value}`
                      )
                      .then((data) => {
                        setUsers(data.data);
                      });
                  }
                }}
                id="users"
                placeholder="Email of notify user"
              />
               <Button
                onClick={() => {
                  props.shareNote(props.selectedNote._id, email);
                  setMenu(false);
                }}
              >
                <Send />
              </Button>
              
              <datalist id="users" style={{ display: "block"}}>
                {users.map((user) => {
                  return <option value={user.email}>{user.name}</option>;
                })}
              </datalist>
              </div>
              
             

              <Typography variant="h6">Send note via email</Typography>
              <br />
              <Button
                href={`mailto:example@email.com?subject=${props.selectedNote.title}&body=${body}`}
                color="primary"
                variant="contained"
                title="Send the note with email"
              >
                <Send />
              </Button>
            </Menu>
          </form>{" "}
        </div>
      </Modal>
    </div>
  );
}
