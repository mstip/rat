import { createFileRoute } from '@tanstack/react-router'
import DemoIndex from '@/features/demo/components/DemoIndex'

export const Route = createFileRoute('/')({
  component: DemoIndex,
})

