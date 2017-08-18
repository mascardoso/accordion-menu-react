import React from 'react'
import styles from './ui-main-menu.scss'

const ListItem = ({children, data, hasSubmenu, handleMenuItemClick, isOpen}) => {
  return (
    <li className={`${styles.ui_submenu_item}`}>
      <span
        onClick={(ev) => { hasSubmenu ? handleMenuItemClick(ev, data) : ev.preventDefault() }}
        className={`
          ${styles.ui_submenu_item_label}
          ${hasSubmenu ? 'icon-arrow-down-thicker' : ''}
          ${hasSubmenu && isOpen ? styles.ui_submenu_item_label_active : ''}
        `}
      >
        {data.name}
      </span>
      {children}
    </li>
  )
}

export default ListItem
