import Script from 'next/script'

const UmamiScript = () => {
  return (
    <>
      <Script
        async
        defer
        data-website-id="e1e23abc-a33d-438b-9621-a961221fdd51"
        src="https://umami.honghong.me/umami.js"
      />
    </>
  )
}

export default UmamiScript
