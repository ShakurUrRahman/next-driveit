"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTheme } from "next-themes";

interface Props {
	fullName: string;
	avatar: string;
	email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
	const pathname = usePathname();
	const { theme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	// useEffect only runs on the client, so now we can safely show the UI
	React.useEffect(() => {
		setMounted(true);
	}, []);

	// Prevent hydration mismatch by not rendering theme-dependent content until mounted
	if (!mounted) {
		return (
			<aside className="sidebar">
				<Link href="/">
					<div className="hidden h-[60px] w-[200px] lg:block" />
					<div className="h-[52px] w-[52px] lg:hidden" />
				</Link>
				<nav className="sidebar-nav">
					<ul className="flex flex-1 flex-col gap-6">
						{navItems.map(({ url, name, icon }) => (
							<Link key={name} href={url} className="lg:w-full">
								<li
									className={cn(
										"sidebar-nav-item group",
										pathname === url && "shad-active",
									)}
								>
									<Image
										src={icon}
										alt={name}
										width={24}
										height={24}
										className={cn(
											"nav-icon transition-all",
											pathname === url &&
												"nav-icon-active",
										)}
									/>
									<p className="hidden lg:block group-hover:font-semibold transition-all">
										{name}
									</p>
								</li>
							</Link>
						))}
					</ul>
				</nav>
				<Image
					src="/assets/images/files-2.png"
					alt="logo"
					width={506}
					height={418}
					className="w-full"
				/>
				<div className="sidebar-user-info">
					<Image
						src={avatar}
						alt="Avatar"
						width={44}
						height={44}
						className="sidebar-user-avatar"
					/>
					<div className="hidden lg:block">
						<p className="subtitle-2 capitalize">{fullName}</p>
						<p className="caption">{email}</p>
					</div>
				</div>
			</aside>
		);
	}

	return (
		<aside className="sidebar">
			<Link href="/">
				<Image
					src={
						theme === "dark"
							? "/assets/icons/Group2.png"
							: "/assets/icons/Group1.png"
					}
					alt="logo"
					width={200}
					height={60}
					className="hidden h-auto lg:block"
				/>

				<Image
					src={
						theme === "dark"
							? "/assets/icons/logo-brand2.png"
							: "/assets/icons/logo-brand.svg"
					}
					alt="logo"
					width={52}
					height={52}
					className="lg:hidden"
				/>
			</Link>

			<nav className="sidebar-nav">
				<ul className="flex flex-1 flex-col gap-6">
					{navItems.map(({ url, name, icon }) => (
						<Link key={name} href={url} className="lg:w-full">
							<li
								className={cn(
									"sidebar-nav-item group",
									pathname === url && "shad-active",
								)}
							>
								<Image
									src={icon}
									alt={name}
									width={24}
									height={24}
									className={cn(
										"nav-icon transition-all",
										pathname === url && "nav-icon-active",
									)}
								/>
								<p className="hidden lg:block group-hover:font-semibold transition-all">
									{name}
								</p>
							</li>
						</Link>
					))}
				</ul>
			</nav>

			<Image
				src="/assets/images/files-2.png"
				alt="logo"
				width={506}
				height={418}
				className="w-full"
			/>

			<div className="sidebar-user-info">
				<Image
					src={avatar}
					alt="Avatar"
					width={44}
					height={44}
					className="sidebar-user-avatar"
				/>
				<div className="hidden lg:block">
					<p className="subtitle-2 capitalize">{fullName}</p>
					<p className="caption">{email}</p>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
