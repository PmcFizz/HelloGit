// es6字符串扩展案例
function log(str){
    console.log(str);
}
// let s='Hello World';
//
// log(s.startsWith('Hello'))
// log(s.endsWith('ld'));
// log(s.includes('or'))
//

let  a=123;
log(`是的发送到${a}`)

const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));