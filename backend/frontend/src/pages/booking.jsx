import BookingData from "../Components/BookingData"
import Footer from "../Components/Footer"
import PageNav from "../Components/PageNav"

function Booking(){
    return(
        <div>
            {/* booking */}
            <PageNav/>
            <BookingData/>
            <Footer/>
        </div>
    )
}
export default Booking