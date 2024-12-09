Hooks.once('ready', () => {

    // Hooks.on('system.preRoll', (rollAble, options, rollMod, totalMod) => {
    // });


    Hooks.on('system.postRoll', (roll, options, success) => {
        console.log(options);
        switch (options.skillType) {
            default:
                const skillDeltas = [];
                roll.dice.forEach((die, idx) => {
                    skillDeltas.push(options.testAttributeData[idx].value - die.results[0].result);
                });

                let total = roll.total;
                if (
                    roll.dice.filter((die) => die?.results[0].result === 20).length >= 2
                ) {
                    success = false
                }
                else if (
                    roll.dice.filter((die) => die.results[0].result === 1).length >= 2
                ) {
                    success = true
                    total = options.skillValue + Math.max(...skillDeltas);
                }
                else {
                    total = options.skillValue + Math.min(...skillDeltas);
                    success = total >= 0
                }
                roll._total = total;
                break;
        }

    });


});
