function getData(age,name){
    return {
        sayHello:function(){
            console.log(`my name is ${name} and I'm in ${age} .`);
        }
    }
};

getData(23,'riste').sayHello();

class Cat {
    constructor(name){
        this._name = name
        this.silence = false;
       this.myau = ()=>{
            if(!this.silence){
                console.log(`this name is ${this._name} and myauuuu`);
            }
            
        };
       this.risina = ()=>{
            this.silence = true
        }
    }
   
};

var cat = new Cat('cotka e prekrasna');
cat.myau()
cat.myau()
cat.myau()
cat.risina()
cat.myau()
