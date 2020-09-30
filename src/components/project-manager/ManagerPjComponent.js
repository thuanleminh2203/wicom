import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts/highcharts-gantt'
import HighchartsReact from 'highcharts-react-official'
import { DatePicker } from 'antd'
import LabelComponent from '../../components-utils/LabelComponent'
import InputComponents from '../../components-utils/InputComponent'
import FormContainer from '../../components-utils/FormContainer'
import { v4 as uuidv4 } from 'uuid'
import { Button } from 'antd'
import TagMemberJoinProject from './TagMemberJoinProject'

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

export default function ManagerPjComponent() {
  const options = {
    chart: {
      scrollablePlotArea: {
        minWidth: 700,
        scrollPositionY: 1,
      },
    },

    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            // click: (e) => setId(e.point.id),
            click: (e) => onClickChart(e),
          },
        },
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
      text: 'Project Management',
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

  const [err, setErr] = useState({})
  const [dataChart, setDataChart] = useState(options)
  const [dataInput, setDataInput] = useState({ namePj: '', deadline: [], members: [] })
  const { namePj, deadline, members } = dataInput
  const { series = [] } = dataChart
  const [id, setId] = useState(null)

  function onClickChart(e) {
    setId(e.point.id)
    // console.log('=====data====', getProjectById(e.point.id))
  }

  const onChangeData = (e) => {
    if (e) {
      if (Array.isArray(e)) {
        setDataInput({ ...dataInput, deadline: e })
        return
      }
      const { target } = e
      const { value, name } = target
      setDataInput({ ...dataInput, [name]: value })
    }
  }

  useEffect(() => {
    // console.log('======id ???====', series.find((element) => console.log("===", element.data)))
    // console.log('====series=====', series)
    // const data = series.length && series[0].data
    // series.find((element) => {
    //   const dataDemo = element.data
    //   if (dataDemo[0].id === id) return element
    // })
    // console.log('===demo', data && data[0].id)
    console.log(
      '========thuanlm========',
      series.find((element) => {
        const dataDemo = element.data
        if (dataDemo[0].id === id) return element
      })
    )
  }, [id])
  // console.log('=========serier', series)

  // const getProjectById = (id) => {
  //   series.find((element) => element.data.id === id)
  //   console.log("======id ???====",series )
  // }

  const onSubmitData = () => {
    const startTime = deadline[0].valueOf()
    const endTime = deadline[1].valueOf()
    const id = uuidv4()
    const option = {
      name: namePj,
      data: [
        {
          name: namePj,
          id,
          owner: concatMember(members),
          completed: {
            amount: 0.5,
          },
          start: startTime,
          end: endTime,
        },
      ],
    }
    setDataChart({ series: [...series, option] })
  }

  const concatMember = (members = []) => {
    let member = ''
    members.map((value, index) => {
      index === 0 ? (member = member + value) : (member = member + ', ' + value)
    })
    return member
  }

  return (
    <div className="ProjectContainer">
      <HighchartsReact highcharts={Highcharts} constructorType={'ganttChart'} options={dataChart} />
      <div className="PeojectFormContainer">
        <div className="ProjectForm">
          <FormContainer>
            <LabelComponent value="Tên dự án" style={{ color: '#fff' }} />
            <InputComponents
              style={{ marginLeft: '90px' }}
              type="text"
              dataInput={dataInput}
              setDataInput={setDataInput}
              min={0}
              max={10}
              placeholder="Project Name"
              name="namePj"
              err={err}
              setErr={setErr}
              isValidate={true}
            />
          </FormContainer>
          <div className="MemberProjectContainer">
            <div>
              <label>Thành viên</label>
            </div>
            <div>
              <TagMemberJoinProject
                members={members}
                dataInput={dataInput}
                setDataInput={setDataInput}
              />
            </div>
          </div>
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
        <div className="ProjectForm">
          <FormContainer>
            <LabelComponent value="Tên dự án" style={{ color: '#fff' }} />
            <InputComponents
              style={{ marginLeft: '90px' }}
              type="text"
              dataInput={dataInput}
              setDataInput={setDataInput}
              min={0}
              max={10}
              placeholder="Project Name"
              name="namePj"
              err={err}
              setErr={setErr}
              isValidate={true}
            />
          </FormContainer>
          <div className="MemberProjectContainer">
            <div>
              <label>Thành viên</label>
            </div>
            <div>
              <TagMemberJoinProject
                members={members}
                dataInput={dataInput}
                setDataInput={setDataInput}
              />
            </div>
          </div>
          <div>
            <label>Thời gian</label>
            <RangePicker format="DD-MM-YYYY" showToday={true} onChange={(e) => onChangeData(e)} />
          </div>
          <div className="ProjectButton">
            <Button onClick={onSubmitData} type="primary">
              Update task
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
