import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import env from '@/config'

function Error403() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/welcome')
  }
  return (
    <Result
      status={403}
      title={env.appText.error403.title}
      extra={
        <Button type="primary" onClick={handleClick}>
          {env.appText.backToHome}
        </Button>
      }
      subTitle={env.appText.error403.subTitle}
    />
  )
}

export default Error403
