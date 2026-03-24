import React, { useState } from 'react';
import PageNav from '../Components/PageNav';
import PhotoSlider from '../Components/PhotoSlider';
import { Heading } from '../Components/Heading';
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationList,
  PaginationPage,
  PaginationGap
} from '../Components/Pagination';
import OfferedServices from '../Components/OfferedServices';
import HaircutFeature from '../Components/HairCutFeature';
import AboutSection from '../Components/AboutSection';
import ServicesTabs from '../Components/ServicesTabs';
import Testimonials from '../Components/Testimonials';
import CallToAction from '../Components/CallToAction';
import ContactSection from '../Components/ContactSection';
import Footer from '../Components/Footer';

const images = [
  '/Hairstyle-09.jpg','/Hairstyle-07.jpg','/Hairstyle-03.jpg',
  '/Hairstyle-04.jpg','/Hairstyle-05.jpg','/Hairstyle-06.jpg',
  '/Hairstyle-01.jpg','/Hairstyle-08.jpg','/Hairstyle-02.jpg',
  '/nails-01.jpg','/nails-02.jpg','/nails-03.jpg','/nails-04.jpg','/nails-05.jpg',
];
const tabs = [
  { name: 'Hair Styling' },
  { name: 'Make Up' },
  { name: 'Spa Massage' },
  { name: 'Nail Art' },
]



const IMAGES_PER_PAGE = 4;

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const[selectedService,setSelectedService] = useState(tabs[0].name)
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const currentImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  return (
    <div className='mx-4'>
      {/* Navigation */}
      <PageNav />

      {/* Heading */}

      <Heading
        className="
          font-imperialscript 
          text-white 
          text-center
          
          bg-gradient-to-r from-[#3d2b4a] to-[#1b1b2f]
          h-[12.5rem] 
          grid 
          place-content-center 
          !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-7xl
          tracking-wider
          sm:px-4 px-2
        "
        level={1}
      >
        Welcome to Jad's Beauty Salon
      </Heading>
      <AboutSection/>

      {/* Photo Slider */}
      <div className="my-10">
        <PhotoSlider images={images} />
      </div>

     
      <Pagination className="my-4">
        <PaginationPrevious
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        />
        <PaginationList>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationPage
              key={i + 1}
              current={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </PaginationPage>
          ))}
        </PaginationList>
        <PaginationNext
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    <div className="bg-gradient-to-br from-[#1b1b2f] via-[#3d2b4a] to-[#923993] py-16 rounded-2xl mb-6">
      {/* <Heading level={1} className='text-center  text-white'>
        Our Services
      </Heading> */}
       <h2 className="text-5xl  text-center mb-8 text-white ">Our Services</h2>
        <p className="text-gray-300 text-center">We offer premium salon experiences tailored to your style.</p>
        <ServicesTabs selectedService={selectedService} setSelectedService={setSelectedService} tabs={tabs}/>
      <OfferedServices selectedService={selectedService}/>
    </div>
    <Testimonials/>
    <CallToAction/>
    <ContactSection/>
    <Footer/>
      {/* <HaircutFeature/> */}
    </div>
  );
}

export default Home;