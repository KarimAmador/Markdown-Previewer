import React from 'react';
import ReactDOM from 'react-dom';
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';
import './styles.css';

marked.setOptions({
  breaks: true,
  gfm: true
});

console.log(marked.defaults);

const render = new marked.Renderer();

render.link = function(href, _title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: egMarkdown,
      isPreviewExpanded: false,
      isEditorExpanded: false,
      icons: {expanded: 'fa fa-compress', compressed: 'fa fa-expand'}
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.minMaxEditor = this.minMaxEditor.bind(this);
    this.minMaxPreview = this.minMaxPreview.bind(this);
  }

  handleChange(e) {
    this.setState({ markdown: e.target.value });
  }
  
  minMaxEditor() {
    this.setState({ isEditorExpanded: !this.state.isEditorExpanded });
    document.querySelector('#preview-area').classList.toggle('d-none');
  }

  minMaxPreview() {
    this.setState({ isPreviewExpanded: !this.state.isPreviewExpanded });
    document.querySelector('#text-area').classList.toggle('d-none');
  }

  render() {
    return (
      <div className="App container-fluid bg-white min-vh-100">
        <div className="row">
          <div id='text-area' className='col mx-3 my-2 p-0'>
            <div style={{ height: 'auto' }} className='shadow'>
              <TextBar icons={this.state.icons} isEditorExpanded={this.state.isEditorExpanded} onClick={this.minMaxEditor} />
              <TextInput markdown={this.state.markdown} onChange={this.handleChange}/>
            </div>
          </div>
          <div id='preview-area' className='col mx-3 my-2 p-0 shadow'>
            <PreviewBar icons={this.state.icons} isPreviewExpanded={this.state.isPreviewExpanded} onClick={this.minMaxPreview} />
            <PreviewArea markdown={this.state.markdown} />
          </div>
        </div>
      </div>
    )
  }
}

const TextBar = function(props) {
  return (
    <div id='text-bar' className='bg-primary p-1 rounded-top'>
        <h1 className='text-light ps-1'>Editor</h1>
        <button className='expand-compress' onClick={props.onClick}>
          <i className={props.isEditorExpanded ? props.icons.expanded : props.icons.compressed}></i>
        </button>
    </div>
  );
}

const TextInput = function(props) {
  return (
    <div id='text-content' className='bg-white' style={{ height: '60rem' }}>
      <textarea id='editor' value={props.markdown} onChange={props.onChange} className='form-text h-100 w-100 m-0'></textarea>
    </div>
  );
}

const PreviewBar = function(props) {
  return (
    <div id='preview-bar' className='bg-primary p-1 rounded-top'>
      <h1 className='text-light ps-1'>Preview</h1>
      <button className='expand-compress' onClick={props.onClick}>
        <i className={props.isPreviewExpanded ? props.icons.expanded : props.icons.compressed}></i>
      </button>
    </div>
  );
}

const PreviewArea = function(props) {
  return (
    <div id='preview-content' className='h-auto p-3 bg-white'>
      <div id='preview' className='h-100' dangerouslySetInnerHTML={{ __html: marked(props.markdown, {renderer: render}) }}></div>
    </div>
  );
}

const egMarkdown = "# Welcome to my Markdown Previewer\n\n## This is a sub-heading...\n### This is also a sub-heading...\n\nGot it?\n\nHere is code between 2 backticks: `<div></div>`.\n\nAnd...\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nThere's also **bold** text\n_italic_.\nOr **_both_**\nYou can also ~~cross stuff out~~.\n\nYou got [links](https://www.freecodecamp.org), and\n> Block Quotes\n\nAnd if you want to use them, there's even tables:\n\n| Header 1 | Header 2 | Header 3 |\n| -------- | -------- | -------- |\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n\n- Naturally, there are also lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. You can have numbered lists too.\n1. You can use just 1s.\n1. And finally, you can add embedded images:\n\n![An embedded image](https://cdn-icons-png.flaticon.com/512/29/29072.png)\n"

ReactDOM.render(<App />, document.getElementById('root'));
