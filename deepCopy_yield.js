function* deepCopy(obj) {
    let keys = Object.keys(obj);
    for(let i=0;i<keys.length;i++) {
        let key = keys[i];
        let val = obj[key];
        if(obj.hasOwnProperty(key)){
            if(typeof val === 'Object') {
                yield* deepCopy(val);
            }else {
                yield val;
            }
        }
    }
}

var obj = {
    a:1,
    b:null,
    c:undefined,
    symbol: Symbol('foo'),
    f: function(a, b) { return a+b;},
    s: "string"
}
let copy = {};
for(let [key,value] of deepCopy(obj)) {
   copy[key] = value;
}
console.log(copy);