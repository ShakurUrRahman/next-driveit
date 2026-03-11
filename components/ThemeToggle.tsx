"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	// useEffect only runs on the client, so now we can safely show the UI
	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button
				variant="ghost"
				size="icon"
				className="sign-out-button"
				disabled
			>
				<Sun className="h-[1.2rem] w-[1.2rem]" />
			</Button>
		);
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="sign-out-button"
		>
			{theme === "dark" ? (
				<Sun className="h-5 w-5 text-light-300 transition-all" />
			) : (
				<Moon className="h-5 w-5 text-brand transition-all" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
