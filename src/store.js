import { create } from "zustand";

export const useUiStore = create(set => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export const useDataStore = create(set => ({
  nonce: null,
  homeUrl: null,
  setNonce: (nonce) => set({ nonce }),
  setHomeUrl: (homeUrl) => set({ homeUrl }),
}));


const commonStoreInitialState = {
  selectedEntityId: null,
  attachmentModalOpen: false,
  isFormDialogOpen: false,
  formMode: null,
};

const formDialogHandlers = (set) => ({
  handleFormDialogOpen: (
    formMode,
    entityId = null,
    attachmentKey = null
  ) => {
    set({
      formMode,
      selectedEntityId: entityId,
      isFormDialogOpen: true,
      attachmentKey: attachmentKey,
    });
  },
  handleFormDialogClose: () => {
    set({
      formMode: null,
      selectedEntityId: null,
      isFormDialogOpen: false,
      attachmentKey: null,
    });
  },
});

const createEntityStore = (entityKey) =>
  create((set) => ({
    entityKey,
    ...commonStoreInitialState,
    ...formDialogHandlers(set),
  }));
const stores = {};

export const getEntityStore = (entityKey) => {
  if (!stores[entityKey]) {
    stores[entityKey] = createEntityStore(entityKey);
  }
  return stores[entityKey];
};