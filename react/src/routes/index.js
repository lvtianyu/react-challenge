/**
 * 倒入路由设置
 */
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import ApprovalList from './ApprovalList'
import LeaveMessage from './LeaveMessage'
// import RouteRoute from './Route'
import PageNotFound from './PageNotFound'
import Redirect from './PageNotFound/redirect'
import ChallengeFinish from './ChallengeFinish'
import CreatePro from './CreatePro'
import RemovePicture from "./RemovePicture"
import SupportList from './SupportList'
import MoneyDetails from './MoneyDetails'
import FinishShow from './FinishShow'
import HomeView from './Home';

import Index from './Index/index';
/**
 * 路由配置
 */
var url='/'
export const createRoutes = (store) => ({
  path: url,
  component: CoreLayout,
  indexRoute: HomeView(store),
  childRoutes: [
    ChallengeFinish(store),
    RemovePicture(store),
    SupportList(store),
    LeaveMessage(store),
    MoneyDetails(store),
    FinishShow(store),
    HomeView(store),
    CreatePro(store),
    // PageNotFound(),
    // Redirect

  ]
})

export default createRoutes
