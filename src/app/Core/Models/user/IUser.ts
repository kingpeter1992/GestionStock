
export interface IUser {
  id?: number;               // correspond à @Id
  username: string;          // nom d'utilisateur
  email: string;             // email
  password?: string;         // mot de passe (optionnel pour éviter de l’exposer partout)
  active?: boolean;          // utilisateur actif ou non
  token?: string;            // jeton d'authentification
  tokeexpire?: Date;         // date d’expiration du token
  roles?: IRole[];           // liste des rôles (relation ManyToMany)
}

export enum ERole {
  ROLE_USER = 'ROLE_USER',
  ROLE_FINANCE = 'ROLE_FINANCE',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

export interface IRole {
  id?: number;
  name: ERole;
}