//指定范围生成指定个数的随机数
function generatorArr(max, min, len) {
    const arr = [];
    while(arr.length<len) {
        let randomNum = Math.floor(Math.random()*(max-min)+min);
        if(arr.indexOf(randomNum) !== -1) continue;
        arr[arr.length] = randomNum;
    }
    return arr;
}
generatorArr(100,0,10);
// [86, 63, 18, 20, 88, 10, 42, 80, 56, 72]