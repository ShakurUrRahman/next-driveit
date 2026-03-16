import { convertFileSize } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import FormattedDateTime from "./FormattedDateTime";

const SummeryCard = ({ summary }) => {
	return (
		<>
			<Link href={summary?.url} className="dashboard-summary-card">
				<div className="space-y-4">
					<div className="flex justify-between gap-3">
						<Image
							src={summary?.icon}
							width={100}
							height={100}
							alt="uploaded image"
							className="summary-type-icon"
						/>

						<h4 className="summary-type-size">
							{convertFileSize(summary?.size) || 0}
						</h4>
					</div>

					<h5 className="summary-type-title">{summary?.title}</h5>
					<Separator className="bg-light-400 dark:bg-dark-200" />
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
