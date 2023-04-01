import {useState, useEffect} from 'react'
import {db} from '../firebase.config'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'


const useGetData = (collectionName) => {

    const [data, setData] = useState([])
    const collectionRef = collection(db, collectionName)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getData = async() => {

            //firebase data get realtime
            await onSnapshot(collectionRef, (snapshot)=> {
                setData(snapshot.docs.map(doc=>({...doc.data(), id: doc.id})));
                setLoading(false)
            })
        }
        getData()
    }, [])

  return {data, loading}
}

export default useGetData
