import axios from 'axios'
import get from 'lodash/get'

export const getPokemon = async (name, type) => {
    const result = await axios.get('http://localhost:3030/api/cards', {
        params: {
            limit: 20,
            ...(name && { name }),
            ...(type && { type }),
        },
    })

    return get(result, 'data.cards', [])
}
