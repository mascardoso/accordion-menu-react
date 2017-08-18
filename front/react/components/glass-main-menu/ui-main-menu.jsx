import { menuItems } from './data'
import React, { Component } from 'react'
import ListItem from './ui-main-menu-listitem.jsx'
import MenuHeader from './ui-main-menu-header.jsx'
import styles from './ui-main-menu.scss'
import Velocity from 'velocity-animate'

class MainMenu extends Component {
  constructor () {
    super()
    this.state = {
      menuItems,
      foldedItems: {},
      activeMenu: menuItems[0].slug
    }
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
    this.handleMenuHeaderClick = this.handleMenuHeaderClick.bind(this)
    this.ulItems = []
    this.isMenuFolding = false
  }

  toggleMenuItem (slug, effect = null) {
    const ulItem = this.ulItems[slug]
    const animation = effect || getComputedStyle(ulItem).display === 'block' ? 'slideUp' : 'slideDown'
    Velocity(ulItem, animation, 200)
      .then(() => { this.isMenuFolding = false })
  }

  handleMenuItemClick (ev, itemData) {
    ev.preventDefault()

    if (!this.isMenuFolding) {
      this.isMenuFolding = true
      let isFolded, foldedItems

      if (this.props.collapsable) {
        isFolded = this.state.foldedItems[itemData.level] ? !this.state.foldedItems[itemData.level][itemData.slug] : true

        foldedItems = {
          ...this.state.foldedItems,
          [itemData.level]: {
            [itemData.slug]: isFolded
          }
        }

        if (!isFolded && this.state.foldedItems[itemData.level + 1]) {
          foldedItems[itemData.level + 1] = {}
        }
      } else {
        isFolded = !this.state.foldedItems[itemData.slug]

        foldedItems = {
          ...this.state.foldedItems,
          [itemData.slug]: isFolded
        }
      }

      this.setState({
        ...this.state,
        foldedItems
      })

      this.toggleMenuItem(itemData.slug)
    }
  }

  handleMenuHeaderClick (ev, itemData) {
    ev.preventDefault()

    this.setState({
      ...this.state,
      foldedItems: {},
      activeMenu: itemData.slug
    })
  }

  closeAllMenuItems (level, slug) {
    const slugState = level ? !this.state.foldedItems[level][slug] : !this.state.foldedItems[slug]

    if (slugState && typeof this.ulItems[slug] !== 'undefined') {
      this.toggleMenuItem(slug, 'slideUp')
    }
  }

  createMenuItem (data) {
    return data.map((item, keyIdx) => {
      const hasSubmenu = typeof item.submenu !== 'undefined'
      const hasLevel = typeof this.state.foldedItems[item.level] !== 'undefined'
      let isOpen = false

      // important to do this check in order to close or not all menu items when switching between parent menus
      if (hasLevel && this.props.collapsable) {
        this.closeAllMenuItems(item.level, item.slug)
        isOpen = this.state.foldedItems[item.level][item.slug]
      } else {
        this.closeAllMenuItems(null, item.slug)
        isOpen = this.state.foldedItems[item.slug]
      }

      if (hasSubmenu) {
        return (
          <ListItem
            key={keyIdx}
            data={item}
            handleMenuItemClick={this.handleMenuItemClick}
            isOpen={isOpen}
            hasSubmenu={hasSubmenu}
          >
            <ul
              className={`${styles.ui_submenu}`}
              ref={(el) => { this.ulItems[item.slug] = el }}
            >
              {this.createMenuItem(item.submenu)}
            </ul>
          </ListItem>
        )
      } else {
        return <ListItem key={item.slug} data={item} hasSubmenu={hasSubmenu} />
      }
    })
  }

  createMenuHeader (data) {
    return data.map((item) => {
      return (
        <MenuHeader
          data={item}
          key={item.slug}
          handleMenuHeaderClick={this.handleMenuHeaderClick}
          active={item.slug === this.state.activeMenu}
        />
      )
    })
  }

  createMenuContainers () {
    return this.state.menuItems.map((item) => {
      return (
        <ul
          key={item.slug}
          className={`${styles.ui_content} ${item.slug === this.state.activeMenu ? styles.ui_content_active : ''}`}
        >
          {this.createMenuItem(item.submenu)}
        </ul>
      )
    })
  }

  render () {
    return (
      <nav className={styles.ui_mainmenu}>
        <ul className={styles.ui_mainmenu_header}>
          {this.createMenuHeader(this.state.menuItems)}
        </ul>
        {this.createMenuContainers()}
        <ul className={styles.ui_mainmenu_footer}>
          <li><a href='#' className='icon-user'>My Account</a></li>
          <li><a href='#' className='icon-star-filled'>Hype</a></li>
          <li><a href='#' className='icon-locator'>Locator</a></li>
        </ul>
      </nav>
    )
  }
}

export default MainMenu
