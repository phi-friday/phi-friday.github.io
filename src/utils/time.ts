// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const throttle = (func: Function, period: number) => {
  let run: boolean = true;
  return function inner(this: unknown) {
    if (run) {
      // eslint-disable-next-line prefer-rest-params
      func.apply(this, arguments);
      run = false;
      setTimeout(() => {
        run = true;
      }, period);
    }
  };
};

export { throttle };
