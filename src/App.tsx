import { AnimatePresence } from 'framer-motion'
import { useCallback, useState } from 'react'
import './App.css'
import Bubble from './bubble'
import BubbleInput from './bubble-input'
import Chat from './chat'
import useMessages from './use-messages'
import { SketchPicker } from 'react-color'
import React from 'react'

function App() {
  const [messages, addMessage] = useMessages([])
  const [newMessage, setNewMessage] = useState('')
  const [fillColour, setFillColour] = useState('#eee')
  const [strokeColour, setStrokeColour] = useState('#000')

  const handleSubmit = useCallback(
    (bubbleHeight: number) => {
      if (newMessage.length > 0) {
        addMessage({
          id: +new Date(),
          text: newMessage,
          height: bubbleHeight
        })
        setNewMessage('')
      }
    },
    [newMessage, messages]
  )

  const handleFillColourChange = (color: { hex: string }) => {
    setFillColour(color.hex);
      console.log(color);
  };

  const handleStrokeColourChange = (color: { hex: string }) => {
    setStrokeColour(color.hex);
      console.log(color);
  };

  const lastMessage = messages[messages.length - 1]
  const dy = lastMessage ? lastMessage.height : 0

  return (
    <div className="App">
      <Chat>
        <AnimatePresence>
          {messages.map(m => (
            <Bubble key={m.id} id={m.id} dy={dy} fillColour={fillColour} strokeColour={strokeColour}>
              {m.text}
            </Bubble>
          ))}
        </AnimatePresence>
        <BubbleInput
          value={newMessage}
          onChange={setNewMessage}
          onSubmit={handleSubmit}
          fillColour={fillColour}
          strokeColour={strokeColour}
        />
      </Chat>
      
      <div className="picker">
        <p>Fill</p>
        <SketchPicker color={fillColour} onChange={handleFillColourChange}/>
        <p>Stroke</p>
        <SketchPicker color={strokeColour} onChange={handleStrokeColourChange}/>
      </div>
    </div>
  )
}

export default App
