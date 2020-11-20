import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import cuteIcon from '../../cute.png'

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: '#f3701a',
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#f3701a',
    },
}))(LinearProgress)

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 950,
        height: 600,
        margin: '10px !important',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    card: {
        backgroundColor: '#f3f4f7',
        boxShadow: '10px 15px #d5d6dc',
        '&:hover': {
            boxShadow: '10px 15px #aeaeae',
        },
    },
    levelBar: {
        backgroundColor: '#e4e4e4',
        boxShadow: '1px 3px #d4d4d4',
    },
    pokeTitle: {
        fontFamily: 'Gaegu',
    },
    actionPokedex: {
        color: '#ec5656',
        cursor: 'pointer',
    },
}))

export default function MyPokedex({
    data,
    col = 6,
    hadleActionPokedex,
    action,
    filterAddPokemon
}) {
    const classes = useStyles()
    const renderHappinessIcon = (pokemon) => {
        const childrenList = []
        let increment = 0
        while (increment < pokemon.Output.happiness) {
            childrenList.push(
                <img
                    src={cuteIcon}
                    alt={`${pokemon.id}-${increment}-alt`}
                    key={`${pokemon.id}-${increment}-happy`}
                    style={{
                        maxWidth: '30px',
                    }}
                />
            )
            increment++
        }

        return childrenList
    }
    return (
        <div className={classes.root}>
            <GridList cellHeight={270} className={classes.gridList}>
                {data.map((tile) => (
                    <Grid item xs={col} key={tile.id}>
                        <GridListTile>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={5}>
                                            <img
                                                src={tile.imageUrl}
                                                alt={tile.name}
                                                style={{ maxWidth: '156px' }}
                                            />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Grid
                                                item
                                                xs={12}
                                                className={classes.pokeTitle}
                                            >
                                                <Grid item xs={10}>
                                                    {' '}
                                                    <h2>{tile.name}</h2>
                                                </Grid>

                                                <Grid
                                                    item
                                                    xs={2}
                                                    className={
                                                        classes.actionPokedex
                                                    }
                                                    onClick={() => {
                                                        hadleActionPokedex(
                                                            action,
                                                            tile
                                                        )
                                                        filterAddPokemon && filterAddPokemon(tile)
                                                    }}
                                                >
                                                    {action === 'add'
                                                        ? 'Add'
                                                        : 'X'}
                                                </Grid>
                                            </Grid>

                                            <Grid>
                                                <Grid item xs={4}>
                                                    HP
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <BorderLinearProgress
                                                        className={
                                                            classes.levelBar
                                                        }
                                                        variant="determinate"
                                                        value={tile.Output.hp}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    STR
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <BorderLinearProgress
                                                        className={
                                                            classes.levelBar
                                                        }
                                                        variant="determinate"
                                                        value={parseInt(
                                                            tile.Output.strength
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    WEAK
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <BorderLinearProgress
                                                        className={
                                                            classes.levelBar
                                                        }
                                                        variant="determinate"
                                                        value={parseInt(
                                                            tile.Output.weakness
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    style={{
                                                        paddingTop: '10px',
                                                    }}
                                                >
                                                    {renderHappinessIcon(tile)}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </GridListTile>
                    </Grid>
                ))}
            </GridList>
        </div>
    )
}
