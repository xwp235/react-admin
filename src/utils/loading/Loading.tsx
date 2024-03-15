import { Spin } from 'antd'
import './loading.scss'
import { appText } from '@/config'

export default function Loading({ tip = appText.loading }: { tip?: string }) {
  return (
    <Spin tip={tip} size="large">
      <div className="app-loading-content" />
    </Spin>
  )
}
