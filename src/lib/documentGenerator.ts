import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

export interface DocumentData {
  type: 'termos-de-uso' | 'politica-de-privacidade';
  personType: 'PF' | 'PJ';
  name: string;
  cpfCnpj: string;
  serviceDescription: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  dpoEmail: string;
  features?: string[];
  dataTypes?: string[];
}

// Função para gerar conteúdo de Termos de Uso
function generateTermosDeUso(data: DocumentData): string {
  const currentDate = new Date().toLocaleDateString('pt-BR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return `
TERMOS DE USO

Última atualização: ${currentDate}

1. INFORMAÇÕES GERAIS

Estes Termos de Uso regulam a utilização dos serviços oferecidos por ${data.name}, ${data.personType === 'PJ' ? 'CNPJ' : 'CPF'} ${data.cpfCnpj}, com sede em ${data.address}, ${data.city} - ${data.state}.

${data.serviceDescription}

Ao acessar e utilizar nossos serviços, você concorda integralmente com estes Termos de Uso.

2. OBJETO

2.1. Os presentes Termos de Uso têm por objeto regular a prestação de serviços oferecidos através da plataforma ${data.website || 'nossa plataforma digital'}.

2.2. Os serviços disponibilizados incluem: ${data.serviceDescription}

3. CADASTRO E CONTA DE ACESSO

3.1. Para utilização dos nossos serviços, o usuário deverá realizar cadastro, fornecendo informações verdadeiras, precisas, atuais e completas.

3.2. O usuário é responsável por manter a confidencialidade de sua senha e conta, bem como por todas as atividades que ocorram sob sua conta.

3.3. O usuário se compromete a notificar imediatamente sobre qualquer uso não autorizado de sua conta.

4. OBRIGAÇÕES DO USUÁRIO

4.1. O usuário se compromete a:
   a) Utilizar os serviços de forma ética e legal;
   b) Não violar direitos de terceiros;
   c) Não utilizar os serviços para fins ilícitos;
   d) Fornecer informações verdadeiras durante o cadastro;
   e) Manter suas informações de cadastro atualizadas.

4.2. É vedado ao usuário:
   a) Copiar, modificar ou distribuir conteúdo da plataforma sem autorização;
   b) Realizar engenharia reversa ou tentar obter código-fonte;
   c) Utilizar scripts ou métodos automatizados não autorizados;
   d) Transmitir vírus ou códigos maliciosos;
   e) Interferir no funcionamento da plataforma.

5. SERVIÇOS OFERECIDOS

5.1. Descrição dos Serviços:
${data.serviceDescription}

${data.features && data.features.length > 0 ? `
5.2. Funcionalidades Disponíveis:
${data.features.map((f, i) => `   ${i + 1}) ${f}`).join('\n')}
` : ''}

6. PAGAMENTOS E ASSINATURAS

6.1. Os serviços podem ser disponibilizados mediante pagamento, conforme planos descritos na plataforma.

6.2. Os valores e formas de pagamento estão descritos na área de preços da plataforma.

6.3. O não pagamento pode resultar na suspensão ou cancelamento da conta.

6.4. Não há reembolso após a prestação do serviço, exceto nos casos previstos em lei.

7. PROPRIEDADE INTELECTUAL

7.1. Todo conteúdo disponibilizado na plataforma, incluindo mas não se limitando a textos, gráficos, logos, ícones, imagens, clipes de áudio, downloads digitais e software, é de propriedade de ${data.name} ou de seus fornecedores de conteúdo.

7.2. É vedada a reprodução, distribuição, modificação ou uso comercial sem autorização prévia e expressa.

8. PRIVACIDADE E PROTEÇÃO DE DADOS

8.1. A coleta, uso e armazenamento de dados pessoais são regidos pela nossa Política de Privacidade, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).

8.2. Para questões relacionadas à proteção de dados, entre em contato com nosso Encarregado de Dados (DPO): ${data.dpoEmail}

9. MODIFICAÇÕES DOS TERMOS

9.1. Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento.

9.2. As alterações entrarão em vigor imediatamente após sua publicação na plataforma.

