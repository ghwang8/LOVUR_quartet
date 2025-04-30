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
      name: formData.get('name'),
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Hello!</h1>
            <p className="text-lg text-gray-600 mb-8">We would love to hear from you.</p>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={5}
                  placeholder="Type your message here..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

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
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700">General Management</p>

          <div className="w-[120px] h-[120px] mx-auto my-4">
            <Image
              src="/media/arietta-logo-black.svg"
              alt="Arietta Entertainment logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          <h3 className="text-xl font-bold mb-2">Arietta Entertainment</h3>
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
