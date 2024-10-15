import SubOrganizationPage from "./_component/SuborganPage";
import { findAllSuborganVote } from "@/utils/database/suborgan.query";
export default async function SuborganPage() {
	const suborgans = await findAllSuborganVote();
	return <SubOrganizationPage subOrganizations={suborgans} />;
}
