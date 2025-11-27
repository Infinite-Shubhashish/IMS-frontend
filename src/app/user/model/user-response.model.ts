export interface RoleResponse {
    id: number;
    roleName: string;
}

export interface UserResponse {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    roles: RoleResponse[];
}
