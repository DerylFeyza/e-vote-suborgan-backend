-- DropForeignKey
ALTER TABLE `vote_session_candidate` DROP FOREIGN KEY `Vote_Session_Candidate_vote_session_id_fkey`;

-- AlterTable
ALTER TABLE `vote_session_candidate` MODIFY `vote_session_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Vote_Session_Candidate` ADD CONSTRAINT `Vote_Session_Candidate_vote_session_id_fkey` FOREIGN KEY (`vote_session_id`) REFERENCES `Vote_Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
