import { useState } from 'react';

// 모달 상태 관리 훅
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};
