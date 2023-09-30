import React from 'react'
import Image from 'next/image'
function Logo() {
  return (
    <React.Fragment>
        <Image width={130} height={130} alt='Logo' src={"./logo.svg"}/>
    </React.Fragment>
  )
}

export default Logo