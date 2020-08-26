/* eslint-disable promise/no-nesting */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.removeUser = functions.https.onCall((data,context)=>{
    admin.auth().deleteUser(data.localId).then(()=>{
        return admin.database().ref('user/'+data.localId).set(null).then(res=>{
            return {
                error: false,
                message: res
            }
        }).catch(err=>{
            functions.logger.log(err)
            return {
                error: true,
                message: err
            }
        })
    }).catch(err=>{
        functions.logger.log(err)
        return {
            error: true,
            message: err
        }
    })
})
