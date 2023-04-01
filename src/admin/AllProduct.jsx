import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import useGetData from '../custom-hooks/useGetData'

const AllProduct = () => {

  const {data:productsData, loading} = useGetData('product')

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'product', id))
    toast.success('Xóa sản phẩm thành công!')
  }

  return ( 
  <Helmet title='All-Prducts'>
    <section>
      <Container>
        <Row>
          <Col>
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading? <h3 className='py-5 text-center fw-bold'>Loading....</h3> : 
                    productsData.map(item=> (
                  <tr key={item.id}>
                    <td><img src={item.imgURL} alt='' /></td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td><button className='btn btn-danger' onClick={()=>deleteProduct(item.id)
                    }>Delete</button></td>
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
  )
}

export default AllProduct
