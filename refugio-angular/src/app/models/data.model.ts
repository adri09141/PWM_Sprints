export interface ContadorItem {
  digito1: number;
  digito2: number;
  digito3: number;
  digito4: number;
  digito5: number;
}

export interface Animal {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  meses: number;
  sexo: string;
  peso: number;
  descripcion: string;
  foto1: string;
  foto2: string;
  foto3: string;
  foto4: string;
}

export interface Resena {
  id: number;
  idUsuario: number | string;
  nombreAnimal: string;
  titulo: string;
  resena: string;
  fecha: string;
  foto: string;
  valoracion?: number;
}

export interface Usuario {
  uid: string;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string;
  dni: string;
  direccion: string;
  telefono: string;
  correo: string;
  numeroAdopciones: number;
  fechaRegistro?: string;
  animalesAdoptados?: number[];
  adoptados?: number[];
}

export interface RegistroUsuario extends Omit<Usuario, 'uid' | 'fechaRegistro'> {
  contrasena: string;
}

export interface AppData {
  contador: ContadorItem[];
  animales: Animal[];
  resenas: Resena[];
}
