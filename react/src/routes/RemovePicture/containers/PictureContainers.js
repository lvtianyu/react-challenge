import {connect} from 'react-redux'
import {actions} from '../modules/picture'

import Picture from '../components/Picture'

const mapDispatchToProps = actions

 const mapStateToProps = (state) => {
    return {
        message: state.message
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Picture)