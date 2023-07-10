import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { Text } from '../Text'
import { TooltipContainer } from './styles'
import { ReactNode } from 'react'

export { Provider as TooltipProvider } from '@radix-ui/react-tooltip'

export interface TooltipProps {
  text: string
  children: ReactNode
}

export function Tooltip({ text, children }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipContainer>
          <Text size="sm">{text}</Text>
          <TooltipPrimitive.TooltipArrow />
        </TooltipContainer>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
