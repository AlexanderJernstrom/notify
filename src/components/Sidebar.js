import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ClipLoader } from "react-spinners";

import { Container, Card } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export default function Sidebar(props) {
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
                      height: "5.5em"
                    }}
                    onClick={() => props.selectNote(note._id)}
                  >
                    <Typography style={{ paddingBottom: "2rem" }}>
                      {note.title}
                    </Typography>
                    <Button
                      onClick={() => {
                        props.clearSelectedNote();
                        props.deleteNote(note._id);
                      }}
                    >
                      <Delete />
                    </Button>
                  </Card>
                </div>
              );
            })
          ) : (
            <ClipLoader />
          )}
        </div>
      </Container>
    </div>
  );
}
