const throttle = (func: Function, period: number) => {
  let run: boolean = true;
  return function inner(this: any) {
    if (run) {
      func.apply(this, arguments);
      run = false;
      setTimeout(() => {
        run = true;
      }, period);
    }
  };
};

export { throttle };