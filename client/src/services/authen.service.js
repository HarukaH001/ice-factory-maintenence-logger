// import firebase from "firebase"
// import {firebaseConfig} from '../Config.js'

class Authen {

    constructor(firebase){
        this.firebase = firebase;
        this.database = this.firebase.database();

    }

    getUserList(){
        return this.database.ref('user/').once('value').then((snapshot)=>{
            const Data = snapshot.val()
            return Data
        })
    }

    
    

}

export default Authen;
