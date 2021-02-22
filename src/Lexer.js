class Token{
    type = null;
    value = null;
    constructor(type, value){
        this.type = type;
        this.value = value;
    }
}

let TokenTypes = {
    //EQ: 1,
    PLUS: 2,
    MINUS: 3,
    ASTERISK: 4,
    SLASH: 5,
    DOUBLEASTERISK:6,
    NUMBER: 7,
    LPAR: 10,
    RPAR: 11,
    CARET: 12,
    END:-1,
}

class Lexer{
    constructor(input){
        this.input = input;
        this.curPos = -1;
        this.curChar = "";
        this.preToken = null;
        this.nextChar();
    }

    nextChar(){
        ++this.curPos;
        this.curChar = this.input[this.curPos];
    }

    peek(){
        return this.input[this.curPos+1];
    }

    skipWhiteSpace(){
        while(this.curChar == " "){
            this.nextChar();
        }
    }

    throw(msg){
        throw "Lexer error: \n\t" + this.input + "\n\t" + " ".repeat(this.curPos) + "^\n\t" +msg;
    }

    getToken(){
        this.skipWhiteSpace();
        if(this.curPos == this.input.length){
            return new Token(TokenTypes.END);
        }
        let token = undefined;
        if(this.curChar == "+"){
            token = new Token(TokenTypes.PLUS);
        }
        else if(this.curChar == "-"){
            token = new Token(TokenTypes.MINUS);
        }
        else if(this.curChar == "*"){
            if(this.peek() == "*"){
                token = new Token(TokenTypes.DOUBLEASTERISK);
                this.nextChar();
            }
            else{
                token = new Token(TokenTypes.ASTERISK);
            }
        }
        else if(this.curChar == "/"){
            token = new Token(TokenTypes.SLASH);
        }
        else if(this.curChar == "("){
            token = new Token(TokenTypes.LPAR);
        }
        else if(this.curChar == ")"){
            token = new Token(TokenTypes.RPAR);
        }
        else if(this.curChar == "."){
            let re = /^\.\d+([eE][+-]?\d+)?/;
            let result = re.exec(this.input.slice(this.curPos));
            if(result == null){
                this.throw("Undefined token starting with .")
            }
            let str = result[0];
            let value = parseFloat(str);
            this.curPos += str.length-1;
            token = new Token(TokenTypes.NUMBER, value);
        }
        else if(this.curChar == "^"){
            token = new Token(TokenTypes.CARET);
        }
        else if("0123456789".includes(this.curChar)){
            let re = /^(0|[1-9]\d*)(\.\d*)?([eE][+-]?\d+)?/;
            let result = re.exec(this.input.slice(this.curPos));
            if(result == null){
                this.throw("Error when tokenizing number")
            }
            let str = result[0];
            let value = parseFloat(str);
            this.curPos += str.length-1;
            token = new Token(TokenTypes.NUMBER, value);
        }
        if(token == undefined){
            this.throw( `Undefined char \"${this.curChar}\"`);
        }
        this.nextChar();
        return token;
    }
}

export {Lexer, TokenTypes};