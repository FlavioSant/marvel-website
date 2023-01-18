import classNames from 'classnames';
import { useState } from 'react';
import { List } from 'phosphor-react';
import { Logo } from './Logo';

export const Header = () => {
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);

  return (
    <header className="flex p-4 bg-neutral-800 border-b border-neutral-600 md:p-3">
      <div className="container flex flex-wrap items-center justify-between mx-auto lg:justify-start lg:flex-nowrap">
        <div>
          <a href="">
            <Logo />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuMobileOpen(!isMenuMobileOpen)}
          className="inline-flex items-center p-2 rounded-lg text-neutral-200 lg:hidden hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-200"
        >
          <List size={24} />
        </button>

        <nav
          className={classNames(
            'w-full rounded-lg mt-4 bg-neutral-900 lg:bg-transparent lg:m-0',
            isMenuMobileOpen ? 'flex' : 'hidden lg:block',
          )}
        >
          <ul className="p-4 w-full space-y-2 lg:flex lg:justify-center lg:space-y-0 lg:p-0">
            <li>
              <a
                href=""
                className="block py-2 pl-3 pr-4 rounded-md font-medium text-neutral-300 hover:text-neutral-50 lg:p-3"
              >
                Personagens
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
