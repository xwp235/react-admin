import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function Error404() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/welcome')
  }
  return (
    <Result
      status={404}
      title="お探しのページは見つかりませんでした。"
      extra={
        <Button type="primary" onClick={handleClick}>
          トップページへ戻る
        </Button>
      }
      subTitle={
        <>
          <span>お探しのページは見つかりませんでした。</span>
          <br />
          <span>お手数ですが、トップページから再度お探しください。</span>
        </>
      }
    />
  )
}

export default Error404
