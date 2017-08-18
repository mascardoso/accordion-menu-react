import React from 'react'
import styles from './ui-main-menu.scss'

const MenuHeader = ({data, handleMenuHeaderClick, active}) => {
  return (
    <li>
      <span
        href={data.anchor}
        className={`${styles.ui_mainmenu_header_item} ${active ? styles.ui_mainmenu_header_item_active : ''}`}
        onClick={(ev) => { handleMenuHeaderClick(ev, data) }}
      >
        {data.name}
      </span>
    </li>
  )
}

export default MenuHeader
