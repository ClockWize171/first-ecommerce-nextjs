import Layout from "@/components/Layout"
import ProductItems from "@/components/ProductItems"
import data from "../../utils/data"

export default function Home() {
  return (
    <Layout title={'Home'}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product, index) => (
          <ProductItems key={index} product={product} />
        ))}
      </div>
    </Layout>
  )
}
