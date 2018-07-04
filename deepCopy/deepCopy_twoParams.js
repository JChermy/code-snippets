/**
* 深拷贝函数
* @param1 parent
* @param2 copy
*/
function deepCopy(parent, copy) {
    copy = copy || {}
    for(var i in parent) {
        if(parent.hasOwnProperty(i)) {
            if(typeof parent[i]  === 'object') {
                copy[i] = Array.isArray(parent[i]) ? [] : {}
                deepCopy(parent[i], copy[i])
            }else {
                copy[i] = parent[i];
            }
        }
    }
    return copy;
}
var obj = {
    a:1,
    b:"str",
    c:Symbol("c"),
    d:function(x,y){
        return x+y;
    },
    e:undefined,
    f:null,
    g: [1,2,3]
}
 
var obj2 = deepCopy(obj);