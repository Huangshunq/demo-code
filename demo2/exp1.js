const puppeteer = require('puppeteer');

module.exports = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('https://github.com/');
    await page.screenshot({
        path: 'github.png'
    });

    browser.close();
};