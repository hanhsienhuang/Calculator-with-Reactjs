(this.webpackJsonpcalculator=this.webpackJsonpcalculator||[]).push([[0],{13:function(t,e,n){},14:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var i=n(2),r=n.n(i),s=n(8),h=n.n(s),u=(n(13),n(3)),a=n(4),l=n(1),o=n(6),c=n(5),p=(n(14),function t(e,n){Object(u.a)(this,t),this.type=null,this.value=null,this.type=e,this.value=n}),d=2,f=3,_=4,k=5,v=6,y=7,x=10,C=11,j=12,b=-1,g=function(){function t(e){Object(u.a)(this,t),this.input=e,this.curPos=-1,this.curChar="",this.preToken=null,this.nextChar()}return Object(a.a)(t,[{key:"nextChar",value:function(){++this.curPos,this.curChar=this.input[this.curPos]}},{key:"peek",value:function(){return this.input[this.curPos+1]}},{key:"skipWhiteSpace",value:function(){for(;" "==this.curChar;)this.nextChar()}},{key:"throw",value:function(t){throw"Lexer error: \n\t"+this.input+"\n\t"+" ".repeat(this.curPos)+"^\n\t"+t}},{key:"getToken",value:function(){if(this.skipWhiteSpace(),this.curPos==this.input.length)return new p(b);var t=void 0;if("+"==this.curChar)t=new p(d);else if("-"==this.curChar)t=new p(f);else if("*"==this.curChar)"*"==this.peek()?(t=new p(v),this.nextChar()):t=new p(_);else if("/"==this.curChar)t=new p(k);else if("("==this.curChar)t=new p(x);else if(")"==this.curChar)t=new p(C);else if("."==this.curChar){var e=/^\.\d+([eE][+-]?\d+)?/.exec(this.input.slice(this.curPos));null==e&&this.throw("Undefined token starting with .");var n=e[0],i=parseFloat(n);this.curPos+=n.length-1,t=new p(y,i)}else if("^"==this.curChar)t=new p(j);else if("0123456789".includes(this.curChar)){var r=/^(0|[1-9]\d*)(\.\d*)?([eE][+-]?\d+)?/.exec(this.input.slice(this.curPos));null==r&&this.throw("Error when tokenizing number");var s=r[0],h=parseFloat(s);this.curPos+=s.length-1,t=new p(y,h)}return void 0==t&&this.throw('Undefined char "'.concat(this.curChar,'"')),this.nextChar(),t}}]),t}(),w=function(){function t(e){Object(u.a)(this,t),this.lexer=new g(e),this.token=null}return Object(a.a)(t,[{key:"parse",value:function(){this.nextToken();var t=this.expression();return this.token.type!=b&&this.throw("Not end"),t}},{key:"throw",value:function(t){throw"Parser error: \n\t"+t}},{key:"nextToken",value:function(){this.token=this.lexer.getToken()}},{key:"expression",value:function(){for(var t=this.term();this.token.type==d||this.token.type==f;)this.token.type==d?(this.nextToken(),t+=this.term()):(this.nextToken(),t-=this.term());return t}},{key:"term",value:function(){for(var t=this.power();this.token.type==_||this.token.type==k;)this.token.type==_?(this.nextToken(),t*=this.power()):(this.nextToken(),t/=this.power());return t}},{key:"power",value:function(){for(var t=this.uniary();this.token.type==v||this.token.type==j;)this.nextToken(),t=Math.pow(t,this.power());return t}},{key:"uniary",value:function(){return this.token.type==d||this.token.type==f?(this.nextToken(),this.token.type==d?this.primary():-this.primary()):this.primary()}},{key:"primary",value:function(){if(this.token.type==y){var t=this.token.value;return this.nextToken(),t}if(this.token.type==x){this.nextToken();var e=this.expression();return this.token.type!=C&&this.throw("unbalanced paranthesis"),this.nextToken(),e}this.throw("got token type ".concat(this.token.type," in primary"))}}]),t}(),O=n(0);var S=[{value:"C",top:0,left:0,height:1,width:1},{value:"Del",top:0,left:1,height:1,width:1},{value:"\u2190",top:0,left:2,height:1,width:1},{value:"\u2192",top:0,left:3,height:1,width:1},{value:"(",top:1,left:0,height:1,width:1},{value:")",top:1,left:1,height:1,width:1},{value:"E",top:1,left:2,height:1,width:1},{value:"^",top:1,left:3,height:1,width:1},{value:"9",top:2,left:2,height:1,width:1},{value:"8",top:2,left:1,height:1,width:1},{value:"7",top:2,left:0,height:1,width:1},{value:"6",top:3,left:2,height:1,width:1},{value:"5",top:3,left:1,height:1,width:1},{value:"4",top:3,left:0,height:1,width:1},{value:"3",top:4,left:2,height:1,width:1},{value:"2",top:4,left:1,height:1,width:1},{value:"1",top:4,left:0,height:1,width:1},{value:"0",top:5,left:1,height:1,width:1},{value:".",top:5,left:0,height:1,width:1},{value:"=",top:5,left:2,height:1,width:1},{value:"+",top:5,left:3,height:1,width:1},{value:"-",top:4,left:3,height:1,width:1},{value:"*",top:3,left:3,height:1,width:1},{value:"/",top:2,left:3,height:1,width:1}],I=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(t){var i;return Object(u.a)(this,n),(i=e.call(this,t)).handleClickExpr=i.handleClickExpr.bind(Object(l.a)(i)),i.handleClickAns=i.handleClickAns.bind(Object(l.a)(i)),i.handleClickDel=i.handleClickDel.bind(Object(l.a)(i)),i}return Object(a.a)(n,[{key:"handleClickExpr",value:function(t){this.props.onClickExpr&&this.props.onClickExpr(this.props.history.expression)}},{key:"handleClickAns",value:function(t){this.props.onClickAns&&this.props.onClickAns(this.props.history.answer)}},{key:"handleClickDel",value:function(t){console.log(this.props.history.index),this.props.onClickDel&&this.props.onClickDel(this.props.history.index)}},{key:"render",value:function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)("span",{className:"history-delete",onClick:this.handleClickDel,children:"\u2715"}),Object(O.jsx)("span",{className:"history-expr",onClick:this.handleClickExpr,children:this.props.history.expression}),"=",null===this.props.history.answer?Object(O.jsx)("span",{className:"history-error",children:" Invalid"}):Object(O.jsx)("span",{className:"history-answer",onClick:this.handleClickAns,children:this.props.history.answer})]})}}]),n}(r.a.Component);function m(t){var e=t.entries.map((function(e){return Object(O.jsx)(I,{onClickExpr:t.onClickExpr,onClickAns:t.onClickAns,onClickDel:t.onClickDel,history:e},e.index)}));return Object(O.jsxs)("div",{id:"histories",children:[Object(O.jsx)("div",{children:Object(O.jsx)("button",{onClick:t.onClickDelAll,children:"Clear"})}),Object(O.jsx)("div",{id:"history-display",children:e})]})}var D=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(t){var i;return Object(u.a)(this,n),(i=e.call(this,t)).handleChange=i.handleChange.bind(Object(l.a)(i)),i.handleSelect=i.handleSelect.bind(Object(l.a)(i)),i}return Object(a.a)(n,[{key:"handleChange",value:function(t){this.props.onChange&&this.props.onChange(t.target)}},{key:"handleSelect",value:function(t){this.props.onSelect&&this.props.onSelect(t.target)}},{key:"render",value:function(){return Object(O.jsx)("input",{value:this.props.value,type:"textarea",id:"expr_input",ref:this.props.input_ref,onSelect:this.handleSelect,onChange:this.handleChange})}}]),n}(r.a.Component),E=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(t){return Object(u.a)(this,n),e.call(this,t)}return Object(a.a)(n,[{key:"render",value:function(){return Object(O.jsx)("div",{className:"display",children:Object(O.jsx)(D,{value:this.props.input,input_ref:this.props.input_ref,onChange:this.props.onInputChange,onSelect:this.props.onInputSelect})})}}]),n}(r.a.Component),A=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(t){var i;return Object(u.a)(this,n),(i=e.call(this,t)).handleClick=i.handleClick.bind(Object(l.a)(i)),i}return Object(a.a)(n,[{key:"handleClick",value:function(t){this.props.onClick(this.props.value)}},{key:"render",value:function(){return Object(O.jsx)("button",{onClick:this.handleClick,style:this.props.style,className:"button",children:this.props.value})}}]),n}(r.a.Component);function H(t){var e=S.map((function(e){var n={top:80*e.top+"px",left:125*e.left+"px",height:80*e.height+"px",width:125*e.width+"px"};return Object(O.jsx)(A,{onClick:t.onClickButton,value:e.value,style:n},e.value)}));return Object(O.jsx)("div",{style:{position:"relative"},children:e})}var T=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(t){var i;return Object(u.a)(this,n),(i=e.call(this,t)).handleButtonInput=i.handleButtonInput.bind(Object(l.a)(i)),i.handleInputChange=i.handleInputChange.bind(Object(l.a)(i)),i.handleInputSelect=i.handleInputSelect.bind(Object(l.a)(i)),i.handleHistoryInputAns=i.handleHistoryInputAns.bind(Object(l.a)(i)),i.handleHistoryInputExpr=i.handleHistoryInputExpr.bind(Object(l.a)(i)),i.handleHistoryDelete=i.handleHistoryDelete.bind(Object(l.a)(i)),i.handleHistoryDeleteAll=i.handleHistoryDeleteAll.bind(Object(l.a)(i)),i.state={history:[],expression:"",input_cur_start:0,input_cur_end:0},i.input_ref=r.a.createRef(),i}return Object(a.a)(n,[{key:"handleHistoryInputExpr",value:function(t){this.setState((function(e){return{expression:t,input_cur_start:t.length,input_cur_end:t.length}}))}},{key:"handleHistoryInputAns",value:function(t){this.setState((function(e){return{expression:e.expression.slice(0,e.input_cur_start)+t+e.expression.slice(e.input_cur_end),input_cur_start:e.input_cur_start+t.length,input_cur_end:e.input_cur_start+t.length}}))}},{key:"handleHistoryDelete",value:function(t){this.setState((function(e){return{history:e.history.filter((function(e){return e.index!=t}))}}))}},{key:"handleHistoryDeleteAll",value:function(t){this.setState({history:[]})}},{key:"handleInputChange",value:function(t){this.setState({expression:t.value,input_cur_start:this.input_ref.current.selectionStart,input_cur_end:this.input_ref.current.selectionEnd})}},{key:"handleInputSelect",value:function(){this.setState({input_cur_start:this.input_ref.current.selectionStart,input_cur_end:this.input_ref.current.selectionEnd})}},{key:"handleButtonInput",value:function(t){this.setState((function(e){var n={};if("C"==t)n={expression:"",input_cur_start:0,input_cur_end:0};else if("Del"==t)n=e.input_cur_start==e.input_cur_end?{expression:e.expression.slice(0,e.input_cur_start-1)+e.expression.slice(e.input_cur_end),input_cur_start:e.input_cur_start-1,input_cur_end:e.input_cur_start-1}:{expression:e.expression.slice(0,e.input_cur_start)+e.expression.slice(e.input_cur_end),input_cur_start:e.input_cur_start,input_cur_end:e.input_cur_start};else if("="==t)n=function(t){if(""!=t.expression){var e=new w(t.expression),n=0==t.history.length?0:t.history[0].index+1;try{var i=e.parse().toString(),r=i.length;return{expression:i,input_cur_start:r,input_cur_end:r,history:[{expression:t.expression,answer:i,index:n}].concat(t.history)}}catch(s){return{expression:"",input_cur_start:0,input_cur_end:0,history:[{expression:t.expression,answer:null,index:n}].concat(t.history)}}}}(e);else if("\u2190"==t)if(e.input_cur_start==e.input_cur_end){var i=0==e.input_cur_start?0:e.input_cur_start-1;n={input_cur_start:i,input_cur_end:i}}else n={input_cur_start:e.input_cur_end};else if("\u2192"==t)if(e.input_cur_start==e.input_cur_end){var r=e.input_cur_start==e.expression.length?e.expression.length:e.input_cur_start+1;n={input_cur_start:r,input_cur_end:r}}else n={input_cur_start:e.input_cur_end};else n={expression:e.expression.slice(0,e.input_cur_start)+t+e.expression.slice(e.input_cur_end),input_cur_start:e.input_cur_start+t.length,input_cur_end:e.input_cur_start+t.length};return n}))}},{key:"componentDidUpdate",value:function(){this.input_ref.current.focus(),this.input_ref.current.setSelectionRange(this.state.input_cur_start,this.state.input_cur_end)}},{key:"render",value:function(){return Object(O.jsxs)("div",{id:"calculator",children:[Object(O.jsxs)("div",{id:"calculation-area",children:[Object(O.jsx)(E,{input:this.state.expression,input_ref:this.input_ref,onInputChange:this.handleInputChange,onInputSelect:this.handleInputSelect}),Object(O.jsx)(H,{onClickButton:this.handleButtonInput})]}),Object(O.jsx)(m,{entries:this.state.history,onClickExpr:this.handleHistoryInputExpr,onClickAns:this.handleHistoryInputAns,onClickDel:this.handleHistoryDelete,onClickDelAll:this.handleHistoryDeleteAll})]})}}]),n}(r.a.Component),P=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(e){var n=e.getCLS,i=e.getFID,r=e.getFCP,s=e.getLCP,h=e.getTTFB;n(t),i(t),r(t),s(t),h(t)}))};h.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(T,{})}),document.getElementById("root")),P()}},[[16,1,2]]]);
//# sourceMappingURL=main.91eff4b3.chunk.js.map