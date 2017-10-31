const superagent = require("superagent");
const fs = require("fs");
const cheerio = require("cheerio");
const async = require("async");
const request = require("request");
//保存目录
const downLoadFolder = "E:/Web_spiders/mc";
//superagent 配置数据
const setData = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Referrer': 'www.baidu.com',
    'Content-Type': 'text/plain; charset=UTF-8'
};
let currentIndex = 0;
let mainData = {selector: ".dribbble-img img"};
//下载远程文件到本地目录
let getFileSaveDir = (src, name, designer_name, cb) => {
    let srcArr = src.split(".");
    let file_type = srcArr[srcArr.length - 1];
    request.head(src, (err) => {
        request(src).pipe(fs.createWriteStream(downLoadFolder + "/" + designer_name + "/" + name + "." + file_type));
        cb(err, null);
    })
};
//根据文件url集合并发地发起请求
let asyncLoadFile = (arr, designer_name, topcb) => {
    async.mapLimit(arr, 5, (img, cb) => {
        console.log("正在请求图片" + img.imgsrc);
        getFileSaveDir(img.imgsrc, img.imgname, designer_name, cb);
    }, (err, res) => {
        if (err) {
            console.log("程序报错___" + err.message);
        } else {
            console.log("设计师" + designer_name + "的首页作品下载完毕,保存地址为:" + downLoadFolder + "/" + designer_name);
            topcb(null, null);
        }
    });
};
//程序主入口
let mainMethod = (target_url, selector, saveFolder, topcb) => {
    let tempFolder = downLoadFolder + "/" + saveFolder;
    if (!fs.existsSync(tempFolder)) {
        fs.mkdirSync(tempFolder);
    }
    superagent.get(target_url)
        .set(setData)
        .end((err, res) => {
            if (err) {
                console.log("获取目标地址出错__" + err.message);
                return;
            }
            let $ = cheerio.load(res.text);
            let selectorArr = $(selector);
            let file_url_arr = [];
            selectorArr.each((i, item) => {
                let url = $(item).attr("src");
                let name = currentIndex++;
                file_url_arr.push({imgsrc: url, imgname: name})
            })
            asyncLoadFile(file_url_arr, saveFolder, topcb);
        })
};

//获取目录页
let topMainMethod = () => {
    superagent.get("https://dribbble.com/designers")
        .set(setData)
        .end((err, res) => {
            if (err) {
                console.log("获取目录页错误__" + err.message);
                return;
            }
            let $ = cheerio.load(res.text);
            let desigers = $("a.url");
            let urlArr = [];
            desigers.each((i, item) => {
                let designer_name = $(item).attr("href").replace("/", "");
                urlArr.push({name: designer_name, url: "https://dribbble.com/" + designer_name});
            })
            console.log(urlArr);
            async.mapLimit(urlArr, 2, (item, designersCB) => {
                mainMethod(item.url, mainData.selector, item.name, designersCB);
            }, (err, res) => {
                if (err) {
                    console.log("中途出错__" + err.message);
                } else {
                    console.log("全部设计师下载完毕");
                }

            });
        })
};


// mainMethod(mainData.target_url, mainData.selector, mainData.saveFolder);

topMainMethod();