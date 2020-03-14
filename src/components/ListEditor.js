import React, { useState, useEffect } from "react";
import {
  Typography,
  Modal,
  Checkbox,
  Button,
  TextField
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

export default function ListEditor(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleChange = (e, index, _id) => {
    const list = props.lists.find(list => list._id === _id);
    props.changeCompleted(props.lists.indexOf(list), index);
  };

  useEffect(() => {
    setOpen(true);
  }, [props.selectedList]);

  return (
    <div>
      <Modal
        style={{ display: "flex", justifyContent: "center" }}
        open={open}
        onClose={() => {
          setOpen(false);

          props.clearSelectedList();
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            textAlign: "center"
          }}
        >
          <Typography variant="h3">{props.selectedList.name}</Typography>
          {props.selectedList.items.map((item, index) => {
            return (
              <div
                key={item._id}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly"
                }}
              >
                <Checkbox
                  color="primary"
                  checked={item.completed}
                  onChange={e => handleChange(e, index, props.selectedList._id)}
                />
                <Typography
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                    flex: 1
                  }}
                >
                  {item.title}
                </Typography>

                <Button
                  onClick={() =>
                    props.deleteItem(index, props.selectedList._id)
                  }
                >
                  <Cancel color="error" />
                </Button>
              </div>
            );
          })}

          <form>
            <TextField
              variant="outlined"
              placeholder="Name of item"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <Button
              onClick={() => {
                props.addItem(text, props.selectedList._id);
                setText("");
              }}
            >
              Create item in list
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
