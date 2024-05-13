export const OrderBoards = (a: any, b: any) => {
  const nameA = a.LastEditedAt;
  const nameB = b.LastEditedAt;
  if (nameA < nameB) {
    return 1;
  }
  if (nameA > nameB) {
    return -1;
  }

  // names must be equal
  return 0;
};
 