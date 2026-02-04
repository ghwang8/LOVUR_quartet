// 'use client' is used because it is an interactive page with users typing and clicking
'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function ContactPage() {
  // Keeps track of the "mood" of the form: is it just there (idle),
  // currently sending, or finished with success or error?
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    // Grabs all the text from the iunputs (First Name, Email, etc.) and bundles it up
    const formData = new FormData(form)

    try {
      // KEY DISCOVERY, instead
      const response = await fetch('https://formspree.io/f/mvgaerpq', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:h-[650px]">
          {/* Contact Form */}
          <div className="flex flex-col h-full">
            <div className="lg:mb-8">
              <h1 className="text-4xl font-bold mb-2">Hello!</h1>
              <p className="font-montserrat text-lg text-gray-600 mb-8">We would love to hear from you.</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="font-montserrat space-y-6 bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-m text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    className="w-full bg-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-m text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    className="w-full bg-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-m text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full bg-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-m text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={7}
                  className="w-full bg-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex w-full justify-center">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="lg:w-[40%] text-sm md:text-base bg-gray-900 text-white font-montserrat font-medium py-3 px-4 hover:bg-gray-500 uppercase transition cursor-pointer flex items-center justify-center"
                >
                  {status === 'sending' && (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  )}
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {status === 'success' && (
                <div className='flex justify-center items-center w-full'>
                  <p className="text-green-600 text-base font-bold mt-2">Message sent successfully!</p>
                </div>
              )}
              {status === 'error' && (
                <div className='flex justify-center items-center w-full'>
                  <p className="text-red-600 text-base font-bold mt-2">There was an error sending your message.</p>
                </div>
              )}
            </form>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <div className="w-full h-[500px] md:w-[500px] md:h-[650px] relative overflow-hidden">
              <img
                src="/media/contact-photo.jpg"
                alt="Contact us"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* General Management Section */}
        <div className="font-montserrat mt-16 text-center mb-0 pb-0">
          <p className="md:text-lg text-gray-700 mb-0 pb-0">General Management</p>

          <div className="w-[120px] h-[120px] mx-auto mb-1">
            <Image
              src="/media/arietta-logo-black.svg"
              alt="Arietta Entertainment logo"
              width={120}
              height={120}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-lg font-bold mb-2">ARIETTA Entertainment</h3>
          <ul className="space-y-1 text-gray-700">
            <li>Phone: 778 887 2018</li>
            <li>Email: arietta.entertainment@gmail.com</li>
            <li>Website: ariettaentertainment.com</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  )
}
