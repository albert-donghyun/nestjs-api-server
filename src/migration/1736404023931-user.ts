import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1736404023931 implements MigrationInterface {
  name = 'User1736404023931';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (
      \`id\` int NOT NULL AUTO_INCREMENT, 
      \`name\` varchar(20) NOT NULL, 
      \`email\` varchar(255) NOT NULL, 
      \`password\` varchar(255) NOT NULL, 
      \`birthYear\` int NULL, 
      \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
      \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
      \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) 
      ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
