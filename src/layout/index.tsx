import { Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'antd'

import Header from './components/Header'
import Tabs from './components/Tabs'

import { setAuthButtons } from '@/store/modules/auth/action'
import { updateCollapse } from '@/store/modules/menu/action'

const { Sider, Content } = Layout

function LayoutIndex(props: any) {
  const { isCollapse, updateCollapse, setAuthButtons } = props

  return (
    <div className="layout">
      <Layout>
        <Sider>哈哈哈哈</Sider>
        <Layout>
          <Header />
          <Tabs />
          <Content>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

const mapStateToProps = (state: any) => state.menu

const mapDispatchToProps = { setAuthButtons, updateCollapse }

export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex)
