function getArrExtend() {
    const arrExtend = Object.create(Array.prototype);
    const arrMethods = [
        'push', 
        'pop',
        'shift',
        'unshift',
        'splice',
        'slice',
        'sort',
        'reverse'
    ]

    //arrMethod 作为一个拦截对象，对其中的方法进行重写
    arrMethods.forEach(method => {
        const oldMethod = Array.prototype[method];
        const newMethod = function(...args) {
            oldMethod.apply(this, args);
            console.log(`${method}方法被执行了`)
        }
    })
    arrExtend[method] = newMethod;
}

function observe(obj) {
    if(!obj || typeof obj !== 'object') {
        return
    }

    Object.keys(obj).forEach(item => {
        defineReactive(obj, item, obj[item]);
    })
}

function Dep() {
    this.subs = [];
}

Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub);
    },
    notify() {
        this.subs.forEach(item => {
            item.update();
        })
    }
}

function defineReactive(obj, key, value) {
    let dep  = new Dep()
    observe(value)
    if(Array.isArray(value)) {
        value.__proto__ = getArrExtend();
    }
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: false,
        get() {
            return value
        },
        set(newValue) {
            if(value === newValue) return
            console.log(`发现${key}属性${value}->${newValue}`)
            value = newValue
        }
    })
}

const data = {
    name: "jchermy",
    userInfo: {
        gender: 0
    },
    list: []
}