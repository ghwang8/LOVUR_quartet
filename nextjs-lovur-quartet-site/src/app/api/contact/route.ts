// Imports NextResponse, which allows the server to talk back to the browser (e.g., saying "Email sent!")
import { NextResponse } from 'next/server'
// Imports SendGrid, a third-party service used to send professional examples (so they don't end up in spam)
import sgMail from '@sendgrid/mail'

// This connects your code to your specific SendGrid account using a "Secret Key" hidden in an environment file (.env)
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

/**
 * export async function POST(...) defines this file as a "POST" route, meaning it's
 * designed to receive data (like form submissions).
 * 
 * @param request 
 * @returns 
 */
export async function POST(request: Request) {
  // "Unpacks" the data sent from the website (First Name, Last Name, Email, Message)
  const { firstName, lastName, email, message } = await request.json()
  // It combines the names into one fullName
  const fullName = `${firstName} ${lastName}`.trim()

  const msg = {
    // Tells SendGrid where to send the notification
    to: process.env.NEXT_PUBLIC_EMAIL_RECIPIENT,
    from: 'ghwangwebdev@gmail.com', // Keep this for now, but verify in SendGrid
    // Ensures that if you click reply in the inbox, email goes to the customer and not yourself or SendGrid
    replyTo: email, // Helps prevent spam and makes "Reply" work properly
    subject: `New message from ${fullName}`,
    text: message,
    html: `
      <p><strong>From:</strong> ${fullName} (${email})</p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  }

  /**
   * Attempts to send the email in the "try" block.
   * If it works it returns a "Success" message back to the website.
   * 
   * In the "catch" block, if SendGrid is down or the API key is wrong, it logs
   * the error and tells the website "Failed to send".
   */ 
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
