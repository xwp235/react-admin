import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { appText } from '@/config'

function Error403() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/welcome')
  }
  return (
    <Result
      status={403}
      title={appText.error403.title}
      extra={
        <Button type="primary" onClick={handleClick}>
          {appText.backToHome}
        </Button>
      }
      subTitle={appText.error403.subTitle}
    />
  )
}

export default Error403
