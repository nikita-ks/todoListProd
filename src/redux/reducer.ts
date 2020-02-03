let initialState = {
    todoLists: [
        {
            id: '0', order: 2, title: 'todoy', addedDate: '1', tasks: [
                {id: '0', title: 'first', desc: 'first task'},
                {id: '1', title: 'first', desc: 'first task'},
                {id: '1', title: 'first', desc: 'first task'},
            ]
        },
        // {
        //     id: 1, title: 'todoy1', tasks: [
        //         {id: 0, title: 'second', desc: 'second task'},
        //         {id: 1, title: 'second', desc: 'second task'},
        //     ]
        // },
    ]
};
export const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        default:
            return state;
    }
};