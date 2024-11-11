import create from 'zustand';

const useStore = create((set) => ({
    stateEmail: '',
    setStateEmail: (stateEmail) => set({ stateEmail })
}))

export default useStore;