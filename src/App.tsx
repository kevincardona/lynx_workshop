import { useNavigate } from 'react-router'
import './App.css'

export function App() {
  const nav = useNavigate()

  return (
    <view>
      <view className='App'>
        <view className='Content'>
          <text className='text-4xl mb-4'>
            What's Up
          </text>
          <text className="text-base" bindtap={() => nav('/pokemon')}>
            view pokemon list
          </text>
          <text className="text-base" bindtap={() => nav('/todo')}>
            view todo app
          </text>
          <text className="text-base" bindtap={() => nav('/storage')}>
            view local storage app
          </text>
          <text className="text-base" bindtap={() => nav('/date-picker')}>
            view date picker
          </text>
          <text className="text-base" bindtap={() => nav('/scratchpad')}>
            view scratchpad
          </text>
        </view>
      </view>
    </view>
  )
}
