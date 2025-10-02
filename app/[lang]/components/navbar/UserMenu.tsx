/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */

'use client';

import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/app/[lang]/types';

import useRegisterModal from '@/app/[lang]/hooks/useRegisterModal';
import useLoginModal from '@/app/[lang]/hooks/useLoginModal';
import useRentModal from '@/app/[lang]/hooks/useRentModal';
import useRepairModal from '@/app/[lang]/hooks/useRepairModal';
import useEquipmentModal from '@/app/[lang]/hooks/useEquipmentModal';
import MenuItem from './MenuItem';
import Avatar from '../Avatar';

interface UserMenuProps {
  currentUser?: SafeUser | null;
  lang: any;
  dictionary: any;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  lang,
  dictionary,
}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const repairModal = useRepairModal();
  const equipmentModal = useEquipmentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const logout = () => {
    signOut();
    setIsOpen(false);
    router.push(`/${lang}`);
  };

  const handleClick = (link: string) => {
    if (currentUser) {
      router.push(`/${lang}/${link}`);
      setIsOpen(false);
    } else {
      loginModal.onOpen();
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-12">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          {/* Add a car */}
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[400px] bg-white overflow-hidden right-0 top-12 text-sm p-2">
          <div className="flex flex-col cursor-pointer p-2">
            {currentUser ? (
              <div>
                <div className="flex gap-4">
                  <div>
                    <MenuItem
                      label={dictionary.navBar.trips}
                      onClick={() => handleClick('trips')}
                    />
                    <MenuItem
                      label={dictionary.navBar.favorites}
                      onClick={() => handleClick('favorites')}
                    />
                    <MenuItem
                      label={dictionary.navBar.reservations}
                      onClick={() => handleClick('reservations')}
                    />
                    <MenuItem
                      label={dictionary.navBar.cars}
                      onClick={() => handleClick('cars')}
                    />
                    <MenuItem
                      label={dictionary.navBar.car}
                      onClick={() => rentModal.onOpen()}
                    />
                  </div>
                  <hr />
                  <div>
                    <MenuItem
                      label={dictionary.navBar.service}
                      onClick={() => repairModal.onOpenRe()}
                    />
                    <MenuItem
                      label={dictionary.navBar.reservedOffers}
                      onClick={() => handleClick('serviceReservations')}
                    />
                    <MenuItem
                      label={dictionary.navBar.offers}
                      onClick={() => handleClick('offers')}
                    />
                  </div>
                  <hr />
                  <div>
                    <MenuItem
                      label={dictionary.navBar.equipment}
                      onClick={() => equipmentModal.onOpenE()}
                    />
                    <MenuItem
                      label={dictionary.navBar.myEquipment}
                      onClick={() => handleClick('offerEquipments')}
                    />
                    <MenuItem
                      label={dictionary.navBar.reservedEquipment}
                      onClick={() => handleClick('equipmentReservations')}
                    />
                  </div>
                </div>

                <span className="ml-auto mt-4 items-center gap-1 text-sm text-indigo-300 flex justify-end">
                  <MenuItem
                    label={dictionary.navBar.logout}
                    onClick={() => logout()}
                  />
                </span>
              </div>
            ) : (
              <>
                <MenuItem
                  label={dictionary.navBar.login}
                  onClick={loginModal.onOpen}
                />
                <MenuItem
                  label={dictionary.navBar.signup}
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
