/**
 * 实现超出整数存储范围的两个大正整数相加 function add(a, b)。
    注意：参数 a 和 b 以及函数的返回值都是字符串。
 */

 function add (a, b) {
     var a = a.split("");
     var b = b.split("");
     var result = "", jinwei = 0;
     while(a.length || b.length || jinwei) {
         var n = parseInt(a.pop() || 0) + parseInt(b.pop() || 0) + jinwei;
          result = n%10 + result;
          jinwei = Math.floor(n/10);
     }
     return result;
 }

 //先比较两个字符较长的那一个，再将两个字符补充0至相同的长度，逐位相加，逢10进1

 function add(a, b) {
     var str1 = a.split('').reverse();
     var str2 = b.split('').reverse();
     var max_len = Math.max(str1.length, str2.length);
     var result = Array.apply(null , {length: max_len});
     for(var i=0;i<max_len;i++) {
         if(str1[i] === undefined) {
             str1[i] = 0;
         }
         if(str2[i] === undefined) {
             str2[i] = 0;
         }
         result[i] = parseInt(str1[i]) + parseInt(str2[i]);
     }

     for(var j=0;j<result.length;j++) {
         if(result[j] >= 10) {
             if(result[j+1] == undefined) {
                 result[j+1] = 0;
             }
             result[j] -=10;
             result[j+1] += 1;
         }
     }

     return result.reverse().join("");
 }