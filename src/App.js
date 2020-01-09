import React, { Component } from "react";
import "./App.css";
import SignIn from "./components/SignIn";
import NoteEditor from "./components/NoteEditor";
import Sidebar from "./components/Sidebar";
import Register from "./components/Register";
import axios from "axios";
import { Button, Typography } from "@material-ui/core";
import Description from "./components/Description";
import { Image } from "@material-ui/icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      notes: [],
      selectedNote: null,
      noteBody: "",
      register: false,
      loading: true
    };
  }

  createNote = title => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "https://ancient-headland-98480.herokuapp.com/api/notes/createNote",
        { title, body: "New Note" },
        { headers: { authToken: token } }
      )
      .then(res => {
        if (!res.data.errors) {
          this.setState({ notes: [...this.state.notes, res.data] });
        } else {
          alert("Title needs to be atlest 5 characters long");
        }
      });
  };

  deleteNote = _id => {
    const token = localStorage.getItem("token");
    axios
      .delete("https://ancient-headland-98480.herokuapp.com/api/notes/delete", {
        headers: { authToken: token },
        data: {
          _id
        }
      })
      .then(res => {
        const newNotes = this.state.notes.filter(note => note._id !== _id);

        this.setState({ notes: newNotes, selectedNote: null });
      });
  };

  componentDidMount() {
    this.getNotes();
  }

  signIn = () => {
    const { email, password } = this.state;
    axios
      .post("https://ancient-headland-98480.herokuapp.com/api/user/login", {
        email,
        password
      })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          localStorage.setItem("signedIn", true);
          this.setState({
            signedIn: JSON.parse(localStorage.getItem("signedIn"))
          });
        } else {
          alert(res.data);
        }
      });

    setTimeout(() => this.getNotes(), 3000);
  };

  getNotes = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://ancient-headland-98480.herokuapp.com/api/notes", {
        headers: { authToken: token }
      })
      .then(res => {
        if (res.data.notes) {
          this.setState({ notes: res.data.notes, loading: false });
        } else {
          this.setState({ notes: [], loading: false });
        }
      });
  };

  createAccount = () => {
    const { name, email, password } = this.state;
    axios
      .post("https://ancient-headland-98480.herokuapp.com/api/user", {
        name,
        email,
        password
      })
      .then(res => {
        if (res.status === 200) {
          alert(
            "Account was succesfully created, now login with your credentials"
          );
        } else {
          alert("Account couldn't be created");
        }
      });
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("signedIn");
    window.location.reload();
  };

  saveNote = (body, _id) => {
    axios
      .patch(
        "https://ancient-headland-98480.herokuapp.com/api/notes/update",
        {
          title: this.state.selectedNote.title,
          body,
          _id
        },
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then(res => {
        if (res.status === 200) {
          const oldNote = this.state.notes.find(
            note => note._id === res.data._id
          );
          const copyNotes = [...this.state.notes];
          const index = copyNotes.indexOf(oldNote);
          copyNotes[index] = res.data;
          this.setState({ notes: copyNotes });
        } else {
          alert("Note could not be saved");
        }
      });
  };

  setEmail = email => {
    this.setState({ email });
  };

  setPassword = password => {
    this.setState({ password });
  };

  setName = name => {
    this.setState({ name });
  };

  setSelectedNote = (title, body) => {
    this.setState({ selectedNote: title, body });
  };

  setNotes = notes => {
    this.setState({ notes });
  };

  setRegister = bool => {
    this.setState({ register: bool });
  };

  selectNote = id => {
    const selectedNote = this.state.notes.find(note => note._id === id);
    this.setState({ selectedNote, noteBody: selectedNote.body });
  };

  clearSelectedNote = () => {
    this.setState({ selectedNote: null });
  };

  render() {
    return (
      <div>
        {localStorage.getItem("signedIn") === "true" ? (
          <div style={{ position: "relative" }}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => this.logout()}
            >
              Logout
            </Button>
          </div>
        ) : null}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {!localStorage.getItem("signedIn") ||
          localStorage.getItem("signedIn") === false ? (
            <div style={{ width: "100%" }}>
              <div className="section1">
                <Typography variant="h1">Notify</Typography>
                <Typography variant="h3"></Typography>
                <div className="signInForm">
                  <SignIn
                    setEmail={this.setEmail}
                    setPassword={this.setPassword}
                    signIn={this.signIn}
                    setRegister={this.setRegister}
                  />
                </div>
                <div className="registerForm">
                  <Register
                    setName={this.setName}
                    setEmail={this.setEmail}
                    setPassword={this.setPassword}
                    createAccount={this.createAccount}
                  />
                </div>
              </div>
              <div className="section2">
                <Description className="description-text" />
              </div>
            </div>
          ) : (
            <div style={{ height: "20rem" }}>
              <Sidebar
                selectNote={this.selectNote}
                createNote={this.createNote}
                notes={this.state.notes}
                deleteNote={this.deleteNote}
                loading={this.state.loading}
              />
            </div>
          )}

          {this.state.selectedNote === null ? null : (
            <div>
              <NoteEditor
                selectedNote={this.state.selectedNote}
                setNoteBody={this.setNoteBody}
                saveNote={this.saveNote}
                clearSelectedNote={this.clearSelectedNote}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
