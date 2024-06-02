import create from 'zustand';

const useStore = create((set) => ({
  color: 'rgb(86, 30, 203)',
  description: '',
  palettes: [],
  setColor: (color) => set({ color }),
  setDescription: (description) => set({ description }),
  addPalette: (palette) => set((state) => ({ palettes: [...state.palettes, palette] })),
}));

export default useStore;
