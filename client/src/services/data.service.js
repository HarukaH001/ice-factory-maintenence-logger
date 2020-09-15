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

        deleteSite(name){
            return new Promise(resolve=>{
                database.ref('sites/'+name).set(null).then(res=>{
                    resolve()
                }).catch(err=>{
                    resolve()
                })
            })
        },

        getMachineRef(site){
            return database.ref('sites/'+site+"/machine")
        },

        addMachine(site, name){
            return new Promise(resolve => {
                database.ref('sites/'+site+"/machine/"+name).update({
                    createdTime: Date.now()
                }).then(res=>{
                    resolve()
                }).catch(err=>{
                    resolve()
                })
            })
        },

        deleteMachine(site, name){
            return new Promise(resolve=>{
                database.ref('sites/'+site+"/machine/"+name).set(null).then(res=>{
                    resolve()
                }).catch(err=>{
                    resolve()
                })
            })
        },

        getPositionRef(site, machine){
            return database.ref('sites/'+site+'/machine/'+machine+'/position')
        },

        getRepairListRef(site, machine){
            return database.ref('sites/'+site+'/machine/'+machine+'/repairlist')
        },

        addPosition(site, machine, name){
            return new Promise(resolve => {
                database.ref('sites/'+site+'/machine/'+machine+'/position/'+name).update({
                    createdTime: Date.now()
                }).then(res=>{
                    resolve()
                }).catch(err=>{
                    resolve()
                })
            })
        },

        addRepairList(site, machine, name){
            return new Promise(resolve => {
                database.ref('sites/'+site+'/machine/'+machine+'/repairlist/'+name).update({
                    createdTime: Date.now()
                }).then(res=>{
                    resolve()
                }).catch(err=>{
                    resolve()
                })
            })
        },

        deletePosition(site, machine, name){
            return new Promise(resolve=>{
                database.ref('sites/'+site+'/machine/'+machine+'/position/'+name).set(null).then(res=>{
                    resolve()
                }).catch(err=>{
                    resolve()
                })
            })
        },

        deleteRepairList(site, machine, name){
            return new Promise(resolve=>{
                database.ref('sites/'+site+'/machine/'+machine+'/repairlist/'+name).set(null).then(res=>{
                    resolve()
                }).catch(err=>{
                    resolve()
                })
            })
        },
    }
}
