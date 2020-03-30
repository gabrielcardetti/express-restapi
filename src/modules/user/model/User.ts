import {
  Entity,
  Column,
  Unique
} from "typeorm";
import { Length } from "class-validator";
import * as bcrypt from "bcryptjs";
import { BaseEntity } from "../../common/model/BaseEntity";
import { Exclude } from "class-transformer";

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user"
}

@Entity()
@Unique(["username"])
export class User extends BaseEntity {

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(4, 100)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}