import { createContext, useState } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const onAddFood = (tamak) => {
    const existingTamak = items.find((food) => food.id === tamak.id);
    if (existingTamak === undefined) {
      setItems((prevState) => [...prevState, tamak]);
    } else {
      const updatedItems = items.map((food) => {
        if (food.id === tamak.id) {
          return { ...food, amount: +food.amount + +tamak.amount };
        }
        return food;
      });

      setItems(updatedItems);
    }
  };

  const onRemoveFood = (id) => {
    const existingTamak = items.findIndex((food) => food.id === id);
    if (existingTamak !== -1) {
      items[existingTamak].amount = items[existingTamak].amount - 1;
      if (items[existingTamak].amount===0){
        const updatedFood =items.splice(existingTamak,1)
        setItems(updatedFood)
      }
      const updatedTamak = items.splice(existingTamak, 1, items[existingTamak]);
      setItems(updatedTamak)
    }
  };
  const initialValue = { items, onAddFood, onRemoveFood };
  return (
    <BasketContext.Provider value={initialValue}>
      {children}
    </BasketContext.Provider>
  );
};



// const basketReducer = (state, action) => {
//     switch (action.type) {
//       case 'ADD_FOOD':
//         const existingTamak = state.items.find((food) => food.id === action.payload.id);
//         if (existingTamak === undefined) {
//           return {
//             ...state,
//             items: [...state.items, action.payload],
//           };
//         } else {
//           const updatedItems = state.items.map((food) => {
//             if (food.id === action.payload.id) {
//               return { ...food, amount: +food.amount + +action.payload.amount };
//             }
//             return food;
//           });
  
//           return {
//             ...state,
//             items: updatedItems,
//           };
//         }
//       case 'REMOVE_FOOD':
//         const existingFoodIndex = state.items.findIndex((food) => food.id === action.payload.id);
//         if (existingFoodIndex !== -1) {
//           const updatedItems = [...state.items];
//           updatedItems[existingFoodIndex].amount -= 1;
//           if (updatedItems[existingFoodIndex].amount === 0) {
//             updatedItems.splice(existingFoodIndex, 1);
//           }
//           return {
//             ...state,
//             items: updatedItems,
//           };
//         }
//         return state;
//       default:
//         return state;
//     }
//   };
  