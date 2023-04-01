import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import "../style/login.css"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const signIn = async(e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            const user = userCredential.user
            console.log(user)

            setLoading(false)
            toast.success('Đăng nhập thành công!!!')
            navigate('/checkout')
        }
        catch(error) {
            setLoading(false)
            toast.error(error.massage)
        }
    }

  return <Helmet title="Login">
    <section>
        <Container>
            <Row>
                {
                    loading ? <Col className='text-center' lg='12'><h5 className='fw-bold'>Loading.......</h5>
                    </Col> : <Col lg='6' className='m-auto text-center'>
                    <h3 className='fw-bold fs-4'>Login</h3>
                    <Form className='auth__form mt-4' onSubmit={signIn}>
                        <FormGroup className='form__group'>
                            <input type='text' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup className='form__group'>
                            <input type='password' placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} />
                        </FormGroup>
                        <button type='submit' className="buy__button auth__btn">Login</button>
                        <p>Bạn chưa có tài khoản?<Link to='/signup'>Tạo tài khoản</Link></p>
                    </Form>
                </Col>
                }
            </Row>
        </Container>
    </section>
  </Helmet>
}

export default Login
