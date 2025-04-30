import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  const msg = {
    to: process.env.NEXT_PUBLIC_EMAIL_RECIPIENT,
    from: 'ghwangwebdev@gmail.com', 
    subject: `New message from ${name}`,
    text: message,
    html: `
      <p><strong>From:</strong> ${name} (${email})</p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  }

  try {
    await sgMail.send(msg)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}