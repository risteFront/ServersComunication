
import React from 'react'
import ReactDOM from 'react-dom'
import Header from './component/Header.jsx';
const FileUpload = require('react-fileupload');

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      homelink: "home"
    }
  }

  onChangeLink(newName){
    this.setState({
      homelink:newName
    })
  }
  render() {
    /*set properties*/
    const options = {
      baseUrl:'http://localhost:3030/upload',
      param:{
        fid:0
      },
      dataType:'csv',
      chooseAndUpload:true,
      uploading : function(progress){
        console.log('loading...',progress.loaded/progress.total+'%')
    },

      chooseFile: function (files) {
        console.log('you choose', typeof files == 'string' ? files : files[0].name)
      },
      uploadSuccess: function (resp) {
        console.log('upload success..!')
      },
      uploadError: function (err) {
        alert(err.message)
      },
  

    }
 
    /*Use FileUpload with options*/
    /*Set two dom with ref*/
    return (
      <div>
      <FileUpload options={options}>
        <h3>Please choose</h3>
        <div ref="chooseBtn">
          <i className="icon icon-upload" />
          <span>do it</span>
        </div>
        <p>You have uploaded {this.state.rate}</p>
        <button ref="chooseAndUpload">chooseAndUpload</button>

        <p className="panel panel-default">Thanks for using {this.state.homelink}</p>
      </FileUpload>
      <Header changeLink={this.onChangeLink.bind(this)} onChangeListener={this.state.homelink}></Header>
      <h2>{this.state.homelink}</h2>
      </div>
    )
  }
}
ReactDOM.render(
  <Layout />,
  document.getElementById('root')
);
