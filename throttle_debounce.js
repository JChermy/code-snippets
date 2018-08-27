/**
 * 函数防抖
 * @param {*} fn 
 * @param {ms} delay 
 */
function debounce(fn ,delay) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function(){
            fn.apply(context, args);
        },delay)
    }
}

var fn = function(){
    console.log(new Date()+'time');
}

setInterval(debounce(fn, 500),1000)


/**
 * 函数节流
 * @param {*} fn 
 * @param {*} gaptime 
 */
function throttle(fn, gaptime) {
    var timer;
    var last;
    return function() {
        var now = +new Date();
        var context = this;
        var args = arguments;
        if(last && now < last + gaptime) {
            clearTimeout(timer);
            timer = setTimeout(function(){
                last = now;
                fn.apply(context, args);
            }, gaptime)
        }else {
            last = now;
            fn.apply(context, args);
        }
    }
}
var fn = function(){
    console.log('hello' + new Date())
}
setInterval(throttle(fn, 2000), 1000)