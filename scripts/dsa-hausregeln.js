Hooks.once('ready', () => {

    if (game?.system?.id === 'dsa-41') {
        const calculateLeftSkillPoints = (options, result) => {

            const diceResults = result.roll.dice.map(die => die.results[0].result);
            const criticalSuccess = diceResults.filter(res => res === 1).length >= 2;
            const criticalFailure = diceResults.filter(res => res === 20).length >= 2;

            let additionalPoints = 0;
            const skillDeltas = options.testAttributeData.map((attr, idx) => attr.value - diceResults[idx]);
            skillDeltas.forEach((skillDelta) => additionalPoints += skillDelta < 0 ? skillDelta : 0);
            additionalPoints ||= Math.min(...skillDeltas);

            let total = -(result.mod > 0 ? result.mod : 0);

            console.log(additionalPoints, total);

            if (criticalFailure) {
                total += additionalPoints;
            }
            else if (criticalSuccess) {
                total += options.skillValue + Math.max(...skillDeltas);
            }
            else {
                total += options.skillValue + additionalPoints;
            }

            result.roll._total = total;

            return result;
        };

        const skillRollAction = game?.ruleset?.actions?.get('rollSkill');
        if (skillRollAction) {
            skillRollAction.addPostHook(calculateLeftSkillPoints);
        }

    }
});

