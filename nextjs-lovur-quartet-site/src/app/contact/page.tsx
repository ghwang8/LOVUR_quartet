'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-[650px]">
          {/* Contact Form */}
          <div className='flex flex-col h-[100%]'>
            <div className='mb-8'>
              <h1 className="text-4xl font-bold mb-2">Hello!</h1>
              <p className="font-montserrat text-lg text-gray-600 mb-8">We would love to hear from you.</p>
            </div>
            <form onSubmit={handleSubmit} className="font-montserrat space-y-6 bg-white">
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
                    placeholder=""
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
                    placeholder=""
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
                  placeholder=""
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
                  placeholder=""
                  className="w-full bg-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className='flex w-full justify-center'>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-[40%] bg-gray-900 text-white font-montserrat font-medium py-3 px-4 hover:bg-gray-500 uppercase transition cursor-pointer"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {status === 'success' && (
                <p className="text-green-600 text-sm mt-2">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm mt-2">There was an error sending your message.</p>
              )}
            </form>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <div className="w-[500px] h-[650px] relative overflow-hidden">
              <Image
                src="/media/contact-photo.jpg" 
                alt="Contact us"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* General Management Section */}
        <div className="font-montserrat mt-16 text-center">
          <p className="text-lg text-gray-700">General Management</p>

          <div className="w-[120px] h-[120px] mx-auto mb-4">
            <Image
              src="/media/arietta-logo-black.svg"
              alt="Arietta Entertainment logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          <h3 className="text-lg font-bold mb-2">Arietta Entertainment</h3>
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
