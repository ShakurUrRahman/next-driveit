"use client";

import React from "react";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import Image from "next/image";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.actions";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";

const Header = ({
	userId,
	accountId,
}: {
	userId: string;
	accountId: string;
}) => {
	const { theme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	const handleSignOut = async () => {
		await signOutUser();
	};

	return (
		<header className="header">
			<Search />
			<div className="header-wrapper">
				<FileUploader ownerId={userId} accountId={accountId} />
				<ThemeToggle />
				<Button
					type="button"
					onClick={handleSignOut}
					className="sign-out-button"
				>
					{mounted ? (
						<Image
							src={
								theme === "dark"
									? "/assets/icons/logout-white.svg"
									: "/assets/icons/logout.svg"
							}
							alt="logo"
							width={24}
							height={24}
							className="w-6 "
						/>
					) : (
						<div className="w-6 h-6" />
					)}
				</Button>
			</div>
		</header>
	);
};
export default Header;
