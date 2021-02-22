import './App.css';
import Parser from "./Parser";
import React from "react";


function handleEqual(state){
  let parser = new Parser(state.expression);
  let result = null;
  try{
    let result = parser.parse().toString();
    let len = result.length;
    return {
      expression: result,
      input_cur_start: len,
      input_cur_end: len,
    }
  }
  catch(e){
    return {
      expression: e,
      input_cur_start:0,
      input_cur_end:0,
    }
  }
}


let button_config = [
  {value: "C", top:0, left:0, height:1, width:1},
  {value: "Del", top:0, left:1, height:1, width:1},
  {value: "←", top:0, left:2, height:1, width:1},
  {value: "→", top:0, left:3, height:1, width:1},
  {value: "(", top:1, left:0, height:1, width:1},
  {value: ")", top:1, left:1, height:1, width:1},
  {value: "E", top:1, left:2, height:1, width:1},
  {value: "^", top:1, left:3, height:1, width:1},
  {value: "9", top:2, left:2, height:1, width:1},
  {value: "8", top:2, left:1, height:1, width:1},
  {value: "7", top:2, left:0, height:1, width:1},
  {value: "6", top:3, left:2, height:1, width:1},
  {value: "5", top:3, left:1, height:1, width:1},
  {value: "4", top:3, left:0, height:1, width:1},
  {value: "3", top:4, left:2, height:1, width:1},
  {value: "2", top:4, left:1, height:1, width:1},
  {value: "1", top:4, left:0, height:1, width:1},
  {value: "0", top:5, left:1, height:1, width:1},
  {value: ".", top:5, left:0, height:1, width:1},
  {value: "=", top:5, left:2, height:1, width:1},
  {value: "+", top:5, left:3, height:1, width:1},
  {value: "-", top:4, left:3, height:1, width:1},
  {value: "*", top:3, left:3, height:1, width:1},
  {value: "/", top:2, left:3, height:1, width:1},
]

function History(props){
  return (
    <div id="history">
      {props.text}
    </div>
  )
}

class Input extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(e){
    if(this.props.onChange){
      this.props.onChange(e.target);
    }
  }

  handleSelect(e){
    if(this.props.onSelect){
      this.props.onSelect(e.target);
    }
  }

  render(){
    return (
      <input 
        value={this.props.value} 
        type="textarea" 
        id="expr_input" 
        ref={this.props.input_ref}
        onSelect={this.handleSelect}
        onChange={this.handleChange}
      />
    );
  }
}


class Display extends React.Component{
  constructor(props){
    super(props);
  };

  render(){
    return (
      <div className="display">
        <History text={this.props.history}/>
        <Input 
          value={this.props.input} 
          input_ref={this.props.input_ref}
          onChange={this.props.onInputChange}
          onSelect={this.props.onInputSelect}
        />
      </div>
    );
  };
}

class Button extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(event){
    this.props.onClick(this.props.value);
  };

  render(){
    return (
      <button onClick={this.handleClick} style={this.props.style}> 
        {this.props.value}
      </button>
    );
  };
}


class App extends React.Component{
  constructor(props){
    super(props);
    this.handleButtonInput = this.handleButtonInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSelect = this.handleInputSelect.bind(this);
    this.state = {
      history: "",
      expression: "",
      input_cur_start:0,
      input_cur_end:0,
    };
    this.input_ref = React.createRef();
  };

  handleInputChange(element){
    this.setState({
      expression:element.value,
      input_cur_start: this.input_ref.current.selectionStart,
      input_cur_end: this.input_ref.current.selectionEnd,
    });
  }

  handleInputSelect(){
    this.setState({
      input_cur_start: this.input_ref.current.selectionStart,
      input_cur_end: this.input_ref.current.selectionEnd,
    });
  }

  handleButtonInput(input){
    this.setState(
      state => {
        let new_state = {};
        if(input == "C"){
          new_state = {
            expression: "",
            input_cur_start: 0,
            input_cur_end: 0,
          };
        }
        else if(input == "Del"){
          if(state.input_cur_start == state.input_cur_end){
            new_state = {
              expression: state.expression.slice(0,state.input_cur_start-1) + state.expression.slice(state.input_cur_end),
              input_cur_start: state.input_cur_start-1,
              input_cur_end: state.input_cur_start-1,
            };
          }
          else{
            new_state = {
              expression: state.expression.slice(0,state.input_cur_start) + state.expression.slice(state.input_cur_end),
              input_cur_start: state.input_cur_start,
              input_cur_end: state.input_cur_start,
            };
          }
        }
        else if(input == "="){
          new_state = handleEqual(state);
        }
        else if(input == "←"){
          if(state.input_cur_start == state.input_cur_end){
            let new_pos = state.input_cur_start==0?0:state.input_cur_start-1;
            new_state = {
              input_cur_start: new_pos,
              input_cur_end: new_pos,
            }
          }
          else{
            new_state = {
              input_cur_start: state.input_cur_end,
            }
          }
        }
        else if(input == "→"){
          if(state.input_cur_start == state.input_cur_end){
            let new_pos = state.input_cur_start==state.expression.length?
              state.expression.length:state.input_cur_start+1;
            new_state = {
              input_cur_start: new_pos,
              input_cur_end: new_pos,
            }
          }
          else{
            new_state = {
              input_cur_start: state.input_cur_end,
            }
          }
        }
        else{
          new_state = {
            expression: state.expression.slice(0,state.input_cur_start) + input+state.expression.slice(state.input_cur_end),
            input_cur_start: state.input_cur_start + input.length,
            input_cur_end: state.input_cur_start + input.length,
          }
        }
        /*
        else if(input == "."){
          new_state = handleDot(state);
        }
        else if(input == "0"){
          new_state = handleZero(state);
        }
        else if(input == "-"){
          new_state = handleMinus(state);
        }
        else if(input == "+"){
          new_state = handleAddition(state);
        }
        else if("/*".includes(input)){
          new_state = handleMulDiv(state, input);
        }
        else if("123456789".includes(input)){
          new_state = handleNumbers(state, input);
        }
        */
        return new_state
      }
    );
  };

  componentDidUpdate(){
    this.input_ref.current.focus();
    this.input_ref.current.setSelectionRange(this.state.input_cur_start, this.state.input_cur_end);
  }

  render(){
    let gw = 125;
    let gh = 60;
    let buttons = button_config.map(element=>{
      let style = {
        top : element.top*gh + "px",
        left: element.left*gw + "px",
        height: element.height*gh + "px",
        width: element.width*gw + "px",
      };
      return(
        <Button 
          onClick={this.handleButtonInput} value={element.value}
          style={style}
          key={element.value}
        />
      )
    });
    return (
      <div id="calculator">
        <Display 
          history={this.state.history} 
          input={this.state.expression} 
          input_ref={this.input_ref}
          onInputChange={this.handleInputChange}
          onInputSelect={this.handleInputSelect}
         />
        <div style={{position: "relative"}}>
          {buttons}
        </div>
      </div>
    );
  }
}


export default App;
