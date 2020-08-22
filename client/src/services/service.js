import firebase from "firebase"
import {firebaseConfig} from '../Config.js'

import Authen from './authen.service'

class Service {

    constructor(){
        firebase.initializeApp(firebaseConfig)
        this.Authen = new Authen(firebase)
    }


    getAuthen(){
        return this.Authen
    }




}

export default new Service();
