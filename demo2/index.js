(async () => {
    console.log(`
----- exp1 -----
    `);
    await require('./exp1')();

    console.log(`
----- exp2 -----
    `);
    await require('./exp2')();
    
    console.log(`
----- exp3 -----
    `)
    await require('./exp3')();
})();