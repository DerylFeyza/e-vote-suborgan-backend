-- DropForeignKey
ALTER TABLE `pengalaman` DROP FOREIGN KEY `Pengalaman_candidate_id_fkey`;

-- DropForeignKey
ALTER TABLE `vote_session_candidate` DROP FOREIGN KEY `Vote_Session_Candidate_candidate_id_fkey`;

-- AddForeignKey
ALTER TABLE `Pengalaman` ADD CONSTRAINT `Pengalaman_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote_Session_Candidate` ADD CONSTRAINT `Vote_Session_Candidate_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
