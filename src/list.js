import React from 'react'
import axios from 'axios'

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isUpdate: false,
      textupdate: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3001/posts')
    .then(response => {
      const posts = response.data;
      this.setState({ posts });
    })
  }

  handleDelete(id){
    const url = `http://localhost:3001/posts/${id}`;
    
    axios.delete(url)
    .then(response => {
      const posts = this.state.posts.filter(item => item.id !== id);

      this.setState({posts})
      
      console.log(response)
    })
  }

  clickUpdate(){
    this.setState({isUpdate: true});
  }

  handleChange(e) {
    this.setState({textupdate: e.target.value});
  }

  handleUpdate(id){
    const title = this.state.textupdate;
    axios.put(`http://localhost:3001/posts/${id}`, {title})
    .then(response => {

      console.log(this.state.posts)
      console.log(response)
    }
    )
    .then(
      this.setState({isUpdate: false})
    )
  }

  componentDidUpdate() {
    axios.get('http://localhost:3001/posts')
    .then(response => {
      const posts = response.data;
      this.setState({ posts });
    })
  }

  render() {
    const isUpdate = this.state.isUpdate;
    return(
      <div>
        <h2 className="section-title">保存データ</h2>
        {
        this.state.posts.map((post, index) => 
          {
            return (       
              <div key={index}>
             {isUpdate
               ? <input type="text" name="textupdate" 
               onChange={this.handleChange} 
               onKeyPress={(e) => this.handleUpdate(post.id, e)}/>
               : <span className="list">{post.title}</span>
              }                           
                <button className="updatebtn" onClick={(e) => this.clickUpdate(e)}>更新</button>
                <button className="deletebtn" onClick={(e) => this.handleDelete(post.id, e)}>削除</button>
              </div>
            )
          }
        )
        }
      </div>
    )
  }
}