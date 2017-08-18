import React from 'react'
import styles from './ui-header.scss'

const MainHeader = () => {
  const bgImageUrl = process.env.NODE_ENV === 'production' ? '' : ''

  return (
    <div
      className={styles.ui_mainheader}
      style={{backgroundImage: `url(${bgImageUrl})`}}
    />
  )
}

export default MainHeader
