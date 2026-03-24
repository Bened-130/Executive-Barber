import Footer from "../Components/Footer"
import PageNav from "../Components/PageNav"
  const images = [
    [
      "Hairstyle-01.jpg",
      "Hairstyle-02.jpg",
      "Hairstyle-03.jpg",
    ],
    [
       "Hairstyle-04.jpg",
       "Hairstyle-05.jpg",
       "Hairstyle-06.jpg",
     
    ],
    [
         "Hairstyle-07.jpg",
          "Hairstyle-08.jpg",
           "Hairstyle-09.jpg",
    
    ],
    [
         "nails-01.jpg",
         "nails-02.jpg",
         "nails-03.jpg",
     
    ],
  ];

function Gallery(){
    return(
        <div>
            <PageNav/>
            <section className="bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h1>
        <p className="text-lg text-gray-600">
          A glimpse into some of the stunning styles we’ve created — from bold colors to elegant cuts.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((column, i) => (
          <div key={i} className="grid gap-4">
            {column.map((src, j) => (
              <div key={j}>
                <img
                  className="h-auto max-w-full rounded-lg object-cover"
                  src={src}
                  alt={`Gallery ${i}-${j}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
            <Footer/>
        </div>
    )
}
export default Gallery