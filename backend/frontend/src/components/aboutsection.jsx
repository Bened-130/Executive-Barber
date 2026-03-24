import { Link} from "react-router-dom";

function AboutSection() {
 
  return (
    <div 
   
    className="overflow-hidden bg-gradient-to-br from-[#1b1b2f] via-[#3d2b4a] to-[#923993] py-32 pr-4 lg:pr-0 rounded-bl-2xl rounded-br-2xl">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
          
          {/* Text section */}
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">About Us</h2>
            <p className="mt-6 text-xl/8 text-gray-300">
              At our Barber <Shop></Shop>, we believe beauty starts with care. Our skilled stylists, therapists, and nail artists work
              together to create a relaxing, confidence-boosting experience for every client.
            </p>
            <p className="mt-6 text-base/7 text-gray-400">
              From luxurious spa treatments to precision cuts, our team ensures every visit feels special. We don’t just
              enhance your look , we enhance your mood.
            </p>
            <div className="mt-10 flex">
              <Link
               
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                to='/booking'
              >
                Book Appointment
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>

         
          <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8 lg:contents">
            
          
            <div className="w-0 flex-auto lg:w-auto lg:flex-none lg:self-end">
              <img
                alt=""
                src="happy-client.jpg"
                className="aspect-[7/5] w-[28rem] max-w-none rounded-2xl bg-gray-800 object-cover max-sm:w-96"
              />
            </div>

           
            <div className="contents lg:col-span-2 lg:col-end-2 lg:flex lg:w-auto lg:items-start lg:justify-start lg:gap-x-4 lg:-ml-8">
              
              <div className="order-first flex w-64 flex-none justify-start self-end max-sm:w-40 lg:w-auto">
                <img
                  alt=""
                  src="spa-room.jpg"
                  className="aspect-[5/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-800 object-cover"
                />
              </div>

              <div className="flex w-96 flex-auto justify-start lg:w-auto lg:flex-none">
                <img
                  alt=""
                  src="salon-interior.jpg"
                  className="aspect-[7/5] w-[35rem] max-w-none flex-none rounded-2xl bg-gray-800 object-cover"
                />
              </div>

              <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                <img
                  alt=""
                  src="gel-nail.jpg"
                  className="aspect-[5/3] w-[24rem] max-w-none rounded-2xl bg-gray-800 object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutSection;