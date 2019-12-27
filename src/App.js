import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PokemonItem from './PokemonItem'
import InputForm from './InputForm'
import NavBar from './NavBar'

import { url } from './constants'

class App extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            error: false,
            newPokemon: '',
            curPokemon: '',
            pokemons: [],
            curLanguage: 'en',
            languages: ['en', 'ja']
        }
    }

    componentDidMount() {
        fetch(url + 'language')
            .then(response => response.json())
            .then(data => {
                this.setState({languages: data.results.map(lang => lang.name)})
            })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        this.setState({loading: true, error: false, pokemons: []})
        this.fetchPokemon(this.state.newPokemon.toLowerCase())
    }

    handleRandomPokemonSubmit = () => {
        this.setState({loading: true, error: false, pokemons: []})
        fetch(url + 'pokemon')
            .then(response => response.json())
            .then(data => {
                const pokemonId = Math.floor(Math.random() * data.count) + 1
                this.fetchPokemon(pokemonId)
            })
    }

    fetchPokemon = (id) => {
        // Get evolution chain of pokemon
        fetch(url + 'pokemon-species/' + id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokemon does not exists')
                }
                return response.json() })
            .then(data => {
                fetch(data.evolution_chain.url)
                    .then(response => response.json())
                    .then(data2 => {
                        let evolves_to = data2.chain
                        let pokemons = []
                        while (evolves_to != null) {
                            pokemons.push(evolves_to.species)
                            evolves_to = evolves_to.evolves_to[0]
                        }
                        this.setState({
                            pokemons: pokemons,
                            curPokemon: this.state.newPokemon,
                        })
                    })
            })
            .catch(err => {
                console.log('Was faced error during execution:', err.message)
                this.setState({error: true})
            })
            .finally(() => this.setState({loading: false}))       
    }

    render() {
        const loading = <div className="d-flex justify-content-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
        const error = <div className="d-flex justify-content-center">
                            Sorry the error accured
                      </div>
        const content = this.state.pokemons.map(pokemon => 
            <PokemonItem key={pokemon.name} pokemon={pokemon} language={this.state.curLanguage}/>
        )

        return (
            <Router>
                <NavBar languages={this.state.languages} curLanugage={this.state.curLanguage} handleChange={this.handleChange}/>
                <Route path="/" exact>
                    <br />
                    <div className="form-inline justify-content-center mx-auto">
                        <InputForm 
                            newPokemon={this.state.newPokemon}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        />
                        <button onClick={this.handleRandomPokemonSubmit} className="form-group mr-2 btn btn-primary"> Get Random Pokemon</button>
                    </div>
                    <br />
                    {this.state.loading ? loading : ''}
                    {this.state.error ? error : ''}
                    {content ? <div className="card-deck">{content}</div> : ''}
                </Route>
                <Route path="/about">
                    Hi, this is about page
                </Route>
            </Router>
            )
    }
}

export default App
