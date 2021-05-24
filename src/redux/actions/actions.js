import axios from "axios";
import { func } from "prop-types";

const url =
  process.evn.NODE_ENV === "production" ? "/api/" : "http://localhost:5000/api";

export function loadArticle() {
  return (dispatch) => {
    axios
      .get(`${url}articles`)
      .then((res) => {
        let articles = res.data;
        dispatch({ type: "LOAD_ARTICLE", articles });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getUser(_id) {
  return axios
    .get(`${url}user/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}

export function getUserProfile(_id) {
  return (dispatch) => {
    axios
      .get(`${url}user/profile/${_id}`)
      .then((res) => {
        let profile = res.data;
        dispatch({ type: "SET_PROFILE", profile });
      })
      .catch((err) => console.log(err));
  };
}

export function getArticle(article_id) {
  return (dispatch) => {
    axios
      .get(`${url}user/profile/${article_id}`)
      .then((res) => {
        let profile = res.data;
        dispatch({ type: "SET_PROFILE", profile });
      })
      .catch((err) => console.log(err));
  };
}

export function comment() {
  return (dispatch) => {
    axios
      .post(`${url}article/clap`, { article_id })
      .then((res) => {
        dispatch({ type: "CLAP_ARTICLE" });
      })
      .catch((err) => console.log(err));
  };
}

export function clap(article_id) {
  return (dispatch) => {
    axios
      .post(`${url}article/clap`, { article_id })
      .then((res) => {
        dispatch({ type: "CLAP_ARTICLE" });
      })
      .catch((err) => console.log(err));
  };
}

export function follow(id, user_id) {
  return (dispatch) => {
    axios
      .post(`${url}user/follow`, { id, user_id })
      .then((res) => {
        dispatch({ type: "FOLLOW_USER", user_id });
      })
      .catch((err) => console.log(err));
  };
}

export function SignInUser(user, data) {
  return (dispatch) => {
    axios
      .post(`${url}user`, user_data)
      .then((res) => {
        let user = res.data;
        localStorage.setItem("Auth", JSON.stringify(user));
        dispatch({ type: "SET_USER", user });
      })
      .catch((err) => console.log(err));
  };
}

export function toggleClose() {
  return (dispatch) => {
    dispatch({ type: "TOGGLE_MODAL", modalMode: false });
  };
}

export function toggleOpen() {
  return (dispatch) => {
    dispatch({ type: "TOGGLE_MODAL", modalMode: true });
  };
}
