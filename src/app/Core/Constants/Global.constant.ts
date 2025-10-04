export const GlobalConstants = {
REST_CONTROLLER : {
    USER :'admin',
    AUTH_ADM :'auth'
    
  },  

  METHOD :{
    USER : {
        GET_ALLUSER : '',
        GET_ALLROLES : '/getallroles',
        GET_USER_BY_ID : '/findusername',
        DELETE_USER : '',
        UPDATE_USER : '',
        BLOCK_USER: (id: number) => `admin/${id}/block`,
        UNBLOCK_USER: (id: number) => `admin/${id}/unblock`,
        ROLE_USER:'/roles',
    },
    AUTH : {
        LOGIN : '/login',
        REGISTER : '/register',
        LOGOUT : '/signout',
        FORGOT: '/forgot-password',
        RENITIALISATION:'/reset-password'

    }
  }

}