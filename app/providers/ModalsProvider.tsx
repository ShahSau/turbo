'use client';

import React from 'react';
import LoginModal from '../components/modals/LoginModal';
import RegisterModal from '../components/modals/RegisterModal';

function ModalsProvider() {
  return (
    <>
      <LoginModal />
      <RegisterModal />

    </>
  );
}

export default ModalsProvider;
