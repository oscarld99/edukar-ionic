import React, { ReactChild } from 'react'

import './loader.scss'
interface n {
  children?: ReactChild
  classStyle: string
}
const Loader: React.FC<n> = ({ children, classStyle = '' }: n) => {
  return (
    <div className={`loader ${classStyle}`}>
      {children}
    </div>
  )
}

export default Loader
