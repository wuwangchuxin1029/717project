import React,{ Component } from 'react'
import Header from '../../Common/header'
import Button from '../../Common/button'
import Input from '../../Common/input'
import Select from '../../Common/select'
import $http from '../../utils/http'
import { getCookie } from '../../utils/utils'
import Notify from '../../Common/notify'
import './receiver.scss'


class Receiver extends Component{
  constructor(){
    super()
    this.toSave = this.toSave.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.name='',
    this.tell='',
    this.address='',
    this.province='',
    this.city='',
    this.county=''
  }
    render () {
      return (
        <div  className="receiver_wrap">
          <header>
            <Header history={this.props.history}>收件人</Header>
          </header>
          <section>
            {/* 注意：此时组件上的onChange是一个属性 */}
            <Input placeholder={'收货人姓名'} onChange={(val) => {this.inputChange('name',val)}}/>
            <Input placeholder={'手机号'}  onChange={(val) => {this.inputChange('tell',val)}}/>
            <Select className="select" onChange={(val) => {this.inputChange('province',val)}}></Select>
            <Select className="select" onChange={(val) => {this.inputChange('city',val)}}></Select>
            <Select onChange={(val) => {this.inputChange('county',val)}}></Select>
            <Input placeholder={'详细地址'}  onChange={(val) => {this.inputChange('address',val)}}/>
            <dl>
              <dt><span className="iconfont icon-duihaocheckmark17"></span></dt>
              <dd>设为默认地址</dd>
            </dl>
          </section>
           <Button className="add_btn" onClick={this.toSave}>保存</Button>  
           <Notify container='.receiver_wrap' ref='tips'/>
        </div>
      )
    }
   
    inputChange(name,value){
     this[name] = value
    }
    // 点击保存地址信息,在向后台发送数据前需要用正则验证数据的格式是否正确
    toSave(){
      console.log('保存地址信息')
     let { history } = this.props
     let { tips } = this.refs
     let nameReg = /[0-9a-zA-Z\u4e00-\u9fa5_]{3,9}$/g
     let tellReg =/^1[34578]\d{9}$/
     if(!nameReg.test(this.name)){
        tips.mountNotify('请输入正确的名称')
        return
     }
     if(!tellReg.test(this.tell)){
      tips.mountNotify('请输入正确的号码')
       return      
     }
     if(!this.province){
      tips.mountNotify('请选择省份')
       return
     }
     if(!this.city){
      tips.mountNotify('请选择城市')
      return
    }
    if(!this.county){
      tips.mountNotify('请选择区县')
      return
    }
    // 点击保存地址时，向后台发送数据，并将用户填写的信息以及token字段传递过去
     $http.post('/user/Mail/addAddress',{
       name:this.name,
       tell:this.tell,
       province:this.province,
       city:this.city,
       county:this.county,
       address:this.address,
       token:getCookie('token')
     })
     .then(res => {
       console.log(res,'ADDDD')
       if(res.success == 1){
        history.replace('/address')
       }
     })
    }
}
export default Receiver