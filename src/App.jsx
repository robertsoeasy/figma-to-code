import './App.css'
import { Button } from './components/Button.jsx'

const ArrowRightIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

function App() {
  return (
    <div className="flex flex-col gap-4 p-10">
      <Button>Button</Button>
      <Button icon={ArrowRightIcon}>Button</Button>
    </div>
  )
}

export default App
