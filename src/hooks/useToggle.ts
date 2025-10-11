import { useState } from 'react';

export const useToggle = (initial = false) => {
  const [open, setOpen] = useState(initial);
  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);
  return { open, toggle, close };
};
