import * as ToastPrimitive from '@radix-ui/react-toast'
import { X } from 'phosphor-react'
import { ToastContainer, ToastViewport } from './styles'
import { Text } from '../Text'
import { ComponentProps } from 'react'

export { Provider as ToastProvider } from '@radix-ui/react-toast'

export interface ToastProps extends ComponentProps<typeof ToastContainer> {
  title: string
  content?: string
}

export function Toast({ title, content, ...props }: ToastProps) {
  return (
    <>
      <ToastContainer {...props}>
        <div>
          <ToastPrimitive.Title asChild>
            <Text size="xl" as="strong">
              {title}
            </Text>
          </ToastPrimitive.Title>
          {!!content && (
            <ToastPrimitive.Description asChild>
              <Text size="sm" as="span">
                {content}
              </Text>
            </ToastPrimitive.Description>
          )}
        </div>
        <ToastPrimitive.Close title="Fechar" aria-label="Close">
          <X aria-hidden size={20} />
        </ToastPrimitive.Close>
      </ToastContainer>
      <ToastViewport />
    </>
  )
}
