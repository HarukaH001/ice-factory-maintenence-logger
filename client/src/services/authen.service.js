// import firebase from "firebase"
import {firebaseConfig as config} from '../Config.js'
import superagent from 'superagent'

// const database = firebase.database()

export const Auth = (firebase) => {
    const database = firebase.database()
    return { 
        getFullUserList(){
            return superagent.get(config.databaseURL+"/user.json?auth="+config.databaseKey)
            .then(res=>{
                if(!res.error) return res.body
                else return []
            }).catch(err=>{
                return []
            })
        },
    
        getUserList(){
            return database.ref('user/').once('value').then((snapshot)=>{
                const Data = snapshot.val()
                return Data
            }).catch(err=>{
                return []
            })
        },
    
        login(email,password){
            return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
                return firebase.auth().signInWithEmailAndPassword(email,password).then(res=>{
                    // window.localStorage.setItem('user',JSON.stringify(res))
                    return res
                }).catch(err=>{
                    return err
                })
            })
        },
    
        logout(){
            firebase.auth().signOut()
        },
    
        auth(){
            return firebase.auth()
        }
    }
}
