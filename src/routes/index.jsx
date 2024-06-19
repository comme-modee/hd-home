import { Route, Routes as ReactRoutes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import ErrorPages from '@/pages/error';
import ErrorPageNotFound from '@/pages/error/PageNotFound';
import Main from '@/pages/main/Main';
import Login from '@/pages/user/Login';
import Logout from '@/pages/user/Logout';

export default function AppRoutes() {
	return (
		<ReactRoutes>
			<Route index element={<Main />} />
			<Route path="/login" element={<Login />} />
			<Route path="/logout" element={<Logout />} />
			<Route path="/*" element={<ProtectedRoutes />} />
			<Route path="/error/*" element={<ErrorPages />} />
			<Route path="*"  element={<ErrorPageNotFound />} />
		</ReactRoutes>
	);
}
