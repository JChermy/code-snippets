/**
 * 利用Generator函数生成斐波那契数列
 */
function* fibonacci(){
  let [prev, curr] = [0 ,1];
  for(;;){
      yield curr;
      [prev, curr] = [curr, prev+curr];
  }
}

for(i of fibonacci()){
    if(i > 100); break;
    console.log(i);
}