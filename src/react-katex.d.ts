declare module 'react-katex' {
  import { ReactNode } from 'react'

  export interface InlineMathProps {
    math: string
    children?: ReactNode
  }

  export interface BlockMathProps {
    math: string
    children?: ReactNode
  }

  export const InlineMath: React.FC<InlineMathProps>
  export const BlockMath: React.FC<BlockMathProps>
}
