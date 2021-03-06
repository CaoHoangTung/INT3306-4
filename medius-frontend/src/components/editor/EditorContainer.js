import React, { Component } from 'react';
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import './newpost.scss'

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  componentDidMount() {
    this.setState({
      editorState: EditorState.moveFocusToEnd(this.state.editorState), // EditorState imported from draft-js
    });
  }

  onEditorStateChange = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState,
    });
  };


  render() {

    const { editorState } = this.state;
    function uploadImageCallBack(file) {
      return new Promise(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'https://api.imgur.com/3/image');
          xhr.setRequestHeader('Authorization', 'Client-ID 783d3336f369b9c');
          const data = new FormData();
          data.append('image', file);
          xhr.send(data);
          xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.responseText);
            console.log(response)
            resolve(response);
          });
          xhr.addEventListener('error', () => {
            const error = JSON.parse(xhr.responseText);
            console.log(error)
            reject(error);
          });
        }
      );
    }
    return <div className='editor'>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          inline: { inDropdown: false },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false } },
        }}
      />
    </div>
  }
}

export default EditorContainer

