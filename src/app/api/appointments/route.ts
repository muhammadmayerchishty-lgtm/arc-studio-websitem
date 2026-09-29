import { NextResponse } from 'next/server';
import { z } from 'zod';

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required (minimum 2 characters)'),
  phone: z.string().trim().min(7, 'A valid Phone or WhatsApp number is required'),
  service: z.enum(
    ['Architecture', 'Interior design', 'Renovation', 'Commercial fit-out'],
    {
      errorMap: () => ({ message: 'Please select an architectural service' }),
    }
  ),
  interestedProject: z.string().optional().default('General Inquiry'),
  preferredDate: z.string().min(1, 'Please select your preferred consultation date'),
  timeSlot: z.string().min(1, 'Please choose a preferred time slot'),
  message: z.string().optional().default(''),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parseResult = appointmentSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const timestamp = new Date().toISOString();
    const referenceId = `ARC-${Date.now().toString(36).toUpperCase()}`;

    // Server-side audit logging
    console.log('[NEW APPOINTMENT COMMISSION RECEIVED]', {
      referenceId,
      timestamp,
      fullName: data.fullName,
      phone: data.phone,
      service: data.service,
      interestedProject: data.interestedProject,
      preferredDate: data.preferredDate,
      timeSlot: data.timeSlot,
      messagePreview: data.message ? `${data.message.slice(0, 100)}...` : 'None',
    });

    // =========================================================================
    // TODO: Send notification email to Studio Principals & Partners
    // Example using Resend / SendGrid / Nodemailer:
    // await resend.emails.send({
    //   from: 'Arc Studio Commissions <commissions@arcstudio.pk>',
    //   to: ['atelier@arcstudio.pk', 'partners@arcstudio.pk'],
    //   subject: `[New Commission Inquiry] ${data.fullName} — ${data.service}`,
    //   html: `<p>New booking for <strong>${data.service}</strong> from ${data.fullName} (${data.phone})</p>`,
    // });
    // =========================================================================

    // =========================================================================
    // TODO: Append appointment row to Google Sheets via Google Sheets API or Webhook
    // Example:
    // await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL!, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ referenceId, timestamp, ...data }),
    // });
    // =========================================================================

    return NextResponse.json({
      success: true,
      message: 'Consultation appointment received successfully.',
      referenceId,
      data,
    });
  } catch (error) {
    console.error('[APPOINTMENT ROUTE HANDLER ERROR]:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error processing consultation appointment.',
      },
      { status: 500 }
    );
  }
}
