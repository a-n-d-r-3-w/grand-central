const initialState = {
  people: []
};

export const aboutOthersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PERSON':
      const people = JSON.parse(JSON.stringify(state.people));
      people.push(action.person);
      return {
        people
      };
    default:
      return state;
  }
};
