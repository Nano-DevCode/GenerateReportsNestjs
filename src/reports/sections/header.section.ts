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

export const headerSection = (options: HeaderOption): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content | null = showLogo ? logo : null;
  const headerDate: Content | null = showDate
    ? {
        text: DateFormatter.getDDMMMMYYYY(new Date()),
        alignment: 'right',
        margin: [20, 20],
      }
    : null;
  const headerTitle: Content | null = title
    ? {
        text: title,
        style: {
          bold: true,
        },
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate].filter(Boolean) as Content[],
  };
};
