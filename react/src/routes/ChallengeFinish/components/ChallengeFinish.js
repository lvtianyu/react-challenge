import React, {Component} from 'react'
import Circle from '../../../components/Indicator/FetchingCircle'
import Image from '../../../static/calorie.png'
import classes from './ChallengeFinish.scss'
class ContentFinish extends Component{

    render(){
        const {data,updatedResult,handleChange,handleTextarea} =this.props.data
        const {calorieSum,
            goleCalorie,
            addCalorie,
            goleWidth,
            addWidth,
            finialCalorie,
            describeValue}=data.showCalorie
        return(
            <div>
                <div className='totalCalorie'>
                    <img src={Image} />总计{calorieSum}千卡
                </div>
                <div className='showCalorie'>
                    <div>
                        <span>他的目标</span>
                        <div className='progress progress-radius'>
                            <div className='progress-bar progress-bar-te' style={{width:goleWidth}}></div>
                            <div style={{width:addWidth}} className='progress-bar progress-bar-warning progress-bar-striped'></div>
                        </div>
                        <span>好友添加</span>
                    </div>
                    <ul>
                        <li>{goleCalorie}千卡</li>
                        <li>{addCalorie}千卡</li>
                    </ul>
                </div>
                <div className='updatedFinishData'>
                    <div className='fillCalorie'>
                        <span>实际完成:</span>
                        <input placeholder='请输入挑战结果' type='number'
                        value={finialCalorie}
                        onChange={handleChange}
                        />
                        <span>千卡</span>
                    </div>
                    <textarea placeholder="活动描述: 录入文字时，请避开特殊符号如“\:*?< >|”,出现这些符号我们会用空白进行替换，谢谢！"
                        value={describeValue}
                        onChange={handleTextarea}
                      ></textarea>
                </div>
                <div className='btnForFinish ' >
                    <button className='clickActiveShow' onClick={updatedResult}>完成</button>
                </div>
            </div>
        )
    }
    
}


export default class ChallengeFinish extends Component{
    constructor(props){
        super(props)
        }
    componentDidMount() {
            const init = this.props.init;
            init();
        }
    render(){
        return(
            <div className='challengeFinish'>
                {
                    !this.props.data.fetching?<Circle/>:<ContentFinish data={this.props} />
                }
            </div>
        )
    }
}

ChallengeFinish.propTypes={
    data:React.PropTypes.object.isRequired
}