import { Spin } from 'antd'
import './loading.scss'

import env from '@/config'

export default function Loading({ tip = env.appText.loading }: { tip?: string }) {
  return (
    <Spin tip={tip} size="large">
      <div className="app-loading-content" />
    </Spin>
  )
}
