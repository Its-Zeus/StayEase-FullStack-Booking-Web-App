# StayEase

<h1 align="center">StayEase</h1>
<h4 align="center">Full-stack Hotel Booking Website whith Next.js Tailwindcss Prisma</h4>
<p align="center">
    <a href="https://nextjs.org/">
        <img src="https://img.shields.io/badge/Next.js-Built-black?logo=next.js&logoColor=white&labelColor=black" />
    </a>
    <a href="https://tailwindcss.com/">
        <img src="https://img.shields.io/badge/Tailwind CSS-Built-38B2AC?logo=tailwind-css&logoColor=white&labelColor=38B2AC" />
    </a>
    <a href="https://www.prisma.io/">
        <img src="https://img.shields.io/badge/Prisma-Built-2D3748?logo=prisma&logoColor=white&labelColor=2D3748" />
    </a>
    <a href="https://stripe.com/">
        <img src="https://img.shields.io/badge/Stripe-Payments-008CDD?logo=stripe&logoColor=white&labelColor=008CDD" />
    </a>
    <a href="https://clerk.dev/">
        <img src="https://img.shields.io/badge/Clerk-Auth-3F3F46?logo=clerk&logoColor=white&labelColor=3F3F46" />
    </a>
    <a href="https://vercel.com/">
        <img src="https://img.shields.io/badge/Vercel-Deployment-000000?logo=vercel&logoColor=white&labelColor=000000" />
    </a>
    <p align="center">⭐️ Star this project ⭐️</p>
    <p align="center">Preview : <a href="https://stay-ease-full-stack-booking-web-app.vercel.app/">https://stay-ease-full-stack-booking-web-app.vercel.app/</a></p>
</p>

<p align="center">
    <img title="Preview" src="https://github.com/Its-Zeus/StayEase-FullStack-Booking-Web-App/assets/101791373/6deb378e-6107-420a-bb8e-c25777189c28" width="500" />
    <img title="Preview" src="https://github.com/Its-Zeus/StayEase-FullStack-Booking-Web-App/assets/101791373/a5eda829-18f3-4c67-828f-e6aa0808cb6b" width="500" />
  <img title="Preview" src="https://github.com/Its-Zeus/StayEase-FullStack-Booking-Web-App/assets/101791373/1df30708-32cc-47e5-9181-0dcbcfdd8c26" width="500" />

  
</p>
<p align="center">
  <img title="Preview" src="https://github.com/Its-Zeus/StayEase-FullStack-Booking-Web-App/assets/101791373/02fc9535-7cd6-4806-837a-82f26a20408d" width="300" />
  <img title="Preview" src="https://github.com/Its-Zeus/StayEase-FullStack-Booking-Web-App/assets/101791373/a76e9928-9552-4320-80a5-36791dd4f364" width="300" />
  
</p>

StayEase is a full-stack booking website inspired by Airbnb, built with Next.js, Tailwind CSS, and Prisma. This application includes features such as property listing, booking management, Stripe payment integration, Clerk authentication, and more.

## Features

- ✅ Responsive forms for adding or updating property listings.
- ✅ Dynamic properties list with infinite scroll.
- ✅ Secure payment processing via Stripe.
- ✅ User authentication and management with Clerk.
- ✅ Seamless data handling and fetching through API integration.
- ✅ User dashboard to manage properties and bookings.
- ✅ Dark/light theme toggle.
- ✅ Advanced property filters.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)
- MySQL (for the Prisma database)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Its-Zeus/StayEase-FullStack-Booking-Web-App.git
   cd StayEase-FullStack-Booking-Web-App
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory of the project and add the necessary environment variables:

   ```env
   DATABASE_URL="your_mysql_database_url"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   UPLOADTHING_SECRET="your_uploadthing_secret"
   UPLOADTHING_APP_ID="your_uploadthing_app_id"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   NEXT_PUBLIC_HOST_URL="http://localhost:3000"
   ```

4. **Set Up Prisma**

   Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

   Run the Prisma migrations to set up your database schema:

   ```bash
   npx prisma migrate dev
   ```

5. **Run the Development Server**

   Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact [zeuscript@gmail.com](mailto:zeuscript@gmail.com).

---

Thank you for using StayEase! We hope you find it useful and enjoyable. Happy booking!
