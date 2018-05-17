import echarts from 'echarts'

export default {
  init(dom,data) {
    const chart = echarts.init(dom)
    chart.fn = {
      resize() {
        chart.resize({
          width: 'auto',
          height: 'auto'
        })
      }
    }
    chart.setOption({
      title: { show: false },
      dataZoom: {
        type: 'inside',
        disabled: false,
        xAxisIndex: 0,
        minSpan: 20,
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(15,145,255,.6)',
        padding: [5,15],
        formatter(params) {
          const d = data.detail[params[0].dataIndex]
          return `${d.time}<br>关注人数：${d.subscribe}人<br>充值人数：${d.recharge}人<br>充值转化率：${d.rechargePer}`
        }
      },
      xAxis: {
        name: '时间',
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#e6e6e6'
          }
        },
        nameTextStyle: {
          color: '#666'
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#666'
        },
        type: 'category',
        data: data.detail.map(val => val.time),
        boundaryGap: ['0', '10%']
      },
      yAxis: {
        name: '人数',
        splitLine:{
          lineStyle:{
            color: '#e5e5e5'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e6e6e6'
          }
        },
        nameTextStyle: {
          color: '#666'
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#666'
        },
        type: 'value',
        boundaryGap: ['0', '10%']
      },
      series: [
        {
          name: '充值人数',
          type: 'line',
          data: data.detail.map(val => val.recharge),
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#0787ff' // 0% 处的颜色
                }, {
                  offset: 1, color: '#c1e3ff' // 100% 处的颜色
                }]
              }
            }
          },
          lineStyle: {
            normal: {
              color: '#39a4ff'
            }
          },
          itemStyle: {
            normal: {
              color: '#39a4ff'
            }
          },
          symbol: 'circle',
        },
      ],
    })
    window.addEventListener('resize', chart.fn.resize)
    return chart
  },
  destroy(chart) {
    chart.dispose()
    window.removeEventListener('resize', chart.fn.resize)
  }
}