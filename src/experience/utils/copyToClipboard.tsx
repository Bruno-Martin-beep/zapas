export const copyToClipboard = (color: string) => {
  navigator.clipboard.writeText(color);
};

export default copyToClipboard