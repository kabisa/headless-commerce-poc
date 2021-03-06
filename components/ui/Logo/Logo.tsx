const Logo = ({ className = '', ...props }) => (
  <svg width="32" height="32" viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg" {...props}>
    <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="31.9" x2="167.2" y1="130.1" y2="130.1">
      <stop offset="0" stopColor={"#50d296"}/>
      <stop offset="1" stopColor={"#91e6c8"}/>
    </linearGradient>
    <linearGradient id="a">
      <stop offset="0" stopColor={"#50d296"}/>
      <stop offset="1" stopColor={"#91e6c8"}/>
    </linearGradient>
    <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="131.8" x2="243.7" xlinkHref="#a" y1="241.7" y2="241.7"/>
    <linearGradient id="e" gradientUnits="userSpaceOnUse" x1="165.8" x2="171.6" xlinkHref="#a" y1="160.3" y2="160.3"/>
    <linearGradient id="b">
      <stop offset="0" stopColor={"#55cd96"}/>
      <stop offset="1" stopColor={"#41c387"}/>
    </linearGradient>
    <linearGradient id="f" gradientUnits="userSpaceOnUse" x1="87.4" x2="203.8" xlinkHref="#b" y1="181.3" y2="181.3"/>
    <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="32.4" x2="71.2" xlinkHref="#b" y1="204.8" y2="204.8"/>
    <path d="M79.3 40.2a61.8 61.8 0 01-16.5 38.2 112 112 0 00-30.4 86.2v.2a69.5 69.5 0 0069 60.5c7.3 0 14.3-1.9 20.4-5.2a36 36 0 00-23.4-11 94.8 94.8 0 011.5-91.5l.7-1.2.7-1.1.7-1.1c5.9-9.4 14-16.5 23.1-21.1l.7-.4a99.6 99.6 0 0028.5-21c5.8-6 10-13 12.9-20.3a100.6 100.6 0 00-87.9-11.2zM128 66a8.4 8.4 0 110-16.7 8.4 8.4 0 010 16.7z" fill="url(#c)"/>
    <path d="M131.8 245h-.1" fill="none"/>
    <path d="M243.7 225c0 50.6-38.1 94-89.5 99.7a92.4 92.4 0 0039.4-124c-12-23.1-37.6-30-61.8-30a36 36 0 0010.4-1.5c8-2 16.5-5.8 23.7-8a57 57 0 018.9-2.1 62.2 62.2 0 0169 65.9z" fill="url(#d)"/>
    <path d="M171.6 159.6c-2 .3-4 .9-5.8 1.5" fill="url(#e)"/>
    <path d="M203.8 242.8v1.9a36 36 0 00-72.1.2 95.3 95.3 0 01-31.8-127.3 36 36 0 0031.8 53c24.3 0 49.9 7 61.9 30 7 13.5 10.2 28 10.2 42.2z" fill="url(#f)"/>
    <path d="M71.2 218.4A36 36 0 0059.6 245l-1.6-2.4-1.4-2.5-.1-.1a355 355 0 01-2.8-4.9l-.2-.3-2.5-4.8-1.3-2.6-1.2-2.6-1.2-2.7-1.2-2.6-1.1-2.7-.1-.3a150.4 150.4 0 01-2.3-5.8c0-.2 0-.4-.2-.5l-.8-2.3-.8-2.4-.3-1-.7-2.1-.2-.8-.6-2.1-.2-.6-.6-2.2-.8-2.9-.7-2.8a121.4 121.4 0 01-2.8-14v-.5l-.4-2.4-.4-3-.2-1.4-.2-2-.3-2.7v-.2c3 23.8 18 43.8 38.8 53.7z" fill="url(#g)"/>
  </svg>

)

export default Logo
