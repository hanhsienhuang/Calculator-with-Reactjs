//import Lexer from './Lexer.js'; 
import {Lexer, TokenTypes} from './Lexer'; 

export default class Parser{
    constructor(input){
        this.lexer = new Lexer(input);
        this.token = null;
        this.nextToken();
    }

    parse(){
        let value = this.expression();
        if(this.token.type != TokenTypes.END){
            this.throw("Not end");
        }
        return value
    }

    throw(msg){
        throw "Parser error: \n\t" + msg;
    }

    nextToken(){
        this.token = this.lexer.getToken();
    }

    expression(){
        let result = this.term();
        
        while(this.token.type == TokenTypes.PLUS || this.token.type == TokenTypes.MINUS){
            if(this.token.type == TokenTypes.PLUS){
                this.nextToken();
                result += this.term();
            }
            else{
                this.nextToken();
                result -= this.term();
            }
        }
        return result
    }

    term(){
        let result = this.power();
        
        while(this.token.type == TokenTypes.ASTERISK || this.token.type == TokenTypes.SLASH){
            if(this.token.type == TokenTypes.ASTERISK){
                this.nextToken();
                result *= this.power();
            }
            else{
                this.nextToken();
                result /= this.power();
            }
        }
        return result
    }

    power(){
        let result = this.uniary();
        
        while(this.token.type == TokenTypes.DOUBLEASTERISK || this.token.type == TokenTypes.CARET ){
            this.nextToken();
            result = result ** this.power();
        }
        return result
    }

    uniary(){
        if(this.token.type == TokenTypes.PLUS || this.token.type == TokenTypes.MINUS){
            this.nextToken();
            return (this.token.type == TokenTypes.PLUS)?this.primary():-this.primary();
        }
        return this.primary();
    }

    primary(){
        if(this.token.type == TokenTypes.NUMBER){
            let value = this.token.value;
            this.nextToken();
            return value;
        }
        else if(this.token.type == TokenTypes.LPAR){
            this.nextToken()
            let value = this.expression();
            if(this.token.type != TokenTypes.RPAR){
                this.throw("unbalanced paranthesis");
            }
            this.nextToken()
            return value;
        }
        this.throw(`got token type ${this.token.type} in primary`);
    }
}

/*
//testing
let exprs = [
    "5+ 3*2",
    ".353 / 1.3",
    "(5+3) * (3* ( 5-3))",
    "(1-2) / (3** ( 5-3))",
    "- 5+ 3*9**2",
    "1/0",
    "2**3**2",
    "*",
    "3*"
]

for(expr of exprs){
    let parser = new Parser(expr);
    try{
        console.log(`${expr} = ${parser.parse()}`);
    }catch(e){
        console.log(e);
    }
    try{
        console.log(eval(expr));
    }catch(e){
        console.log(e);
    }
}
*/