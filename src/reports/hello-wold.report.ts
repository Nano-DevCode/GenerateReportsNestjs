import { TDocumentDefinitions } from 'pdfmake/interfaces';

interface Reportoptions {
  name: string;
}

export const getHelloWoldReport = (options: Reportoptions) => {
  const { name } = options;

  const docDefinition: TDocumentDefinitions = {
    content: [`Hola mundo ${name}`],
  };
  return docDefinition;
};
