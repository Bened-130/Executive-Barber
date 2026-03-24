import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, Cog6ToothIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', to: '/admin', icon: HomeIcon, current: true },
  { name: 'Clients', to: 'clients', icon: UsersIcon, current: false },
  { name: 'Bookings', to: 'salonbookings', icon: FolderIcon, current: false },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminNav() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Mobile sidebar */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform bg-[#3d2b4a] transition duration-300 ease-in-out">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="-m-2.5 p-2.5 absolute top-0 right-0"
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="size-6 text-white" />
            </button>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
              <div className="flex h-16 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.to}
                        className={classNames(
                          item.current ? 'bg-white/5 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-white' : 'text-gray-400 group-hover:text-white',
                            'size-6 shrink-0'
                          )}
                        />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto">
                <a
                  href="#"
                  className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  <Cog6ToothIcon className="size-6 shrink-0 text-gray-400 group-hover:text-white" />
                  Settings
                </a>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-[#3d2b4a]">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
          <div className="flex h-16 items-center">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    className={classNames(
                      item.current ? 'bg-white/5 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-white' : 'text-gray-400 group-hover:text-white',
                        'size-6 shrink-0'
                      )}
                    />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <a
              href="#"
              className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <Cog6ToothIcon className="size-6 shrink-0 text-gray-400 group-hover:text-white" />
              Settings
            </a>
          </div>
        </div>
      </div>

      {/* Top header */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-white/10 bg-[#3d2b4a] px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-400 hover:text-white lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="size-6" />
          </button>

          <form className="flex-1 relative">
            <input
              name="search"
              placeholder="Search"
              className="w-full bg-[#3d2b4a] pl-8 text-white text-sm placeholder-gray-500 outline-none"
            />
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 size-5 pointer-events-none" />
          </form>

          <div className="flex items-center gap-x-4">
            <button className="p-2.5 text-gray-400 hover:text-white">
              <BellIcon className="size-6" />
            </button>

            {/* User profile dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-800 outline outline-1 outline-white/10"
                />
                <ChevronDownIcon className="ml-2 size-5 text-gray-500" />
              </MenuButton>

              <MenuItems className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-gray-800 py-2 shadow-lg outline-none">
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={`block px-3 py-1 text-sm text-white ${active ? 'bg-white/5' : ''}`}
                      >
                        {item.name}
                      </a>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </>
  )
}