export interface RequestSignup {
  id?: number;               // correspond à @Id
  username: string;          // nom d'utilisateur
  email: string;             // email
  password?: string;         // mot de passe (optionnel pour éviter de l’exposer partout)
phone?:string
}