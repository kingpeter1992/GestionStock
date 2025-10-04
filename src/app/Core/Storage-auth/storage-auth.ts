import { Injectable } from '@angular/core';
const USER_KEY = 'auth-user';



@Injectable({
  providedIn: 'root'
})
export class StorageAuth {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
    //  console.log(user)
      return JSON.parse(user);
    }

    return null;
  }

  public getToken(): string | null {
    const user = this.getUser();
    if (user && user.accessToken) {
   //  console.log("token",user.accessToken)
        return user.accessToken;
    }
    return null;
}

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
