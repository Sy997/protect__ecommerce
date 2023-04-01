import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import useGetData from '../custom-hooks/useGetData'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const User = () => {

    const {data: usersData, loading} = useGetData("users")

    const deleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id))
        toast.success("Đã xóa tài khoản")
    }

  return <Helmet title="Dashboard Users">
  <section>
    <Container>
        <Row>
            <Col lg='12' className='fw-bold'>
                Users
            </Col>
            <Col lg='12' className='py-5'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Usename</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                <tbody>
                    {
                        loading ? <h4 className='pt-5 fw-bold'>
                            Loading....
                        </h4> : 
                            usersData?.map((user)=> (
                                <tr key={user.uid}>
                                    <td><img src={user.photoURL} alt="" /></td>
                                    <td>{user.displayName}</td>
                                    <td>{user.email}</td>
                                    <td><button className='btn btn-danger' onClick={()=>deleteUser(user.uid)}>Delete</button></td>
                                    <td></td>
                                </tr>
                            ))
                        
                    }
                </tbody>
                </table>
            </Col>
        </Row>
    </Container>
  </section>
  </Helmet>
}

export default User
