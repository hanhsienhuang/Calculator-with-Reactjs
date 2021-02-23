import './App.css';
import Parser from "./Parser";
import React from "react";

function handleEqual(state){
  if(state.expression == ""){
    return;
  }
  let parser = new Parser(state.expression);
  let index = state.history.length==0?0:state.history[0].index+1;
  try{
    let result = parser.parse().toString();
    let len = result.length;
    
    return {
      expression: result,
      input_cur_start: len,
      input_cur_end: len,
      history : [
        {
        expression: state.expression,
        answer: result,
        index: index,
        }
      ].concat(state.history),
    }
  }
  catch(e){
    return {
      expression: "",
      input_cur_start:0,
      input_cur_end:0,
      history : [
        {
        expression: state.expression,
        answer: null,
        index: index,
        }
      ].concat(state.history),
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
let gw = 125;
let gh = 80;

class HistoryEntry extends React.Component{
  constructor(props){
    super(props);
    this.handleClickExpr = this.handleClickExpr.bind(this);
    this.handleClickAns = this.handleClickAns.bind(this);
    this.handleClickDel = this.handleClickDel.bind(this);
  }

  handleClickExpr(e){
    if(this.props.onClickExpr){
      this.props.onClickExpr(this.props.history.expression);
    }
  }

  handleClickAns(e){
    if(this.props.onClickAns){
      this.props.onClickAns(this.props.history.answer);
    }
  }

  handleClickDel(e){
    console.log(this.props.history.index);
    if(this.props.onClickDel){
      this.props.onClickDel(this.props.history.index);
    }
  }

  render(){
    return (
      <div>
        <span className="history-delete" onClick={this.handleClickDel}>✕</span>
        <span className="history-expr" onClick={this.handleClickExpr}>{this.props.history.expression}</span> 
        = 
        {this.props.history.answer === null?(
            <span className="history-error"> Invalid</span>
          ):(
            <span className="history-answer" onClick={this.handleClickAns}>{this.props.history.answer}</span>
          )
        }
      </div>
    );
  }
}

function History(props){
  let histories = props.entries.map(h =>{
    return (
      <HistoryEntry 
        key={h.index}
        onClickExpr={props.onClickExpr}
        onClickAns={props.onClickAns}
        onClickDel={props.onClickDel}
        history={h} 
      />
    );
  });
  return (
    <div id="histories">
      <div>
        <button onClick={props.onClickDelAll}>Clear</button>
      </div>
      <div id="history-display">
        {histories}
      </div>
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
      <button onClick={this.handleClick} style={this.props.style} className="button"> 
        {this.props.value}
      </button>
    );
  };
}

function Buttons(props){
  let buttons = button_config.map(element=>{
    let style = {
      top : element.top*gh + "px",
      left: element.left*gw + "px",
      height: element.height*gh + "px",
      width: element.width*gw + "px",
    };
    return(
      <Button 
        onClick={props.onClickButton}
        value={element.value}
        style={style}
        key={element.value}
      />
    )
  });
  return (
    <div style={{position: "relative"}}>
      {buttons}
    </div>
  )

}


class App extends React.Component{
  constructor(props){
    super(props);
    this.handleButtonInput = this.handleButtonInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSelect = this.handleInputSelect.bind(this);
    this.handleHistoryInputAns = this.handleHistoryInputAns.bind(this);
    this.handleHistoryInputExpr = this.handleHistoryInputExpr.bind(this);
    this.handleHistoryDelete = this.handleHistoryDelete.bind(this);
    this.handleHistoryDeleteAll = this.handleHistoryDeleteAll.bind(this);
    this.state = {
      history: [], // {str expression, str answer, bool valid}
      expression: "",
      input_cur_start:0,
      input_cur_end:0,
    };
    this.input_ref = React.createRef();
  };

  handleHistoryInputExpr(input){
    this.setState(
      state => {
        return {
          expression: input,
          input_cur_start: input.length,
          input_cur_end: input.length,
        }
      }
    )
  }

  handleHistoryInputAns(input){
    this.setState(
      state => {
        return {
          expression: state.expression.slice(0,state.input_cur_start) + input+state.expression.slice(state.input_cur_end),
          input_cur_start: state.input_cur_start + input.length,
          input_cur_end: state.input_cur_start + input.length,
        }
      }
    )
  }

  handleHistoryDelete(index){
    this.setState(
      state => {
        return {
          history : state.history.filter(h=>{
            return h.index != index;
          })
        }
    })
  }

  handleHistoryDeleteAll(index){
    this.setState({history:[]});
  }

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
        return new_state
      }
    );
  };

  componentDidUpdate(){
    this.input_ref.current.focus();
    this.input_ref.current.setSelectionRange(this.state.input_cur_start, this.state.input_cur_end);
  }

  render(){
    return (
      <div id="calculator">
        <div id="calculation-area">
          <Display 
            input={this.state.expression} 
            input_ref={this.input_ref}
            onInputChange={this.handleInputChange}
            onInputSelect={this.handleInputSelect}
          />
          <Buttons onClickButton={this.handleButtonInput}/>
        </div>
        <History 
          entries={this.state.history} 
          onClickExpr={this.handleHistoryInputExpr}
          onClickAns={this.handleHistoryInputAns}
          onClickDel={this.handleHistoryDelete}
          onClickDelAll={this.handleHistoryDeleteAll}
        />
      </div>
    );
  }
}


export default App;
