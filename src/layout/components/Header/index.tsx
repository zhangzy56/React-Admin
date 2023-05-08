import Collapse from './components/Collapse'
import Breadcrumb from './components/Breadcrumb'
import './index.less'

const Header = () => {
  console.log('header')

  return (
    <div className="header-box">
      <div className="header-left">
        <Collapse />
        <Breadcrumb />
      </div>
      <div className="header-right">Right</div>
    </div>
  )
}

export default Header
