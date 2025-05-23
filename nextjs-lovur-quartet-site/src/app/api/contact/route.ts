import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: Request) {
  const { firstName, lastName, email, message } = await request.json()
  const fullName = `${firstName} ${lastName}`.trim()

  const msg = {
    to: process.env.NEXT_PUBLIC_EMAIL_RECIPIENT,
    from: 'ghwangwebdev@gmail.com', // Keep this for now, but verify in SendGrid
    replyTo: email, // Helps prevent spam and makes "Reply" work properly
    subject: `New message from ${fullName}`,
    text: message,
    html: `
      <p><strong>From:</strong> ${fullName} (${email})</p>
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
