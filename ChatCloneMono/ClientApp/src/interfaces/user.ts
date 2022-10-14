export interface ICreateUser {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
}

export interface IViewableUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IUpdateUser {
  FirstName: string;
  LastName: string;
  Email: string;
}
