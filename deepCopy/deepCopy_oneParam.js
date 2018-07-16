/**
 * 深拷贝函数
 * @param obj
 */
function deepCopy(obj) {
    let result = {}
    let keys = Object.keys(obj),
         key = null,
         temp = null;
    for(let i =0,len=keys.length;i<len;i++) {
        key = keys[i];
        temp = obj[key];
        if(temp && typeof temp === 'object') {
            result[key] = deepCopy(temp);
        }else {
            result[key] = temp;
        }
    }
    return result;
}
var obj = {
     a:1,
     b:null,
     c:undefined,
     symbol: Symbol('foo'),
     f: function(a, b) { return a+b;},
     s: "string"
}
var copy = deepCopy(obj)