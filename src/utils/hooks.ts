import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

export function useStore<T> (Context: React.Context<T | undefined>) {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useStore must be used within that StoreProvider');
    }
    return context;
};

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}
