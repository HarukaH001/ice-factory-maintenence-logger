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
        getSites(){
            return database.ref('sites').once('value').then(snapshot=>{
                if(snapshot){
                    if(snapshot.val()){
                        const Data = Object.entries(snapshot.val()).map(v=>{
                                v[1].sid=v[0];
                                if(v[1].machine){
                                    v[1].machine = Object.entries(v[1].machine).map(m=>{
                                        m[1].mid = m[0] 
                                        if(m[1].position){
                                            m[1].position = Object.entries(m[1].position).map(p=>{
                                                p[1].pid = p[0]
                                                return p[1]
                                            })
                                        }
                                        if(m[1].repairlist){
                                            m[1].repairlist = Object.entries(m[1].repairlist).map(rp=>{
                                                rp[1].rid = rp[0]
                                                return rp[1]
                                            })
                                        }
                                        return m[1]
                                    })
                                }
                                return v[1]
                            }
                        )
                        return Data
                    }else{
                        return []
                    }
                }
            })
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

        getRecordRef(){
            return database.ref('records')
        },

        addRecord(obj){
            return new Promise(resolve=>{
                database.ref('records').once('value').then(snapshot=>{
                    if(snapshot){
                        let template = {}
                        if(snapshot.val()){
                            const Data = Object.entries(snapshot.val()).map(ele=>{
                                ele[1].lid = ele[0]
                                return ele[1]
                            })
                            Data.sort((a,b)=>b.lid - a.lid)
                            template[parseInt(Data[0].lid) + 1] = obj
                        } else {
                            template = {
                                0:obj
                            }
                        }
                        database.ref('records').update(template).then(res=>{
                            resolve()
                        }).catch(err=>{
                            resolve()
                        })
                    }
                })
            })
        },

        deleteRecord(lid){
            return new Promise(resolve=>{
                database.ref('records/'+lid).set(null).then(res=>{
                    resolve()
                }).catch(err=>{
                    resolve()
                })
            })
        }
    }
}
