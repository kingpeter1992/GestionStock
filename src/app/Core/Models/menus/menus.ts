export interface Menu {
    id?:string,
    titre?:string,
    url?:string,
    icon?:string,
    sousMenus?: Array<Menu>;
}