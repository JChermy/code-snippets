const tasks = [];//这里存放异步操作的Promise
const output = (i) => new Promise((resolve)=>
    setTimeout(()=>{
        console.log(i);resolve();}, 1000*i)
)
//生成全部的异步操作
for(var i=0;i<5;i++){
    tasks.push(output(i));
}
//异部操作完成之后，输出最后的i
Promise.all(tasks).then(()=>setTimeout(()=>{console.log(i)},1000));
