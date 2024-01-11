'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { i18n } from '@/i18n.config'

import { Menu, Transition } from '@headlessui/react'
import { HiChevronDown } from "react-icons/hi";
import { Fragment, use, useEffect, useState } from 'react'
import { TfiWorld } from "react-icons/tfi";
import Flag from 'react-world-flags'
import { IoCheckmarkSharp } from "react-icons/io5";


export default function LocaleSwitcher() {
  const pathName = usePathname()
  const [language, setLanguage] = useState('')

  useEffect(() => {
    if (pathName){
      const segments = pathName.split('/')
      setLanguage(segments[1])
    }
  }
  , [language])


  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <TfiWorld className='h-6 w-6'/>
          <HiChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="">
            {i18n.locales.map(locale => {
              return (
                <Menu.Item key={locale}>
                  <Link
                    href={redirectedPathName(locale)}
                    className='text-gray-700  px-4 py-2 text-sm flex flex-column gap-6 hover:bg-gray-300'
                    
                  >
                    
                    {
                      locale === 'en' ? <Flag code='us' height='24' width='24'/> : locale === 'sv' ? <Flag code={'se'} height='24' width='24'/> : <Flag code={locale} height='24' width='24'/>
                    }
                    {
                      locale === 'en'? 'USA' : locale === 'sv' ? 'SE' : locale === 'de' ? 'DE' : 'FI'
                    }
                    
                    {locale == language ?<div className='w-full h-full text-blue-700'><IoCheckmarkSharp /></div>  : null}
                  </Link>
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}