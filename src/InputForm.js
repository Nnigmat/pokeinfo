import React from 'react'


export default function InputForm(props) {
    return (
        <form 
            onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                props.handleSubmit(e)}
            } 
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    props.handleSubmit(e)
                }
            }}
            className="form-inline"
        >
            <div className="form-group mr-2">
                <input 
                    type="text"
                    name="newPokemon"
                    className="form-control"
                    value={props.newPokemon}
                    onChange={props.handleChange}
                    placeholder="Pokemon name"
                />
            </div>
            <button type="submit" className="form-group btn btn-primary mr-2">Search pokemon</button>
        </form>
    )
}

