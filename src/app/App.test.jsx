import { createRoot } from 'react-dom/client'
import { render, screen } from '@testing-library/react'
import { EditableSpan } from '../components/EditableSpan'
import App from './App'
import { Nav } from '../components/Nav'

test('renders without crashing', () => {
  const container = document.createElement('div')
  const root = createRoot(container)
  root.render(<App tab="home" />)
  root.unmount()
})

test('renders Nav component', () => {
  const container = document.createElement('nav')
  const root = createRoot(container)
  root.render(<Nav />)
  root.unmount()
})

test('input should be displayed in editMode instead of span', () => {
  render(<EditableSpan title={'Wow'} editMode={true} />)

  const input = screen.getByRole('textbox')
  expect(input.value).toBe('Wow')
})
