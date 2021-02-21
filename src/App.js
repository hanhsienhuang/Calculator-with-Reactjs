import './App.css';
import React from "react";

function parse(str){
  if(str[str.length-1] == "."){
    str += "0";
  }
  return parseFloat(str);
}

function calculate(expr, internal){
  let tokens = [];
  let number = [];
  for(let i=0; i<expr.length; ++i){
    if("pm".includes(internal[i])){
      if(number.length>0){
        let n = number.join("");
        tokens.push(parse(n));
        number = [];
      }
      tokens.push(expr[i]);
    }
    else{
      number.push(expr[i]);
    }
  }
  if(number.length>0){
    let n = number.join("");
    if(n!="-"){
      tokens.push(parse(n));
    }
  }
  if(tokens.length>0 && typeof(tokens[tokens.length-1])=="string"){
    tokens.pop();
  }
  let stack = [];
  for(let t of tokens){
    if(stack.length==0 || typeof(t)=="string"){
      stack.push(t)
    }
    else{
      if("*/".includes(stack[stack.length-1])){
        let op = stack.pop();
        let num = stack.pop();
        stack.push(op=="*"?(num*t):(num/t));
      }
      else{
        stack.push(t);
      }
    }
  }
  let result = 0;
  let op = "+";
  for(let t of stack){
    if(typeof(t)=="string"){
      op = t;
    }
    else{
      result = op=="+"?(result+t):(result-t);
    }
  }
  
  return result.toString();
}

function handleEqual(state){
  let result = calculate(state.calc, state.internal)
  let tokens = [];
  let numberToken = "b";
  for(let a of result){
    switch(a){
      case "-":
        tokens.push("n");
        break;
      case ".":
        numberToken = "a";
      default:
        tokens.push(numberToken);
    }
  }
  let internal = tokens.join("");
  return {
    internal,
    history: state.calc,
    calc: result,
  }
}

function handleMinus(state){
  let internal = state.internal;
  let calc = state.calc;
  let len = internal.length;
  if(len==0 || internal.charAt(len-1)=="m"){
    internal += "n";
    calc += "-";
  }
  else if("pn".includes(internal.charAt(len-1))){
    calc = calc.slice(0, len-1) + "-";
  }
  else{
    internal += "p";
    calc += "-";
  }
  return {
    internal,
    calc,
  }
}

function handleAddition(state){
  let internal = state.internal;
  let calc = state.calc;
  let len = internal.length;
  if(len==0){
    return {}
  }
  else if(internal.charAt(len-1) == "n"){
    if(len==1){
      return {}
    }
    internal = internal.slice(0, len-2) + "p";
    calc = calc.slice(0, len-2) + "+";
  }
  else if("pm".includes(internal.charAt(len-1))){
    internal = internal.slice(0, len-1) + "p";
    calc = calc.slice(0, len-1) + "+";
  }
  else{
    internal += "p";
    calc += "+";
  }
  return {
    internal,
    calc,
  }
}

function handleMulDiv(state, input){
  let internal = state.internal;
  let calc = state.calc;
  let len = internal.length;
  if(len==0){
    return {}
  }
  else if(internal.charAt(len-1) == "n"){
    if(len==1){
      return {}
    }
    internal = internal.slice(0, len-2) + "m";
    calc = calc.slice(0, len-2) + input;
  }
  else if("pm".includes(internal.charAt(len-1))){
    internal = internal.slice(0, len-1) + "m";
    calc = calc.slice(0, len-1) + input;
  }
  else{
    internal += "m";
    calc += input;
  }
  return {
    internal,
    calc,
  }
}

function handleDot(state){
  let internal = state.internal;
  let calc = state.calc;
  let len = internal.length;
  if(len==0 || internal.charAt(len-1)!="a"){
    internal += "a";
    calc += ".";
  }
  else{
    return {}
  }
  return {
    internal,
    calc,
  }
}

function handleZero(state){
  let internal = state.internal;
  let calc = state.calc;
  let len = internal.length;
  if(len==0 || "mpn".includes(internal.charAt(len-1))){
    internal += "0";
    calc += "0";
  }
  else if(internal.charAt(len - 1) == "0"){
    return {}
  }
  else{
    internal += internal.charAt(len-1);
    calc += "0";
  }
  return {
    internal,
    calc,
  }
}

function handleNumbers(state, input){
  let internal = state.internal;
  let calc = state.calc;
  let len = internal.length;
  if(len==0 || "mpn".includes(internal.charAt(len-1))){
    internal += "b";
    calc += input;
  }
  else if(internal.charAt(len - 1) == "0"){
    internal = "b";
    calc = input;
  }
  else{
    internal += internal.charAt(len-1);
    calc += input;
  }
  return {
    internal,
    calc,
  }
}

let button_config = [
  {value: "C", top:0, left:0, height:1, width:1},
  {value: "Del", top:0, left:1, height:1, width:1},
  {value: "←", top:0, left:2, height:1, width:1},
  {value: "→", top:0, left:3, height:1, width:1},
  {value: "9", top:1, left:2, height:1, width:1},
  {value: "8", top:1, left:1, height:1, width:1},
  {value: "7", top:1, left:0, height:1, width:1},
  {value: "6", top:2, left:2, height:1, width:1},
  {value: "5", top:2, left:1, height:1, width:1},
  {value: "4", top:2, left:0, height:1, width:1},
  {value: "3", top:3, left:2, height:1, width:1},
  {value: "2", top:3, left:1, height:1, width:1},
  {value: "1", top:3, left:0, height:1, width:1},
  {value: "0", top:4, left:1, height:1, width:1},
  {value: ".", top:4, left:0, height:1, width:1},
  {value: "=", top:4, left:2, height:1, width:1},
  {value: "+", top:4, left:3, height:1, width:1},
  {value: "-", top:3, left:3, height:1, width:1},
  {value: "*", top:2, left:3, height:1, width:1},
  {value: "/", top:1, left:3, height:1, width:1},
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
  }


  render(){
    return (
      <input autofocus="true" value={this.props.text} type="textarea" id="expr_input" ref={this.props.input_ref}/>
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
        <Input text={this.props.input} input_ref={this.props.input_ref}/>
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
    this.state = {
      internal: "",
      history: "",
      calc: "",
    };
    this.input_ref = React.createRef();
  };

  handleButtonInput(input){
    this.setState(
      state => {
        let new_state = {};
        if(input == "C"){
          new_state = {
            internal: "",
            history: "",
            calc: "",
          };
        }
        else if(input == "Del"){
          new_state = {
            internal: state.internal.slice(0,-1),
            calc: state.calc.slice(0,-1)
          };
        }
        else if(input == "="){
          new_state = handleEqual(state);
        }
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
        else if("*/".includes(input)){
          new_state = handleMulDiv(state, input);
        }
        else if("123456789".includes(input)){
          new_state = handleNumbers(state, input);
        }
        return new_state
      }
    );
  };

  componentDidMount(){
    this.input_ref.current.focus();
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
        style={style}/>
      )
    });
    return (
      <div id="calculator">
        <Display history={this.state.history} input={this.state.calc} input_ref={this.input_ref}/>
        <div style={{position: "relative"}}>
          {buttons}
        </div>
      </div>
    );
  }
}


export default App;
