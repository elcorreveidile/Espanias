import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/current-user'
import DashboardShell from '@/components/dashboard/Shell'

export const metadata = { title: 'Panel', robots: { index: false } }
export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) redirect('/auth/signin')

  return <DashboardShell email={session.email}>{children}</DashboardShell>
}
