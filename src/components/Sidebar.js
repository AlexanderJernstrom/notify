import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ClipLoader } from "react-spinners";

import { Container, Card, Dialog } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export default function Sidebar(props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

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
            textAlign: "center",
            gridTemplateColumns: "repeat(3, auto)"
          }}
        >
          {props.loading === false ? (
            props.notes.length === 0 ? (
              <Typography>
                Seems you don't have any notes, create one in the bottom right
                corner
              </Typography>
            ) : (
              props.notes.map(note => {
                return (
                  <div key={note._id}>
                    <Card
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        height: "5.5em",
                        margin: "0 0.5rem"
                      }}
                    >
                      <div onClick={() => props.selectNote(note._id)}>
                        <Typography style={{ paddingBottom: "2rem" }}>
                          {note.title}
                        </Typography>
                      </div>
                      <Button
                        onClick={() => {
                          setId(note._id);
                          setOpen(true);
                        }}
                      >
                        <Delete />
                      </Button>
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
            gridTemplateColumns: " repeat(3, auto)"
          }}
        >
          {props.lists.length === 0 && props.loading === false ? (
            <Typography>
              Seems you don't have any lists, create one in the bottom right
              corner
            </Typography>
          ) : (
            props.lists.map(list => {
              return (
                <Card
                  key={list._id}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    height: "5.5em",
                    width: "auto",
                    margin: "0 0.5rem"
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
    </div>
  );
}
