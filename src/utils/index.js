import get from 'lodash/get';
import isArray from 'lodash/isArray'

export const calculateHp = (pokemon) => {
    const getHp = parseInt(get(pokemon,'hp', 0))
    const hp = getHp ? getHp : 0
    return hp > 100 ? 100 : hp
}

export const calculateStrength = (pokemon) => {
    const strengthCal = get(pokemon, 'attacks.length', 0) * 50
    const strengthSum = strengthCal > 100 ? 100 : strengthCal
    return `${strengthSum}%`
}

export const calculateWeakness = (pokemon) => {
    const weaknessCal = get(pokemon, 'weaknesses.length', 0) * 100
    const weaknessSum = weaknessCal > 100 ? 100 : weaknessCal
    return `${weaknessSum}%`
}

export const calculateDamage = (pokemon) => {
    const getAttackList = get(pokemon, 'attacks', [])
    const handleList = isArray(getAttackList) ? getAttackList : []
    const damageCal = handleList
        .map((attack) => {
            return get(attack, 'damage', null) ? parseInt(attack.damage) : 0
        })
        .reduce((acamulator, num) => acamulator + num, 0)

    return damageCal
}

export const calculateHappiness = (hp, damage, weakness) => {

    return Math.round(((hp / 10) + (damage / 10) + 10 - (weakness / 100)) / 5)
}

export const mutablePokemonData = (pokemonData) => {
    return pokemonData.map((pokemon) => {
        const hp = calculateHp(pokemon)
        const strength = calculateStrength(pokemon)
        const weakness = calculateWeakness(pokemon)
        const damage = calculateDamage(pokemon)
        const happiness = calculateHappiness(hp, damage, parseInt(weakness))

        return {
            ...pokemon,
            Output: {
                hp,
                strength,
                weakness,
                damage,
                happiness,
            },
        }
    })
}
