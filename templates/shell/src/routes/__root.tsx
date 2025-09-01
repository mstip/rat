import { createRootRouteWithContext } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'
import { doAuth } from '@/lib/auth/auth';
import AppRoot from '@/components/AppRoot';

interface MyRouterContext {
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    beforeLoad: async ({location}) => await doAuth(location),
	component: () => <AppRoot />
});
