import React, { useState } from "react";
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

export default function Nav(props) {
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar variant="dense" style={{ position: "relative" }}>
        <Typography variant="h4">Notify</Typography>
        <div style={{ position: "absolute", right: "0px" }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => props.logout()}
          >
            Logout
          </Button>
          <IconButton
            onClick={e => {
              setOpen(true);
            }}
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
