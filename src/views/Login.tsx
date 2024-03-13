import http from '@/utils/request.ts'
import { Button } from 'antd'

function Login() {
  const handleClick = async () => {
    const res = await http.post<string>('/users/login', {
      userName: '353907887',
      userPwd: '427349'
    })
    console.log('--')
    console.log(res)
  }

  return (
    <>
      <div>
        登录页面
        <Button onClick={handleClick}>点击</Button>
      </div>
    </>
  )
}

export default Login
