import React,{ Component } from 'react' 

class Detail extends Component{
  render () {
    const { location } = this.props
    console.log(location,'detail')
    return <div>Detail</div>
  }
}

export default Detail