import { FormDate } from "@modules/forms";

export interface UserDto {
    [key: string]: string | FormDate;
    username: string;
    password: string;
    date: FormDate;
    email: string;
}
