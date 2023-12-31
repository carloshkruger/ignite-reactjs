import type { StoryObj, Meta } from '@storybook/react'
import { Box, Text, TextArea, TextAreaProps } from '@carloshkruger-ignite-ui/react'

export default {
  title: 'Form/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <Box as="label" css={{ display: 'flex', flexDirection: 'column' }}>
        <Text size="sm">Observations</Text>
        {Story()}
      </Box>
    )
  ]
} as Meta<TextAreaProps>

export const Primary: StoryObj<TextAreaProps> = {
  args: {
    placeholder: 'Add any observations'
  }
}

export const Disabled: StoryObj<TextAreaProps> = {
  args: {
    disabled: true
  }
}

