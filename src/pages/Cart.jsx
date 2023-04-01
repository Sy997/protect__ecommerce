import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Col, Row } from 'reactstrap'
import tdImg from '../assets/images/arm-chair-01.jpg'
import "../style/cart.css"
import { motion } from 'framer-motion'
import { cartAction } from '../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {

  const cartItems = useSelector((state) => state.cart.cartItems)

  const totalAmount = useSelector((state) => state.cart.totalAmount)
  return <Helmet title="Cart">
    <CommonSection title="Shopping Cart" />
    <section>
      <Container>
        <Row>
          <Col lg='9'>
           {
              cartItems.length===0 ? (<h2 className='fs-4 text-center'>Không tìm thấy sản phẩm</h2>) : (<table className='table bordered'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  cartItems.map((item, index) => (
                //     <tr key={index}>
                //   <td><img src={item.imgUrl} alt='sanpham' /></td>
                //   <td>{item.productName}</td>
                //   <td>${item.price}</td>
                //   <td>{item.quality}</td>
                //   <td><motion.i whileTap={{scale: 1.3}} class="ri-delete-bin-line"></motion.i></td>
                // </tr>
                    <Tr item={item} key={index}/>
                  ))
                }
              </tbody>
              </table>)
            }

            {/* <table className='table bordered'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src={tdImg} /></td>
                <td>Modern Arm Chair</td>
                <td>$299</td>
                <td>2px</td>
                <td><i class="ri-delete-bin-line"></i></td>
              </tr>
            </tbody>
            </table> */}
          </Col>
          <Col lg='3'>
            <div>
              <h6 className='d-flex align-items-center justify-content-between'>Tổng cộng
              <span className='fs-4 fw-bold'>${totalAmount}</span>
              </h6>
              <p className='fs-6 mt-2'>phí vận chuyển sẽ được tính khi thanh toán</p>
              <div>
              
              <button className="buy__button w-100"><Link to='/checkout'>Checkout</Link></button>

              <button className="buy__button w-100 mt-3"><Link to='/shop'>Continute shopping</Link></button>

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

const Tr = ({ item }) => {

  const dispatch = useDispatch()

  const deleteProduct = () => {
    dispatch(cartAction.deleteItem(item.id))
  }

  return <tr>
    <td>
      <img src={item.imgUrl} alt="" />
    </td>
    <td>{item.productName}</td>
    <td>{item.price}</td>
    <td>{item.quantity}</td>
    <td>
      <motion.i whileTap={{scale: 1.3}}
      onClick={deleteProduct}
      class="ri-delete-bin-line"></motion.i>
    </td>
  </tr>
}

export default Cart
