import { ADD_ITEM, REMOVE_ITEM } from "./ActionTypes";
const initialState = {
    items: [],
    OrderSummery: {
        "user_address": null, //int
        "street_address": null, //string
        "franchise": null, //int
        "service": null, //int
        "comments": null, //string
        "service_schedule_time": null, //string
        "service_schedule_date": null, //string
        "total_price": null, //float
        "visitCharges": null, //float
        "is_quick_book": false, //bool
    }
};
export const Reducers = (state = initialState, action) => {
   
    switch (action.type) {
        case ADD_ITEM: {

            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);

            if (itemIndex === -1) {
                return {
                    ...state,
                    items: [
                        ...state.items,
                        action.payload
                    ]
                };

            } else {
                const newItems = [...state.items];
                newItems[itemIndex].quantity += 1;
              
                newItems[itemIndex].subtotal =  (newItems[itemIndex].price*newItems[itemIndex].quantity)
                console.log(newItems)
                return {
                    ...state,
                    items: newItems
                };
            }
        }
        case REMOVE_ITEM: {

            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);

            if (itemIndex === -1) {
                return state;
            } else {
                const newItems = [...state.items];
                newItems[itemIndex].quantity -= 1;
                newItems[itemIndex].subtotal =  (newItems[itemIndex].price*newItems[itemIndex].quantity)
                if (newItems[itemIndex].quantity < 1) {
                    newItems.splice(itemIndex, 1)
                    return {
                        ...state,
                        items: newItems
                    };
                } else {

                    return {
                        ...state,
                        items: newItems
                    };
                }
            }
        }
        default:
            return state
    }
}