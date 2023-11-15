import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import './bubble-input.css'

interface BubbleInputProps {
  onChange: (value: string) => void
  onSubmit: (height: number) => void
  value: string
  fillColour: string
  strokeColour: string
}

const BubbleInput = ({ onChange, onSubmit, value, fillColour, strokeColour }: BubbleInputProps) => {
  const refEditable = useRef<HTMLDivElement>(null)
  const refContainer = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleKeyDown: KeyboardEventHandler = e => {
    const { current: elContainer } = refContainer
    const { current: elEditable } = refEditable
    if (elContainer === null || elEditable === null) return

    const { isComposing } = e.nativeEvent
    if (e.key === 'Enter' && !isComposing) {
      const height = elContainer.clientHeight
      onSubmit && onSubmit(height)
      e.preventDefault()
      setSubmitted(true)
      requestAnimationFrame(() => {
        elEditable.focus()
        elEditable.innerText = ''
        setSubmitted(false)
      })
    }
  }
  const handleBlur = useCallback(() => {
    const { current: elDiv } = refEditable
    if (elDiv) {
      elDiv.focus()
    }
  }, [refEditable])

  useEffect(handleBlur, [handleBlur])

  return (
    <div
      ref={refContainer}
      className={`bubble input  ${value.length === 0 ? 'empty' : ''} ${
        submitted ? 'submitted' : ''
      }`}
    >
      <div
        ref={refEditable}
        className="bubble-content"
        contentEditable
        style={{backgroundColor: fillColour, color: strokeColour}}
        spellCheck="false"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onInput={e => onChange(e.currentTarget.innerText)}
      />
    </div>
  )
}

export default BubbleInput
