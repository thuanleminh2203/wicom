import React from 'react'

const data = [
  {
    id: 1,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 2,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 3,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 4,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 5,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 7,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 8,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 9,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 10,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 11,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },

  {
    id: 12,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 13,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 14,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 15,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 16,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 17,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 18,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 19,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
]
export default function UserChatComponent(props) {
  const { setIsDisplayChat } = props
  return (
    <>
      <div className="UserChatContainer">
        {data.map((value) => (
          <div className="UserDisplay" key={value.id} onClick={() => setIsDisplayChat(true)}>
            <div>
              <img src={value.src} alt="Cant not display" />
              <span className="Username">{value.username}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
