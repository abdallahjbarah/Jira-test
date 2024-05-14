/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        customShadow_1: '0px 8px 30px #0000001A',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'overflow': 'overflow'
      },
      backgroundImage: {
        heroHomeImg: "url('/src/images/home/BgHomePage.png'), url('/src/images/home/BgHomePage_placeholder.png')",
      },
      screens: {
        xxsm: "375px",
        xsm: "420px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1440px",
        xxxl: "1920px",
      },
      colors: {
        //$primary
        primary_1: "#47C409",
        primary_2: "#222",
        primary_3: "#000",
        primary_4: "#FFF",
        //secondary
        secondary_1: "#999",
        secondary_2: "#F7F7F7",
        secondary_3: "#E7E7E7",
        secondary_4: "#CCCCCC",
        secondary_5: "#F8F8F8",
      },
      fontSize: {
        "custom-xs": "0.8125rem", // 13px 
        "custom-sm": "0.875rem", // 14px 
        "custom-base": "0.9375rem", // 15px 
        "custom-lg": "1rem", // 16px 
        "custom-xl": "1.125rem", // 18px 
        "custom-2xl": "1.25rem", // 20px 
        "custom-3xl": "1.5rem", // 24px 
        "custom-4xl": "1.75rem", // 28px 
        "custom-5xl": "2.5rem", // 40px 
        "custom-6xl": "3rem", // 48px 
        "custom-7xl": "3.5rem", // 56px 
        "custom-8xl": "6rem", // 96px 
      },
      lineHeight: {
        "custom-20": "1.25rem", // 20px 
        "custom-24": "1.5rem", // 24px 
        "custom-30": "1.875rem", // 30px 
        "custom-40": "2.5rem", // 40px 
        "custom-56": "3.5rem", // 56px 
        "custom-80": "5rem", // 80px 
        "custom-112": "7rem", // 112px 
      },
      fontWeight: {
        "custom-semi-bold": 600,
        // Font weight for "semiBold" //font-semi-bold
        "custom-medium": 500,
        // Font weight for "medium" //font-medium
        "custom-regular": 400,
        // Font weight for "Regular" (Tailwind uses 400 as the default) //font-regular
      },
      borderRadius: {
        "custom-44": "2.75rem", // 44px 
        "custom-40": "2.5rem", // 40px 
        "custom-24": "1.5rem", // 24px  
        "custom-16": "1rem", // 16px 
      }
    },
  },
  plugins: [
  ],
}
