import React from 'react'

import { url } from './constants'

class PokemonItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            pokemonId: '',
            pokemon: {},
            sprites: {},
            types: [],
            description: '',
            language: props.language,
        }
    }

    componentDidMount() {
        this.setState({loading: true, pokemonId: this.props.pokemon.name})
        fetch(url + 'pokemon/' + this.props.pokemon.name)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    pokemon: data,
                    sprites: data.sprites,
                    types: data.types,
                    loading: false,
                })
            })

        this.fetchPokemon(this.props.pokemon.name)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            this.setState({language: this.props.language})
            this.fetchPokemon(this.state.pokemonId)
        }
    }

    fetchPokemon = (name) => {
        fetch(url + 'pokemon-species/' + name)
            .then(response => response.json())
            .then(data => {
                const flavor_text = data.flavor_text_entries.find(entry => entry.language.name === this.state.language)
                const name = data.names.find(name => name.language.name === this.state.language)
                this.setState({
                    description: flavor_text ? flavor_text.flavor_text : 'Chosen language has no description for this pokemon',
                    name: name ? name.name : 'Error'
                })
            })
    }

    render() {
        const types = this.state.types.map(type => <span key={type.type.name}> {type.type.name} </span>)
        const cardImg = this.state.sprites.front_default
        const cardTitle = this.state.name
        
        return (
            <div className="mx-auto">
                <div className="card shadow rounded p-3 mb-5 bg-white" style={{width: '20rem'}}>
                    <img src={cardImg} className="card-img-top" alt={this.state.name}/>
                  <div className="card-body">
                    <h3 className="card-title text-center" style={{textTransform: 'capitalize'}}>{cardTitle}</h3>
                    <p className="card-text">{this.state.description}</p>
                  </div>
                 <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Types: <span style={{textTransform: 'capitalize'}} >{types}</span></li>
                      </ul>
                  </div>
                </div>  
            </div>
        )
    }
}

export default PokemonItem
