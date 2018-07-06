//promise
let tasks = [];
function timers(i) {
        return new Promise((resolve, reject) =>{
           setTimeout(()=>{
            resolve();
            console.log(new Date, i);
           }, 1000*i);

        })

}

for(let i=0;i<5;i++){
   tasks.push(timers(i)); 
}
Promise.all(tasks).then(() => {
      setTimeout(()=>{
          console.log(new Date, 5);
      }, 1000);
})

//async
 function sleep(ms) {
     return new Promise((resolve, reject) => {
         setTimeout(() => resolve(), ms);
     })
 }

 (async function timers() {
     for(let i=0;i<6;i++) {
         console.log(new Date, i);
         await sleep(1000);
     }
 })();
