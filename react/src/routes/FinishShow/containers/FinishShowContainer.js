import {
  connect
} from 'react-redux'
import {
actions
} from './../modules/finishShow'

import FinishShow from './../components/FinishShow'

const mapDispatchtoProps = actions

const mapStateToProps = (state) => ({
  dataFinishShow: state.dataFinishShow
})

export default connect(mapStateToProps, mapDispatchtoProps)(FinishShow)