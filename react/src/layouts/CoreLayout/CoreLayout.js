import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
// import example from '../../containers/AppContainer.scss' export const
// CoreLayout = ({ children }) => (     <div className='core-layout__viewport'>
//  {children}   </div> )

class CoreLayout extends React.Component {
  render() {
    return (
      <div className='core-layout__viewport'>
        {this.props.children}
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout