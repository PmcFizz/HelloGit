/**
 * Created by Administrator on 2017/10/21.
 */
// 变量的重构赋值
function log(str){
    console.log(str);
}

// let [a,b,c]=[1,2,3];
// log(a)
//

// let [foo,[[bar],baz]]=[1,[[2],3]]
// log(foo)
// log(bar)
// log(baz)

// let [,,thrid]=['foo','bar','baz'];
// log(thrid)

// let [x,,y]=[1,2,3];
// log(y)

// let [head,...tail]=[1,2,3,4]
// log(tail);

// let [foo]=[];
// let [bar,foo]=[1]
// log(foo)

// let [x,y,z]=new Set(['a','b','c'])
// log(y)

// let [foo=true]=[];
// log(foo)

// let [x,y='b']=['a']
// log(y)
// let [x=1]=[undefined];
// log(x)

// function f() {
//     log('aaa')
// }
// let [x=f()]=[1];
// log(x);

// let [x=y,y=1]=[,2]

// let {foo,bar}={foo:'aaa',bar:'bbb'}
// log(foo)
// log(bar)
// let {baz}={foo:1,bar:3}
// log(baz)

// let {foo:baz}={foo:'aaa','bar':'bbb'}
// log(baz)
// log(foo)

// let obj={first:'hello',last:'world'}
// let {first:f,last:l}=obj;
// log(f)

// let obj={
//     p:[
//         'hello',
//         {y:'world'}
//     ]
// };
// let {p:[x,{y}]}=obj;

// const node={
//     loc:{
//         start:{
//             line:1,
//             column:5
//         }
//     }
// }
// let {loc,loc:{start},loc:{start:{line}}}=node;
// log(loc);
// log(line)
// log(start)

// let obj={};
// let arr=[];
// ({foo:obj.prop,bar:arr[0]} ={foo:123,bar:true});
// log(obj)
// log(arr)

// let {log ,sin,cos}=Math;

// let arr=[1,2,3]
// let {0:first,[arr.length-1]:last}=arr;
// log(first)
// log(last)

// const [a,b,c,d]='hello';
// log(c)

// let {length:len}='hello';
// log(len);

// function add([x,y]){
//     return x+y
// }
// log(add([1,2]));

// log([[1,2],[3,4]].map(([a,b])=>a+b));

// function move({x=0,y=0}={}) {
//     return [x,y]
// }
// log(move({x:3,y:8}));

// log([1,undefined,3].map((x='yes')=>x))

