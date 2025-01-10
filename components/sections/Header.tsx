import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../mode-toggle'
import { MobileSheet } from '../shared/MobileSheet'

export default function Header() {
    return (
        <header className='bg-primary sticky top-0 z-40'>
            <div className='container p-4 flex items-center justify-between gap-2'>
                <Link href={'/'} >LOGO</Link>
                <nav className='hidden md:flex items-center gap-8'>
                    <Link href={'/'} >Home</Link>
                    <Link href={'/about'} >About</Link>
                    <Link href={'/contact'} >Contact</Link>
                </nav>
                <div className='ml-auto md:ml-0'>
                    <ModeToggle />
                </div>
                <div className='md:hidden'>
                    <MobileSheet />
                </div>
            </div>
        </header>
    )
}
