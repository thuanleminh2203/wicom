/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts/highcharts-gantt'
import HighchartsReact from 'highcharts-react-official'
import { DatePicker, Col } from 'antd'
import LabelComponent from '../../components-utils/LabelComponent'
import InputComponents from '../../components-utils/InputComponent'
import FormContainer from '../../components-utils/FormContainer'
import { Button } from 'antd'
import TagMemberJoinProject from './TagMemberJoinProject'
import { ApiRequest } from '../../constant/apiUtils'
import moment from 'moment'
import { CONSTANT } from './../../constant/Constant'
import { toast } from 'react-toastify'

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
      // scrollablePlotArea: {
      // minHeight: 600,
      //   scrollPositionY: 1,
      // },
      // width: 700,
      height: 500,
      maxHeight: 900,
    },
    responsive: {
      rules: [
        {
          condition: {
            minHeight: 500,
          },
        },
      ],
    },
    // maintainAspectRatio: false,
    // scales: {
    //     yAxes: [{
    //         ticks: {
    //             beginAtZero:true
    //         }
    //     }]
    // },
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
    series: [{}],
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
  const [dataInput, setDataInput] = useState({
    namePj: '',
    deadline: [],
    members: [],
    completed: '',
  })
  const { namePj, deadline, members, completed } = dataInput
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

  // useEffect(() => {
  //   // console.log('======id ???====', series.find((element) => console.log("===", element.data)))
  //   // console.log('====series=====', series)
  //   // const data = series.length && series[0].data
  //   // series.find((element) => {
  //   //   const dataDemo = element.data
  //   //   if (dataDemo[0].id === id) return element
  //   // })
  //   // console.log('===demo', data && data[0].id)
  //   // console.log(
  //   //   '========thuanlm========',
  //   series.find((element) => {
  //     const dataDemo = element.data
  //     if (dataDemo[0].id === id) {
  //       const data = JSON.stringify(element)
  //       console.log('=========data string ====', data)
  //       console.log('=========data object ====', JSON.parse(data))

  //       return JSON.stringify(element)
  //     }
  //   })
  //   // )
  // }, [id])

  useEffect(() => {
    getLstProject()
  }, [])

  // useEffect(() => {
  //   console.log('====???????????=========', dataChart)
  // }, [dataChart])

  async function getLstProject() {
    await ApiRequest.get('/project')
      .then((res) => {
        const { data = {} } = res
        const { data: body = [] } = data

        // console.log('====list res===', body)
        if (body.length > 0) {
          const result = []
          body.forEach((e) => {
            // console.log('starttime==========',moment(e.endTime,"DD-MM-YYYY").valueOf())
            const dataChart = {
              id: e.projectId,
              name: e.projectName,
              data: [
                {
                  name: e.projectName,
                  id: e.projectId,
                  owner: e.owner,
                  completed: {
                    amount: e.completed / 100,
                  },
                  start: moment(e.startTime, 'DD-MM-YYYY').valueOf(),
                  end: moment(e.endTime, 'DD-MM-YYYY').valueOf(),
                },
              ],
            }
            result.push(dataChart)
            console.log('====data resss===', result)
          })
          setDataChart({ series: result })
        }
      })
      .catch((err) => {
        console.log('====error===', err)
      })
  }
  // console.log('=========serier', JSON.stringify(series))

  // const getProjectById = (id) => {
  //   series.find((element) => element.data.id === id)
  //   console.log("======id ???====",series )
  // }

  console.log('====errr when sublit====', dataInput)

  const onSubmitData = async () => {
    const error = {}
    if (!namePj) {
      // setErr({ ...err, namePj: 'Không được để trống trường này !!' })
      error.namePj = 'Không được để trống trường này !!'
    }
    if (completed === '' || completed === undefined || completed === null) {
      // setErr({ ...err, completed: 'Không được để trống trường này !!' })
      error.completed = 'Không được để trống trường này !!'
    }
    if (!(Array.isArray(deadline) && deadline.length === 2)) {
      // setErr({ ...err, deadline: 'Không được để trống trường này !!' })
      error.deadline = 'Không được để trống trường này !!'
    }
    console.log('====errr when sublit====', error)
    setErr(error)
    if (Object.keys(error).length) return

    const startTime = deadline[0].valueOf()
    const endTime = deadline[1].valueOf()

    await ApiRequest.post('/project', {
      projectId: null,
      projectName: namePj,
      owner: concatMember(members),
      completed,
      startTime: moment(startTime).format('DD-MM-YYYY'),
      endTime: moment(endTime).format('DD-MM-YYYY'),
    })
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        const option = {
          id: body.projectId,
          name: namePj,
          data: [
            {
              name: namePj,
              id: body.projectId,
              owner: concatMember(members),
              completed: {
                amount: completed / 100,
              },
              start: startTime,
              end: endTime,
            },
          ],
        }
        setDataChart({ series: [...series, option] })
        setDataInput({ ...dataInput, namePj: '', deadline: [], members: [], completed: '' })
        toast.success('Thêm mới dữ diệu thành công')
      })
      .catch((err) => {
        toast.error('Thêm mới dữ diệu thất bại')
        console.log('====error===', err)
      })
  }

  const concatMember = (members = []) => {
    let member = ''
    members.map((value, index) => {
      index === 0 ? (member = member + value) : (member = member + ', ' + value)
    })
    return member
  }

  // function validateData() {
  //   if (!namePj) {
  //     setErr({ ...err, namePj: 'Không được để trống trường này !!' })
  //   }
  //   if (completed === '' || completed === undefined || completed === null) {
  //     setErr({ ...err, completed: 'Không được để trống trường này !!' })
  //   }
  // }

  return (
    <div className="ProjectContainer">
      <div className="HighchartContainer">
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'ganttChart'}
          options={dataChart}
        />
      </div>
      <div className="PeojectFormContainer">
        <div className="ProjectForm">
          <FormContainer classNameCustome="PaddingTop" justify="start">
            <LabelComponent value="Tên dự án" style={{ color: '#fff' }} />
            <InputComponents
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
              value={namePj}
            />
          </FormContainer>
          <FormContainer classNameCustome="PaddingTop" justify="start">
            <LabelComponent value="Tiến độ" style={{ color: '#fff' }} />
            <InputComponents
              type="text"
              dataInput={dataInput}
              setDataInput={setDataInput}
              min={0}
              max={100}
              placeholder="Completed (%)"
              name="completed"
              err={err}
              setErr={setErr}
              minValue={0}
              maxValue={100}
              isValidate={true}
              isNumber={true}
              regex={CONSTANT.REGEX_NUMBER}
              value={completed}
            />
          </FormContainer>
          <FormContainer
            classNameCustome={`PaddingTop ${err.deadline && 'ErrorContainer'}`}
            justify="start"
          >
            <LabelComponent value="Thời gian" style={{ color: '#fff' }} />
            <Col span={16} gutter={8}>
              <RangePicker
                value={deadline}
                format="DD-MM-YYYY"
                showToday={true}
                onChange={(e) => onChangeData(e)}
              />
            </Col>
          </FormContainer>
          <FormContainer classNameCustome="PaddingTop" justify="start">
            <LabelComponent value="Thành viên" style={{ color: '#fff' }} />
            <Col>
              <TagMemberJoinProject
                members={members}
                dataInput={dataInput}
                setDataInput={setDataInput}
              />
            </Col>
          </FormContainer>

          <div className="ProjectButton">
            <Button onClick={onSubmitData} type="primary">
              Add new task
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
