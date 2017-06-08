import classPicture from './Picture.scss'

import React,{Component} from 'react';

import Circle from '../../../components/Indicator/FetchingCircle'
import Nothing from '../../../components/Nothing/Nothing'
import img from '../../../static/img-delete.png'
import imgReturn from '../../../static/img-close.png'
import pre1 from '../../../static/img-pre1.png'
import next1 from '../../../static/img-next1.png'
// const swipe = defineSwipe({swipeDistance:100})
// console.log(Swipeable)

class ListItemWrapper extends Component {
  render() {
      const {leftOrRight,pictureList,transformShow}=this.props
    return <ul className="pictureShow" >
       {pictureList.map((data,index) => (
         
            <li key={index} className={leftOrRight?
              (transformShow-index==1?"right":transformShow==index?'active':'left')
              : (transformShow==index?'active':'left')}>
              <img src= {data.pictureUrl} /> <span className="vertical-align-span"></span>
            </li>
          ))}
    </ul>;

  }
}

var startPoint,endPoint;

class ListMessage extends Component {
    constructor(props){
        super(props)
        this.handleTouchStart=this.handleTouchStart.bind(this)
        this.handleTouchEnd=this.handleTouchEnd.bind(this)
        this.handleTouchMove=this.handleTouchMove.bind(this)
    }
    componentDidMount () {
      const init=this.props.init
        init()
     
    }
    handleTouchStart(e){
      e.preventDefault()
     startPoint=e.touches[0].clientX
    }
   handleTouchMove(e){
     e.preventDefault()
       endPoint=e.touches[0].clientX
    }
   handleTouchEnd(e){
    e.preventDefault()
     if( endPoint-startPoint>30){
       this.props.handleClickPre()
     }else if(endPoint-startPoint<-30){
       this.props.handleClickNext()
     }else{
       return
     }

    }

  render() {
    const { 
            handleClick,
            handleClickPre,
            handleClickNext,
            message
         }=this.props
    const {
        pictureList,
        fetching,
        transformShow,
        leftOrRight,
        pre,
        next,
    }=message
    const len =  pictureList.length
 
    return (
      
      <div className='picture' >
      <b>{len}/{transformShow+1}</b>
       <div className="touchApartment" onTouchStart={this.handleTouchStart}
       onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
         { !fetching?<Circle />:
          len>0?( 
        
          <ListItemWrapper pictureList={pictureList} 
          transformShow={transformShow}
          leftOrRight={leftOrRight}
          />
       ):<Nothing />
         
         }</div>
     
          <ul className='footBar'>
            <li className='clickActiveShow'>
              <a href="/">
                      <img src={imgReturn}  />
              </a>
            </li >
            <li onClick={handleClickNext} className='clickActiveShow'>
              <img src={pre1}  className={pre && len>1?'':'filterImg'}/>
            </li>
            <li onClick={handleClickPre} className='clickActiveShow'>
               <img src={next1} className={next && len>1?'':'filterImg'}/>
            </li>
            <li onClick={handleClick} className='clickActiveShow'>
              <img src={img} />
            </li>
          </ul>
      </div>
     
    );
  }
}


ListMessage.propTypes={
 handleClick:React.PropTypes.func.isRequired,
 message:React.PropTypes.object.isRequired
}

export default ListMessage ;
