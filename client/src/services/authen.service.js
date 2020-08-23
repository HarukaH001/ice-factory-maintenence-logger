// import firebase from "firebase"
// import {firebaseConfig} from '../Config.js'
import superagent from 'superagent'

class Authen {

    constructor(firebase,config){
        this.firebase = firebase
        this.config = config
        this.database = this.firebase.database()

    }

    getFullUserList(){
        return superagent.get(this.config.databaseURL+"/user.json?auth="+this.config.databaseKey)
        .then(res=>{
            if(!res.error) return res.body
            else return []
        }).catch(err=>{
            return []
        })
    }

    getUserList(){
        return this.database.ref('user/').once('value').then((snapshot)=>{
            const Data = snapshot.val()
            return Data
        }).catch(err=>{
            return []
        })
    }

    login(email,password){
        return this.firebase.auth().signInWithEmailAndPassword(email,password).then(res=>{
            // window.localStorage.setItem('user',JSON.stringify(res))
            return res
        }).catch(err=>{
            return err
        })
    }

    logout(){
        this.firebase.auth().signOut()
    }

    auth(){
        return this.firebase.auth()
    }
}

export default Authen;
