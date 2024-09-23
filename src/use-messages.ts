import { useCallback, useState } from 'react'

export interface Message {
  id: number
  text: string
  height: number
  timeout: number
}

const useMessages = (initialValue: Array<Message> = []) => {
  const [messages, setMessages] = useState(initialValue)

  const addMessage = useCallback(
    (msg: Message) => {
      setMessages(messages => [...messages, msg])
      setTimeout(() => {
        setMessages(current => {
          const n = [...current]
          n.shift()
          return n
        })
      }, msg.timeout)
    },
    [setMessages]
  )

  return [messages, addMessage] as const
}

export default useMessages
