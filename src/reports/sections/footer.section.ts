import { Content } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
): Content => {
  return {
    text: `${currentPage} de ${pageCount}`,
    alignment: 'right',
    margin: [0, 20, 50, 0],
    fontSize: 12,
    style: {
      bold: true,
    },
  };
};
