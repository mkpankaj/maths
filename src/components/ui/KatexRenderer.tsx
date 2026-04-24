import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface KatexRendererProps {
  text: string
  hasLatex: boolean
}

export function KatexRenderer({ text, hasLatex }: KatexRendererProps) {
  if (!hasLatex) {
    return <span>{text}</span>
  }

  const parts = text.split(/(\$\$[^$]*\$\$|\$[^$]*\$)/g)

  return (
    <span>
      {parts.map((part, idx) => {
        if (!part) return null

        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2)
          return <BlockMath key={idx} math={math} />
        }

        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1)
          return <InlineMath key={idx} math={math} />
        }

        return <span key={idx}>{part}</span>
      })}
    </span>
  )
}
