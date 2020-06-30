import React, { useState } from 'react'
import Highcharts from 'highcharts/highcharts-gantt'
import HighchartsReact from 'highcharts-react-official'
import { DatePicker } from 'antd'
import LabelComponent from '../../components-utils/LabelComponent'
import InputComponents from '../../components-utils/InputComponent'
import FormContainer from '../../components-utils/FormContainer'
import { v4 as uuidv4 } from 'uuid'
import { Button } from 'antd'

const { RangePicker } = DatePicker

let today = new Date()

const day = 1000 * 60 * 60 * 24
const dateFormat = Highcharts.dateFormat
const defined = Highcharts.defined
const isObject = Highcharts.isObject
const reduce = Highcharts.reduce

today.setUTCHours(0)
today.setUTCMinutes(0)
today.setUTCSeconds(0)
today.setUTCMilliseconds(0)
today = today.getTime()

const options = {
  chart: {
    scrollablePlotArea: {
      minWidth: 700,
      scrollPositionY: 1,
    },
  },
  series: [],
  tooltip: {
    pointFormatter: function() {
      var point = this,
        format = '%e. %b',
        options = point.options,
        completed = options.completed,
        amount = isObject(completed) ? completed.amount : completed,
        status = (amount || 0) * 100 + '%',
        lines

      lines = [
        {
          value: point.name,
          style: 'font-weight: bold;',
        },
        {
          title: 'Start',
          value: dateFormat(format, point.start),
        },
        {
          visible: !options.milestone,
          title: 'End',
          value: dateFormat(format, point.end),
        },
        {
          title: 'Completed',
          value: status,
        },
        {
          title: 'Owner',
          value: options.owner || 'unassigned',
        },
      ]

      return reduce(
        lines,
        function(str, line) {
          var s = '',
            style = defined(line.style) ? line.style : 'font-size: 0.8em;'
          if (line.visible !== false) {
            s =
              '<span style="' +
              style +
              '">' +
              (defined(line.title) ? line.title + ': ' : '') +
              (defined(line.value) ? line.value : '') +
              '</span><br/>'
          }
          return str + s
        },
        ''
      )
    },
  },
  title: {
    text: 'Gantt Project Management',
  },
  xAxis: {
    currentDateIndicator: true,
    min: today - 10 * day,
    max: today + 18 * day,
    scrollbar: {
      enabled: true,
    },
  },
}

export default function ManagerPjComponent() {
  const [dataChart, setDataChart] = useState(options)
  const [data, setData] = useState({ namePj: '', deadline: [] })
  const { namePj, deadline } = data
  const { series = [] } = dataChart

  const onChangeData = (e) => {
    console.log(e)
    if (e) {
      if (Array.isArray(e)) {
        setData({ ...data, deadline: e })
        return
      }
      const { target } = e
      const { value, name } = target
      setData({ ...data, [name]: value })
    }
  }

  const onSubmitData = () => {
    const startTime = deadline[0].valueOf()
    const endTime = deadline[1].valueOf()
    const distance = endTime - startTime
    const id = uuidv4()
    const dependency0 = uuidv4()
    const dependency1 = uuidv4()
    const option = {
      name: namePj,
      data: [
        {
          name: namePj,
          id,
          owner: 'Peter',
          completed: {
            amount: 0.5,
          },
        },
        {
          name: 'Chuẩn bị',
          id: dependency0,
          parent: id,
          start: startTime,
          end: startTime + 0.1 * distance,
          completed: {
            amount: 0.5,
          },
          owner: 'Linda',
        },
        {
          name: 'Thực hiện',
          id: dependency1,
          parent: id,
          start: startTime + 0.1 * distance,
          end: startTime + 0.9 * distance,
          dependency: dependency0,
          owner: 'Ivy',
        },
        {
          name: 'Báo cáo',
          id: uuidv4(),
          parent: id,
          start: startTime + 0.9 * distance,
          end: endTime,
          dependency: dependency1,
          owner: 'Peter',
        },
      ],
    }
    setDataChart({ series: [...series, option] })
  }

  return (
    <div className="ProjectContainer">
      <HighchartsReact highcharts={Highcharts} constructorType={'ganttChart'} options={dataChart} />
      <div className="ProjectForm">
        <FormContainer>
          <LabelComponent value="Tên dự án" style={{ color: '#fff' }} />
          <InputComponents
            type="text"
            dataInput1={namePj}
            setDataInput1={onChangeData}
            data={data}
            value={deadline}
            name="namePj"
          />
        </FormContainer>
        <div>
          <label>Thời gian</label>
          <RangePicker format="DD-MM-YYYY" showToday={true} onChange={(e) => onChangeData(e)} />
        </div>
        <div className="ProjectButton">
          <Button onClick={onSubmitData} type="primary">
            Add new task
          </Button>
        </div>
      </div>
    </div>
  )
}
