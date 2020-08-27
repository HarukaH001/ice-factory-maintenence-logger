/* eslint-disable promise/no-nesting */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.removeUser = functions.https.onCall((data,context)=>{
    admin.auth().deleteUser(data.localId).then(()=>{
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
})
