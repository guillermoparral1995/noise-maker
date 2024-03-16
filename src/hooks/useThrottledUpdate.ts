import { ActionBuilder, ActionTypes } from '@types';
import { throttle } from 'lodash';
import { useCallback, useEffect } from 'react';

export default <T>(
  dispatch: React.Dispatch<ActionTypes>,
  throttleTime: number = 50,
) => {
  const handleUpdate = (action: ActionBuilder<T>, value: T) => {
    dispatch(action(value));
  };

  const throttledHandleChange = useCallback(
    throttle(handleUpdate, throttleTime),
    [dispatch],
  );

  useEffect(() => {
    return () => throttledHandleChange.cancel();
  }, []);

  return throttledHandleChange;
};
