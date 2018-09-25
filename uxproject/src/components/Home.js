import React, { Component } from 'react';
import firebase from 'firebase';
import '../assets/Home.css';
import '../bootstrap.min.css';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      pictures: [],
      users: [],
      posts: [],
      visible: "Público",
      filter: "Todos",
      temp_CurrentPost: null,
      commentModal: " "
    };

    this.handlePost = this.handlePost.bind(this);
    this.handleComment = this.handleComment.bind(this)
    this.handleCommentModal = this.handleCommentModal.bind(this)
    this.handleLike = this.handleLike.bind(this)
    this.handleAlert = this.handleAlert.bind(this)
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => { // Cada vez que nos loggeemos o nos salgamos, el user tendrá información.
      if (user !== null) {
        this.setState({ user });
      }
    });
  }

  handlePost() {
    if (this.state.user)
      if (document.getElementById("Ptopic").value !== "" && document.getElementById("Pmessage").value !== "") {
        let date = new Date();

        let UID = "Y" + date.getFullYear() + "M" + (date.getMonth() + 1) + "D" + date.getDate() + "H" + date.getHours() + "Mi" + date.getMinutes() + "S" + date.getSeconds() + "m" + date.getMilliseconds() + "";

        let post = {
          uid: this.state.user.uid,
          stdName: this.state.user.displayName,
          upic: this.state.user.photoURL,
          topic: document.getElementById("Ptopic").value,
          message: document.getElementById("Pmessage").value,
          likes: [],
          comments: [],
          date: "" + date + "",
          timeStamp: UID
        }
        firebase.database().ref('posts/').push().set(post);
        document.getElementById("Ptopic").value = ""
        document.getElementById("Pmessage").value = ""
        this.setState(() => ({
          alert: <div className="alert alert-success alert-dismissible fade show">
            <button onClick={this.handleAlert} type="button" className="close" data-dismiss="alert">&times;</button>
            <strong>¡Has posteado exitosamente!</strong>
          </div>
        }))
      } else {
        alert("Llene cada campo. :v")
      }
  }

  componentDidUpdate() {
    for (let i = 0; i < document.getElementsByClassName("buttonPost").length; i++) {
      document.getElementsByClassName("buttonPost")[i].setAttribute("onClick", "postId('" + document.getElementsByClassName("buttonPost")[i].getAttribute("id") + "')")
    }
  }

  componentDidMount() {
    firebase.database().ref('/posts/').on("value", (snapshot) => {
      const list = []
      snapshot.forEach(variable => {
        list.push(variable);
      })

      this.setState({
        posts: list
      })
    })
  }

  handleAlert() {
    this.setState(() => ({
      alert: null
    }))
  }

  handleLike() {
    if (firebase.database().ref('posts/' + localStorage.getItem("idPost") + "/likes"))
      firebase.database().ref('posts/' + localStorage.getItem("idPost") + "/likes/" + this.state.user.uid).update({ uid: this.state.user.uid })
    else
      firebase.database().ref('posts/' + localStorage.getItem("idPost") + "/likes/" + this.state.user.uid).set({ uid: this.state.user.uid })
  }

  handleComment() {
    if (firebase.database().ref('posts/' + localStorage.getItem("idPost") + "/comments"))
      firebase.database().ref('posts/' + localStorage.getItem("idPost") + "/comments").push().update(
        { uid: this.state.user.uid, upic: this.state.user.photoURL, stdName: this.state.user.displayName, text: document.getElementById("comment" + localStorage.getItem("idPost")).value }
      )
    else
      firebase.database().ref('posts/' + localStorage.getItem("idPost") + "/comments").push().set(
        { uid: this.state.user.uid, upic: this.state.user.photoURL, stdName: this.state.user.displayName, text: document.getElementById("comment" + localStorage.getItem("idPost")).value }
      )
  }

  handleCommentModal() {
    if (this.state.CommentModal === "show")
      this.setState({
        CommentModal: " "
      })
    else
      this.setState({
        CommentModal: "show"
      })
  }

  renderPost(newVariable) {
    let comments = []
    if (newVariable.val().comments) {
      Object.keys(newVariable.val().comments).map(c => {
        return firebase.database().ref('posts/' + newVariable.key + "/comments/" + c).orderByKey().on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            comments.reverse().push(
              <div key={newVariable.key + snapshot.key} style={{ paddingTop: 1 + "%" }} className="comment_ margin1">
                <div className="comm">
                  <img style={{ width: 70 + "%", marginRight: 1 + "% !important", marginTop: 4 + "% !important" }} className="rounded mx-auto grid-i" src={snapshot.val().upic} alt="User-pic" />
                  <div className="grid-i">
                    <h4 style={{ textAlign: "left !important", fontSize: 0.8 + "rem", margin: 1 + "% !important" }} className="card-title">{snapshot.val().stdName}</h4>
                  </div>
                </div>
                <p style={{ marginLeft: 1 + "%" }} className="card-text ">{snapshot.val().text}</p>
              </div>
            )
          }
        })
      })
    }
    return (
      <div key={newVariable.key} id={newVariable.key} className="card">

        <div className="card-header">
          <img style={{ width: 90 + "%", marginRight: 1 + "% !important" }} className="img-thumbnail mx-auto grid-i" src={newVariable.val().upic} alt="User-pic" />
          <div className="grid-i">
            <h4 style={{ textAlign: "left !important", fontSize: 1 + "rem" }} className="card-title">{newVariable.val().stdName}</h4>
            <h6 style={{ fontSize: 0.7 + "rem", color: "grey" }} className="text-left">{newVariable.val().date}</h6>
          </div>
          <h3 className="card-title grid-i">{newVariable.val().topic}</h3>
        </div>
        <div className="card-body">
          <p className="card-text">{newVariable.val().message}</p>
        </div>
        <div className="text-right" style={{ marginRight: 1 + "%", marginBottom: 1 + "%" }}>
          <button id={newVariable.key} type="button" className="btn btn-outline-secondary dropdown-toggle buttonPost" data-toggle="dropdown" onClick={this.handleCommentModal}>Comentarios <small>{newVariable.val().comments ? Object.keys(newVariable.val().comments).length : 0}</small></button>

          <div className={localStorage.getItem("idPost") === newVariable.key ? "dropdown-menu dropdown-menu-right " + this.state.CommentModal : "dropdown-menu dropdown-menu-right "} style={{ marginRight: 1 + "%", marginBottom: 1 + "%" }}>
            <div className="form-group margin1">
              {comments}
              {this.state.user ? <div>
                <textarea className="form-control" rows="1" id={"comment" + newVariable.key} type="text" placeholder="Comentario..." />
                <button className="btn btn-dark " type="button" onClick={this.handleComment}>Comentar</button>
              </div>
                : ""}
            </div>
          </div>
          {this.state.user ?
            <button type="button" id={newVariable.key} className="btn btn-primary buttonPost" onClick={this.handleLike}>Me gusta <small>{newVariable.val().likes ? Object.keys(newVariable.val().likes).length : 0}</small></button>
            : ""}
        </div>

      </div>
    )
  }

  render() {
    if (this.state.user)
      localStorage.setItem("CurrentUser", this.state.user.uid)

    const posts = this.state.posts.map(newVariable => {
      return this.renderPost(newVariable)
    }).reverse()

    return (
      <div id="Home" className="Home">
        <div id="Desk">
          {this.state.alert ? this.state.alert : ''}
          {this.state.user ?
            <div>
              <div style={{ marginRight: 5 + "%", marginLeft: 5 + "%", marginTop: 2.5 + "%", marginBottom: 0 + "%", paddingBottom: 5 + "%" }} className="form-group">
                <input className="form-control" id="Ptopic" type="text" placeholder="Tema" />
                <textarea className="form-control" rows="5" id="Pmessage" type="text" placeholder="Cuerpo de la publicación..." />
              </div>
              <button className="btn btn-success" type="button" onClick={this.handlePost}>Postear</button>
            </div>
            : ""}
          <div id="board" className="card">
            {posts}
          </div>
          {/*this.renderLogginButton()*/}
        </div>
      </div>
    );
  }
}

export default Home;