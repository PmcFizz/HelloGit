/**
 * Created by Administrator on 2017/10/31.
 */
/**
 *获取唐诗三百首 保存到数据库
 *2017年10月31日12:35:48
 */
let superagent = require("superagent");
let cheerio = require("cheerio");
let async = require("async");
let mongoose = require('mongoose');
let Schema = require('mongoose').Schema;

const setData = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Referrer': 'www.baidu.com',
    'Content-Type': 'text/plain; charset=UTF-8'
};


const Poetry = mongoose.model('poetry', new Schema({
    title  :   String,    //诗的标题
    author :   String,    //作者
    href   :   String,    //链接
    content:   String,    //诗的内容
    dynasty:   String,    //朝代
    tag    :   Array      //标签
}))
mongoose.connect('mongodb://localhost/net_data', function (err) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("^_^数据库已连接...请开始你的表演^_^")
    }
});

//程序主入口
let mainFun = (target_url, selector) => {
    superagent.get(target_url)
        .set(setData)
        .end((err, res) => {
            let $ = cheerio.load(res.text);
            let selectorArr = $(selector);
            let poetryArr = [];
            for (let i = 0; i < selectorArr.length; i++) {
                let item = $(selectorArr[i]);
                let href = item.attr('href');
                let title = item.text();
                let author=item.parent().text();
                let tag=['唐朝','唐诗三百首','唐代'];
                let dynasty='唐朝';
                if(href.indexOf('http://')!==0){
                    href='http://so.gushiwen.org'+href;
                }
                poetryArr.push(href,title);
                let new_poetry = new Poetry({
                    title,
                    href,
                    author,
                    dynasty,
                    tag
                })
                new_poetry.save();
                console.log("已保存到数据库^_^");
            }
           // console.log(poetryArr);
        })
};

mainFun('http://www.gushiwen.org/gushi/tangshi.aspx', '.sons a');
