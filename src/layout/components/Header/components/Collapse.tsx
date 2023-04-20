import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { updateCollapse } from '@/store/modules/menu/action'

const collapseStyle = {
  padding: '0 16px',
  fontSize: '18px',
  cursor: 'pointer',
  transition: 'color 0.3s'
}

const CollapseIcon = (props: any) => {
  const { isCollapse, updateCollapse } = props

  return (
    <div
      style={collapseStyle}
      onClick={() => {
        updateCollapse(!isCollapse)
      }}
    >
      {isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  )
}

const mapStateToProps = (state: any) => state.menu
const mapDispatchToProps = { updateCollapse }

export default connect(mapStateToProps, mapDispatchToProps)(CollapseIcon)
