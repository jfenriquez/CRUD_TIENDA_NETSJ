export interface UserInterface {
  nombre: string;
  apellido: string;
  email: string;
  phone: string;
  password: string;
  rol: string;
}

export interface LoginUserInterface {
  email: string;
  password: string;
}
