import { useState } from 'react'
import { AddServ, TitleTopBar, TopBar } from '@/components/Layout'
import classNames from 'classnames'
import { BasicModal } from '../BasicModal'
import styles from './BasicLayout.module.css'


export function BasicLayout(props) {

  const {
    children,
    relative= false,
    categorie,
  } = props

  return (
    <>
      <TopBar categorie={categorie} />
        <div className={classNames({[styles.relative]: relative})}>
          {children}
        </div>

    </>
  )
}
