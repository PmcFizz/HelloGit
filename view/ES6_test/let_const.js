/**
 * Created by Administrator on 2017/10/21.
 */
// 使用let const
function log(str){
    console.log(str);
}
//
// {
//     let a=10;
//     var b=1;
// }
// log(a)
// log(b)

// var a=[];
// for(let i=0;i<10;i++){
//     a[i]=function () {
//         log(i)
//     }
// }
// a[6]();

// for(let i=0;i<3;i++){
//     let i='abc';
//     log(i)
// }
//
// log(foo)
// var foo=2;
//
// log(bar);
// let bar=3;
//
// var tmp=123;
// if(true){
//     tmp='abc';
//     let tmp;
// }

// if(true){
//     // tmp='1bc';
//     // log(tmp);
//
//     let tmp;
//     log(tmp);
//     tmp=123;
//     log(tmp)
// }
// let x;
// log(typeof x);

// function bar(x=y,y=2) {
//     return [x,y]
// }
// bar()

// function bar(x=2,y=x) {
//     return [x,y]
// }
// log(bar())

// var x=x;
// log(x);
// let x=x;
// log(x)

// function func() {
//     let a=12;
//     let a=2;
// }

// function func(arg) {
//     {
//     let arg;
//     }
// }

// function f1() {
//     let n=5;
//     if(true){
//         let n=10;
//         log(n)
//     }
//     log(n)
// }
//
// f1()

// function f() {
//     log('Im out')
// }
//
// {
//     if(false){
//         function f() {
//             log('i inner')
//
//         }
//     }
//     f()
// }

// const PI=3.1415;
// log(PI);
// PI=3;

// const foo;

// if(true){
//     const MX=5
// }
// log(MX);

// const foo={};
// foo.prop=123;
// log(foo.prop)
// foo={};

// const foo=Object.freeze({});
// foo.porp=123;
// log(foo.porp)
