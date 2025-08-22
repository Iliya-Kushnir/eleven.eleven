import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import ProductsFeed from "@/components/ProductsFeed/ProductsFeed"

export default function Products() {
    return (
 
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-2.5 pb-2.5 sm:p-20">

    
    <Header
        label="Hello world"
        src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
        alt="sobaka"
    />

        <ProductsFeed />

        <Footer/>
    </div>

    )
}