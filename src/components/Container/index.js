import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import ListItems from '../ListItems'

import ModalBodySearchPokemon from '../ModalBodySearchPokemon'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(1),
    },
    header: {
        textAlign: 'center',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addIcon: {
        marginLeft: '45%',
        borderRadius: '48%',
        marginTop: '-20px',
        backgroundColor: '#ec5656',
        '&:hover': {
            backgroundColor: '#ec5656',
        },
    },
}))

export default function ContainerComponent() {
    const classes = useStyles()
    const [myPokedex, setMyPokedex] = useState([])
    const [open, setOpen] = React.useState(false)

    useEffect(() => {}, [])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const hadleActionPokedex = (action, pokemon) => {
        if (action === 'add') {
            const pokedexAdded = [...myPokedex, pokemon]

            setMyPokedex(pokedexAdded)
        } else if (action === 'delete') {
            const pokedexFilter = myPokedex.filter(
                (pokedex) => pokedex.id !== pokemon.id
            )
            setMyPokedex(pokedexFilter)
        }
    }

    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Grid className={classes.header}>
                    <h1>My Pokedex</h1>
                </Grid>
                <ListItems
                    data={myPokedex}
                    col={6}
                    hadleActionPokedex={hadleActionPokedex}
                    action="delete"
                />

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <ModalBodySearchPokemon
                            hadleActionPokedex={hadleActionPokedex}
                            action="add"
                            myPokedex={myPokedex}
                        />
                    </Fade>
                </Modal>
            </Container>
            <Grid>
                <Button
                    variant="contained"
                    className={classes.addIcon}
                    onClick={handleOpen}
                >
                    <AddIcon />
                </Button>
            </Grid>
        </>
    )
}
