import React,{Component} from 'react'
import Nothing from '../../../components/Nothing/Nothing'
import Circle from '../../../components/Indicator/FetchingCircle'
import classDetail from './Detail.scss'
import {Link} from 'react-router'

//显示列表的组件
class List extends Component{
      render() {
    return <ul>
       {this.props.list.map((get,index) => (
               <li key={index}>
                                <div>
                                    <img src={get.headPortrait} />
                                </div>
                                <span>
                                    {get.nickname || "过客"}
                                </span>
                                <b>
                                    {get.account}元
                                </b>
                            </li>
          ))}
    </ul>;
  }
}


class Content extends Component{
    render(){
        const {detailList,nickname,headPortrait,userRedpacketSum}=this.props.data
        return(
         
            <div className='content'>
                   <div>
                       <img src={headPortrait} />
                       <Link to="/challenge-detail"  className="toHome">查看活动&nbsp;&gt;
                       </Link>
                   </div>
                   <div className='moneySum'>
                        <span>{nickname}的红包</span>
                        <p><b>{userRedpacketSum}</b> 元</p>
                        <div>
                            大家的手气：
                        </div>
                   </div>
                   <div className='list'>
                     {
                detailList.length>0?<List list={detailList}/>:<Nothing />
             }
                   </div>
             
            </div>
         
        )
    }
}

export default class Detail extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        const init = this.props.init;
        init()
    }
    render(){
        const data= this.props.dataDetail;

        return(
            <div className='detail'>
                {
                     !data.fetching?<Circle />:<Content data={data} />
                     
                }
            </div>
        )
    }
    
}

Detail.propTypes={
    dataDetail:React.PropTypes.object.isRequired
}