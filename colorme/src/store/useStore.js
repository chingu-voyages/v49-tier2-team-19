import { create } from 'zustand';

const useStore = create((set) => ({
  color: { hex: '#5620cb', rgb: { r: 86, g: 30, b: 203, a: 1 }, hsv: { h: 270, s: 85, v: 80, a: 1 } },
  setColor: (newColor) => set({ color: newColor }),
  describeText: 'my livingroom couch',
  setDescribeText: (newText) => set({ describeText: newText }),
  recommendation: '',
  setRecommendation: (newRecommendation) => set({ recommendation: newRecommendation }),
}));

export default useStore;
