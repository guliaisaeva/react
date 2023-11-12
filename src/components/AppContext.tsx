import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from 'react';

interface AppState {
  searchValue: string;
  itemList: string[];
  isLoading: boolean;
}

// Define specific action types
type Action =
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'SET_ITEM_LIST'; payload: string[] };

interface AppContextProps {
  state: AppState;
  dispatch: Dispatch<Action>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const initialState: AppState = {
  searchValue: '',
  itemList: [],
  isLoading: false,
  // other state properties...
};

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    case 'SET_ITEM_LIST':
      return { ...state, itemList: action.payload };
    // other cases...
    default:
      return state;
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
