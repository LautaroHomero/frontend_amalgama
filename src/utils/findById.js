export const findById = (list, id) => {
    const item = list.find(el => el.id === id);
    return item?.name || "N/A";
  };
  