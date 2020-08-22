import firebase from "firebase"
import {firebaseConfig} from '../Config.js'

class Data {

    constructor(){
        firebase.initializeApp(firebaseConfig)
        this.database = firebase.database();
    }

    getUserList(){
        return this.database.ref('user/').once('value').then((snapshot)=>{
            const Data = snapshot.val()
            return Data
        })
    }



}

export default new Data();
