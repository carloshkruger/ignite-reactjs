import type { StoryObj, Meta } from '@storybook/react'
import { Text, TextProps } from '@ignite-ui/react'

export default {
  title: 'Typegraphy/Text',
  component: Text,
  args: {
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  }
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}

