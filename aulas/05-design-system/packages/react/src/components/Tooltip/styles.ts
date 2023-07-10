import * as Tooltip from '@radix-ui/react-tooltip'
import { styled } from '../../styles'

export const TooltipContainer = styled(Tooltip.Content, {
  background: '$gray900',
  borderRadius: '$sm',
  textAlign: 'center',
  padding: '$3 $4',
  maxWidth: '15rem',
})
