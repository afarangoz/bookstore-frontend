import { RoleModel } from './Role';


export class UserModel {
    id: number;
    username: string;
    fullName: string;
    email: string;
    password: string;
    isEnable: boolean;
    roles: string[] = [];

}