9.3. O uso continuado dos serviços após as alterações constitui aceitação dos novos termos.

10. RESCISÃO

10.1. O usuário pode cancelar sua conta a qualquer momento através das configurações da plataforma.

10.2. Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos de Uso.

11. LIMITAÇÃO DE RESPONSABILIDADE

11.1. Não nos responsabilizamos por:
   a) Interrupções ou erros no acesso à plataforma;
   b) Vírus ou componentes prejudiciais transmitidos por terceiros;
   c) Danos decorrentes do uso indevido da plataforma;
   d) Perda de dados causada por falhas técnicas.

11.2. A plataforma é fornecida "como está", sem garantias de qualquer tipo.

12. DISPOSIÇÕES GERAIS

12.1. Estes Termos constituem o acordo integral entre as partes.

12.2. A tolerância de uma parte quanto ao descumprimento não constitui novação ou renúncia de direitos.

12.3. Se qualquer disposição for considerada inválida, as demais permanecerão em vigor.

13. LEI APLICÁVEL E FORO

13.1. Estes Termos serão regidos pelas leis da República Federativa do Brasil.

13.2. Fica eleito o foro da comarca de ${data.city} - ${data.state} para dirimir quaisquer controvérsias oriundas destes Termos.

14. CONTATO

Para questões relacionadas a estes Termos, entre em contato:
Email: ${data.email}
Telefone: ${data.phone}
${data.website ? `Website: ${data.website}` : ''}
Endereço: ${data.address}, ${data.city} - ${data.state}

---

Ao utilizar nossos serviços, você declara ter lido, compreendido e aceito integralmente estes Termos de Uso.

${data.name}
${data.personType === 'PJ' ? 'CNPJ' : 'CPF'}: ${data.cpfCnpj}
`;
}

// Função para gerar conteúdo de Política de Privacidade
function generatePoliticaPrivacidade(data: DocumentData): string {
  const currentDate = new Date().toLocaleDateString('pt-BR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return `
POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS

Última atualização: ${currentDate}

A ${data.name}, ${data.personType === 'PJ' ? 'CNPJ' : 'CPF'} ${data.cpfCnpj}, está comprometida com a privacidade e a proteção dos dados pessoais de seus usuários, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).

1. INFORMAÇÕES GERAIS

1.1. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.

1.2. Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política.

2. DEFINIÇÕES

Para os fins desta Política:
- Dados Pessoais: informação relacionada a pessoa natural identificada ou identificável;
- Titular: pessoa natural a quem se referem os dados pessoais;
- Tratamento: toda operação realizada com dados pessoais;
- Controlador: ${data.name};
- Encarregado (DPO): pessoa responsável pela proteção de dados, contato: ${data.dpoEmail}

3. DADOS COLETADOS

${data.dataTypes && data.dataTypes.length > 0 ? `
3.1. Coletamos os seguintes tipos de dados pessoais:
${data.dataTypes.map((d, i) => `   ${i + 1}) ${d}`).join('\n')}
` : `
3.1. Podemos coletar diferentes tipos de dados pessoais necessários para a prestação de nossos serviços.
`}

3.2. Dados fornecidos diretamente:
   - Dados de cadastro (nome, e-mail, telefone)
   - Dados de pagamento
   - Comunicações com nosso suporte

3.3. Dados coletados automaticamente:
   - Endereço IP
   - Tipo de navegador
   - Sistema operacional
   - Páginas visitadas
   - Tempo de acesso
   - Cookies e tecnologias similares

4. FINALIDADE DO TRATAMENTO

4.1. Utilizamos seus dados pessoais para:
   a) Prestar os serviços contratados;
   b) Processar pagamentos;
   c) Enviar comunicações sobre os serviços;
   d) Melhorar a experiência do usuário;
   e) Cumprir obrigações legais e regulatórias;
   f) Prevenir fraudes e garantir a segurança;
   g) Realizar análises estatísticas e de negócio.

5. BASE LEGAL PARA O TRATAMENTO

5.1. O tratamento de dados pessoais tem como base legal:
   a) Execução de contrato;
   b) Consentimento do titular;
   c) Cumprimento de obrigação legal ou regulatória;
   d) Exercício regular de direitos;
   e) Legítimo interesse do controlador;
   f) Proteção do crédito.

