import SubOrganizationPage from "./_component/SuborganPage";
import { findAllSuborgan } from "@/utils/database/suborgan.query";
export default async function SuborganPage() {
	const suborgans = await findAllSuborgan();
	return <SubOrganizationPage subOrganizations={suborgans} />;
}
