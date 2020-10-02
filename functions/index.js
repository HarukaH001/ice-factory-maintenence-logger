/* eslint-disable promise/no-nesting */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
admin.initializeApp(functions.config().firebase)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

// exports.removeUser = functions.https.onCall((data,context)=>{
//     admin.auth().deleteUser(data.localId).then(()=>{
//         return {
//             error: false,
//             message: res
//         }
//     }).catch(err=>{
//         // functions.logger.log(err)
//         return {
//             error: true,
//             message: err
//         }
//     })
// })

app.get('/removeuser', (req, res) => {
    admin.auth().deleteUser(req.headers.localid).then(result=>{
        return res.json({
            error: false,
            message: result
        })
    }).catch(err=>{
        return res.json({
            error: true,
            message: err
        })
    })
})

exports.api = functions.https.onRequest(app)
