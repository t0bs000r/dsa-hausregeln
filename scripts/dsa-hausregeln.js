Hooks.once('ready', () => {

    // Hooks.on('system.preRoll', (rollAble, options, rollMod, totalMod) => {
    // });


    Hooks.on('system.postRoll', (roll, options) => {
        const skillDeltas = roll.dice.map((die, idx) =>
            options.testAttributeData[idx].value - die.results[0].result
        );

        const criticalSuccess = roll.dice.filter(die => die?.results[0].result === 1).length >= 2;
        const criticalFailure = roll.dice.filter(die => die?.results[0].result === 20).length >= 2;

        let total = roll.total;

        if (criticalFailure) {
            total = -Math.min(...skillDeltas);
        }
        else if (criticalSuccess) {
            total = options.skillValue + Math.max(...skillDeltas);
        }
        else {
            total = options.skillValue + Math.min(...skillDeltas);
        }
        roll._total = total;

    });


});
