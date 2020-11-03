import React from "react";
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  IconButton
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

export default function Nav(props) {
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
          <IconButton>
            <AccountCircle>
            
            </AccountCircle>
            
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
