const { Wechaty, Contact } = require("wechaty");
const qrcodeTerminal = require("qrcode-terminal");
const fs = require("fs");
Wechaty.instance()
  .on("scan", (url, code) => {
    if (!/201|200/.test(String(code))) {
      const loginUrl = url.replace(/\/qrcode\//, "/l/");
      qrcodeTerminal.generate(loginUrl);
      console.log(`${url}\n [${code}扫描登录]`);
    }
  })
  .on("login", async user => {
    let a = user;
    // let b = await Contact.findAll();
    // console.log(b);
    // console.log('alias',a.alias());
    // console.log('avatar',a.avatar());
    // console.log('city',a.city());
    // console.log('dump',a.dump());
    // console.log('dumpRaw',a.dumpRaw());
    // console.log('gender',a.gender());
    // console.log('get',a.get());
    // console.log('isReady',a.isReady());
    // console.log('name',a.name());
    // console.log('offical',a.official());
    // console.log('parse',a.parse());
    // console.log('personal',a.personal());
    // console.log('province',a.province());
    // console.log('ready',a.ready());
    // console.log('refresh',a.refresh());
    // console.log('remark',a.remark());
    // console.log('say',a.say());
    // console.log('start',a.star());
  })
  .on("message", async message => {
    const room = message.room();
    const sender = message.from();
    const content = message.content();
    console.log(
      (room ? "[" + room.topic() + "]" : "") +
        "<" +
        sender.name() +
        ">" +
        ":" +
        message
    );
    if(/今日执勤力量/.test(content)){
        if(/值班/.test(content)){
            fs.readFile('data.txt',(err,data) => {
                if(err){
                    return console.error(err)
                }
                console.log("准备写入文件");
                fs.writeFile("data.txt", data+"\t"+content, function(
                  err
                ) {
                  if (err) {
                    return console.error(err);
                  }
                  console.log("数据写入成功！");
                  console.log("--------我是分割线-------------");
                  console.log("读取写入的数据！");
                  fs.readFile("data.txt", function(err, data) {
                    if (err) {
                      return console.error(err);
                    }
                    console.log("异步读取文件数据: " + data.toString());
                  });
                });
            })
        }
        if(/干部/.test(content)){
            fs.readFile('data2.txt',(err,data) => {
                if(err){
                    return console.error(err)
                }
                console.log("准备写入文件");
                fs.writeFile("data2.txt", data+"\t"+content, function(
                  err
                ) {
                  if (err) {
                    return console.error(err);
                  }
                  console.log("数据写入成功！");
                  console.log("--------我是分割线-------------");
                  console.log("读取写入的数据！");
                  fs.readFile("data.txt", function(err, data) {
                    if (err) {
                      return console.error(err);
                    }
                    console.log("异步读取文件数据: " + data.toString());
                  });
                });
            })
        }
    }
  })
  .start();
