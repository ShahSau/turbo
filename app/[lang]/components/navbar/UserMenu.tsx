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
import MenuItem from './MenuItem';
import Avatar from '../Avatar';
import useEquipmentModal from '@/app/[lang]/hooks/useEquipmentModal';



interface UserMenuProps {
  currentUser?: SafeUser | null,
  lang: any,
  dictionary: any,
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

  // eslint-disable-next-line consistent-return
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  const logout = () => {
    signOut();
    router.replace('/');
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-12">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
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
        <div
          className="absolute rounded-xl shadow-md w-[145px] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label={dictionary.navBar.trips}
                  onClick={() => router.push(`/${lang}/trips`)}
                />
                <MenuItem
                  label={dictionary.navBar.favorites}
                  onClick={()=> router.push(`/${lang}/favorites`)}
                />
                <MenuItem
                  label={dictionary.navBar.reservations}
                  onClick={() => router.push(`/${lang}/reservations`)}
                />
                <MenuItem
                  label={dictionary.navBar.cars}
                  onClick={() => router.push(`/${lang}/cars`)}
                />
                <MenuItem
                  label={dictionary.navBar.car}
                  onClick={() => rentModal.onOpen()}
                />
                <hr />
                <MenuItem
                  label={dictionary.navBar.service}
                  onClick={() => repairModal.onOpenRe()}
                />
                <MenuItem
                  label={dictionary.navBar.reservedOffers}
                  onClick={() => router.push(`/${lang}/serviceReservations`)}
                />
                <MenuItem
                  label={dictionary.navBar.offers}
                  onClick={() => router.push(`/${lang}/offers`)}
                />
                <hr />
                <MenuItem
                  label={dictionary.navBar.equipment}
                  onClick={() => equipmentModal.onOpenE()}
                />
                <MenuItem
                  label={dictionary.navBar.myEquipment}
                  onClick={() => router.push(`/${lang}/offerEquipments`)}
                />
                <MenuItem
                  label={dictionary.navBar.reservedEquipment}
                  onClick={() => router.push(`/${lang}/equipmentReservations`)}
                />
                <hr />
                <MenuItem
                  label={dictionary.navBar.logout}
                  onClick={() => logout()}
                />
              </>
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
