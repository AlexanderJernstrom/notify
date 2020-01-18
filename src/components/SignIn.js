import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import "../App.css";

export default function SignIn(props) {
  return (
    <div>
      <Typography variant="h2">Login to your account</Typography>
      <div style={{ alignItems: "center" }}>
        <Container maxWidth="xs">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <TextField
              label="Email Address"
              variant="outlined"
              placeholder="enter your email"
              onChange={e => props.setEmail(e.target.value)}
              className="inputs"
            />
            <TextField
              label="Password"
              variant="outlined"
              placeholder="enter your password"
              type="password"
              margin="none"
              onChange={e => props.setPassword(e.target.value)}
              className="inputs"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => props.signIn()}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.scrollToRegister()}
            >
              Don't have an account? Register here
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
}
