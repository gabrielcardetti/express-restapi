import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../modules/user/model/User";
import { getRepository } from "typeorm";
import { UserRole } from "../modules/user/model/User"

export class CreateUsers1583447390506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const userRepository = getRepository(User);
        
        let superAdmin = new User();
        superAdmin.username = "superadmin";
        superAdmin.password = "123";
        superAdmin.hashPassword();
        superAdmin.role = UserRole.SUPER_ADMIN;
        await userRepository.save(superAdmin);

        let admin = new User();
        admin.username = "admin";
        admin.password = "123";
        admin.hashPassword();
        admin.role = UserRole.ADMIN;
        await userRepository.save(admin);

        let user = new User();
        user.username = "user";
        user.password = "123";
        user.hashPassword();
        user.role = UserRole.USER;
        await userRepository.save(user);

    }

    public async down(queryRunner: QueryRunner): Promise<any> { }

}
