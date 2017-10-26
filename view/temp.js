var arr1=[];
var arr2=[{name:2},{name:3},{name:43}];
var arr3=[{title:'w'},{title:'3'}]

for(let i=0;i<arr2.length;i++){

    arr1.push(arr2[i])
    if(i==1){
        arr1.push(arr3[0])
    }
}
console.log(arr1);