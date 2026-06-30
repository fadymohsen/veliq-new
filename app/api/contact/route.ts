import { NextResponse } from "next/server";
import { Resend } from "resend";

const ADMIN_EMAIL = "admin@veliq.co";
const SENDER_EMAIL = "admin@veliq.co";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name is required (min 2 characters)." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json({ error: "Please include a project brief (min 5 characters)." }, { status: 400 });
    }

    const date = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send admin email first (required)
    const adminResult = await resend.emails.send({
        from: `VELIQ <${SENDER_EMAIL}>`,
        to: [ADMIN_EMAIL],
        replyTo: email.trim(),
        subject: `New Contact Request from ${name.trim()}`,
        html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06)">
              <tr>
                <td style="background:linear-gradient(135deg,#0a0a14 0%,#1e1b4b 100%);padding:36px 40px;text-align:center">
                  <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:2px">VELIQ</h1>
                  <p style="margin:8px 0 0;color:#a5b4fc;font-size:13px;letter-spacing:1px">NEW LEAD RECEIVED</p>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 40px 0;text-align:right">
                  <span style="color:#94a3b8;font-size:12px">${date}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 40px 0">
                  <h2 style="margin:0 0 16px;color:#0f172a;font-size:18px;font-weight:700">Client Details</h2>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;overflow:hidden">
                    <tr>
                      <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;width:120px">
                        <span style="color:#64748b;font-size:13px;font-weight:500">Name</span>
                      </td>
                      <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0">
                        <span style="color:#0f172a;font-size:14px;font-weight:600">${name.trim()}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:16px 20px">
                        <span style="color:#64748b;font-size:13px;font-weight:500">Email</span>
                      </td>
                      <td style="padding:16px 20px">
                        <a href="mailto:${email.trim()}" style="color:#4338ca;font-size:14px;font-weight:600;text-decoration:none">${email.trim()}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:28px 40px 0">
                  <h2 style="margin:0 0 12px;color:#0f172a;font-size:18px;font-weight:700">Project Brief</h2>
                  <div style="background:#f8fafc;border-radius:12px;padding:20px;color:#334155;font-size:14px;line-height:1.7">
                    ${message.trim().replace(/\n/g, "<br>")}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 40px">
                  <a href="mailto:${email.trim()}" style="display:inline-block;background:#4338ca;color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none">Reply to ${name.trim()}</a>
                </td>
              </tr>
              <tr>
                <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0">
                  <p style="margin:0;color:#94a3b8;font-size:12px">This lead was submitted via the VELIQ website contact form.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
        `,
    });

    if (adminResult.error) {
      throw new Error(`Failed to send admin email: ${adminResult.error.message}`);
    }

    // Confirmation email to client (best effort — don't fail the request if this errors)
    try {
      await resend.emails.send({
        from: `VELIQ <${SENDER_EMAIL}>`,
        to: [email.trim()],
        replyTo: ADMIN_EMAIL,
        subject: "Thank you for contacting VELIQ!",
        html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06)">
              <tr>
                <td style="background:linear-gradient(135deg,#0a0a14 0%,#1e1b4b 100%);padding:48px 40px;text-align:center">
                  <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:2px">VELIQ</h1>
                  <div style="margin:16px auto;width:40px;height:2px;background:linear-gradient(90deg,#818cf8,#a78bfa)"></div>
                  <p style="margin:0;color:#c7d2fe;font-size:16px;font-weight:400">Thank you for reaching out</p>
                </td>
              </tr>
              <tr>
                <td style="padding:36px 40px 0">
                  <h2 style="margin:0;color:#0f172a;font-size:22px;font-weight:700">Hi ${name.trim()},</h2>
                  <p style="margin:12px 0 0;color:#475569;font-size:15px;line-height:1.7">
                    We're excited to hear from you! Your inquiry has been received and a dedicated member of our team will be in touch with you shortly.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:28px 40px 0">
                  <div style="background:#f8fafc;border-radius:12px;padding:24px;border-left:4px solid #4338ca">
                    <h3 style="margin:0 0 12px;color:#0f172a;font-size:15px;font-weight:700">What happens next?</h3>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding:6px 0;vertical-align:top;width:28px">
                          <span style="display:inline-block;width:22px;height:22px;background:#eef2ff;color:#4338ca;font-size:12px;font-weight:700;line-height:22px;text-align:center;border-radius:50%">1</span>
                        </td>
                        <td style="padding:6px 0;color:#475569;font-size:14px">Our team reviews your inquiry</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;vertical-align:top">
                          <span style="display:inline-block;width:22px;height:22px;background:#eef2ff;color:#4338ca;font-size:12px;font-weight:700;line-height:22px;text-align:center;border-radius:50%">2</span>
                        </td>
                        <td style="padding:6px 0;color:#475569;font-size:14px">We'll reach out within 24 hours</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;vertical-align:top">
                          <span style="display:inline-block;width:22px;height:22px;background:#eef2ff;color:#4338ca;font-size:12px;font-weight:700;line-height:22px;text-align:center;border-radius:50%">3</span>
                        </td>
                        <td style="padding:6px 0;color:#475569;font-size:14px">Together, we'll craft the perfect plan for your needs</td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:28px 40px 0">
                  <h3 style="margin:0 0 12px;color:#0f172a;font-size:15px;font-weight:700">Your message</h3>
                  <div style="background:#f8fafc;border-radius:12px;padding:20px;color:#475569;font-size:14px;line-height:1.7">
                    ${message.trim().replace(/\n/g, "<br>")}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 40px;text-align:center">
                  <p style="margin:0 0 16px;color:#475569;font-size:14px">Have more questions in the meantime?</p>
                  <a href="mailto:admin@veliq.co" style="display:inline-block;background:#4338ca;color:#ffffff;font-size:14px;font-weight:600;padding:12px 32px;border-radius:8px;text-decoration:none">Contact Us Directly</a>
                </td>
              </tr>
              <tr>
                <td style="padding:0 40px">
                  <div style="height:1px;background:#e2e8f0"></div>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 40px 32px;text-align:center">
                  <h3 style="margin:0 0 4px;color:#0f172a;font-size:16px;font-weight:700;letter-spacing:1px">VELIQ</h3>
                  <p style="margin:0;color:#94a3b8;font-size:12px">Precision at the Speed of Ambition</p>
                  <p style="margin:12px 0 0;color:#cbd5e1;font-size:11px">&copy; ${new Date().getFullYear()} VELIQ. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
        `,
      });
    } catch (clientErr) {
      console.warn("Client confirmation email failed (non-blocking):", clientErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
