export class User {
    id: number;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    access_token?: string;
    refresh_token?: string;
}
