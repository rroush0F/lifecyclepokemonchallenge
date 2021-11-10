import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 10
    }
  }

  componentDidMount = () => {
    this.fetchPokemon();
    this.tenSecondCountdown();
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          timer: 10
        })
      })
      .catch((err) => console.log(err))
  }
  
  tenSecondCountdown = () => {
    let countdown = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState({
          timer: this.state.timer - 1});
        } else if (this.state.timer === 0) {
          clearInterval(countdown)
        }
      }, 1000)
    }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.fetchPokemon(); this.tenSecondCountdown();}}>Try Another!</button>
        <h1 className={'timer'} >Who's That Pokemon?</h1>
        <h2 className={'countdown'} >{this.state.timer}</h2>
        <div className={'pokeWrap'}>
          <img 
          className={'pokeImg'} alt="pokeSprite"
          src={this.state.pokeSprite} 
          style={this.state.timer > 0 ? {filter: "brightness(0%)"} : {filter: "brightness(100%)"}}
          />
          <h1 className={'pokeName'} style={this.state.timer > 0 ? {opacity: 0} : {opacity: 1}}>It's {this.state.pokeName}!</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;