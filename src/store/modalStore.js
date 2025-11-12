import { create } from 'zustand';

const useModalStore = create((set) => ({
  // modalData가 null이 아닐 때 모달 띄우기
  modalData: null,

  // 모달 열기
  openModal: (modalType, modalProps = {}) => set({ modalData: { modalType, modalProps } }),

  // 모달 닫기
  closeModal: () => set({ modalData: null }),
}));

export default useModalStore;
