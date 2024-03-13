/**
 * 环境配置封装
 */
type ENV = 'dev' | 'staging' | 'prod'

let env: ENV
const host = location.host
if (host.indexOf('localhost') > -1 || host.indexOf('127.0.0.1') > -1) {
  env = 'dev'
} else if (host === 'driver-stg.marsview.cc') {
  env = 'staging'
} else {
  env = 'prod'
}
// const env = (document.documentElement.dataset.env as ENV) || 'stg'
document.documentElement.dataset.env = env

const config = {
  dev: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
  },
  staging: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-stg.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
  },
  prod: {
    baseApi: '/api',
    uploadApi: 'http://api-driver.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
  }
}

export default {
  env,
  ...config['prod'],
  appText: {
    backToHome: 'トップページへ戻る',
    requestTimeout: 'サーバへのリクエストがタイムアウトしました',
    loading: '読み込み中',
    error404: {
      title: 'お探しのページは見つかりませんでした。',
      subTitle: 'お手数ですが、トップページから再度お探しください。'
    },
    error403: {
      title: 'アクセスが拒否されました。',
      subTitle: 'このページにアクセスするための十分な権限を持っていません。'
    }
  }
}
