import React,{Component} from 'react'
import Circle from '../../../components/Indicator/FetchingCircle'
import classDetail from './FinishShow.scss'
import resultOk from '../../../static/sucess.png'
import resultNo from '../../../static/failure.png'
import comeBack from '../../../static/backHome.png'
import updatedPicture from '../../../static/updata-tu.png'
import test from '../../../static/test.png'
import UpdataPicture from '../../../components/UpdatedPicture/UpdatedPicture'


class ShowPic extends Component{
    render(){
        return(
            <div>
                <span>{this.props.isOk?'挑战成功，👍！':'挑战失败，下次加油!'}</span>
                <img src={this.props.isOk? resultOk :resultNo} />
            </div>
        )
    }
}

export default class FinishShow extends Component{
    constructor(props){
        super(props)
        }
    componentDidMount() {
            const init = this.props.init;
            init();
        }
    render(){
    const   { handleUpdatedPicture,
              
                dataFinishShow
            }=this.props
    const {isOk,fetching,pictureList}=dataFinishShow
        return(
            <div className='finishShow'>
                <div className='showResult'>
                    {
                    !fetching? <Circle />:<ShowPic isOk={isOk} />
                    }
                </div>
            <div className="showPictureList showPictureListBottom">
               <p onClick={handleUpdatedPicture}>
                <img src={updatedPicture} /><span>添加照片</span>
               </p>
               {
                   !!pictureList && <UpdataPicture handleIsShow={handleUpdatedPicture}/>
               }
            </div>
            <a href='/challenge-detail?' className='comeBackHome'> 
                <span>
                    <img src={comeBack} />
                </span>
                <b>返回首页</b>
            </a>
            </div>
        )
    }

}

FinishShow.propTypes={
    dataFinishShow:React.PropTypes.object.isRequired
}