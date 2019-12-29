export interface Action<T = undefined> {
    type: string;
    payload: T;
}

export interface ReducerMethods<TState> {
    [actionType: string]: (state: TState, payload?: any) => TState;
}

// export class ReducerUtil {
//   public static wrapper<TState>(
//     initialState: TState,
//     reducerMethods: ReducerMethods<TState>
//   ) {
//     return (
//       state: TState = initialState,
//       action: Action = { type: "", payload: undefined }
//     ): TState => {
//       if (action.type in reducerMethods) {
//         return reducerMethods[action.type](state, action.payload);
//       }
//       return state;
//     };
//   }
// }