6. COMPARTILHAMENTO DE DADOS

6.1. Seus dados podem ser compartilhados com:
   - Prestadores de serviços (processamento de pagamentos, hospedagem, etc.);
   - Autoridades governamentais quando exigido por lei;
   - Parceiros comerciais, mediante seu consentimento.

6.2. Não vendemos seus dados pessoais a terceiros.

6.3. Exigimos que terceiros que acessam dados pessoais mantenham o mesmo nível de proteção.

7. ARMAZENAMENTO E SEGURANÇA

7.1. Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados contra acesso não autorizado, perda, destruição ou alteração.

7.2. Medidas de segurança incluem:
   - Criptografia de dados sensíveis;
   - Controle de acesso restrito;
   - Monitoramento de segurança;
   - Backups regulares;
   - Treinamento de equipe.

7.3. Seus dados são armazenados em servidores seguros localizados no Brasil e/ou em outros países que garantam nível adequado de proteção.

8. RETENÇÃO DE DADOS

8.1. Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades para as quais foram coletados.

8.2. Após o término da relação, os dados podem ser mantidos para:
   - Cumprimento de obrigações legais;
   - Exercício de direitos;
   - Fins estatísticos anonimizados.

8.3. Dados anonimizados podem ser mantidos por tempo indeterminado para fins estatísticos.

9. DIREITOS DO TITULAR

9.1. Você tem direito a:
   a) Confirmar a existência de tratamento;
   b) Acessar seus dados;
   c) Corrigir dados incompletos, inexatos ou desatualizados;
   d) Anonimizar, bloquear ou eliminar dados desnecessários;
   e) Solicitar portabilidade dos dados;
   f) Eliminar dados tratados com consentimento;
   g) Obter informações sobre compartilhamento;
   h) Revogar consentimento;
   i) Opor-se ao tratamento em determinadas situações.

9.2. Para exercer seus direitos, entre em contato com nosso DPO: ${data.dpoEmail}

9.3. Responderemos às solicitações em até 15 dias.

10. COOKIES E TECNOLOGIAS SIMILARES

10.1. Utilizamos cookies para melhorar a experiência de navegação.

10.2. Tipos de cookies utilizados:
   - Cookies essenciais (necessários para funcionamento);
   - Cookies de desempenho (análise de uso);
   - Cookies funcionais (preferências do usuário);
   - Cookies de marketing (publicidade direcionada).

10.3. Você pode gerenciar cookies através das configurações do navegador.

11. TRANSFERÊNCIA INTERNACIONAL DE DADOS

11.1. Dados pessoais podem ser transferidos para outros países quando necessário para prestação dos serviços.

11.2. Garantimos que tais transferências ocorram em conformidade com a LGPD e com adequadas salvaguardas.

12. MENORES DE IDADE

12.1. Nossos serviços não são direcionados a menores de 18 anos.

12.2. Não coletamos intencionalmente dados de menores sem consentimento dos responsáveis.

12.3. Se identificarmos coleta indevida, os dados serão prontamente excluídos.

13. ALTERAÇÕES NA POLÍTICA

13.1. Podemos atualizar esta Política periodicamente.

13.2. Alterações significativas serão comunicadas através da plataforma ou por e-mail.

13.3. Recomendamos revisar esta Política regularmente.

14. ENCARREGADO DE DADOS (DPO)

14.1. Nosso Encarregado de Proteção de Dados é responsável por:
   - Aceitar reclamações e comunicações;
   - Prestar esclarecimentos;
   - Adotar providências.

14.2. Contato do DPO:
Email: ${data.dpoEmail}

15. AUTORIDADE NACIONAL DE PROTEÇÃO DE DADOS (ANPD)

15.1. Você tem direito de apresentar reclamação à ANPD sobre o tratamento de seus dados pessoais.

15.2. Site da ANPD: https://www.gov.br/anpd

16. CONTATO

Para questões sobre esta Política de Privacidade:

