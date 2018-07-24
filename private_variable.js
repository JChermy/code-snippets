/**
 * 实现私有变量
 */

//1.命名约定
class Shape {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    get area(){
        return this._width * this._height;
    }
}

const square = new Shape(10,20);
console.log(square._width); //10
console.log(square.area); //200
console.log(Object.keys(square)); //["_width", "_height"]
console.log(JSON.stringify(square)); //"{"_width":10,"_height":10}"

//2.weakMap

const map = new WeakMap();

//创建一个在每个实例中存储私有变量的对象
const internal = obj => {
    if(!map.has(obj)) {
        map.set(obj, {});
    }
    return map.get(obj);
}

class Shape{
    constructor(width, height) {
        internal(this).width = width;
        internal(this).height = height;
    }
    get area(){
        return internal(this).width*internal(this).height;
    }
}
const square = new Shape(3,4);
console.log(square.width); //undefined
console.log(square.area); //12
console.log(map.get(square)); //{width: 3, height: 4}
console.log(Object.keys(square)); //[]
console.log(JSON.stringify(square)); //"{}"


//3.Symbol
const widthSymbol = Symbol('width');
const heightSymbol = Symbol('height');

class Shape{
    constructor(width, height) {
        this[widthSymbol] = width;
        this[heightSymbol] = height;
    }

    get area() {
        return this[widthSymbol]*this[heightSymbol];
    }
}
const square = new Shape(4,5);
console.log(square.area);  //20
console.log(square.widthSymbol); //undefined
console.log(square[widthSymbol]);//4


//4.闭包
function Shape(){
    //私有变量集
    const this$ = {};

    class Shape{
        constructor(width, height) {
            this$.width = width;
            this$.height = height;
        }

        get area(){
            return this$.width*this$.height;
        }
    }

    const instance = new Shape(...arguments);
    Object.setPrototypeOf(Object.getPrototypeOf(instance), this);
    return instance;
}
const square = new Shape(2,3); 
console.log(square.area); //6
console.log(square.width); //undefined
console.log(square instanceof Shape); //true


//5.proxy

class Shape{
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    get area() {
        return this._width * this._height;
    }
}

const handler = {
    get: function(target, key) {
        if(key[0] === '_') {
            throw new Error('Attempt to access private property');
        }else if(key === 'toJSON') {
            const obj ={};
            for(const key in target) {
                if(key[0] !== '_') {
                    obj[key] = target[key];
                }
            }
            return ()=> obj;
        }
        return target[key];
    },
    set: function(target, key, value) {
        if(key[0] === '_') {
            throw new Error('Attempt to access private property');
        }
        target[key] = value;
    },
    getOwnPropertyDescriptor(target, key) {
        const desc = Object.getOwnPropertyDescriptor(target, key);
        if(key[0] === '_') {
            desc.enumerable = false;
        }
        return desc;
    }
}

const square = new Proxy(new Shape(10,20), handler);
console.log(square.area); //200
console.log(square instanceof Shape); //true
console.log(JSON.stringify(square)); //{}
for(const key in square) { //空
    console.log(key);
}
square._width = 200; //Uncaught Error: Attempt to access private property

