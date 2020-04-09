
import uuid from 'react-native-uuid'

export default (state = [], action) => {
    switch (action.type) {
        // case ADD_WALLET:
        //     return [
        //         ...state,
        //         {
        //             id: uuid.v4(),
        //             name: action.name,
        //             amount: action.initialAmount,
        //             userId: action.userId,
        //             createdDate: new Date(),
        //         },
        //     ]
        // case ADD_TRANSACTION: {
        //     return state.map(wallet => {
        //         if (wallet.id === action.walletId) {
        //             return {
        //                 ...wallet,
        //                 amount: action.mode === 'EXPENSE' ? (wallet.amount + -action.amount) : (wallet.amount + +action.amount),
        //             }
        //         }
        //         return wallet
        //     })
        // }
        default:
            return state
    }
}
