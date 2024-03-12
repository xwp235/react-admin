import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function Error403() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/welcome')
  }
  return (
    <Result
      status={403}
      title="アクセスが拒否されました。"
      extra={
        <Button type="primary" onClick={handleClick}>
          トップページへ戻る
        </Button>
      }
      subTitle="このページにアクセスするための十分な権限を持っていません。"
    />
  )
}

export default Error403
