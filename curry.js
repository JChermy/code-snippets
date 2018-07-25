// 第一版柯里化函数
var curry = function(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = [].slice.call(arguments);
        return fn.apply(this, args.concat(newArgs));
    }
}


function add(a, b) {
    return a+b;
}

var addCurry = curry(add, 1,2);


//第二版柯里化函数
function sub_curry(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)) );
    };
}

function curry(fn, length) {
    length = length || fn.length;
    var slice = Array.prototype.slice;

    return function () {
        if(arguments.length < length) {
            var combined = [fn].concat(slice.call(arguments));
            return curry(sub_curry.apply(this, combined), length - arguments.length);
        }else {
            return fn.apply(this, arguments);
        }
    };
}

var fn = curry(function(a,b,c){
    return a+b+c;
});
fn(1)(2,3); //6
fn(1)(2)(3); //6
fn(1,2,3); //6


//第三版柯里化函数实现
function curry(fn, args) {
    var length = fn.length;
    args = args || [];

    return function() {
        var _args = args.slice(0), arg,i;
        for(i=0; i<arguments.length; i++) {
            arg = arguments[i];
            _args.push(arg);
        }
        if(_args.length < length) {
            return curry.call(this, fn, _args);
        }else {
            return fn.apply(this, _args);
        }
    }
}

var fn = function add(a,b) {
    return a+b;
}
var fnCurry = curry(fn);
fnCurry(3,4); //7
fnCurry(3)(4); //7



//简易版本
function curry(fn, args) {
    var length = fn.length;
    var args = args || [];
    return function() {
        var _args = args.slice(0);
        console.log(_args);
        for(var i=0;i<arguments.length;i++) {
            _args.push(arguments[i]);
        }
        if(_args.length<length) {
            return curry.call(this, fn, _args);
        }else {
            return fn.apply(this, _args);
        }
    }
}

var add = function(a,b) {
    return a+b;
}
var addCurry = curry(add);
addCurry(3,4); //7
addCurry(3)(4); //7

//ES6版本
const curry = (fn,arr=[]) =>{
    return (...args) => {
        if([...arr, ...args].length === fn.length) {
            return fn(...arr, ...args);
        }else {
            return curry(fn, [...arr, ...args]);
        }
    }
}

var add = function(a,b,c,d){
    return a+b+c+d;
 }
var addCurry = curry(add);
addCurry(1,2,3,4); //10
addCurry(1)(2)(3)(4); //10