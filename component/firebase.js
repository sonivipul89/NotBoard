import * as firebase from 'firebase'



export default class Firebase {
    static database;
    static init() {
        const firebaseConfig = {
            apiKey: "AIzaSyCdDvH_Rzh0f059d4hc38qn0B8vbMvgNT0",
            authDomain: "notboard-56f1d.firebaseapp.com",
            databaseURL: "https://notboard-56f1d.firebaseio.com",
            projectId: "notboard-56f1d",
            storageBucket: "notboard-56f1d.appspot.com",
            messagingSenderId: "10698272704",
            appId: "1:10698272704:web:91f43918f0841b07ca2225",
            measurementId: "G-H8VJP27W5E"
        };

        firebase.initializeApp(firebaseConfig)
        Firebase.database =  firebase.database();
       
    }
    
   

}