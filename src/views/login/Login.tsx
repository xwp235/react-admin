import { Button, Form, Input } from 'antd'
import styles from './index.module.scss'
import AuthApi from '@/api/AuthApi.ts'
import { LoginParams } from '@/types/Login.ts'
import storage from '@/utils/storage.ts'
import { TOKEN } from '@/config/constants.ts'
import { appText } from '@/config'
import { useState } from 'react'
import { message } from '@/utils/AntdGlobal.ts'
import { useUserStore } from '@/store'

function Login() {
  const [loading, setLoading] = useState(false)

  const updateToken = useUserStore(state => state.updateToken)

  const onLogin = async (loginParams: LoginParams) => {
    setLoading(true)
    try {
      const token = await AuthApi.login(loginParams)
      storage.set(TOKEN, token)
      updateToken(token)
      message.success(
        <>
          <span>{appText.loginPage.loginSuccessTip}</span>
          <br />
          <span>{appText.loginPage.loginSuccessSubTip}</span>
        </>
      )
      // 登录过期时重新登录后使用callback参数回到原先所在的页面
      const params = new URLSearchParams(location.search)
      setTimeout(() => (location.href = params.get('callback') || '/welcome'), 1500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginWrapper}>
        <h1 className={styles.title}>
          <span>{appText.loginPage.loginFormTitle}</span>
          <span className={styles.subTitle}>{appText.loginPage.loginFormSubTitle}</span>
        </h1>
        <Form name="basic" onFinish={onLogin} autoComplete="off">
          <Form.Item
            name="userName"
            rules={[{ required: true, message: appText.validation.usernameBlank }]}
            initialValue="353907887"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="userPwd"
            rules={[{ required: true, message: appText.validation.passwordBlank }]}
            initialValue="427349"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit" loading={loading}>
              {appText.loginPage.loginBtn}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
