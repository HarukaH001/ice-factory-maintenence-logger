// import firebase from "firebase"
import {firebaseConfig as config} from '../Config.js'
import superagent from 'superagent'

// const database = firebase.database()

export const Auth = (firebase) => {
    const database = firebase.database()
    const functions = firebase.functions()

    const getPublicUserList = () => {
        return superagent.get(config.databaseURL+"/user.json?auth="+config.databaseKey)
        .then(res=>{
            if(!res.error) {
                return Object.entries(res.body).map(ele => {
                    return ele[1]
                })
            }
            else return []
        }).catch(err=>{
            return []
        })
    }

    return { 
        getPublicUserList: getPublicUserList,
    
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
                }).catch(err=>resolve(''))
            })
        },

        getUsersRef(){
            return database.ref('user')
        },
    
        login(email,password){
            return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
                return getPublicUserList().then(users=>{
                    const user = users.find(ele=>ele.email === email)
                    let subPass = config.commonPassword
                    let subMail = email
                    if(!user){
                        //user not found
                        subMail = 'ff' + subMail
                    } else if(user && user.password !== password){
                        //wrong password
                        subPass += 'ff'
                    }
                    return firebase.auth().signInWithEmailAndPassword(subMail, subPass).then(res=>{
                        return res
                    }).catch(err=>{
                        return err
                    })
                })
            })
        },

        addUser(username, password, isAdmin) {
            return new Promise(resolve=>{
                let email = Date.now() + "@gmail.com"
                superagent.post(config.authRestDomain+"signupNewUser?key="+config.apiKey)
                .set('Content-Type','application/json')
                .send({
                    email: email,
                    password: config.commonPassword,
                    returnSecureToken: true
                }).end((err,res)=>{
                    // console.log(err?err:res)
                    if(!err){
                        //เพิ่มผู้ใช้ใน db
                        database.ref('user/'+res.body.localId).set({
                            email: email,
                            password: password,
                            role: isAdmin?'admin':'user',
                            username: username
                        }).then(()=>{
                            resolve()
                        })
                    }
                })
            })
        },

        removeUser(uid) {
            return new Promise(resolve=>{
                const rmuser = functions.httpsCallable('removeUser')
                rmuser({localId: uid}).then(res=>{
                    resolve()
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
