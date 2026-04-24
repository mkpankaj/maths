import { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {children}
    </div>
  )
}
