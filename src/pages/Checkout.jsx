import React from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import "../style/checkout.css"
import { useSelector } from 'react-redux'

const Checkout = () => {

  const totalQty = useSelector(state=>state.cart.totalQuantity)
  const totalAmount = useSelector(state=>state.cart.totalAmount)

  return <Helmet title="Checkout">
    <CommonSection title="Checkout" />
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <h6 className='mb-4 fw-bold'>Thông tin hóa đơn</h6>
            <Form className='billing__form'>
            
              <FormGroup className='form_group'>
              <input type="text" placeholder='Họ và Tên' />
              </FormGroup>
            
              <FormGroup className='form_group'>
              <input type="email" placeholder='Email' />
              </FormGroup>
            
              <FormGroup className='form_group'>
              <input type="number" placeholder='Số điện thoại' />
              </FormGroup>

              <FormGroup className='form_group'>
                <input type="text" placeholder='Địa chỉ' />
              </FormGroup>

              <FormGroup className='form_group'>
                <input type="text" placeholder='Số nhà' />
              </FormGroup>

              <FormGroup className='form_group'>
                <input type="text" placeholder='Thành phố' />
              </FormGroup>

              <FormGroup className='form_group'>
                <input type="number" placeholder='Mã bưu chính' />
              </FormGroup>

              <FormGroup className='form_group'>
                <input type="text" placeholder='Đất nước' />
              </FormGroup>

            </Form>
          </Col>
          <Col lg='4'>
            <div className="checkout__cart">
              <h6>Số lượng: <span>{totalQty}</span></h6>
              <h6>Tổng tiền: <span>${totalAmount}</span></h6>
              <h6>
                <span>
                Shipping: <br />
                shipping
                </span>
                <span>$0</span>
                </h6>
              <h4>Tổng số tiền: <span>{totalAmount}</span></h4>
              <button className="buy__button auth__btn w-100">Đặt hàng</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Checkout
