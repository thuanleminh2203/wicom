import React, { createElement, useState , useEffect } from 'react'
import { Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd'
import moment from 'moment'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons'
import { ApiRequest } from '../../../constant/apiUtils'
import * as Constant from './../../../constant/Constant'

const { TextArea } = Input

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(comment) => (
      <Comment
        author={comment.fullName}
        avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
)

export default function NewsComponent(props) {
  const { dataNews } = props
  const { content, newsId, userId, createdAt, fullName, comments = [] } = dataNews

  const [dataNew, setDataNew] = useState({ listComment: comments, submitting: false, value: '' })

  const [likes, setLikes] = useState(0)
  // const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState(null)

  const { listComment , submitting, value } = dataNew

  // const { avatar, content, dislike, like, newsId, userId, createdAt ,
  //  fullName, comments : lstCmt = [] } = dataNews

  const like = () => {
    setLikes(1)
    // setDislikes(0)
    setAction('liked')
  }

  const dislike = () => {
    setLikes(0)
    // setDislikes(1)
    setAction('disliked')
  }

  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
          onClick: like,
        })}
      </Tooltip>
      <span className="comment-action">{likes}</span>
    </span>
    // ,
    // <span key="comment-basic-dislike">
    //   <Tooltip title="Dislike">
    //     {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined, {
    //       onClick: dislike,
    //     })}
    //   </Tooltip>
    //   <span className="comment-action">{dislikes}</span>
    // </span>,
  ]

  useEffect(()=>{
    console.log('======lstcmt====',listComment)

  },[listComment])

  const handleSubmit = async () => {
    if (!dataNew.value) {
      return
    }

    // setData({ ...data, submitting: true })
    await onComment()
    // setData({ ...data, submitting: false })
  }

  // console.log('===comment===', lstCmt)
  async function onComment() {
    await ApiRequest.post(Constant.API_COMMENT, {
      newsId,
      content: value,
      createdAt: moment().format('DD-MM-YYYY'),
    })
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        setDataNew({ ...dataNew, listComment: [...listComment, body], value:'' })
      })
      .catch((err) => console.log('=====err====', err))
  }

  const handleChange = (e) => {
    setDataNew({ ...dataNew, value: e.target.value })
  }

  return (
    <div className="NewsContainer">
      <Comment
        actions={actions}
        author={<a className="UserNameContainer">{fullName}</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt={fullName}
          />
        }
        content={<p>{content}</p>}
        datetime={
          <Tooltip title={createdAt}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      >
        <>
          {listComment && listComment.length > 0 && <CommentList comments={listComment} />}
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt={fullName}
              />
            }
            content={
              <Editor
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
  )
}
