import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import AppMenu from './Menu';

// assets
import profileImg from '@/assets/images/users/avatar-1.jpg';
import logo from '@/assets/images/logo.png';
import logoDark from '@/assets/images/logo-dark.png';
import logoSm from '@/assets/images/logo-sm.png';
import logoDarkSm from '@/assets/images/logo-dark-sm.png';
import { getMenuItems } from './utils/menu';

const UserBox = () => {
	return (
		<div className="leftbar-user">
			<Link to="/pages/profile">
				<img
					src={profileImg}
					alt="user-image"
					height="42"
					className="rounded-circle shadow-sm"
				/>
				<span className="leftbar-user-name mt-2">Dominic Keller</span>
			</Link>
		</div>
	);
};

const SideBarContent = () => {
	return (
		<>
			<UserBox />
			<AppMenu menuItems={getMenuItems()} />
			<div className="clearfix" />
		</>
	);
};

const LeftSidebar = ({ isCondensed, leftbarDark }) => {
	const menuNodeRef = useRef(null);
	const location = useLocation();

	/**
	 * Handle the click anywhere in doc
	 */
	const handleOtherClick = (e) => {
		if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target))
			return;
		// else hide the menubar
		if (document.body) {
			document.body.classList.remove('sidebar-enable');
		}
	};

	useEffect(() => {
		
		document.addEventListener('mousedown', handleOtherClick, false);

		return () => {
			document.removeEventListener('mousedown', handleOtherClick, false);
		};
	}, []);

	//페이지 이동시 사이드바 닫기 & 백드롭 삭제
	useEffect(() => {
		if (document.body) {
			document.documentElement.classList.remove('sidebar-enable');
		}
		const backdrop = document.getElementById('custom-backdrop');
		if (backdrop) {
			document.body.removeChild(backdrop);
			document.body.style.removeProperty('overflow');
		}
	}, [location]);

	return (
		<div className="leftside-menu" ref={menuNodeRef}>
			<Link to="/" className={`logo ${leftbarDark ? 'logo-light' : 'logo-dark'}`}>
				<span className="logo-lg font-24 fw-bold text-white">
					{/* <img src={leftbarDark ? logo : logoDark} alt="logo" height="16" /> */}
					햇님달님
				</span>
				<span className="logo-sm font-18 fw-bold text-white">
					{/* <img src={leftbarDark ? logoSm : logoDarkSm} alt="logo" height="16" /> */}
					HD
				</span>
			</Link>

			{!isCondensed && (
				<SimpleBar style={{ maxHeight: '100%' }} scrollbarMaxSize={320}>
					<SideBarContent />
				</SimpleBar>
			)}
			{isCondensed && <SideBarContent />}
		</div>
	);
};

export default LeftSidebar;
