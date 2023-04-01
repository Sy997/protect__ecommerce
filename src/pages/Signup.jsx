import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import "../style/login.css"
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase.config'
import {toast} from 'react-toastify'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const signup = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, `images/${Date.now() + username}`)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on((error) => {
                toast.error(error.massage)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    await updateProfile(user, {
                        displayName: username,
                        photoURL: downloadURL
                    })

                    await setDoc(doc(db, "users", user.uid),{
                        uid: user.uid,
                        displayName: username,
                        email,
                        photoURL: downloadURL
                    })
                })
            })
            const user = userCredential.user
            setLoading(false)
            toast.success("Tạo tài khoản thành công")
            navigate('/login')
        } catch (error) {
            setLoading(false)
            toast.error("Đã có lỗi xảy ra!")
        }
    }

  return <Helmet title="Signup">
    <section>
        <Container>
            <Row>
                {
                    loading? <Col lg='12' className='text-center'>
                        <h5 className='m-auto text-center'>
                            Loading......
                        </h5>
                    </Col> : <Col lg='6' className='m-auto text-center'>
                    <h3 className='fw-bold fs-4'>Signup</h3>
                    <Form className='auth__form mt-4' onSubmit={signup}>
                        <FormGroup className='form__group'>
                            <input type='text' placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} />
                        </FormGroup>
                        <FormGroup className='form__group'>
                            <input type='text' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
                        </FormGroup>
                        
                        <FormGroup className='form__group'>
                            <input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup className='form__group'>
                            <input type='file' 
                             
                            onChange={e=>setFile(e.target.files[0])} />
                        </FormGroup>
                        <button type='submit' className="buy__button auth__btn">Login</button>
                        <p>Bạn đã có tài khoản?<Link to='/login'>Đăng nhập</Link></p>
                    </Form>
                </Col>
                }
                
            </Row>
        </Container>
    </section>
  </Helmet>
}

export default Signup

