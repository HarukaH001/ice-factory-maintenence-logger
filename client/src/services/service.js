import firebase from "firebase"
import {firebaseConfig as config} from '../Config.js'
import { Auth } from './authen.service.js'
import { _Data } from './data.service.js'

firebase.initializeApp(config)
firebase.analytics()

export const Authen = Auth(firebase)
export const Data = _Data(firebase)
export default firebase
