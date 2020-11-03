import React, { Component } from "react";
import "./App.css";
import SignIn from "./components/SignIn";
import NoteEditor from "./components/NoteEditor";
import Sidebar from "./components/Sidebar";
import Register from "./components/Register";
import axios from "axios";
import { Typography } from "@material-ui/core";
import Description from "./components/Description";
import { scroller } from "react-scroll";
import Nav from "./components/Nav";
import BottomNav from "./components/BottomNav";
import ListEditor from "./components/ListEditor";
import { CollectionsBookmarkOutlined } from "@material-ui/icons";

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
      loading: true,
      lists: [],
      selectedList: null,
    };
  }

  scrollToRegister = () => {
    scroller.scrollTo("section3", {
      duration: 800,
      delay: 0,
      smooth: "easeInQuart",
    });
  };

  shareNote = (_id, email) => {
    axios
      .post("https://ancient-headland-98480.herokuapp.com/api/notes/share", {
        _id,
        email,
      })
      .then((res) => alert(res.data));
  };

  createNote = (title) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "https://ancient-headland-98480.herokuapp.com/api/notes/createNote",
        { title, body: "New Note" },
        { headers: { authToken: token } }
      )
      .then((res) => {
        if (!res.data.errors) {
          this.setState({ notes: [...this.state.notes, res.data] });
        } else {
          alert(res.data.errors.title.message);
        }
      });
  };

  deleteNote = (_id) => {
    const token = localStorage.getItem("token");
    axios
      .delete("https://ancient-headland-98480.herokuapp.com/api/notes/delete", {
        headers: { authToken: token },
        data: {
          _id,
        },
      })
      .then((res) => {
        const newNotes = this.state.notes.filter((note) => note._id !== _id);

        this.setState({ notes: newNotes, selectedNote: null });
      });
  };

  deleteMultipleNotes = (ids) => {
    const token = localStorage.getItem("token");
    axios
      .delete(
        "https://ancient-headland-98480.herokuapp.com/api/notes/deleteMultiple",
        {
          headers: { authToken: token },
          data: {
            notes: ids,
          },
        }
      )
      .then(() => {
        const notesCopy = [...this.state.notes];
        const deleteIndexes = [];
        ids.forEach((note) => {
          const deleteItem = notesCopy.find((n) => n._id === note._id);
          const index = notesCopy.indexOf(deleteItem);
          deleteIndexes.push(index);
        });
        deleteIndexes.forEach((id) => {
          notesCopy.splice(id, 1);
        });
        this.setState({ notes: notesCopy });
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
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          localStorage.setItem("signedIn", true);
          this.setState({
            signedIn: JSON.parse(localStorage.getItem("signedIn")),
          });
        } else {
          alert(res.data);
        }
      });

    setTimeout(() => this.getNotes(), 3000);
    this.setState({ password: "", email: "" });
  };

  getNotes = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://ancient-headland-98480.herokuapp.com/api/notes", {
        headers: { authToken: token },
      })
      .then((res) => {
        if (res.data.notes) {
          this.setState({
            notes: res.data.notes,
            loading: false,
            lists: res.data.lists,
          });
        } else {
          this.setState({ notes: [], lists: [], loading: false });
        }
      });
  };

  createAccount = () => {
    const { name, email, password } = this.state;
    axios
      .post("https://ancient-headland-98480.herokuapp.com/api/user", {
        name,
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          alert(
            "Account was succesfully created, now login with your credentials"
          );
          scroller.scrollTo("section1", {
            duration: 800,
            delay: 0,
            smooth: "easeInQuart",
          });

          this.signIn();
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
          _id,
        },
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          const oldNote = this.state.notes.find(
            (note) => note._id === res.data._id
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

  setEmail = (email) => {
    this.setState({ email });
  };

  setPassword = (password) => {
    this.setState({ password });
  };

  setName = (name) => {
    this.setState({ name });
  };

  setSelectedNote = (title, body) => {
    this.setState({ selectedNote: title, body });
  };

  setNotes = (notes) => {
    this.setState({ notes });
  };

  selectNote = (id) => {
    const selectedNote = this.state.notes.find((note) => note._id === id);
    this.setState({ selectedNote, noteBody: selectedNote.body });
  };

  clearSelectedNote = () => {
    this.setState({ selectedNote: null });
  };
  clearSelectedList = () => {
    this.setState({ selectedList: null });
  };

  selectedList = (id) => {
    const selectedList = this.state.lists.find((list) => list._id === id);
    this.setState({ selectedList });
  };

  changeCompleted = (listIndex, itemIndex) => {
    const listCopy = [...this.state.lists];
    listCopy[listIndex].items[itemIndex].completed = !listCopy[listIndex].items[
      itemIndex
    ].completed;
    axios
      .patch(
        "https://ancient-headland-98480.herokuapp.com/api/lists/edit",
        {
          _id: this.state.lists[listIndex]._id,
          list: listCopy[listIndex],
        },
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then((res) => {
        const copiedList = [...this.state.lists];
        copiedList[listIndex] = res.data;
        this.setState({ lists: copiedList });
      });
    this.selectedList(listCopy[listIndex]._id);
  };

  addItem = (title, id) => {
    const lists = [...this.state.lists];
    const list = lists.find((list) => list._id === id);
    list.items.push({
      title,
      completed: false,
    });

    axios
      .patch(
        "https://ancient-headland-98480.herokuapp.com/api/lists/edit",
        {
          _id: id,
          list: list,
        },
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then((res) => {
        lists[lists.indexOf(this.state.selectedList)] = res.data;
        this.setState({ lists, selectedList: res.data });
      });
  };

  deleteItem = (index, _id) => {
    const individualList = this.state.lists.find((list) => list._id === _id);
    individualList.items.splice(index, 1);
    axios
      .patch(
        "https://ancient-headland-98480.herokuapp.com/api/lists/edit",
        {
          _id,
          list: individualList,
        },
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then((res) => {
        const lists = [...this.state.lists];
        lists[this.state.lists.indexOf(this.state.selectedList)] = res.data;
        this.setState({ lists, selectedList: res.data });
      });
  };

  deleteList = (_id) => {
    axios
      .delete(
        `https://ancient-headland-98480.herokuapp.com/api/lists/delete/${_id}`,
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then((res) => {
        const listCopy = this.state.lists.filter((list) => list._id !== _id);

        this.setState({ lists: listCopy });
      });
  };

  createList = (name) => {
    axios
      .post(
        "https://ancient-headland-98480.herokuapp.com/api/lists/create",
        {
          name,
          items: [],
        },
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then((res) => this.setState({ lists: [...this.state.lists, res.data] }));
  };

  importRecipeToList = (url) => {
    axios
      .get(
        `https://ancient-headland-98480.herokuapp.com/api/lists/importRecipe?recipeURL=${url}`,
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then((res) => {
        this.setState({ lists: [...this.state.lists, res.data] });
      });
  };

  render() {
    return (
      <div>
        {localStorage.getItem("signedIn") === "true" ? (
          <div>
            <Nav logout={this.logout} />
            <BottomNav
              createNote={this.createNote}
              createList={this.createList}
            />
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
                    scrollToRegister={this.scrollToRegister}
                  />
                </div>
              </div>
              <div className="section2">
                <Description className="description-text" />
              </div>
              <div className="section3">
                <div className="registerForm">
                  <Register
                    setName={this.setName}
                    setEmail={this.setEmail}
                    setPassword={this.setPassword}
                    createAccount={this.createAccount}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: "20rem" }}>
              <Sidebar
                selectNote={this.selectNote}
                notes={this.state.notes}
                deleteNote={this.deleteNote}
                loading={this.state.loading}
                clearSelectedNote={this.clearSelectedNote}
                lists={this.state.lists}
                selectList={this.selectedList}
                deleteList={this.deleteList}
                deleteMultipleNotes={this.deleteMultipleNotes}
                importRecipe={this.importRecipeToList}
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
                shareNote={this.shareNote}
              />
            </div>
          )}
          {this.state.selectedList === null ? null : (
            <div>
              <ListEditor
                selectedList={this.state.selectedList}
                changeCompleted={this.changeCompleted}
                clearSelectedList={this.clearSelectedList}
                lists={this.state.lists}
                addItem={this.addItem}
                deleteItem={this.deleteItem}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
