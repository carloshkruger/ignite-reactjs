import type { StoryObj, Meta } from '@storybook/react'
import { Tooltip, TooltipProps, TooltipProvider } from '@carloshkruger-ignite-ui/react'

export default {
  title: 'Surfaces/Tooltip',
  component: Tooltip,
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
      <TooltipProvider>
        {Story()}
      </TooltipProvider>
    )
  ]
} as Meta<TooltipProps>

export const Primary: StoryObj<TooltipProps> = {
  args: {
    text: '26 de Outubro - Disponível',
    children: (
      <button>Hover me</button>
    )
  }
}
