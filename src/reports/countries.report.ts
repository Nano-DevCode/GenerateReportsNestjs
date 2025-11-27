import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { countries as Country } from '@prisma/client';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const getCountryReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subTitle, countries } = options;
  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ? title : 'Countries Report',
      subTitle: subTitle ? subTitle : 'List of countries',
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'customLayout01', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            ['ID', 'ISO02', 'ISO03', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3 ?? '',
              { text: country.name ?? '', bold: true },
              country.continent ?? '',
              country.local_name ?? '',
            ]),
            ['', '', '', '', '', ``],
            ['', '', '', '', 'Total', `${countries.length}`],
          ],
        },
      },
      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 50, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Total de paises',
                colSpan: 3,
                bold: true,
              },
              {},
              {},
              {
                text: countries.length.toString(),
                bold: true,
              },
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
