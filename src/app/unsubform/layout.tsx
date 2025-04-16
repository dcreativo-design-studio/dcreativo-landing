import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unsubscribe from DCreativo Newsletter',
  description: 'Unsubscribe from promotional emails sent by DCreativo',
}

export default function UnsubscribeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
