import React, { Component } from 'react'

class MemeGenerator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    }
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(responseJson => {
      this.setState({ 
        allMemeImgs: responseJson.data.memes
      })
    })
  }

  handleChange = (event) => {
    const {value, name} = event.target
    this.setState({ [name]: value })
      
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const randomNumber = Math.floor(Math.random() * this.state.allMemeImgs.length)
    
    this.setState({
      randomImg: this.state.allMemeImgs[randomNumber].url
    })
    
    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="meme-form">
          <input
            type="text"
            placeholder="TOP TEXT"
            name="topText"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="BOTTOM TEXT"
            name="bottomText"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          



          <button type="submit">Gen</button>
        </form>
          <div className="meme">
            <img src={this.state.randomImg} alt=""/>
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.bottomText}</h2>

          </div>
      </div>
    )
  }
}

export default MemeGenerator