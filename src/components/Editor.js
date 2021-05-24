import React, { Componenet } from "react";
import { connect } from "react-redux";
import MediumEditor from "medium-edior";
import axios from "axios";
import EditorHeader from "./Editorheader";
import "../../node_modules/medium-editor/dist/css/medium-editor.min.css";

class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      text: "",
      description: "",
      imgSrc: null,
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.previewImg = this.previewImg.bind(this);
    this.publishStory = this.publishStory.bind(this);
  }

  publishStory() {
    this.setState({
      loading: true,
    });

    const _url =
      process.env.NODE_ENV === "production"
        ? "/api/"
        : "http://localhost:5000/api/";
    const formData = new FormData();
    formData.append("text", this.state.text);
    formData.append("image", this.state.imgSrc);
    formData.append("title", document.getElementById("editor-title").value);
    formData.append("author_id", this.props.user._id);
    formData.append("description", this.state.description);
    formData.append("claps", 0);
    axios
      .post(`${_url}article`, formData)
      .then((res) => {
        this.setState({
          loading: false,
        });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ loading: false });
      });
  }
  handleClick() {
    this.refs.fileUploader.click();
  }
  previewImg() {
    const file = this.refs.fileUploader.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("image_preview").src = e.target.result;

      this.setState({
        imgSrc: file,
      });
    }.bind(this);
    reader.readAsDataURL(file);
  }

  componentDidMount() {
    const editor = new MediumEditor(".medium-editable", {
      autoLink: true,
      delay: 1000,
      targetBlank: true,
      toolbar: {
        buttons: [
          "bold",
          "italic",
          "quote",
          "underline",
          "anchor",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "strikethrough",
          "subscript",
          "pre",
          "image",
          "html",
          "justifyCenter",
        ],
        diffLeft: 25,
        diffTop: 10,
      },
      anchor: {
        placeHolderText: "Type a link",
        customClassOption: "btn",
        customClassOptionText: "CreateButton",
      },
      paste: {
        cleanedPastedHTML: true,
        clearAttr: ["style", "dir"],
        cleanTags: ["label", "meta"],
        cleanTags: ["sub", "sup"],
      },
      anchorPreview: {
        hideDelay: 300,
      },
      placeholder: {
        text: "Tell your story...",
      },
    });

    editor.subscribe("editableInput", (ev, editable) => {
      if (typeof document !== "undefined") {
        this.setState({
          title: document.getElementById("editor-title").value,
          text: editor.getContent(0),
          description: `${editor.getContent(0).substring(0, 30).toString()}...`,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <EditorHeader
          publish={this.publishStory}
          loading={this.state.loading}
        />
        <div className="container-fluid main-container">
          <div
            className="row animated fadeInUp"
            data-animation="fadeInUp-fadeOutDown"
          >
            <div
              id="main-post"
              className="col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content"
            >
              <div className="post-metadata">
                <img
                  alt={this.props.user.name}
                  className="avatar-image"
                  src={this.props.user.provide_pic}
                  height="40"
                  width="40"
                />

                <div className="post-info">
                  <div data-react-className="PropoverLink" data-react-props="">
                    <span className="popover-link" data-reactroot="">
                      <a href="">{this.props.user.name}</a>
                    </span>
                  </div>
                  <small>{this.props.user.email}</small>
                </div>
              </div>
              <form className="editor-form main-editor" autocomplete="off">
                <div
                  className={
                    this.state.imgSrc != null
                      ? "file-upload-previewer"
                      : "file-upload-previewer hidden"
                  }
                >
                  <img src="" alt="" id="image_preview" />
                </div>
                <div
                  className="existing-img-previewer"
                  id="existing-img-previewer"
                ></div>
                <div className="form-group">
                  <span className="pitcure_upload">
                    <i className="fa fa-camera" onClick={this.handleClick}></i>
                  </span>
                </div>
                <div className="form-grup">
                  <textarea
                    col="1"
                    className="editor-title"
                    id="editor-title"
                    placeholder="Title"
                  ></textarea>
                </div>
                <div className="form-group">
                  <textarea
                    id="medium-editable"
                    className="medium-editable"
                  ></textarea>
                </div>
                <div className="hidden">
                  <input
                    type="file"
                    onChange={() => this.previewImg()}
                    id="file"
                    ref="fileUploader"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authuser.user,
  };
};

export default connect(mapStateToProps)(Editor);
