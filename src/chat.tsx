import { ReactNode } from 'react'
import './chat.css'

const Chat = ({ children }: { children: ReactNode }) => {
  return <div className="chat">{children}</div>
}

export default Chat
