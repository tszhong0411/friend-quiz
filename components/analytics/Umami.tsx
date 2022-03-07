import Script from 'next/script'

const UmamiScript = () => {
  return (
    <>
      <Script
        async
        defer
        data-website-id="93f723af-c96e-4469-9851-06f807f83236"
        src="https://umami.honghong.me/umami.js"
      />
    </>
  )
}

export default UmamiScript
