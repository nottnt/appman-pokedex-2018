import axios from 'axios';
import {
    getPokemon,
} from './index'

axios.defaults.adapter = require('axios/lib/adapters/http');

it('return the getPokemon isArray', async () => {
    const result = await getPokemon()
    expect(Array.isArray(result)).toBe(true);
})

it('getPokemon limit fecth 20', async () => {
    const result = await getPokemon()
    expect(result.length === 20).toBe(true);
})
