import { PortableTextComponents } from '@portabletext/react'

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
  // You can add more custom components here if needed
}