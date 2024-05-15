export default function Facebook({
  style = "fill-white",
  width = '3.7500rem',
  height = '3.7500rem',
}) {
  return (
    <svg
      className={style}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 60 60'
    >
      <circle opacity='0.1' cx='30' cy='30' r='30'  />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M40 30.0604C40 24.5047 35.5223 20 30 20C24.4777 20 20 24.5047 20 30.0604C20 35.0816 23.6563 39.2437 28.4375 39.9991V32.9694H25.8978V30.0604H28.4375V27.844C28.4375 25.323 29.9308 23.9294 32.2147 23.9294C33.3089 23.9294 34.4536 24.1261 34.4536 24.1261V26.6021H33.192C31.9504 26.6021 31.5621 27.3773 31.5621 28.1741V30.0604H34.3353L33.8924 32.9694H31.5625V40C36.3438 39.245 40 35.083 40 30.0604Z'
      />
    </svg>
  );
}
