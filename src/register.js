import React from 'react'
import axios from 'axios'

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textinput: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.dataInput = this.dataInput.bind(this);
  }

  handleChange(event) {
    this.setState({textinput: event.target.value});
  }

  dataInput(event) {
    
    const title = this.state.textinput

    axios.post('http://localhost:3001/posts',{title}).then(response => {
    console.log(response)

    this.setState({textinput: ''})
    event.preventDefault();
    })
  }

  render() {
    return (
      <div>
        <h2 className="section-title">データ登録</h2>
          <form onSubmit={this.dataInput}>
            <input className="box" type="text" name="textinput" onChange={this.handleChange}/>
            <button className="btn" type="submit" value="Submit">登録</button>
          </form>
      </div>
    )
  }
}