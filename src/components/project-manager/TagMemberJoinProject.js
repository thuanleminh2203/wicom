import React, { Fragment, useEffect, useState } from 'react'
import { Tag, Input, Tooltip, AutoComplete } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { random, values } from 'lodash'
import { ApiRequest } from '../../constant/apiUtils'
import * as Constant from './../../constant/Constant'



export default function TagMemberJoinProject(props) {
  const { setDataInput, dataInput } = props
  const [state, setState] = useState({
    tags: dataInput.members,
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  })
  const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = state


  const handleClose = (removedTag) => {
    const tags = state.tags.filter((tag) => tag !== removedTag)
    console.log(tags)
    setState({ tags })
    setDataInput({ ...dataInput, members: tags })
  }

  useEffect(()=>{
      if(dataInput.members.length === 0){
        setState({...state, tags:[]})
      }
  },[dataInput.members])

  const showInput = () => {
    setState({ ...state, inputVisible: true })
  }

  const handleInputChange = (e) => {
    setState({ ...state, inputValue: e.target.value })
  }

  const handleInputConfirm = () => {
    const { inputValue } = state
    let { tags } = state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    setState({ ...state, tags, inputVisible: false, inputValue: '' })
    setDataInput({ ...dataInput, members: tags })
  }

  const handleEditInputChange = (e) => {
    setState({ ...state, editInputValue: e.target.value })
  }

  const handleEditInputConfirm = () => {
    setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags]
      newTags[editInputIndex] = editInputValue

      return {
        ...state,
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      }
    })
  }

  return (
    <Fragment>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={(e) => handleEditInputChange(e)}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          )
        }

        const isLongTag = tag.length > 20

        const tagElem = (
          <div>
              <Tag
                className="edit-tag"
                key={tag}
                closable={index >= 0}
                onClose={() => handleClose(tag)}
              >
                <span
                  onDoubleClick={(e) => {
                    if (index >= 0) {
                      setState({ ...state, editInputIndex: index, editInputValue: tag })
                      e.preventDefault()
                    }
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
          </div>
        )
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        )
      })}
      {inputVisible && 
          <Input
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />

      }
      {!inputVisible && 
        <div>
          <Tag className="site-tag-plus" onClick={showInput}>
            <PlusOutlined /> Add member
          </Tag>
        </div>
      }
    </Fragment>
  )
}
