# puppeteer-demo

> try to use [puppeteer](https://github.com/GoogleChrome/puppeteer)
>
> (Puppeteer requires at least Node v6.4.0, but the examples below use async/await which is only supported in Node v7.6.0 or greater)

## 安装

``` bash
npm i -D puppeteer
```

## 运行

``` bash
npm start
```

## 入门 puppeteer

``` js
// 引入 puppeteer
const puppeteer = require('puppeteer');

(async () => {
    // 创建 browser 实例，相当于打开并连接了浏览器
    const browser = await puppeteer.launch({
        headless: false
    });

    // 新建空白页面
    const page = await browser.newPage();

    // 当页面本身有 console 输出时，触发 console 事件，page.on()方法用于自定义事件发生后的处理
    page.on('console', (...args) => console.log('PAGE LOG:', ...args));

    // 使页面跳转至 https://news.ycombinator.com
    await page.goto('https://news.ycombinator.com', {
        waitUntil: 'networkidle'
    });

    // 使用页面截图功能并保存截图
    await page.screenshot({
        path: 'photo.png'
    });

    // 使用 page.evaluate() 方法 可以在该页面环境下 执行想要执行的操作
    const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('.storylink'));
        return anchors.map(anchor => anchor.textContent);
    });

    // 打印获得到的数据
    console.log(links.join('\n'));

    // 可使用 page.click() 执行点击链接操作
    await page.click('a.storylink');

    var res = await page.waitForNavigation({
        waitUntil: 'networkidle'
    });

    // 打印相关信息
    console.log(await page.title());
    console.log(page.url());

    // 关闭浏览器
    browser.close();
})();
```

## 更多

更多关于 [Puppeteer API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) 可查阅官方的 API文档