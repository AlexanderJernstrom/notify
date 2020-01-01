import React from "react";
import { Typography, TextField, Button, Container } from "@material-ui/core";

export default function Register(props) {
  return (
    <div>
      <Typography variant="h2">Register a new account</Typography>
      <Container maxWidth="xs">
        <form autoComplete="off">
          <TextField
            fullWidth
            variant="outlined"
            label="name"
            onChange={e => props.setName(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="email"
            onChange={e => props.setEmail(e.target.value)}
          />
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            label="password"
            onChange={e => props.setPassword(e.target.value)}
          />
          <Button
            style={{ width: "100%" }}
            variant="contained"
            color="secondary"
            onClick={() => props.createAccount()}
          >
            Create your account
          </Button>
        </form>
      </Container>
    </div>
  );
}
