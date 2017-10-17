
import React from "react";
import Title from './Title.jsx';

  class Header extends React.Component {
   constructor(props){
     super();
     this.state = {
      title:props.onChangeListener
     }
   }
   onChangeLink(){
     this.props.changeLink(this.state.title)
   }
   handleChange(e){
     const title = e.target.value
     this.changeTitle(title)
   }
   onHandleChange(event){
     this.setState({
      title: event.target.value
     })
   }
  render(){
    var title = "Hellow"
    return(
      <div>
      <Title title={this.props.title}/>
        <input value={title} onChange={this.handleChange} />
        <button onClick={this.onChangeLink.bind(this)} className="btn btn-primary">onclick</button>
        <hr/>
        <input value={this.state.title} 
        onChange={(event)=>this.onHandleChange(event)}/>
      </div>
    )
  }
}
module.exports = Header;
