import create from 'zustand';

const useStore = create((set) => ({
  color: { rgb: { r: 86, g: 30, b: 203, a: 1 }, hex: '#561ECB', hsv: { h: 250, s: 85, v: 79, a: 1 } },
  description: '',
  palettes: [],
  setColor: (color) => set({ color }),
  setDescription: (description) => set({ description }),
  addPalette: (palette) => set((state) => ({ palettes: [...state.palettes, palette] })),
}));

export default useStore;
