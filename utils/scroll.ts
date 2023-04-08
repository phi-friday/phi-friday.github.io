const get_bottom = () => {
  return document.documentElement.scrollTop + window.innerHeight;
};

const is_bottom = (offset: number) => {
  return get_bottom() + offset > document.documentElement.offsetHeight;
};

const create_go_to_top_button = (id: string, display_bound: number) => {
  let _button_from_id = document.getElementById(id);
  if (!_button_from_id) {
    throw createError({ statusCode: 500, statusMessage: `element not found: ${id}` });
  }
  const button_from_id = _button_from_id as HTMLElement;
  const scroll_func = () => {
    if (display_bound <= 0) {
      button_from_id.style.display = 'block';
      return;
    }
    if (
      document.body.scrollTop > display_bound ||
      document.documentElement.scrollTop > display_bound
    ) {
      button_from_id.style.display = 'block';
    } else {
      button_from_id.style.display = 'none';
    }
  };
  const to_top = () => {
    window.scroll({ top: 0, behavior: 'auto' });
  };
  window.onscroll = () => {
    scroll_func();
  };
  button_from_id.addEventListener('click', to_top);
};

const create_go_to_bottom_button = (id: string, display_bound: number) => {
  let _button_from_id = document.getElementById(id);
  if (!_button_from_id) {
    throw createError({ statusCode: 500, statusMessage: `element not found: ${id}` });
  }
  const button_from_id = _button_from_id as HTMLElement;
  const scroll_func = () => {
    if (display_bound <= 0) {
      button_from_id.style.display = 'block';
      return;
    }
    if (
      document.body.scrollTop > display_bound ||
      document.documentElement.scrollTop > display_bound
    ) {
      button_from_id.style.display = 'block';
    } else {
      button_from_id.style.display = 'none';
    }
  };
  const to_bottom = () => {
    window.scroll({ top: document.documentElement.offsetHeight, behavior: 'auto' });
  };
  window.onscroll = () => {
    scroll_func();
  };
  button_from_id.addEventListener('click', to_bottom);
};

const _throttle = (func: Function, period: number) => {
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

const create_scroll_event = (
  event_func: (this: Window, ev: Event) => any,
  throttle?: number
) => {
  let use_func: (this: Window, ev: Event) => any;
  if (throttle) {
    use_func = _throttle(event_func, throttle);
  } else {
    use_func = event_func;
  }
  window.addEventListener('scroll', use_func);
};

export {
  get_bottom,
  is_bottom,
  create_go_to_top_button,
  create_go_to_bottom_button,
  create_scroll_event,
};
