import { Descriptions, Card, Button } from 'antd'
import { useCharts } from '@/hooks/useCharts'
import { useEffect, useState } from 'react'

import styles from '@/views/dashboard/index.module.scss'
import { useUserStore } from '@/store'
import { formatState, formatNum, formatMoney } from '@/utils'
import { appText } from '@/config'
import { ReportData } from '@/types/Dashboard'
import DashboardApi from '@/api/DashboardApi'

function Dashboard() {
  const userInfo = useUserStore(state => state.userInfo)
  const [report, setReport] = useState<ReportData>()

  // 初始化折线图
  const [lineRef, lineChart] = useCharts()
  // 初始饼图
  const [pieRef1, pieChart1] = useCharts()
  const [pieRef2, pieChart2] = useCharts()
  // 初始化雷达图
  const [radarRef, radarChart] = useCharts()
  useEffect(() => {
    renderLineChart()
    renderPieChart1()
    renderPieChart2()
    renderRadarChart()
  }, [lineChart, pieChart1, pieChart2, radarChart])

  // 加载折线图数据
  const renderLineChart = async () => {
    if (!lineChart) {
      return
    }
    const data = await DashboardApi.getLineData()
    lineChart?.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['订单', '流水']
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      xAxis: {
        data: data.label
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: data.order
        },
        {
          name: '流水',
          type: 'line',
          data: data.money
        }
      ]
    })
  }

  // 加载饼图1
  const renderPieChart1 = async () => {
    if (!pieChart1) {
      return
    }
    const data = await DashboardApi.getPieCityData()
    pieChart1?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data
        }
      ]
    })
  }

  // 加载饼图2
  const renderPieChart2 = async () => {
    if (!pieChart2) {
      return
    }
    const data = await DashboardApi.getPieAgeData()
    pieChart2?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: [50, 180],
          roseType: 'area',
          data
        }
      ]
    })
  }

  // 加载雷达图
  const renderRadarChart = async () => {
    if (!radarChart) {
      return
    }
    const data = await DashboardApi.getRadarData()
    radarChart?.setOption({
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        indicator: data.indicator
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: data.data
        }
      ]
    })
  }

  // 刷新饼图
  const handleRefresh = () => {
    renderPieChart1()
    renderPieChart2()
  }

  useEffect(() => getReportData(), [])

  const getReportData = () => {
    DashboardApi.getReportData().then(data => setReport(data))
  }

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.userInfo}>
        <img src={userInfo.userImg} className={styles.userImg} />
        <Descriptions title={appText.dashboardPage.welcomeText}>
          <Descriptions.Item label={appText.fields.username}>{userInfo.userId}</Descriptions.Item>
          <Descriptions.Item label={appText.fields.email}>{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label={appText.fields.status}>{formatState(userInfo.state)}</Descriptions.Item>
          <Descriptions.Item label={appText.fields.mobile}>{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label={appText.fields.job}>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label={appText.fields.dept}>{userInfo.deptName}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className={styles.report}>
        <div className={styles.card}>
          <div className="title">司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className="title">总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className="title">总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className="title">开通城市</div>
          <div className={styles.data}>{formatNum(report?.cityNum)}座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card
          title="订单和流水走势图"
          extra={
            <Button type="primary" onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title="司机分布"
          extra={
            <Button type="primary" onClick={handleRefresh}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieChart}>
            <div ref={pieRef1} className={styles.itemPie}></div>
            <div ref={pieRef2} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title="模型诊断"
          extra={
            <Button type="primary" onClick={renderRadarChart}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
