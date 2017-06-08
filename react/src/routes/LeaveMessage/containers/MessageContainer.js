import { connect } from 'react-redux'
import {actions} from './../modules/message'

import Message from './../components/Message'

const mapDispatchtoProps = actions

const mapStateToProps = (state) => ({
  dataMessage: state.dataMessage
})

export default connect(mapStateToProps, mapDispatchtoProps)(Message)
