# 📧 Gmail SMTP Email Setup Guide

## 🚀 **Modern Email Solution for Free Domains**

Your booking system now uses **Nodemailer with Gmail SMTP** - the best choice for modern apps!

## ✅ **Why This Solution is Better:**

- ✅ **Works with FREE Vercel domains**
- ✅ **Server-side** (more secure than client-side)
- ✅ **Professional email delivery**
- ✅ **100% Free** (just need Gmail account)
- ✅ **Production-ready** and scalable
- ✅ **Industry standard** for transactional emails

## 🔧 **Setup Instructions:**

### **Step 1: Create Gmail App Password**

1. **Go to your Gmail account settings**

   - Visit: https://myaccount.google.com/security

2. **Enable 2-Factor Authentication** (required for App Passwords)

   - Go to "2-Step Verification" and set it up

3. **Generate App Password**
   - Go to "App passwords" section
   - Select "Mail" and "Other (custom name)"
   - Name it: "Nutrisha Booking System"
   - **Copy the 16-character password** (you'll need this)

### **Step 2: Add Environment Variables**

Add these to your `.env.local` file:

```env
# Gmail SMTP Configuration
GMAIL_EMAIL=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Supabase (existing)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Step 3: Test Your Setup**

1. **Add your Gmail credentials** to environment variables
2. **Try making a test booking** on your site
3. **Check your email** for the confirmation
4. **Check Supabase** to see the booking data

## 📱 **Email Template Features:**

Your emails will include:

- ✅ Professional design with sage colors
- ✅ Client name personalization
- ✅ Complete appointment details
- ✅ Booking ID for reference
- ✅ Special requests (if any)
- ✅ Contact information
- ✅ Mobile-responsive design

## 🛡️ **Security Best Practices:**

- ✅ **App Password** (not regular password)
- ✅ **Server-side sending** (credentials not exposed)
- ✅ **Environment variables** for sensitive data
- ✅ **2FA enabled** on Gmail account

## 🚀 **Production Deployment:**

### **Vercel Deployment:**

1. Add environment variables in Vercel dashboard
2. Deploy your app
3. Test email functionality on live site

### **Environment Variables in Vercel:**

```
GMAIL_EMAIL = your-gmail-address@gmail.com
GMAIL_APP_PASSWORD = your-16-character-app-password
```

## 📊 **Monitoring & Logs:**

- Check Vercel function logs for email sending status
- Gmail provides delivery reports
- Console logs show email success/failure

## 🔄 **Future Upgrades:**

When you're ready to scale:

1. **Custom Domain**: Get a custom domain (nutrisha.com)
2. **Professional Email Service**: Switch to SendGrid/Resend with custom domain
3. **Email Analytics**: Add open/click tracking
4. **Email Templates**: Create multiple template variations

## ⚡ **Advantages Over Other Solutions:**

| Feature                 | Gmail SMTP | EmailJS    | Resend  |
| ----------------------- | ---------- | ---------- | ------- |
| **Free Domain Support** | ✅ Yes     | ✅ Yes     | ❌ No   |
| **Server-Side**         | ✅ Yes     | ❌ No      | ✅ Yes  |
| **Cost**                | 🆓 Free    | 🆓 Free    | 💰 Paid |
| **Professional**        | ✅ Yes     | ⚠️ Limited | ✅ Yes  |
| **Scalable**            | ✅ Yes     | ❌ No      | ✅ Yes  |

## 🐛 **Troubleshooting:**

### **Email Not Sending:**

1. Check Gmail App Password is correct
2. Verify 2FA is enabled on Gmail
3. Check Vercel function logs
4. Ensure environment variables are set

### **Gmail Limits:**

- **Daily limit**: 500 emails/day (perfect for bookings)
- **Rate limit**: 100 emails/hour
- **More than enough** for a nutrition practice

### **Common Issues:**

```bash
# Error: Invalid credentials
→ Check GMAIL_APP_PASSWORD is correct

# Error: Authentication failed
→ Ensure 2FA is enabled on Gmail

# Error: Cannot find module
→ Restart your development server
```

## 🎯 **Next Steps:**

1. **Set up Gmail App Password** (5 minutes)
2. **Add environment variables** (2 minutes)
3. **Test booking flow** (2 minutes)
4. **Deploy to production** (5 minutes)

**Total setup time: ~15 minutes** ⚡

Your modern nutrition booking system is now ready with professional email notifications that work perfectly with free Vercel domains!
