import { useState } from "react"
import { useNavigate } from "react-router"

const Todo = () => {
  const nav = useNavigate()

  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState<string>('')

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input as string])
      setInput('')
    }
  }

  const removeItem = (idx: number) => {
    let updatedItems = [...items]
    updatedItems.splice(idx, 1)
    setItems(updatedItems)
  }

  const handleInputChange = (e: ReactLynx.XInputEvent) => {
    setInput(e.detail.value)
  }

  return (
    <view className='App'>
      <view className='Content flex flex-col items-center justify-self-center h-full'> 
        <scroll-view className='mb-5'>
          {items.map((n, idx) => <text bindtap={() => removeItem(idx)} >{n}</text>)}
        </scroll-view>
        <view className='flex flex-col items-center justify-self-center'>
          <input className='Input' bindinput={handleInputChange} value={input} bindconfirm={() => addItem()}/>
          <text bindtap={addItem}> add value </text>
          <text className='mt-4' bindtap={() => nav('/')}> go back </text>
        </view>
      </view>
    </view>
  )
}

export default Todo
