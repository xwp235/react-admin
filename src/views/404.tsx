import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { appText } from '@/config'

function Error404() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/welcome')
  }
  return (
    <Result
      status={404}
      title={appText.error404.title}
      extra={
        <Button type="primary" onClick={handleClick}>
          {appText.backToHome}
        </Button>
      }
      subTitle={
        <>
          <span>{appText.error404.title}</span>
          <br />
          <span>{appText.error404.subTitle}</span>
        </>
      }
    />
  )
}

export default Error404
