import type { StoryObj, Meta } from '@storybook/react'
import { Toast, ToastProps, ToastProvider } from '@carloshkruger-ignite-ui/react'

export default {
  title: 'Surfaces/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    children: {
      control: {
        type: null
      }
    }
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        {Story()}
      </ToastProvider>
    )
  ]
} as Meta<ToastProps>

export const Primary: StoryObj<ToastProps> = {
  args: {
    title: 'Agendamento realizado',
    content: 'Quarta-feira, 23 de Outubro às 16h',
    defaultOpen: true
  }
}
