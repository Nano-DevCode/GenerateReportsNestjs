import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

interface HeaderOption {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  margin: [0, 0, 0, 20],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 20],
};

export const headerSection = (options: HeaderOption): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerSubTitle: Content | null = subTitle
    ? {
        text: subTitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
          fontSize: 16,
          bold: true,
        },
      }
    : null;
  const headerLogo: Content | null = showLogo ? logo : null;
  const headerDate: Content | null = showDate ? currentDate : null;
  const headerTitle: Content | null = title
    ? {
        stack: [
          {
            text: title,
            alignment: 'center',
            margin: [0, 15, 0, 0],
            style: {
              bold: true,
              fontSize: 22,
            },
          },
          headerSubTitle,
        ].filter(Boolean) as Content[],
      }
    : null;

  return {
    columns: [
      headerLogo,
      { width: '*', text: '' },
      {
        width: 'auto',
        stack: [headerTitle].filter(Boolean),
        alignment: 'center',
      },
      { width: '*', text: '' },
      headerDate,
    ].filter(Boolean) as Content[],
  };
};
