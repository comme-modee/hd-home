import { ThemeSettings, useAuthContext, useThemeContext } from '@/common';
import { lazy } from 'react';
import { Navigate, Route, Routes as ReactRoutes, Outlet } from 'react-router-dom';
import VerticalLayout from '@/layouts/Vertical';
import HorizontalLayout from '@/layouts/Horizontal';
import Root from './Root';

/**
 * routes import
 */
const Admin = lazy(() => import('../pages/admin'));
const Error404Alt = lazy(() => import('../pages/otherpages/Error404Alt'));

export default function ProtectedRoutes() {
	const { settings } = useThemeContext();
	const Layout =
		settings.layout.type == ThemeSettings.layout.type.vertical
			? VerticalLayout
			: HorizontalLayout;

	const { user } = useAuthContext();

	return user ? (
		<ReactRoutes>

			<Route path="/*" element={<Layout />}>
				<Route path="admin/*" element={<Outlet />}>
					<Route index element={<Root />} />
					<Route path="*" element={<Admin />} />
				</Route>
				<Route path="*" element={<Error404Alt />} />
			</Route>

		</ReactRoutes>
	) : (
		<Navigate to="/login" replace />
	);
}
