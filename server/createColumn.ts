const style = `display: flex; flex-direction: column;`


export const createColumn = (content: string) => {
  return `<div style="${style}">${content}</div>`;
}
