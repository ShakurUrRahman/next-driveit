"use client";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actionsDropdownItems } from "@/constants";
import { constructDownloadUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";
import {
	deleteFile,
	renameFile,
	updateFileUsers,
} from "@/lib/actions/file.actions";
import { FileDetails, ShareInput } from "./ActionModalContent";

const ActionDropdown = ({ file }: { file: Models.Document }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [action, setAction] = useState<ActionType | null>(null);
	const [name, setName] = useState(file.name);
	const [isLoading, setIsLoading] = useState(false);
	const [emails, setEmails] = useState<string[]>([]);
	const [error, setError] = useState("");

	const path = usePathname();

	const closeAllModals = () => {
		setIsModalOpen(false);
		setIsDropdownOpen(false);
		setAction(null);
		setName(file.name);
		setError("");
		//   setEmails([]);
	};

	// Email validation function
	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Validation function
	const validateAction = () => {
		if (!action) return false;

		// Validate rename: name must not be empty and must be different from original
		if (action.value === "rename") {
			const trimmedName = name.trim();
			if (!trimmedName) {
				setError("File name cannot be empty");
				return false;
			}
			if (trimmedName === file.name) {
				setError("Please enter a different name");
				return false;
			}
		}

		// Validate share: must have at least one valid email
		if (action.value === "share") {
			if (emails.length === 0) {
				setError("Please add at least one email address");
				return false;
			}
			const invalidEmails = emails.filter(
				(email) => !isValidEmail(email),
			);
			if (invalidEmails.length > 0) {
				setError(`Invalid email address: ${invalidEmails[0]}`);
				return false;
			}
		}

		setError("");
		return true;
	};

	const handleAction = async () => {
		if (!action) return;

		// Validate before proceeding
		if (!validateAction()) {
			return;
		}

		setIsLoading(true);
		let success = false;

		const actions = {
			rename: () =>
				renameFile({
					fileId: file.$id,
					name: name.trim(),
					extension: file.extension,
					path,
				}),
			share: () => updateFileUsers({ fileId: file.$id, emails, path }),
			delete: () =>
				deleteFile({
					fileId: file.$id,
					bucketFileId: file.bucketFileId,
					path,
				}),
		};

		success = await actions[action.value as keyof typeof actions]();

		if (success) closeAllModals();

		setIsLoading(false);
	};

	const handleRemoveUser = async (email: string) => {
		const updatedEmails = emails.filter((e) => e !== email);

		const success = await updateFileUsers({
			fileId: file.$id,
			emails: updatedEmails,
			path,
		});

		if (success) setEmails(updatedEmails);
		closeAllModals();
	};

	const renderDialogContent = () => {
		if (!action) return null;

		const { value, label } = action;

		return (
			<DialogContent className="shad-dialog button">
				<DialogHeader className="flex flex-col gap-3">
					<DialogTitle className="text-center text-light-100 dark:text-light-300">
						{label}
					</DialogTitle>
					{value === "rename" && (
						<div className="flex flex-col gap-2">
							<Input
								type="text"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									setError("");
								}}
								className="rename-input-field"
								placeholder="Enter new file name"
							/>
							{error && (
								<p className="text-red text-sm">{error}</p>
							)}
						</div>
					)}
					{value === "details" && <FileDetails file={file} />}
					{value === "share" && (
						<div className="flex flex-col gap-2">
							<ShareInput
								file={file}
								onInputChange={setEmails}
								onRemove={handleRemoveUser}
							/>
							{error && (
								<p className="text-red text-sm">{error}</p>
							)}
						</div>
					)}
					{value === "delete" && (
						<p className="delete-confirmation">
							Are you sure you want to delete{` `}
							<span className="delete-file-name">
								{file.name}
							</span>
							?
						</p>
					)}
				</DialogHeader>
				{["rename", "delete", "share"].includes(value) && (
					<DialogFooter className="flex flex-col gap-3 md:flex-row">
						<Button
							onClick={closeAllModals}
							className="modal-cancel-button"
						>
							Cancel
						</Button>
						<Button
							onClick={handleAction}
							className="modal-submit-button"
							disabled={isLoading}
						>
							<p className="capitalize">{value}</p>
							{isLoading && (
								<Image
									src="/assets/icons/loader.svg"
									alt="loader"
									width={24}
									height={24}
									className="animate-spin"
								/>
							)}
						</Button>
					</DialogFooter>
				)}
			</DialogContent>
		);
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DropdownMenu
				open={isDropdownOpen}
				onOpenChange={setIsDropdownOpen}
			>
				<DropdownMenuTrigger className="shad-no-focus">
					<Image
						src="/assets/icons/dots.svg"
						alt="dots"
						width={34}
						height={34}
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel className="max-w-[200px] truncate">
						{file.name}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{actionsDropdownItems.map((actionItem) => (
						<DropdownMenuItem
							key={actionItem.value}
							className="shad-dropdown-item"
							onClick={() => {
								setAction(actionItem);

								if (
									[
										"rename",
										"share",
										"delete",
										"details",
									].includes(actionItem.value)
								) {
									setIsModalOpen(true);
								}
							}}
						>
							{actionItem.value === "download" ? (
								<Link
									href={constructDownloadUrl(
										file.bucketFileId,
									)}
									download={file.name}
									className="flex items-center gap-2"
								>
									<Image
										src={actionItem.icon}
										alt={actionItem.label}
										width={30}
										height={30}
									/>
									{actionItem.label}
								</Link>
							) : (
								<div className="flex items-center gap-2">
									<Image
										src={actionItem.icon}
										alt={actionItem.label}
										width={30}
										height={30}
									/>
									{actionItem.label}
								</div>
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			{renderDialogContent()}
		</Dialog>
	);
};

export default ActionDropdown;
