import { create } from 'zustand';


const useStore = create((set) => ({
    isLoggedIn: false,
    usuarios: [],
    usuarioAtual: null,
    endereco: null,

    setIsLoggedIn: (status) => set({ isLoggedIn: status }),
    setUsuarios: (usuarios) => set({ usuarios }),
    setUsuarioAtual: (usuario) => set({ usuarioAtual: usuario }),
    setEndereco: (endereco) => set({ endereco }),

    logout: () => set({ isLoggedIn: false, usuarioAtual: null, endereco: null }),
}));

export default useStore;
