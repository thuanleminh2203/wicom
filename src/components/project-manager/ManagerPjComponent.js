import React, { useState } from 'react'
import Highcharts from 'highcharts/highcharts-gantt'
import HighchartsReact from 'highcharts-react-official'
import { DatePicker } from 'antd'
import LabelComponent from '../../components-utils/LabelComponent'
import InputComponents from '../../components-utils/InputComponent'
import FormContainer from '../../components-utils/FormContainer'
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
  series: [
    {
      name: 'Offices',
      data: [
        {
          name: 'Sonar',
          id: '123',
          owner: 'Peter',
          completed: {
            amount: 0.5,
          },
        },
        {
          name: 'Prepare office building',
          id: 'prepare_building',
          parent: '123',
          start: today - 2 * day,
          end: today + 6 * day,
          completed: {
            amount: 0.5,
          },
          owner: 'Linda',
        },
        {
          name: 'Inspect building',
          id: 'inspect_building',
          // dependency: 'prepare_building',
          parent: '123',
          start: today + 2 * day,
          end: today + 8 * day,
          owner: 'Ivy',
        },
        // {
        //   name: 'Passed inspection',
        //   id: 'passed_inspection',
        //   dependency: ['prepare_building', 'inspect_building'],
        //   // dependency: 'inspect_building',
        //   parent: '123',
        //   start: today + 9.5 * day,
        //   // milestone: true,
        //   owner: 'Peter',
        // },
      ],
    },
  ],
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
    min: today - 3 * day,
    max: today + 18 * day,
  },
}

const data = {
  series: [
    {
      name: 'Offices',
      data: [
        {
          name: 'Sonar',
          id: '123',
          owner: 'Peter',
          completed: {
            amount: Math.floor(Math.random() * 100) / 100,
          },
        },
        {
          name: 'Prepare office building',
          id: 'prepare_building',
          parent: '123',
          start: today - 2 * day,
          end: today + 6 * day,
          completed: {
            amount: Math.floor(Math.random() * 100) / 100,
          },
          owner: 'Linda',
        },
        {
          name: 'Inspect building',
          id: 'inspect_building',
          // dependency: 'prepare_building',
          parent: '123',
          start: today + 2 * day,
          end: today + 8 * day,
          owner: 'Ivy',
        },
        {
          name: 'Passed inspection',
          id: 'passed_inspection',
          dependency: ['prepare_building', 'inspect_building'],
          // dependency: 'inspect_building',
          parent: '123',
          start: today + 9.5 * day,
          milestone: true,
          owner: 'Peter',
        },
      ],
    },
  ],
}

export default function ManagerPjComponent() {
  const [dataChart, setDataChart] = useState(options)
  return (
    <div className="ProjectContainer">
      <HighchartsReact highcharts={Highcharts} constructorType={'ganttChart'} options={dataChart} />
      <button
        onClick={() =>
          setDataChart({
            series: [
              {
                name: 'Offices',
                data: [
                  {
                    name: 'Sonar',
                    id: '123',
                    owner: 'Peter',
                    completed: {
                      amount: Math.floor(Math.random() * 100) / 100,
                    },
                  },
                  {
                    name: 'Prepare office building',
                    id: 'prepare_building',
                    parent: '123',
                    start: today - 2 * day,
                    end: today + 6 * day,
                    completed: {
                      amount: Math.floor(Math.random() * 100) / 100,
                    },
                    owner: 'Linda',
                  },
                  {
                    name: 'Inspect building',
                    id: 'inspect_building',
                    // dependency: 'prepare_building',
                    parent: '123',
                    start: today + 2 * day,
                    end: today + 8 * day,
                    owner: 'Ivy',
                  },
                  {
                    name: 'Passed inspection',
                    id: 'passed_inspection',
                    dependency: ['prepare_building', 'inspect_building'],
                    // dependency: 'inspect_building',
                    parent: '123',
                    start: today + 9.5 * day,
                    milestone: true,
                    owner: 'Peter',
                  },
                ],
              },
            ],
          })
        }
      >
        CLick Me babe
      </button>
      <div>
        <button>Add new task</button>

        <RangePicker format="DD-MM-YYYY" />
        <FormContainer>
          <LabelComponent value="Tên dự án" style={{ color: '#fff' }} />
          <InputComponents type="text" />
        </FormContainer>
      </div>
    </div>
  )
}
