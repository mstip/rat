import DemoIndex from '@/features/demo/components/DemoIndex'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/')({
	component: DemoIndex,
})

