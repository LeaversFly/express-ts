export interface IUser {
    id: number;
    username: string;
    password: string;
}

export interface IStudent {
    stuId?: string;  // 10  ? 表示可选参数
    stuName: string; // 20
    stuAge: number; // 3
    classz: string; // 30
}
