import { connect } from 'react-redux'
import {actions} from './../modules/challengeFinish'

import ChallengeFinish  from './../components/ChallengeFinish'

const mapDispatchtoProps = actions

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, mapDispatchtoProps)(ChallengeFinish)
