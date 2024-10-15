"use client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { H5, Medium_Text } from "@/app/components/general/Text";
import { User } from "@prisma/client";
export default function UserTable({
	data,
	roles,
	desc,
}: {
	data: User[];
	roles: string;
	desc: string;
}) {
	const [loader, setLoader] = useState(true);
	const columns: TableColumn<User>[] = [
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row) => row.email,
			sortable: true,
		},
		{
			name: "Role",
			selector: (row) => row.role,
			sortable: true,
		},
	];
	useEffect(() => {
		setLoader(false);
	}, []);
	if (loader) return <div>Loading</div>;
	return (
		<>
			<div className="flex justify-between items-center mb-[36px] flex-col gap-4 text-center xl:text-start xl:flex-row ">
				<div>
					<H5>User Management | Data {roles}</H5>
					<Medium_Text variant="REGULAR" className="text-secondary-text-color">
						{desc}
					</Medium_Text>
				</div>
			</div>
			<DataTable columns={columns} data={data} pagination highlightOnHover />
		</>
	);
}
