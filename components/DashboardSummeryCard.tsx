"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SummeryCard from "./SummeryCard";
import { getUsageSummary } from "@/lib/utils";

const DashboardSummary = ({ totalSpace }) => {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const usageSummary = getUsageSummary(totalSpace, theme === "dark");

	if (!mounted) {
		// Return placeholder to prevent hydration mismatch
		return (
			<ul className="dashboard-summary-list">
				{[1, 2, 3, 4].map((i) => (
					<li
						key={i}
						className="dashboard-summary-card animate-pulse"
					>
						<div className="h-[200px]" />
					</li>
				))}
			</ul>
		);
	}

	return (
		<ul className="dashboard-summary-list">
			{usageSummary.map((summary, i) => (
				<SummeryCard key={i} summary={summary} />
			))}
		</ul>
	);
};

export default DashboardSummary;
