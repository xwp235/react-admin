import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import env from '@/config'

function Error404() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/welcome')
  }
  return (
    <Result
      status={404}
      title={env.appText.error404.title}
      extra={
        <Button type="primary" onClick={handleClick}>
          {env.appText.backToHome}
        </Button>
      }
      subTitle={
        <>
          <span>{env.appText.error404.title}</span>
          <br />
          <span>{env.appText.error404.subTitle}</span>
        </>
      }
    />
  )
}

export default Error404
