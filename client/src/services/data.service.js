// import firebase from "firebase"
import {firebaseConfig as config} from '../Config.js'
import superagent from 'superagent'

// const database = firebase.database()

export const _Data = (firebase) => {
    const database = firebase.database()
    const functions = firebase.functions()

    return {
        getSitesRef(){
            return database.ref('sites')
        },

        addSite(name){
            return new Promise(resolve=>{
                database.ref('sites/'+name).update({
                    createdTime: Date.now()
                }).then(res=>{
                    resolve()
                }).catch(err=>{
                    resolve()
                })
            })
        },

        getMachineRef(site){
            return database.ref('sites/'+site+"/"+"machine")
        },

        addMachine(site, name){
            return new Promise(resolve => {
                database.ref('sites/'+site+"/"+"machine/"+name).update({
                    createdTime: Date.now()
                }).then(res=>{
                    resolve()
                }).catch(err=>{
                    resolve()
                })
            })
        }
    }
}
