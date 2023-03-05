import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoStarSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { PayPalButton } from "react-paypal-button-v2";
import { DEMO_PRODUCT } from ".";
import withLayout from "./layout.manager";

// CART CART COMPONENT
function CartCard({ product = {} }) {
  return (
    <figure className="mb-2 grid grid-cols-6 items-center py-2 md:grid-cols-12">
      <div className="col-span-1">
        <Image
          src={product.images[0]}
          width={300}
          height={300}
          alt={product.title}
          className="inline-block"
        />
      </div>
      <div className="col-span-5 md:col-span-8">
        <h5>{product.title}</h5>
        <div className="flex flex-wrap gap-2">
          <span className="inline-block text-lg font-semibold text-slate-900">
            ${product.price || 0}
          </span>
          <span className="center inline-flex rounded-md bg-orange-100 p-1 text-sm font-semibold text-orange-700">
            <IoStarSharp className="inline-block text-orange-500" />
            {product.rating.value}({product.rating.count})
          </span>
        </div>
      </div>
      <div className="col-span-6 flex flex-wrap items-center justify-end gap-3 md:col-span-3">
        <div className="mt-1 flex flex-wrap items-center justify-end gap-2 rounded-md border border-slate-200 p-1">
          <button
            type="button"
            className="center h-8 w-8 rounded-md bg-slate-200 p-2 font-serif text-4xl font-bold text-slate-900"
          >
            <AiOutlineMinus />
          </button>
          <span className="inline-block p-1 text-xl">{product?.quantity}</span>
          <button
            type="button"
            className="center h-8 w-8 rounded-md bg-slate-200 p-2 font-serif text-4xl font-bold text-slate-900"
          >
            <AiOutlinePlus />
          </button>
        </div>
        <button
          type="button"
          className="rounded-md bg-gradient-to-br from-rose-500 to-rose-600 p-2 text-white"
        >
          <MdDelete />
        </button>
      </div>
    </figure>
  );
}

// CART PAGE
export default function Cart({cart_products=[]}) {
  const total_price=cart_products.reduce((total,{price,quantity})=>total+(price*quantity),0);
  return (
    <>
      <section className="py-5">
        <div className="container grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-6">
          <div className="order-2 col-span-2 md:order-1">
            <h2 className="mb-2">My Cart</h2>
            <hr className="border-1 rounded-full border-slate-300" />
            <div className="py-3">
              {cart_products?.map((product, key) => (
                <CartCard product={product} key={key} />
              ))}
            </div>
          </div>

          {/* Checkout */}
          <aside className=" order-1 md:order-2">
            <div className="sticky top-20 border-b-2 border-slate-300 bg-slate-50 px-2 py-3">
              <h3>Checkout</h3>
              <hr className="my-1" />
              <h5 className="mb-2">Total : ${total_price}</h5>

              <div className="mb-4">
                <p className="mb-1 font-semibold text-slate-800">
                  Delivery Address :
                </p>
                <input
                  type="text"
                  name="address"
                  placeholder="#house, #road, city, Country"
                  className="input italic"
                />
              </div>
              <PayPalButton
                amount={total_price||0}
                onSuccess={(details, data) =>console.log(details,data)}
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const CART_ITEMS = [...Array(10)].map((_, key) => ({
    ...DEMO_PRODUCT,
    title: `${key + 1} ${DEMO_PRODUCT.title}`,
    quantity: Math.floor(Math.random()*2) || 1,
    price: Math.floor(Math.random()*10)||1,
  }));
  return {
    props: {
      cart_products: CART_ITEMS,
    },
  };
}

Cart.getLayout = withLayout();
