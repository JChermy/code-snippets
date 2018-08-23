const  createProxy = data => {
    if(typeof data == 'object' && data.toString() === '[object Object]') {
        for(let k in data) {
            if(typeof data[k] === 'object') {
                defineObjectReactive(data, k, data[k]);
            }else {
                defineBasicReactive(data, k, data[k]);
            }
        }
    }
}

function defineObjectReactive(obj, key, value) {
    createProxy(value);
    obj[key] = new Proxy(value, {
        set(target, property, val, receiver) {
            if(property !== 'length') {
                console.log('Set %s to %o' , property, val);
            }
            return Reflect.set(target, property, val, receiver);
        }
    })
}

function defineBasicReactive(obj, key, value) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: false,
        get() {
            return value;
        },
        set(newValue) {
            if(value ===  newValue) return;
            console.log(`发现${key}属性${value}->${newValue}`);
            value = newValue
        }
    })
}

const data = {
    name: 'jchermy',
    userInfo: {
        gender: 0
    },
    lists: []
}


createProxy(data);
data.name;
//"hemin"
data.name = "hemin1";
//发现name属性hemin->hemin1
data.userInfo.gender=22;
//Set gender to 22
//发现gender属性0->22
data.lists.push(22);
//Set 0 to 22