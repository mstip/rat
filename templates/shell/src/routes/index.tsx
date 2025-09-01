import { createFileRoute } from '@tanstack/react-router'
import HomeIndex from '@/features/home/components/HomeIndex'

export const Route = createFileRoute('/')({
  component: HomeIndex,
})

