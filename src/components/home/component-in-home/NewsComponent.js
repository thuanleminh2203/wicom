import React, { createElement, useState, useEffect } from 'react'
import { Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd'
import moment from 'moment'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons'
import { ApiRequest } from '../../../constant/apiUtils'
import * as Constant from './../../../constant/Constant'
import { connect } from '../../../socket/SockJSClientBackup'

const { TextArea } = Input

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(comment) => (
      <Comment
        author={comment.fullName}
        avatar={
          comment.avatar
            ? comment.avatar
            : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        }
        content={comment.content}
        datetime={comment.createdAt}
        style={{ color: 'white' }}
      />
    )}
  />
)

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={3} onChange={onChange} value={value} bordered={false} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        size="middle"
        type="primary"
      >
        Gửi
      </Button>
    </Form.Item>
  </>
)

export default function NewsComponent(props) {
  const { dataNews } = props
  const { content, newsId, userId, createdAt, fullName, comments = [], url, avatar } = dataNews

  const [dataNew, setDataNew] = useState({ listComment: comments, submitting: false, value: '' })

  const { listComment = [], submitting, value } = dataNew
  const [avatarCmt, setAvatarCmt] = useState(null)
  const handleSubmit = async () => {
    if (!dataNew.value) {
      return
    }
    await onComment()
  }
  useEffect(() => {
    getInfor()
  }, [])

  async function getInfor() {
    await ApiRequest.get(Constant.API_USER_DETAIL)
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        const { avatarUrl } = body
        setAvatarCmt(avatarUrl)
        // setDataApi(body)
      })
      .catch((err) => {
        // const { response = {} } = err
        // const { data = {} } = response
        // const { mess = '' } = data
        // toast.error(mess)
      })
  }
  async function onComment() {
    await ApiRequest.post(Constant.API_COMMENT, {
      newsId,
      content: value,
      createdAt: moment().format('DD-MM-YYYY'),
    })
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        const resData = { ...body, avatar: avatarCmt }
        // console.log('====listComment====', listComment)
        if (listComment) {
          setDataNew({ ...dataNew, listComment: [...listComment, resData], value: '' })
        } else {
          setDataNew({ ...dataNew, listComment: [resData], value: '' })
        }
      })
      .catch((err) => console.log('=====err====', err))
  }

  const handleChange = (e) => {
    setDataNew({ ...dataNew, value: e.target.value })
  }
  console.log('====listComment===', listComment)
  return (
    <div className="NewsContainer">
      <div style={{ marginLeft: '3%' }}>
        <Comment
          // actions={actions}
          author={<a className="UserNameContainer">{fullName}</a>}
          avatar={
            <Avatar
              src={
                avatar
                  ? avatar
                  : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.pngavatar'
              }
              alt={fullName}
            />
          }
          content={
            <>
              <div>
                <img style={{ width: '30%' }} src={url} />
              </div>
              <p>{content}</p>
            </>
          }
          datetime={
            <Tooltip title={createdAt}>
              <span>{createdAt}</span>
            </Tooltip>
          }
        >
          <>
            {listComment && listComment.length > 0 && <CommentList comments={listComment} />}
            <Comment
              avatar={
                <Avatar
                  src={
                    avatarCmt
                      ? avatarCmt
                      : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                  }
                  alt={fullName}
                />
              }
              content={
                <Editor
                  // className="CommentContainer"
                  onChange={(e) => handleChange(e)}
                  onSubmit={() => handleSubmit()}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </>
        </Comment>
      </div>
    </div>
  )
}
