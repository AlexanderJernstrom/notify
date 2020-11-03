import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, Checkbox, Menu, MenuItem } from "@material-ui/core";
import { ClipLoader } from "react-spinners";

import { Container, Card, Dialog } from "@material-ui/core";
import { Delete, MoreVert } from "@material-ui/icons";

import { SelectedCardsMenu } from "./SelectedCardsMenu";
import { ImportRecipe } from "./ImportRecipe";

export default function Sidebar(props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [selectedCards, setSelectedCards] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const selectCards = (e, note) => {
    if (e.target.checked === true) {
      setSelectedCards([...selectedCards, note]);
    } else if (e.target.checked === false) {
      const selectedCardsCopy = [...selectedCards];
      const newSelected = selectedCardsCopy.filter(
        (cards) => note._id !== cards._id
      );
      setSelectedCards(newSelected);
    }
  };

  const isSelected = (_id) => {
    if (selectedCards.find((note) => note._id === _id) !== undefined)
      return true;
    else return false;
  };

  return (
    <div
      style={{
        backgroundColor: "transparent",
        margin: "0",
        padding: "0",
        height: "70%",
      }}
    >
      <Container maxWidth="md" style={{ textAlign: "center" }}>
        <Typography variant="h4">Notes</Typography>
        <div
          style={{
            width: "100%",
            display: "grid",
            textAlign: "center",
            gridTemplateColumns: "repeat(3, auto)",
          }}
        >
          {props.loading === false ? (
            props.notes.length === 0 ? (
              <Typography>
                Seems you don't have any notes, create one in the bottom right
                corner
              </Typography>
            ) : (
              props.notes.map((note) => {
                return (
                  <div key={note._id}>
                    <Card
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        height: "5.5em",
                        margin: "0 0.5rem",
                        border:
                          isSelected(note._id) === true
                            ? "2px solid blue"
                            : "none",
                      }}
                    >
                      <div onClick={() => props.selectNote(note._id)}>
                        <Typography style={{ paddingBottom: "2rem" }}>
                          {note.title}
                        </Typography>
                      </div>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={(e) => setAnchorEl(null)}
                        id="menu"
                      >
                        <MenuItem
                          onClick={() => {
                            setId(note._id);
                            setOpen(true);
                            setAnchorEl(null);
                          }}
                        >
                          Delete note
                        </MenuItem>
                      </Menu>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0px",
                        }}
                      >
                        <Checkbox
                          color="primary"
                          onChange={(e) => selectCards(e, note)}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => setAnchorEl(e.currentTarget)}
                          style={{
                            height: "1.5rem",
                            width: "1.5rem",
                          }}
                        >
                          <MoreVert />
                        </Button>
                      </div>
                    </Card>
                  </div>
                );
              })
            )
          ) : (
            <ClipLoader />
          )}
        </div>
        <Typography variant="h4">Lists</Typography>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: " repeat(3, auto)",
          }}
        >
          {props.lists.length === 0 && props.loading === false ? (
            <Typography>
              Seems you don't have any lists, create one in the bottom right
              corner
            </Typography>
          ) : (
            props.lists.map((list) => {
              return (
                <Card
                  key={list._id}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    height: "5.5em",
                    width: "auto",
                    margin: "0 0.5rem",
                  }}
                >
                  <div
                    style={{ paddingBottom: "2rem", textAlign: "center" }}
                    onClick={() => props.selectList(list._id)}
                  >
                    <Typography>{list.name}</Typography>
                  </div>
                  <Button onClick={() => props.deleteList(list._id)}>
                    <Delete />
                  </Button>
                </Card>
              );
            })
          )}
        </div>
      </Container>
      {selectedCards.length > 0 ? (
        <SelectedCardsMenu
          selectedCards={selectedCards.map((card) => {
            return { _id: card._id };
          })}
          deleteMultipleNotes={props.deleteMultipleNotes}
        />
      ) : null}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <Typography variant="h3">
          Are you sure you want to delete this note?
        </Typography>
        <div style={{ display: "flex" }}>
          <Button
            style={{ width: "50%" }}
            onClick={() => {
              setOpen(false);
              setId("");
            }}
          >
            <Typography>No</Typography>
          </Button>
          <Button
            color="red"
            style={{ width: "50%" }}
            onClick={() => {
              props.deleteNote(id);
              setId("");
              setOpen(false);
            }}
          >
            <Typography color="error">Yes</Typography>
          </Button>
        </div>
      </Dialog>
      <ImportRecipe importRecipe={props.importRecipe} />
    </div>
  );
}
