import Layout from "@/components/Layout"
import ProductItems from "@/components/ProductItems"
import axios from "axios"
import { useContext } from "react"
import { toast } from "react-toastify"
import Product from "../../models/Product"
// import data from "../../utils/data"
import db from "../../utils/db"
import { Store } from "../../utils/store"

export default function Home({ products }) {

  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find(x => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity++ : 1;
    const { data } = await axios.get(`/api/product/${product._id}`)

    if (data.countInStock < quantity) {
      // alert('Sorry, product is out of stock');
      toast.error('Sorry, product is out of stock');
      return;
    }

    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    toast.success('Product added to cart');
  }

  return (
    <Layout title={'Home'}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductItems key={index} product={product} addToCartHandler={addToCartHandler} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    }
  }
}
