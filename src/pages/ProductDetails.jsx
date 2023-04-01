import React, {useState, useRef, useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import products from '../assets/data/products'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../style/product-details.css'
import { motion } from 'framer-motion'
import ProductList from '../components/UI/ProductList'
import { useDispatch } from 'react-redux'
import { cartAction } from '../redux/slices/cartSlice'
import {toast} from "react-toastify"
import { db } from '../firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'

const ProductDetails = () => {

  const [tab,setTab] = useState('desc')
  const [rating, setRating] = useState(null)
  const [product, setProduct] = useState({})
  const reviewUser = useRef('')
  const reviewMsg = useRef('')
  const {id} = useParams()
  
  const  dispatch = useDispatch()
  //const product = products.find(item => item.id === id)
  const docRef = doc(db, 'product', id)

  const {data: products} = useGetData('product')

  useEffect(() => {
    const getProduct = async () => {
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      setProduct(docSnap.data())
    } else {
      console.log('no product')
    }
  }
  getProduct()
  }, [])

  const { imgUrl, productName, price, avgRating, reviews, category,  description, shortDesc } = product

  console.log(id)

  const relatedProducts = products.filter(item => item.category === category)

  const submitHandler = (e) => {
    e.preventDefault()

    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

    console.log(reviewUserName, reviewUserMsg, rating)

    const reviewObj = {
      userName: reviewUserName, 
      text: reviewUserMsg,
      rating,
    }

    console.log(reviewObj)
    toast.success("Review Được Ghi Nhận!!!")
  }

  const addToCart = () => {
    dispatch(cartAction.addItem({
      id,
      image: imgUrl,
      productName,
      price,
    }))
    toast.success("Product added successfully!")
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])
  return <Helmet title={productName}>
    <CommonSection />

    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <img src={imgUrl} alt='' />
          </Col>
          <Col lg='6'>
            <div className="product__details">
              <h2>{productName}</h2>
              <div className="product__rating d-flex align-items-center gap-5 mb-3">
                <div>
                  <span onClick={()=> setRating(1)}><i class="ri-star-s-fill"></i></span>
                  <span onClick={()=> setRating(2)}><i class="ri-star-s-fill"></i></span>
                  <span onClick={()=> setRating(3)}><i class="ri-star-s-fill"></i></span>
                  <span onClick={()=> setRating(4)}><i class="ri-star-s-fill"></i></span>
                  <span onClick={()=> setRating(5)}><i class="ri-star-half-s-line"></i></span>
                </div>
                <p>(<span>{avgRating}</span> ratings)</p>
              </div>
              <div className='d-flex align-items-center  gap-5'>
              <span className='product__price'>${price}</span>
              <span>Category: {category}</span>
              </div>
              <p className='mt-3'>{shortDesc}</p>
              <motion.button whileTap={{scale: 1.1}} className="buy__button" onClick={addToCart}>Add to Cart</motion.button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          <Col lg='12'>
          <div className="tap__wrapper d-flex align-items-center gap-5">
            <h6 className={`${tab==='desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>Description</h6>
            <h6 className={`${tab==='rev' ? 'active__tab' : ''}`} onClick={() => setTab("rev")}>Reviews ({reviews.length})</h6>
          </div>

            {tab === 'desc' ? <div className="tab__content mt-5">{description}</div> : <div className='product__review mt-5'>
              <div className="review__wrapper">
                <ul>
                  {reviews.map((item, index) => (
                      <li key={index} classNamem="mb-4">
                        <h6>Sy Pham</h6><span>
                        {item.rating} (average rating)
                        </span>
                        <p>{item.text}</p></li>
                    ))
                  }
                </ul>
                <div className="review__form">
                  <h1 className='mb-2'>Hãy nêu cảm nghĩ của bạn</h1>
                  <form action="" onSubmit={submitHandler}>
                    <div className="form__group">
                      <input type="text" placeholder='Enter Name' ref={reviewUser} required />
                    </div>
                    <div className="form__group d-flex align-items-center gap-4 rating__group">
                      <motion.span whileTap={{scale: 1.2}} onClick={()=> setRating(1)}>1<i class="ri-star-s-fill"></i></motion.span>
                      <motion.span whileTap={{scale: 1.2}} onClick={()=> setRating(2)}> 2<i class="ri-star-s-fill"></i></motion.span>
                      <motion.span whileTap={{scale: 1.2}} onClick={()=> setRating(3)}> 3<i class="ri-star-s-fill"></i></motion.span>
                      <motion.span whileTap={{scale: 1.2}} onClick={()=> setRating(4)}> 4<i class="ri-star-s-fill"></i></motion.span>
                      <motion.span whileTap={{scale: 1.2}} onClick={()=> setRating(5)}> 5<i class="ri-star-s-fill"></i></motion.span>
                    </div>
                    <div className="form__group">
                      <textarea ref={reviewMsg} type="text" rows={4} placeholder='Enter Message' required></textarea>
                    </div>
                    <motion.button whileTap={{scale: 1.3}} type="submit" className='buy__button'>Gửi Đi</motion.button>
                  </form>
                </div>
              </div>
              </div>}

          </Col>
          <Col lg='12' className='mt-5'>
            <h2 className='related__title'>Những sản phẩm bạn có thể thích</h2>
          </Col>
          <ProductList data={relatedProducts} />
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default ProductDetails
