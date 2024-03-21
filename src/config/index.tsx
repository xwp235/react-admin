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
  ...config['prod']
}

export const appText = {
  logoText: '慕慕货运',
  backToHome: 'トップページへ戻る',
  requestTimeout: 'サーバへのリクエストがタイムアウトしました',
  loading: '読み込み中',
  logout: 'ログアウト',
  working: '在職',
  retired: '退職',
  trialPeriod: '試用期間',
  all: '全て',
  button: {
    add: '追加',
    batchDelete: '一括削除'
  },
  theme: {
    default: 'デフォルト',
    dark: 'ダーク'
  },
  fields: {
    email: 'メール',
    username: 'ユーザー',
    status: 'ステータス',
    mobile: '携帯',
    job: '職種',
    dept: '部署',
    userId: 'ユーザーID'
  },
  error404: {
    title: 'お探しのページは見つかりませんでした。',
    subTitle: 'お手数ですが、トップページから再度お探しください。'
  },
  error403: {
    title: 'アクセスが拒否されました。',
    subTitle: 'このページにアクセスするための十分な権限を持っていません。'
  },
  validation: {
    userIdBlank: 'ユーザーIDを入力してください',
    usernameBlank: 'ユーザー名を入力してください',
    passwordBlank: 'パスワードを入力してください'
  },
  loginPage: {
    loginBtn: 'ログイン',
    loginFormTitle: '管理システム',
    loginFormSubTitle: 'ログイン',
    loginSuccessTip: 'ログインしました。',
    loginSuccessSubTip: '次のページへ自動的に遷移します。'
  },
  dashboardPage: {
    welcomeText: '欢迎新同学，每天都开心！'
  },
  userPage: {
    title: 'ユーザーリスト'
  }
}
