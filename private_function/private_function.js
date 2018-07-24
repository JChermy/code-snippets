Person.prototype = (function(){
    /******私有方法定义*****/

    //通过var定义
    var toStr = function() {
        return this.name +" is "+this.age;
    }

    //直接定义
    function privateMethod() {
        console.log('in private method');
    }

    return {//返回的这个函数会返回一个原型对象
        constructor:Person,

        /*******公有方法*******/
        printInfo: function() {
            console.log('printing info:' ,toStr.call(this));
        },
        publicMethod: function(){
            privateMethod.call(this);
        }

    }

})();
//test case
var p = new Person('Jaskey',24);
p.printInfo();//printing info: Jaskey is 24
p.publicMethod();// in private method
p.toStr();//"undefined is not a function"