// import firebase from "firebase"
import {firebaseConfig as config} from '../Config.js'
import superagent from 'superagent'

// const database = firebase.database()

export const Auth = (firebase) => {
    const database = firebase.database()
    return { 
        getPublicUserList(){
            return superagent.get(config.databaseURL+"/user.json?auth="+config.databaseKey)
            .then(res=>{
                if(!res.error) {
                    return Object.entries(res.body).map(ele => {
                        delete (ele[1])["password"]
                        delete (ele[1])["role"]
                        return ele[1]
                    })
                }
                else return []
            }).catch(err=>{
                return []
            })
        },
    
        getUserList(){
            return database.ref('user/').once('value').then((snapshot)=>{
                let Data = snapshot.val()
                return Object.entries(Data).map(ele => {
                    ele[1].uid = ele[0]
                    return ele[1]
                })
            }).catch(err=>{
                // console.log(err)
                return []
            })
        },

        getUser(){
            return new Promise(resolve => {
                let auth_user = firebase.auth().currentUser
                
                database.ref('user/').child(auth_user.uid).once('value').then((snapshot)=>{
                    let Data = snapshot.val()
                    Data.uid = auth_user.uid
                    resolve(Data)
                })
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
