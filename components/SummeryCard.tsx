"use client";

import { convertFileSize } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import FormattedDateTime from "./FormattedDateTime";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const SummeryCard = ({ summary }) => {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<>
			<Link href={summary?.url} className="dashboard-summary-card">
				<div className="space-y-4">
					<div className="flex justify-between gap-3">
						{mounted ? (
							<Image
								src={summary?.icon}
								width={100}
								height={100}
								alt="uploaded image"
								className={cn(
									"summary-type-icon",
									theme === "dark" && "mt-4",
								)}
							/>
						) : (
							<div className="w-[100px] h-[100px]" />
						)}
						<h4 className="summary-type-size">
							{convertFileSize(summary?.size) || 0}
						</h4>
					</div>

					<h5 className="summary-type-title">{summary?.title}</h5>
					<Separator className="bg-light-400 dark:bg-dark-100" />
					<FormattedDateTime
						date={summary?.latestDate}
						className="text-center text-light-100 dark:text-light-300"
					/>
				</div>
			</Link>
		</>
	);
};

export default SummeryCard;
