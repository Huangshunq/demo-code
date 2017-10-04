const puppeteer = require('puppeteer');

module.exports = async () => {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('https://news.ycombinator.com', {
        waitUntil: 'networkidle'
    });

    await page.click('a.storylink');

    var res = await page.waitForNavigation({
        waitUntil: 'networkidle'
    });

    console.log(await page.title());
    console.log(page.url());

    browser.close();
};