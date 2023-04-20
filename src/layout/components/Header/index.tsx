import Collapse from './components/Collapse'
import './index.less'

const Header = () => {
  return (
    <div className="header-box">
      <div className="header-left">
        <Collapse />
      </div>
      <div className="header-right">Right</div>
    </div>
  )
}

export default Header
