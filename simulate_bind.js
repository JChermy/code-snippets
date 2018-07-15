Function.prototype.bind2 = Function.prototype.bind || function(context) {//兼容现有的bind方法
    if(typeof this !== 'function' ) {
        throw new Error('调用bind时请使用函数'); //报错处理
    }
     var self = this; //保留this的引用
     var bindArgs = Array.prototype.slice.call(arguments, 1); //取出调用bind时传入的参数第二位至最后一位，即除了第一个上下文参数的剩余所以参数
     var fNOP = function() {}; //做中间函数用
     var fBound = function() {
        var funcArgs = Array.prototype.slice.call(arguments); //取出调用bind后的函数时传入的参数
        self.apply(this instanceof fNOP ? this : context, bindArgs.concat(funcArgs)); //检测this是否指向构造函数，如果是，就把绑定函数的this给构造函数
     }
     fNOP.prototype = this.prototype;
     fBound.prototype = new fNOP();
     return fBound;
}


var obj = {
    value : 1
}
function person(name, age) {
    this.habbit = 'football';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

person.prototype.sex = 'men';

var p = person.bind2(obj, 'xiaomin');
var c = new p(18);
