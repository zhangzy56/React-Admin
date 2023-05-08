import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { HOME_URL } from '@/config/config'

const BreadcrumbNav = (props: any) => {
  const { pathname } = useLocation()
  const breadcrumbList = props.breadcrumb.breadcrumbList[pathname] || []

  console.log('breadcrumbList', breadcrumbList)

  // items={breadcrumbList.map((item: string, index: number) => {
  //   const res = { title: item }
  // })}

  return (
    // <Breadcrumb>
    //   <Breadcrumb.Item href={`#${HOME_URL}`}>首页</Breadcrumb.Item>

    //   {breadcrumbList.map((item: string) => {
    //     return <Breadcrumb.Item key={item}>{item !== '首页' ? item : null}</Breadcrumb.Item>
    //   })}
    // </Breadcrumb>
    <div>面包</div>
  )
}

const mapStateToProps = (state: any) => state
export default connect(mapStateToProps)(BreadcrumbNav)
