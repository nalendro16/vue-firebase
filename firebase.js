var firebaseConfig = {
  apiKey: 'AIzaSyAeuXyqb2a__wOtVDEu-A9aG8YeWeEoMXM',
  authDomain: 'vue-firebase-ac88f.firebaseapp.com',
  projectId: 'vue-firebase-ac88f',
  storageBucket: 'vue-firebase-ac88f.appspot.com',
  messagingSenderId: '864313169606',
  appId: '1:864313169606:web:7aee470d3e09e5ed8ba9c7',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const database = firebase.database()

const kelasRef = database.ref('kelas')
