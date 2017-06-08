import React,{Component}from 'react'
import example from '../../../containers/AppContainer.scss'
import { RouteTransition } from 'react-router-transition';
import {IndexLink, Link} from 'react-router'
import publicData from '../../../store/commonData'
import {createStore,combineReducers} from 'redux'


var itemsReducer = function (state=[],action) {
    console.log(state,"andaction",action)
    switch(action.type){
        case'ADD_ITEM':
        return[
            ...state,
            action.item
        ]
        default:
        return state;
    }
}

var reducer=combineReducers({items:itemsReducer})
var store_0=createStore(reducer)

store_0.subscribe(function(){
    console.log("d",store_0.getState())
})

var addItemActionCreator=function (item) {
    return{
        type:'ADD_ITEM',
        item:item
    }
}

store_0.dispatch(addItemActionCreator(
    {id:1234,description:'anything'}
))

class List extends Component{
      render() {
    return <ul>
       {this.props.list.map((get,index) => (
               <li key={index}>
                         <div>
                            {get.nikeName || "过客"}：
                         </div>
                              
                </li>
          ))}
    </ul>;
  }
}



export default class Test extends Component{
    constructor(props){
        super(props)
       this.handleClick=this.handleClick.bind(this)
       this.state={eventType:''}
        }
 
    handleClick(e){
        console.log(event); // => nullified object.
        console.log(event.bubbles); // => "click"
        const eventType = event.type; // => "click"
        publicData.userInfo={a:0}
        console.log(publicData.userInfo)
        setTimeout(function() {
           // console.log(event.isTrusted,event.type); // => null
            console.log(eventType); // => "click"
        }, 0);

        // Won't work. this.state.clickEvent will only contain null values.

        // You can still export event properties.
        this.setState({eventType: event.eventPhase});
        }
    render(){
        console.log(this.props.location.pathname)
        return(
                <RouteTransition
  pathname={this.props.location.pathname}
  atEnter={{ translateX: 100 }}
  atLeave={{ translateX: -100 }}
  atActive={{ translateX: 0 }}
  mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
  >
            <div style={{width:'100%',height:'100%'}} >
           
                <div onClick={this.handleClick} style={{width:200,height:200,border:'1px solid '}}>
                    click
    {this.props.eventType}

                </div>
        
                {<List list={[{nikeName:1},{nikeName:1}]} />}

                   <Link to='/zen' style={{"width":"100px",}} >
          点赞榜
        </Link>
                   <Link to='/list' style={{"width":"100px","color":"#009"}} >
          点赞榜
        </Link>
                   <Link to='/picture' style={{"width":"100px","color":"#009"}} >
          点赞榜
        </Link>
                    <Link to='/message' style={{"width":"100px","color":"#009"}} >
          2点赞榜
        </Link>
                    <Link to='/finishShow' style={{"width":"100px","color":"#009"}} >
          2点赞榜
        </Link>
                               <Link to='/detail' style={{"width":"100px","color":"#009"}} >
          2点赞榜
        </Link>
            </div>
                                          </RouteTransition>

        )
    }
}