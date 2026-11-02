import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import {motion} from 'framer-motion'

const Testimonials = () => {
  return (
    <motion.div 
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className="flex flex-col items-center justify-center my-20 py-12 px-4">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer Testimonials
      </h1>

      <p className="text-gray-500 mb-12">
        What Our Users Are Saying
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {testimonialsData.map((testimonial, index) => (
          <div className='bg-white/20 p-12 rounded-lg shadow-md order w-80 m-auto cursor-pointer hover:scale-[1.02]'
            key={index}
            
          >
            <div className="flex flex-col items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="rounded-full w-14 h-14 object-cover"
              />

              <div>
                <h2 className="font-semibold">{testimonial.name}</h2>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>

            <div className="flex mb-4">
              {Array.from({ length: testimonial.stars }).map((_, index) => (
                <img
                  key={index}
                  src={assets.rating_star}
                  alt="Star"
                  className="w-5 h-5"
                />
              ))}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {testimonial.text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials