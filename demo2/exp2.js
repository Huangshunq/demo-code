const puppeteer = require('puppeteer');

module.exports = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    page.on('console', (...args) => console.log('PAGE LOG:', ...args));

    await page.goto('https://news.ycombinator.com', {
        waitUntil: 'networkidle'
    });

    const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('.storylink'));
        return anchors.map(anchor => anchor.textContent);
    });

    console.log(links.join('\n'));

    browser.close();
};