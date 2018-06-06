export default function promiseMiddleware({ dispatch, getState }) {
  return next => (action) => {
    if (typeof action === 'function') {
      return action({ dispatch, getState });
    }
    const { promise, types, ...rest } = action;

    if (!promise) {
      return next({
        ...action,
      });
    }
    if (typeof types === 'undefined') {
      throw new Error('types not provided');
    }
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });
    
    const handleError = (error = 'Something went wrong, please try again.') => {
      next({ ...rest, error: (error.message || error), type: FAILURE });
      window.location = '/error/500';
    }

    return promise({ dispatch, getState }).then(
      (result) => {
        if (result && result.error) {
          if (result.msg === 'User Authentication Error') {
            console.log("Not auth");
          } else {
            return next({
              ...rest,
              error: result.error || result,
              type: FAILURE,
            });
          }
        }
        return next({
          ...rest,
          result,
          type: SUCCESS,
        });
      },
      // error in parsing json, show Something went wrong
      error => handleError(error.message),
    ).catch(handleError);
  };
}
