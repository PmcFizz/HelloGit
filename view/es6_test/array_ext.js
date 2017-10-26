//测试ES6 数组扩展
function  log(str) {
    console.log(str);
}

// console.log(...[1,2,3])

// function push(arr,items) {
//     arr.push(...items)
// }
// function add(x,y) {
//     return x+y
// }
//
// const  numubers=[2,28]
// // log(add(...numubers));
// var a=[];
// push(a,numubers)
// log(a)

// function f(a,b,c,d,e) {
//     return a+b+c+d+e;
// }
// const args=[1,4];
// log(f(-1,...args,4,6))

// var x=10
// const arr=[
//     ...(x>0 ? ['a'] :[]),
//     'b',
// ]
// log(arr);

// function f(x,y,z) {
//     return x+y+z;
// }
// var args=[1,2,3]
// log(f.apply(null,args));
// log(f(...args))
// log(Math.max.apply(null,[12,43,5,67]));
// log(Math.max(...[12,4,5,676,645]));

// let arr1=[1,2,34,5]
// let arr2=[3,34,54,7]
// arr1.push(...arr2)
// log(arr1)
// log(new Date(...[2015,1,1]))
// var a1=[1,2]
// var a2=a1.concat();
// a1[0]=2;
// log(a2[0]);

