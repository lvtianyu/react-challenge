import React,{Component} from 'react'
import classes from './UpdatedPicture.scss'
import fetch from 'isomorphic-fetch'
import Circle from '../Indicator/FetchingCircle'
import DD from '../../static/delete.png'

export default class UpdataPicture extends Component{
    constructor(props){
        super(props)
        this.handleDeletePic=this.handleDeletePic.bind(this);
        this.handleUpdatedPicture=this.handleUpdatedPicture.bind(this)
        this.state={pictureListObj:[],
            fetching:false,
            width:'28rem',
            animationShow:false,
        lastPictureSrc:DD}

        }
    handleDeletePic(e){
        var a =deleteArray(this.state.pictureListObj,e.currentTarget.getAttribute('data-key'))
        if(!a.length){
             this.props.handleIsShow(false)
        }
             this.setState({pictureListObj:a,width:(a.length*3.1)+'rem'})

    }
    handleUpdatedPicture(){
        //  wx.uploadImage({ //调用服务器端的接口，传递gameId和res.serverId//var uploadPicture= images.serverId.join();
        //                 localId: images.localId[i],
        //   isShowProgressTips: 1, // 默认为1，显示进度提示
        //                 success: function (res) {
        //                     var serverid = res.serverId;
        //                     images.serverId.push(serverid);

        //                    // fetch('http://camp.liver-cloud.com/challenge/challenge/game/saveImageToDisk.do?gameId=115'&pictureId+pictureId)
        // //  .then(response=>response.json())
        // // .then(json =>{
        // //     this.setState({fetching:true})
        // // })
        //                 },
        //                 fail: function (res) {
        //                     //console.log(i)
        //                 }
        //             });
        
     //   this.setState({animationShow:true,lastPictureSrc:this.state.pictureListObj[5].pictureUrl})
        // this.props.handleIsShow(false)
            this.timerID = setTimeout(
      () => this.props.handleIsShow(false),
      1200
    );
        console.log('你好，这里是上传图片');
        this.props.handleIsShow(false)
        // fetch('http://camp.liver-cloud.com/challenge/challenge/game/saveImageToDisk.do?gameId=115')
        //  .then(response=>response.json())
        // .then(json =>{
        //     this.setState({fetching:true})
        // })
    }
      componentWillUnmount() {
    clearInterval(this.timerID);
  }
    componentDidMount() {
            // wx.chooseImage({
            //         success: function (res) {
            //             //debug('已选择 ' + res.localIds.length + ' 张图片');
            //             this.state.pictureListObj=res.localIds
            //         },
            //         cancel: function (res) {
            //             //console.log("取消选择图片：" + JSON.stringify(res));
            //         },
            //         fail: function (res) {
            //             //console.log("选择图片失败：" + JSON.stringify(res));
            //         }
            //     });
        fetch('http://camp.liver-cloud.com/challenge/challenge/game/getChallengeInformation.do?userName=X9T7P2EI&gameId=111')
            .then(response=>response.json())
        .then(json =>{
            this.state.pictureListObj=json.values.pictureUrl;
            var len=json.values.pictureUrl.length
            this.setState({fetching:true,width:(len*3.1)+'rem'})
        })
// =======
//         console.log('这里是初始化')
//         fetch('http://camp.liver-cloud.com/challenge/challenge/game/getChallengeInformation.do?userName=X9T7P2EI&gameId=111')
//             .then(response=>response.json())
//         .then(json =>{
//             console.log(json.values.pictureUrl + '这里是获取的图片');
//             this.state.pictureListObj=json.values.pictureUrl
//             this.setState({fetching:true})
// >>>>>>> 6aa3788f674232d849d67f5185496a303c0009e3
//         })
    }

    render(){
        return(
             <div className={'photographShow'} >
                    {!this.state.fetching&&<Circle/>}
                    <div>
                        <ul className='photographShowList' style={{width:this.state.width}}>
                               {this.state.pictureListObj.map((data,index) => (
                            <li key={index}  >
                                <img src={data.pictureUrl}/>
                                <span></span>
                                <b data-key={index} onClick={this.handleDeletePic}>x</b>
                            </li>
                             ))}
                        </ul>
                    </div>
                    <span onClick={this.handleUpdatedPicture}>
                        上传照片
                    </span>
                 {this.state.animationShow &&<AnimationShow imgSrc={this.state.lastPictureSrc}/>}
            </div>
        )
    }
}

class AnimationShow extends Component{
    render(){
        return(
            <b className='updatedPictureAnimate'>
                <img src={this.props.imgSrc} />
            </b>
        )
    }

}

//数组删除
function deleteArray(a,i){
var b = new Set(a);
b.delete(a[i])
return Array.from(b)
}