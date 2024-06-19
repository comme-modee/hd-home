import Root from '@/routes/Root';
import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

//account
const Account = lazy(() => import('./Account/Account'));

//counter
const DashBoard = lazy(() => import('./DashBoard/DashBoard'));
const Visitor = lazy(() => import('./Visitor/Visitor'));
const Pageview = lazy(() => import('./Pageview/Pageview'));
const Returning = lazy(() => import('./Returning/Returning'));
const Popular = lazy(() => import('./Popular/Popular'));
const Ref = lazy(() => import('./Ref/Ref'));
const Platform = lazy(() => import('./Platform/Platform'));
const Screenresolution = lazy(() => import('./Screenresolution/Screenresolution'));
const Lang = lazy(() => import('./Lang/Lang'));
const Os = lazy(() => import('./Os/Os'));

//board
const Portfolio = lazy(() => import('./Portfolio/Portfolio'));
const Contact = lazy(() => import('./Contact/Contact'));

export default function Admin() {
	return (
		<Routes>
			<Route path="account/*" element={<Outlet/>}>
				<Route path="edit" element={<Account />} />
			</Route>
			<Route path="counter/*" element={<Outlet />}>
				<Route index element={<Root />} />
				<Route path="dashboard" element={<DashBoard />} />
				<Route path="visitor" element={<Visitor />} />
				<Route path="pageview" element={<Pageview />} />
				<Route path="returning" element={<Returning />} />
				<Route path="popular" element={<Popular />} />
				<Route path="ref" element={<Ref />} />
				<Route path="platform" element={<Platform />} />
				<Route path="screenresolution" element={<Screenresolution />} />
				<Route path="lang" element={<Lang />} />
				<Route path="os" element={<Os />} />
			</Route>
			<Route path="board/*" element={<Outlet/>}>
				<Route path="portfolio" element={<Portfolio />} />
				<Route path="contact" element={<Contact />} />
			</Route>
		</Routes>
	);
}
