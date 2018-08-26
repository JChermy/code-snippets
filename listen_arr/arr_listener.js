
function getArrExtend() {

    const arrExtend = Object.create(Array.prototype)
    const arrMethods = [
      'push',
      'pop',
      'shift',
      'unshift',
      'splice',
      'sort',
      'reverse'
    ]
    /**
     * arrExtend 作为一个拦截对象, 对其中的方法进行重写
     */
    arrMethods.forEach(method => {
      const oldMethod = Array.prototype[method]
      const newMethod = function(...args) {
        oldMethod.apply(this, args)
        console.log(`${method}方法被执行了`)
      }
      arrExtend[method] = newMethod
    })

    return arrExtend;
}



function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }
  //遍历对象的所有属性
  Object.keys(obj).forEach(item => {
    defineReactive(obj, item, obj[item])
  })
}

function Dep() {
  this.subs = []
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub)
  },
  notify() {
    this.subs.forEach(item => {
      item.update()
    })
  }
}

function defineReactive(obj, key, value) {
  let dep = new Dep()
  observe(value)
  if (Array.isArray(value)) {
    value.__proto__ = getArrExtend();
  }
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    get() {
      //Dep.target && Dep.addSub(Dep.target);
      //由于Dep的实例化是在闭包内完成的，所以需要在这个地方添加Watcher
      //console.log(`use ${key}-`, value)
      return value
    },
    set(newValue) {
      if (value === newValue) return
      console.log(`发现 ${key} 属性 ${value} -> ${newValue}`)
      value = newValue
    }
  })
  // //tartget是一个动态属性
  // Watcher.prototype = {
  //     get(key) {
  //         Dep.target = this;
  //         this.value = data[key];
  //         Dep.target = null;
  //     }
  // }
}
// example
const data = {
  name: 'Jiang',
  userInfo: {
    gender: 0
  },
  list: []
}
// 此处直接使用了前面写好的 getter/setter
observe(data)
// data.name = 'Solo'
// data.userInfo.gender = 1
data.list.push(1)
// console.log(data)