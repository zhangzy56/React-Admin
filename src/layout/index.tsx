import { Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'antd'

import Header from './components/Header'
import Tabs from './components/Tabs'
import SiderMenu from './components/Menu'
import logo from '@/assets/imgs/logo.svg'

import './index.less'

import { setAuthButtons } from '@/store/modules/auth/action'
import { updateCollapse } from '@/store/modules/menu/action'

function LayoutIndex(props: any) {
  const { isCollapse, updateCollapse, setAuthButtons } = props

  // const sideBarWidth = isCollapse ? '64px' : '210px'
  const sideBarWidth = isCollapse ? 64 : 210

  const handleClick = () => {
    updateCollapse(!isCollapse)
  }

  return (
    <div className="layout-box">
      <Layout>
        <Layout.Sider trigger={null} collapsed={props.isCollapse} width={sideBarWidth} className="sider">
          <div className="logo-box">
            <img src={logo} className="logo-img" alt="logo" />
            {!isCollapse ? <h2 className="logo-text">V-Admin</h2> : null}
          </div>
          <div className="menu">
            <SiderMenu />
          </div>
        </Layout.Sider>
        <Layout>
          <Layout.Header className="header" style={{ left: sideBarWidth + 'px' }}>
            <Header />
          </Layout.Header>

          <Tabs />

          <Layout.Content>
            <Outlet></Outlet>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  )
}

const mapStateToProps = (state: any) => state.menu

const mapDispatchToProps = { setAuthButtons, updateCollapse }

export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex)
