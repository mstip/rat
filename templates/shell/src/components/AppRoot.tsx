import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterAppProvider } from '@toolpad/core/tanstack-router';

import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import TanStackQueryDevtools from '../lib/tanstack-query/devtools';

import { branding, navigation } from '@/config/navigation';
import { muiTheme } from '@/config/theme';

export default function AppRoot() {
	return (
		<TanStackRouterAppProvider navigation={navigation} branding={branding} theme={muiTheme}>
			<DashboardLayout>
				<PageContainer>
					<Outlet />
				</PageContainer>
			</DashboardLayout>
			<TanstackDevtools
				config={{
					position: 'bottom-left',
				}}
				plugins={[
					{
						name: 'Tanstack Router',
						render: <TanStackRouterDevtoolsPanel />,
					},
					TanStackQueryDevtools,
				]}
			/>
		</TanStackRouterAppProvider>

	);
}
