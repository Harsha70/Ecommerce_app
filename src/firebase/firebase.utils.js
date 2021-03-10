import firebase from 'firebase/app';
import 'firebase/firestore'; //for DB
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCVM8SHBiGc6cD4xdvqy6_9b-6-5WvS1wI",
    authDomain: "ecommerce-49486.firebaseapp.com",
    projectId: "ecommerce-49486",
    storageBucket: "ecommerce-49486.appspot.com",
    messagingSenderId: "663533940438",
    appId: "1:663533940438:web:5a0ec061dc75d21260a377",
    measurementId: "G-FZ3VDX9T1V"
}

firebase.initializeApp(config);

// storing userdetails in DB
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    console.log("userRef document Reference object", userRef) //Reference object
    console.log("fake document Reference object", firestore.doc(`users/ljvhghvhgvjbh`))

    const snapShot = await userRef.get();//gives doc snapshot
    console.log("snapShot", snapShot)

    console.log('snapShot.data',snapShot.data())

    if (!snapShot.exists){ // snapShot tells us whether data isthere or not
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({ //userRef is a document Reference object
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }catch(error){
            console.log('error creating user', error.message)
        }
    }
    return userRef
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt:'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;
