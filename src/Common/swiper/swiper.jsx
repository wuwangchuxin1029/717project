import React,{ Component } from 'react'
import Swiper from 'swiper'
import './swiper.css'
import 'Swiper/dist/css/swiper.css'


let img1 = require('../../static/image/1.jpg')
class SwiperComponent extends Component{
  render () {
    return (
      <div className="swiper-contianer" ref="swiperDom">
        <div className="swiper-wrapper">
          <div className="swiper-slide"><img src={img1} alt=""/></div>
          <div className="swiper-slide"><img src={require('../../static/image/2.jpg')} alt=""/></div>
          <div className="swiper-slide"><img src={require('../../static/image/3.jpg')} alt=""/></div>
          <div className="swiper-slide"><img src={require('../../static/image/4.jpg')} alt=""/></div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    new Swiper(this.refs.swiperDom,{
      autoplay:true,
      loop:true
    })
  }
}
export default SwiperComponent