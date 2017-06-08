import classes from './List.scss'
import React,{Component} from 'react'
import UpTop from'../../../components/Up/Up'
import Circle from '../../../components/Indicator/FetchingCircle'
import Notification from '../../../components/Notification/Notification'
var startPoint,endPoint;
//无状态式组建stateless，没有构造函数（行）；以Arrow Function的方式替代Render语句（4行）
const ShowFetching=()=>
                <div className='belowFetching'>
                    <div>
                     <Circle class='chanage'/>
                    </div>
                    <span>加载中...</span>
                </div>

const Nothing=()=>
                <div className='nothingNotice'> 
                <p>暂时还没有好友为你点赞，
                你可以利用<span>微信分享</span>功能将你的活动页分享给你的好友或朋友圈，召集好友给你支持。
                </p>
                </div>                


class ListForSupport extends Component{
      constructor(props){
        super(props)
        this.handleTouchStart=this.handleTouchStart.bind(this)
        this.handleTouchEnd=this.handleTouchEnd.bind(this)
        this.handleTouchMove=this.handleTouchMove.bind(this)
        }
        componentDidMount() {
            const init = this.props.init;
            init();
          
        }
        handleTouchStart(e){
        startPoint=e.touches[0].clientY
        }
        handleTouchMove(e){

        endPoint=e.touches[0].clientY;
        var a =endPoint-startPoint
        this.props.handleWheelList(a)

        }
        handleTouchEnd(e){


        }
    render(){
        const {fetching,supportList,isBelow,upShow}=this.props.supportList
        return(
            <div  className='List' style={{'textAlign':'center'}}>
                {!fetching&&<Circle/>}
                <ul onTouchEnd={this.handleTouchEnd} onTouchMove={this.handleTouchMove}
                onTouchStart={this.handleTouchStart}>
                {
                    supportList.map((get,index)=>(
                    <li className={index & 1?'':'oddLi'} key={index}>
                        <div >
                            <img src={get.headPortraitUrl} />
                        </div>
                        <span>{get.nikeName}</span>
                        <b>朋友</b>
                    </li>
                    ))
                }
                </ul>
                {!supportList.length && <Nothing/>}
                {isBelow?<Notification notice={'没有更多信息了'}/>:supportList.length>20 &&<ShowFetching/> 
                }
               {supportList.length>25 && <UpTop handleUp={this.props.handleTop} data={upShow} />
               }
            </div>
        
     
        )
    }
}


export default ListForSupport