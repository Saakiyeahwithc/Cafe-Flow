export const addMenuItem = (items, item) => {
  const newId = Math.max(...items.map((i) => i.id), 0) + 1;
  return [...items, { ...item, id: newId }];
};

export const removeMenuItem = (items, id) => {
  return items.filter((item) => item.id !== id);
};

export const toggleMenuItemAvailability = (items, id) => {
  return items.map((item) =>
    item.id === id ? { ...item, available: !item.available } : item,
  );
};

export const updateMenuItem = (items, id, updates) => {
  return items.map((item) => (item.id === id ? { ...item, ...updates } : item));
};
