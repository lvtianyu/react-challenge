import { connect } from 'react-redux'
import {init} from './../modules/detail'
import Detail from './../components/Detail'

const mapDispatchtoProps = {
    init
}

const mapStateToProps = (state) => ({
  dataDetail: state.dataDetail
})

export default connect(mapStateToProps, mapDispatchtoProps)(Detail)
