Hooks.once('ready', () => {

    if (game?.system?.id === 'dsa-41') {
        const calculateLeftSkillPoints = (options, result) => {

            const diceResults = result.roll.dice.map(die => die.results[0].result);
            const skillDeltas = options.testAttributeData.map((attr, idx) => attr.value - diceResults[idx]);

            const criticalSuccess = diceResults.filter(res => res === 1).length >= 2;
            const criticalFailure = diceResults.filter(res => res === 20).length >= 2;
            let total;

            if (criticalFailure) {
                total = -Math.min(...skillDeltas);
            }
            else if (criticalSuccess) {
                total = options.skillValue + Math.max(...skillDeltas);
            }
            else {
                total = options.skillValue + Math.min(...skillDeltas);
            }

            // Update roll total
            result.roll._total = total;
            return result;
        };

        const skillRollAction = game?.ruleset?.actions?.get('rollSkill');
        if (skillRollAction) {
            skillRollAction.addPostHook(calculateLeftSkillPoints);
        }

    }
});

