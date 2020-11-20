import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItems from '../ListItems'
import debounce from 'lodash/debounce'
import { getPokemon } from '../../../src/services'
import { mutablePokemonData } from '../../utils'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import searchIcon from '../../search.png'

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 850,
        height: 550,
        overflow: 'hidden',
        paddingBottom: 100,
    },
    image: {
        width: '20px',
    },
    input: {
        '&:after': {
            borderBottom: '2px solid #ec5656',
        },
    },
}))

export default function ModalBodySearchPokemon({
    hadleActionPokedex,
    action,
    myPokedex,
}) {
    const classes = useStyles()
    const [pokemonList, setPokemonList] = useState([])

    const initFetch = async () => {
        const result = await getPokemon()
        const listAddedId = myPokedex.map((pokedex) => pokedex.id)
        const filterByAddItem = result.filter(
            (poke) => !listAddedId.includes(poke.id)
        )

        setPokemonList(mutablePokemonData(filterByAddItem))
    }

    useEffect(() => {
        initFetch();
    }, [])

    const handleSearchPokemon = debounce(async (value) => {
        const name = value
        const type = value
        const result = await getPokemon(name, type)
        const listAddedId = myPokedex.map((pokedex) => pokedex.id)
        const filterByAddItem = result.filter(
            (poke) => !listAddedId.includes(poke.id)
        )
        setPokemonList(mutablePokemonData(filterByAddItem))
        console.log(value)
    }, 300)

    const filterAddPokemon = (pokemon) => {
        const filterByAddItem = pokemonList.filter(
            (poke) => poke.id !== pokemon.id
        )
        setPokemonList(filterByAddItem)
    }

    return (
        <>
            <div className={classes.paper}>
                <Input
                    id="outlined-size-normal"
                    variant="outlined"
                    type="text"
                    className={classes.input}
                    onChange={(event) => {
                        handleSearchPokemon(event.target.value)
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <img
                                src={searchIcon}
                                alt="search"
                                className={classes.image}
                            />
                        </InputAdornment>
                    }
                />
                <div id="transition-modal-description">
                    <ListItems
                        data={pokemonList}
                        col={12}
                        hadleActionPokedex={hadleActionPokedex}
                        action={action}
                        filterAddPokemon={filterAddPokemon}
                    />
                </div>
            </div>
        </>
    )
}