${data.name}
${data.personType === 'PJ' ? 'CNPJ' : 'CPF'}: ${data.cpfCnpj}
Email: ${data.email}
Telefone: ${data.phone}
${data.website ? `Website: ${data.website}` : ''}
Endereço: ${data.address}, ${data.city} - ${data.state}

DPO: ${data.dpoEmail}

17. LEI APLICÁVEL

17.1. Esta Política é regida pelas leis brasileiras, especialmente pela LGPD (Lei 13.709/2018).

17.2. Foro: ${data.city} - ${data.state}

---

Ao utilizar nossos serviços, você declara ter lido e compreendido esta Política de Privacidade.

${data.name}
${data.personType === 'PJ' ? 'CNPJ' : 'CPF'}: ${data.cpfCnpj}
Data: ${currentDate}
`;
}

// Função para exportar como PDF
export async function exportToPDF(data: DocumentData): Promise<void> {
  const doc = new jsPDF();
  
  const content = data.type === 'termos-de-uso' 
    ? generateTermosDeUso(data) 
    : generatePoliticaPrivacidade(data);
  
  const title = data.type === 'termos-de-uso' ? 'Termos de Uso' : 'Política de Privacidade';
  
  // Configurações
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const maxWidth = pageWidth - (margin * 2);
  let y = margin;
  
  // Adicionar título
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title, pageWidth / 2, y, { align: 'center' });
  y += 15;
  
  // Adicionar conteúdo
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    
    if (line.trim() === '') {
      y += 5;
      continue;
    }
    
    // Detectar títulos (linhas em maiúsculas ou que começam com número)
    if (line.trim() === line.trim().toUpperCase() && line.trim().length > 0 && !line.includes('@') && !line.includes('.')) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
    } else if (/^\d+\./.test(line.trim())) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
    }
    
    const splitText = doc.splitTextToSize(line, maxWidth);
    
    for (const textLine of splitText) {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(textLine, margin, y);
      y += 6;
    }
  }
  
  // Salvar o PDF
  const fileName = `${title.toLowerCase().replace(/ /g, '-')}-${data.name.toLowerCase().replace(/ /g, '-')}.pdf`;
  doc.save(fileName);
}

// Função para exportar como Word
export async function exportToWord(data: DocumentData): Promise<void> {
  const content = data.type === 'termos-de-uso' 
    ? generateTermosDeUso(data) 
    : generatePoliticaPrivacidade(data);
  
  const title = data.type === 'termos-de-uso' ? 'TERMOS DE USO' : 'POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS';
  
  const lines = content.split('\n');
  const paragraphs: Paragraph[] = [];
  
  // Adicionar título
  paragraphs.push(
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );
  
  // Processar cada linha
  for (const line of lines) {
    if (line.trim() === '') {
      paragraphs.push(new Paragraph({ text: '' }));
      continue;
    }
    
    // Detectar títulos principais (maiúsculas)
    if (line.trim() === line.trim().toUpperCase() && line.trim().length > 0 && !line.includes('@') && !line.includes('.') && !line.includes('---')) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.trim(),
              bold: true,
              size: 24,
            }),
          ],
          spacing: { before: 300, after: 200 },
        })
      );
    }
    // Detectar subtítulos (começam com número)
    else if (/^\d+\./.test(line.trim())) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.trim(),
              bold: true,
              size: 22,
            }),
          ],
          spacing: { before: 200, after: 100 },
        })
      );
    }
    // Linha separadora
    else if (line.trim() === '---') {
      paragraphs.push(new Paragraph({ text: '' }));
    }
    // Texto normal
    else {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 20,
            }),
          ],
          spacing: { after: 100 },
        })
      );
    }
  }
  
  // Criar documento
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });
  
  // Gerar e salvar
  const blob = await Packer.toBlob(doc);
  const fileName = `${title.toLowerCase().replace(/ /g, '-')}-${data.name.toLowerCase().replace(/ /g, '-')}.docx`;
  saveAs(blob, fileName);
}

// Função helper para obter o conteúdo em texto puro (para preview)
export function getDocumentContent(data: DocumentData): string {
  return data.type === 'termos-de-uso' 
    ? generateTermosDeUso(data) 
    : generatePoliticaPrivacidade(data);
}
