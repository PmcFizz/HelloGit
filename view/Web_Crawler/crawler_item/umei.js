/**
 * Created by FizzPang on 2017/9/27.
 */
const superagent = require("superagent");
const fs = require("fs");
const cheerio = require("cheerio");
const async = require("async");
const request = require("request");
//保存目录
const downLoadFolder = "E:/Web_spiders/umei";
//superagent 配置数据
const setData = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Referrer': 'www.baidu.com',
    'Content-Type': 'text/plain; charset=UTF-8'
};
let currentIndex = 0;
//下载远程文件到本地目录
let getFileSaveDir = (src, name, cb) => {
    let srcArr = src.split(".");
    let file_type = srcArr[srcArr.length - 1];
    console.log(src);
    request.head(src, (err) => {
        request(src).pipe(fs.createWriteStream(downLoadFolder + "/" + name + "." + file_type));
        cb(err, null);
    })
};
//根据文件url集合并发地发起请求
let asyncLoadFile = (arr) => {
    async.mapLimit(arr, 5, (img, cb) => {
        currentIndex++;
        getFileSaveDir(img.imgsrc, img.imgname, cb);
    }, (err, res) => {
        if (err) {
            console.log("程序报错___" + err.message);
        } else {
            console.log("文件下载完毕,保存地址为:" + downLoadFolder);
        }
    });
};
//程序主入口
let mainMethod = (target_url, selector) => {
    if (!fs.existsSync(downLoadFolder)) {
        fs.mkdirSync(downLoadFolder);
    }
    superagent.get(target_url)
        .set(setData)
        .end((err, res) => {
            if (err) {
                console.log("获取目标地址出错__" + err.message);
                return;
            }
            console.log(res.text)

            let $ = cheerio.load(res.text);
            let selectorArr = $(selector);
            console.log(selectorArr.length);
            let file_url_arr = [];
            selectorArr.each((i, item) => {
                let url = $(item).attr("src");
                let name = i;
                if(url.indexOf("?")==-1){
                    file_url_arr.push({imgsrc: url, imgname: name})
                }

            })
            asyncLoadFile(file_url_arr);
        })
};
let mainData = {target_url: "http://www.umei.cc/", selector: ".wrap img"};
mainMethod(mainData.target_url, mainData.selector);