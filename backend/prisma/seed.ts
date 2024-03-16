import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const states = [
    {
      "name": "Rio de Janeiro",
      "cities": [
          {
              "name": "Angra dos Reis"
          },
          {
              "name": "Aperibé"
          },
          {
              "name": "Araruama"
          },
          {
              "name": "Areal"
          },
          {
              "name": "Armação dos Búzios"
          },
          {
              "name": "Arraial do Cabo"
          },
          {
              "name": "Barra do Piraí"
          },
          {
              "name": "Barra Mansa"
          },
          {
              "name": "Belford Roxo"
          },
          {
              "name": "Bom Jardim"
          },
          {
              "name": "Bom Jesus do Itabapoana"
          },
          {
              "name": "Cabo Frio"
          },
          {
              "name": "Cachoeiras de Macacu"
          },
          {
              "name": "Cambuci"
          },
          {
              "name": "Campos dos Goytacazes"
          },
          {
              "name": "Cantagalo"
          },
          {
              "name": "Carapebus"
          },
          {
              "name": "Cardoso Moreira"
          },
          {
              "name": "Carmo"
          },
          {
              "name": "Casimiro de Abreu"
          },
          {
              "name": "Comendador Levy Gasparian"
          },
          {
              "name": "Conceição de Macabu"
          },
          {
              "name": "Cordeiro"
          },
          {
              "name": "Duas Barras"
          },
          {
              "name": "Duque de Caxias"
          },
          {
              "name": "Engenheiro Paulo de Frontin"
          },
          {
              "name": "Guapimirim"
          },
          {
              "name": "Iguaba Grande"
          },
          {
              "name": "Ilha Grande"
          },
          {
              "name": "Itaboraí"
          },
          {
              "name": "Itaguaí"
          },
          {
              "name": "Italva"
          },
          {
              "name": "Itaocara"
          },
          {
              "name": "Itaperuna"
          },
          {
              "name": "Itatiaia"
          },
          {
              "name": "Japeri"
          },
          {
              "name": "Laje do Muriaé"
          },
          {
              "name": "Macaé"
          },
          {
              "name": "Macuco"
          },
          {
              "name": "Magé"
          },
          {
              "name": "Mangaratiba"
          },
          {
              "name": "Maricá"
          },
          {
              "name": "Mendes"
          },
          {
              "name": "Mesquita"
          },
          {
              "name": "Miguel Pereira"
          },
          {
              "name": "Miracema"
          },
          {
              "name": "Natividade"
          },
          {
              "name": "Nilópolis"
          },
          {
              "name": "Niterói"
          },
          {
              "name": "Nova Friburgo"
          },
          {
              "name": "Nova Iguaçu"
          },
          {
              "name": "Paracambi"
          },
          {
              "name": "Paraíba do Sul"
          },
          {
              "name": "Paraty"
          },
          {
              "name": "Paty do Alferes"
          },
          {
              "name": "Petrópolis"
          },
          {
              "name": "Pinheiral"
          },
          {
              "name": "Piraí"
          },
          {
              "name": "Porciúncula"
          },
          {
              "name": "Porto Real"
          },
          {
              "name": "Quatis"
          },
          {
              "name": "Queimados"
          },
          {
              "name": "Quissamã"
          },
          {
              "name": "Resende"
          },
          {
              "name": "Rio Bonito"
          },
          {
              "name": "Rio Claro"
          },
          {
              "name": "Rio das Flores"
          },
          {
              "name": "Rio das Ostras"
          },
          {
              "name": "Rio de Janeiro"
          },
          {
              "name": "Santa Maria Madalena"
          },
          {
              "name": "Santo Antônio de Pádua"
          },
          {
              "name": "São Fidélis"
          },
          {
              "name": "São Francisco de Itabapoana"
          },
          {
              "name": "São Gonçalo"
          },
          {
              "name": "São João da Barra"
          },
          {
              "name": "São João de Meriti"
          },
          {
              "name": "São José de Ubá"
          },
          {
              "name": "São José do Vale do Rio Preto"
          },
          {
              "name": "São Pedro"
          },
          {
              "name": "São Pedro da Aldeia"
          },
          {
              "name": "São Sebastião do Alto"
          },
          {
              "name": "Sapucaia"
          },
          {
              "name": "Saquarema"
          },
          {
              "name": "Seropédica"
          },
          {
              "name": "Silva Jardim"
          },
          {
              "name": "Sumidouro"
          },
          {
              "name": "Tanguá"
          },
          {
              "name": "Teresópolis"
          },
          {
              "name": "Trajano de Moraes"
          },
          {
              "name": "Três Rios"
          },
          {
              "name": "Valença"
          },
          {
              "name": "Varre-Sai"
          },
          {
              "name": "Vassouras"
          },
          {
              "name": "Volta Redonda"
          }
      ]
    },
    {
      "name": "São Paulo",
      "cities": [
          {
              "name": "Adamantina"
          },
          {
              "name": "Adolfo"
          },
          {
              "name": "Aguaí"
          },
          {
              "name": "Águas da Prata"
          },
          {
              "name": "Águas de Lindóia"
          },
          {
              "name": "Águas de Santa Bárbara"
          },
          {
              "name": "Águas de São Pedro"
          },
          {
              "name": "Agudos"
          },
          {
              "name": "Alambari"
          },
          {
              "name": "Alfredo Marcondes"
          },
          {
              "name": "Altair"
          },
          {
              "name": "Altinópolis"
          },
          {
              "name": "Alto Alegre"
          },
          {
              "name": "Alumínio"
          },
          {
              "name": "Álvares Florence"
          },
          {
              "name": "Álvares Machado"
          },
          {
              "name": "Álvaro de Carvalho"
          },
          {
              "name": "Alvinlândia"
          },
          {
              "name": "Americana"
          },
          {
              "name": "Américo Brasiliense"
          },
          {
              "name": "Américo de Campos"
          },
          {
              "name": "Amparo"
          },
          {
              "name": "Analândia"
          },
          {
              "name": "Andradina"
          },
          {
              "name": "Angatuba"
          },
          {
              "name": "Anhembi"
          },
          {
              "name": "Anhumas"
          },
          {
              "name": "Aparecida"
          },
          {
              "name": "Aparecida d'Oeste"
          },
          {
              "name": "Apiaí"
          },
          {
              "name": "Araçariguama"
          },
          {
              "name": "Araçatuba"
          },
          {
              "name": "Araçoiaba da Serra"
          },
          {
              "name": "Aramina"
          },
          {
              "name": "Arandu"
          },
          {
              "name": "Arapeí"
          },
          {
              "name": "Araraquara"
          },
          {
              "name": "Araras"
          },
          {
              "name": "Arco-Íris"
          },
          {
              "name": "Arealva"
          },
          {
              "name": "Areias"
          },
          {
              "name": "Areiópolis"
          },
          {
              "name": "Ariranha"
          },
          {
              "name": "Artur Nogueira"
          },
          {
              "name": "Arujá"
          },
          {
              "name": "Aspásia"
          },
          {
              "name": "Assis"
          },
          {
              "name": "Atibaia"
          },
          {
              "name": "Auriflama"
          },
          {
              "name": "Avaí"
          },
          {
              "name": "Avanhandava"
          },
          {
              "name": "Avaré"
          },
          {
              "name": "Bady Bassitt"
          },
          {
              "name": "Balbinos"
          },
          {
              "name": "Bálsamo"
          },
          {
              "name": "Bananal"
          },
          {
              "name": "Barão de Antonina"
          },
          {
              "name": "Barbosa"
          },
          {
              "name": "Bariri"
          },
          {
              "name": "Barra Bonita"
          },
          {
              "name": "Barra do Chapéu"
          },
          {
              "name": "Barra do Turvo"
          },
          {
              "name": "Barretos"
          },
          {
              "name": "Barrinha"
          },
          {
              "name": "Barueri"
          },
          {
              "name": "Bastos"
          },
          {
              "name": "Batatais"
          },
          {
              "name": "Bauru"
          },
          {
              "name": "Bebedouro"
          },
          {
              "name": "Bento de Abreu"
          },
          {
              "name": "Bernardino de Campos"
          },
          {
              "name": "Bertioga"
          },
          {
              "name": "Bilac"
          },
          {
              "name": "Birigui"
          },
          {
              "name": "Biritiba Mirim"
          },
          {
              "name": "Biritiba-Mirim"
          },
          {
              "name": "Boa Esperança do Sul"
          },
          {
              "name": "Bocaina"
          },
          {
              "name": "Bofete"
          },
          {
              "name": "Boituva"
          },
          {
              "name": "Bom Jesus dos Perdões"
          },
          {
              "name": "Bom Sucesso de Itararé"
          },
          {
              "name": "Borá"
          },
          {
              "name": "Boracéia"
          },
          {
              "name": "Borborema"
          },
          {
              "name": "Borebi"
          },
          {
              "name": "Botucatu"
          },
          {
              "name": "Bragança Paulista"
          },
          {
              "name": "Braúna"
          },
          {
              "name": "Brejo Alegre"
          },
          {
              "name": "Brodósqui"
          },
          {
              "name": "Brodowski"
          },
          {
              "name": "Brotas"
          },
          {
              "name": "Buri"
          },
          {
              "name": "Buritama"
          },
          {
              "name": "Buritizal"
          },
          {
              "name": "Cabrália Paulista"
          },
          {
              "name": "Cabreúva"
          },
          {
              "name": "Caçapava"
          },
          {
              "name": "Cachoeira Paulista"
          },
          {
              "name": "Caconde"
          },
          {
              "name": "Cafelândia"
          },
          {
              "name": "Caiabu"
          },
          {
              "name": "Caieiras"
          },
          {
              "name": "Caiuá"
          },
          {
              "name": "Cajamar"
          },
          {
              "name": "Cajati"
          },
          {
              "name": "Cajobi"
          },
          {
              "name": "Cajuru"
          },
          {
              "name": "Campina do Monte Alegre"
          },
          {
              "name": "Campinas"
          },
          {
              "name": "Campo Limpo Paulista"
          },
          {
              "name": "Campos do Jordão"
          },
          {
              "name": "Campos Novos Paulista"
          },
          {
              "name": "Cananéia"
          },
          {
              "name": "Canas"
          },
          {
              "name": "Cândido Mota"
          },
          {
              "name": "Cândido Rodrigues"
          },
          {
              "name": "Canitar"
          },
          {
              "name": "Capâo Bonito"
          },
          {
              "name": "Capela do Alto"
          },
          {
              "name": "Capivari"
          },
          {
              "name": "Caraguatatuba"
          },
          {
              "name": "Carapicuíba"
          },
          {
              "name": "Cardoso"
          },
          {
              "name": "Casa Branca"
          },
          {
              "name": "Cássia dos Coqueiros"
          },
          {
              "name": "Castilho"
          },
          {
              "name": "Catanduva"
          },
          {
              "name": "Catiguá"
          },
          {
              "name": "Cedral"
          },
          {
              "name": "Cerqueira César"
          },
          {
              "name": "Cerquilho"
          },
          {
              "name": "Cesário Lange"
          },
          {
              "name": "Charqueada"
          },
          {
              "name": "Chavantes"
          },
          {
              "name": "Clementina"
          },
          {
              "name": "Colina"
          },
          {
              "name": "Colômbia"
          },
          {
              "name": "Conchal"
          },
          {
              "name": "Conchas"
          },
          {
              "name": "Cordeirópolis"
          },
          {
              "name": "Coroados"
          },
          {
              "name": "Coronel Macedo"
          },
          {
              "name": "Corumbataí"
          },
          {
              "name": "Cosmópolis"
          },
          {
              "name": "Cosmorama"
          },
          {
              "name": "Cotia"
          },
          {
              "name": "Cravinhos"
          },
          {
              "name": "Cristais Paulista"
          },
          {
              "name": "Cruzália"
          },
          {
              "name": "Cruzeiro"
          },
          {
              "name": "Cubatão"
          },
          {
              "name": "Cunha"
          },
          {
              "name": "Descalvado"
          },
          {
              "name": "Diadema"
          },
          {
              "name": "Dirce Reis"
          },
          {
              "name": "Divinolândia"
          },
          {
              "name": "Dobrada"
          },
          {
              "name": "Dois Córregos"
          },
          {
              "name": "Dolcinópolis"
          },
          {
              "name": "Dourado"
          },
          {
              "name": "Dracena"
          },
          {
              "name": "Duartina"
          },
          {
              "name": "Dumont"
          },
          {
              "name": "Echaporã"
          },
          {
              "name": "Eldorado"
          },
          {
              "name": "Elias Fausto"
          },
          {
              "name": "Elisiário"
          },
          {
              "name": "Embaúba"
          },
          {
              "name": "Embu"
          },
          {
              "name": "Embu das Artes"
          },
          {
              "name": "Embu Guaçu"
          },
          {
              "name": "Embu-Guaçu"
          },
          {
              "name": "Emilianópolis"
          },
          {
              "name": "Engenheiro Coelho"
          },
          {
              "name": "Espírito Santo do Pinhal"
          },
          {
              "name": "Espírito Santo do Turvo"
          },
          {
              "name": "Estiva Gerbi"
          },
          {
              "name": "Estrela d'Oeste"
          },
          {
              "name": "Estrela do Norte"
          },
          {
              "name": "Euclides da Cunha Paulista"
          },
          {
              "name": "Fartura"
          },
          {
              "name": "Fernando Prestes"
          },
          {
              "name": "Fernandópolis"
          },
          {
              "name": "Fernão"
          },
          {
              "name": "Ferraz de Vasconcelos"
          },
          {
              "name": "Flora Rica"
          },
          {
              "name": "Floreal"
          },
          {
              "name": "Flórida Paulista"
          },
          {
              "name": "Florínea"
          },
          {
              "name": "Franca"
          },
          {
              "name": "Francisco Morato"
          },
          {
              "name": "Franco da Rocha"
          },
          {
              "name": "Gabriel Monteiro"
          },
          {
              "name": "Gália"
          },
          {
              "name": "Garça"
          },
          {
              "name": "Gastão Vidigal"
          },
          {
              "name": "Gavião Peixoto"
          },
          {
              "name": "General Salgado"
          },
          {
              "name": "Getulina"
          },
          {
              "name": "Glicério"
          },
          {
              "name": "Guaiçara"
          },
          {
              "name": "Guaimbê"
          },
          {
              "name": "Guaíra"
          },
          {
              "name": "Guapiaçu"
          },
          {
              "name": "Guapiara"
          },
          {
              "name": "Guará"
          },
          {
              "name": "Guaraçaí"
          },
          {
              "name": "Guaraci"
          },
          {
              "name": "Guarani d'Oeste"
          },
          {
              "name": "Guarantã"
          },
          {
              "name": "Guararapes"
          },
          {
              "name": "Guararema"
          },
          {
              "name": "Guaratinguetá"
          },
          {
              "name": "Guareí"
          },
          {
              "name": "Guariba"
          },
          {
              "name": "Guarujá"
          },
          {
              "name": "Guarulhos"
          },
          {
              "name": "Guatapará"
          },
          {
              "name": "Guzolândia"
          },
          {
              "name": "Herculândia"
          },
          {
              "name": "Holambra"
          },
          {
              "name": "Hortolândia"
          },
          {
              "name": "Iacanga"
          },
          {
              "name": "Iacri"
          },
          {
              "name": "Iaras"
          },
          {
              "name": "Ibaté"
          },
          {
              "name": "Ibirá"
          },
          {
              "name": "Ibirarema"
          },
          {
              "name": "Ibitinga"
          },
          {
              "name": "Ibiúna"
          },
          {
              "name": "Icém"
          },
          {
              "name": "Iepê"
          },
          {
              "name": "Igaraçu do Tietê"
          },
          {
              "name": "Igarapava"
          },
          {
              "name": "Igaratá"
          },
          {
              "name": "Iguape"
          },
          {
              "name": "Ilha Comprida"
          },
          {
              "name": "Ilha Solteira"
          },
          {
              "name": "Ilhabela"
          },
          {
              "name": "Indaiatuba"
          },
          {
              "name": "Indiana"
          },
          {
              "name": "Indiaporã"
          },
          {
              "name": "Inúbia Paulista"
          },
          {
              "name": "Ipauçu"
          },
          {
              "name": "Ipaussu"
          },
          {
              "name": "Iperó"
          },
          {
              "name": "Ipeúna"
          },
          {
              "name": "Ipiguá"
          },
          {
              "name": "Iporanga"
          },
          {
              "name": "Ipuã"
          },
          {
              "name": "Iracemápolis"
          },
          {
              "name": "Irapuã"
          },
          {
              "name": "Irapuru"
          },
          {
              "name": "Itaberá"
          },
          {
              "name": "Itaí"
          },
          {
              "name": "Itajobi"
          },
          {
              "name": "Itaju"
          },
          {
              "name": "Itanhaém"
          },
          {
              "name": "Itaoca"
          },
          {
              "name": "Itapecerica da Serra"
          },
          {
              "name": "Itapetininga"
          },
          {
              "name": "Itapeva"
          },
          {
              "name": "Itapevi"
          },
          {
              "name": "Itapira"
          },
          {
              "name": "Itapirapuã Paulista"
          },
          {
              "name": "Itápolis"
          },
          {
              "name": "Itaporanga"
          },
          {
              "name": "Itapuí"
          },
          {
              "name": "Itapura"
          },
          {
              "name": "Itaquaquecetuba"
          },
          {
              "name": "Itararé"
          },
          {
              "name": "Itariri"
          },
          {
              "name": "Itatiba"
          },
          {
              "name": "Itatinga"
          },
          {
              "name": "Itirapina"
          },
          {
              "name": "Itirapuã"
          },
          {
              "name": "Itobi"
          },
          {
              "name": "Itu"
          },
          {
              "name": "Itupeva"
          },
          {
              "name": "Ituverava"
          },
          {
              "name": "Jaborandi"
          },
          {
              "name": "Jaboticabal"
          },
          {
              "name": "Jacareí"
          },
          {
              "name": "Jaci"
          },
          {
              "name": "Jacupiranga"
          },
          {
              "name": "Jaguariúna"
          },
          {
              "name": "Jales"
          },
          {
              "name": "Jambeiro"
          },
          {
              "name": "Jandira"
          },
          {
              "name": "Jardim Paulista"
          },
          {
              "name": "Jardinópolis"
          },
          {
              "name": "Jarinu"
          },
          {
              "name": "Jaú"
          },
          {
              "name": "Jeriquara"
          },
          {
              "name": "Joanópolis"
          },
          {
              "name": "João Ramalho"
          },
          {
              "name": "José Bonifácio"
          },
          {
              "name": "Júlio Mesquita"
          },
          {
              "name": "Jumirim"
          },
          {
              "name": "Jundiaí"
          },
          {
              "name": "Junqueirópolis"
          },
          {
              "name": "Juquiá"
          },
          {
              "name": "Juquitiba"
          },
          {
              "name": "Lagoinha"
          },
          {
              "name": "Laranjal Paulista"
          },
          {
              "name": "Lavínia"
          },
          {
              "name": "Lavrinhas"
          },
          {
              "name": "Leme"
          },
          {
              "name": "Lençóis Paulista"
          },
          {
              "name": "Limeira"
          },
          {
              "name": "Lindóia"
          },
          {
              "name": "Lins"
          },
          {
              "name": "Lorena"
          },
          {
              "name": "Lourdes"
          },
          {
              "name": "Louveira"
          },
          {
              "name": "Lucélia"
          },
          {
              "name": "Lucianópolis"
          },
          {
              "name": "Luís Antônio"
          },
          {
              "name": "Luiziânia"
          },
          {
              "name": "Lupércio"
          },
          {
              "name": "Lutécia"
          },
          {
              "name": "Macatuba"
          },
          {
              "name": "Macaubal"
          },
          {
              "name": "Macedônia"
          },
          {
              "name": "Magda"
          },
          {
              "name": "Mairinque"
          },
          {
              "name": "Mairiporã"
          },
          {
              "name": "Manduri"
          },
          {
              "name": "Marabá Paulista"
          },
          {
              "name": "Maracaí"
          },
          {
              "name": "Marapoama"
          },
          {
              "name": "Mariápolis"
          },
          {
              "name": "Marília"
          },
          {
              "name": "Marinópolis"
          },
          {
              "name": "Martinópolis"
          },
          {
              "name": "Matão"
          },
          {
              "name": "Mauá"
          },
          {
              "name": "Mendonça"
          },
          {
              "name": "Meridiano"
          },
          {
              "name": "Mesópolis"
          },
          {
              "name": "Miguelópolis"
          },
          {
              "name": "Mineiros do Tietê"
          },
          {
              "name": "Mira Estrela"
          },
          {
              "name": "Miracatu"
          },
          {
              "name": "Mirandopólis"
          },
          {
              "name": "Mirante do Paranapanema"
          },
          {
              "name": "Mirassol"
          },
          {
              "name": "Mirassolândia"
          },
          {
              "name": "Mococa"
          },
          {
              "name": "Mogi das Cruzes"
          },
          {
              "name": "Mogi Guaçu"
          },
          {
              "name": "Mogi Mirim"
          },
          {
              "name": "Mombuca"
          },
          {
              "name": "Monções"
          },
          {
              "name": "Mongaguá"
          },
          {
              "name": "Monte Alegre do Sul"
          },
          {
              "name": "Monte Alto"
          },
          {
              "name": "Monte Aprazível"
          },
          {
              "name": "Monte Azul Paulista"
          },
          {
              "name": "Monte Castelo"
          },
          {
              "name": "Monte Mor"
          },
          {
              "name": "Monteiro Lobato"
          },
          {
              "name": "Morro Agudo"
          },
          {
              "name": "Morungaba"
          },
          {
              "name": "Motuca"
          },
          {
              "name": "Murutinga do Sul"
          },
          {
              "name": "Nantes"
          },
          {
              "name": "Narandiba"
          },
          {
              "name": "Natividade da Serra"
          },
          {
              "name": "Nazaré Paulista"
          },
          {
              "name": "Neves Paulista"
          },
          {
              "name": "Nhandeara"
          },
          {
              "name": "Nipoã"
          },
          {
              "name": "Nova Aliança"
          },
          {
              "name": "Nova Campina"
          },
          {
              "name": "Nova Canaã Paulista"
          },
          {
              "name": "Nova Castilho"
          },
          {
              "name": "Nova Europa"
          },
          {
              "name": "Nova Granada"
          },
          {
              "name": "Nova Guataporanga"
          },
          {
              "name": "Nova Independência"
          },
          {
              "name": "Nova Luzitânia"
          },
          {
              "name": "Nova Odessa"
          },
          {
              "name": "Novais"
          },
          {
              "name": "Novo Horizonte"
          },
          {
              "name": "Nuporanga"
          },
          {
              "name": "Ocauçu"
          },
          {
              "name": "Óleo"
          },
          {
              "name": "Olímpia"
          },
          {
              "name": "Onda Verde"
          },
          {
              "name": "Oriente"
          },
          {
              "name": "Orindiúva"
          },
          {
              "name": "Orlândia"
          },
          {
              "name": "Osasco"
          },
          {
              "name": "Oscar Bressane"
          },
          {
              "name": "Osvaldo Cruz"
          },
          {
              "name": "Ourinhos"
          },
          {
              "name": "Ouro Verde"
          },
          {
              "name": "Ouroeste"
          },
          {
              "name": "Pacaembu"
          },
          {
              "name": "Palestina"
          },
          {
              "name": "Palmares Paulista"
          },
          {
              "name": "Palmeira d'Oeste"
          },
          {
              "name": "Palmital"
          },
          {
              "name": "Panorama"
          },
          {
              "name": "Paraguaçu Paulista"
          },
          {
              "name": "Paraibuna"
          },
          {
              "name": "Paraíso"
          },
          {
              "name": "Paranapanema"
          },
          {
              "name": "Paranapuã"
          },
          {
              "name": "Parapuã"
          },
          {
              "name": "Pardinho"
          },
          {
              "name": "Pariquera Açu"
          },
          {
              "name": "Pariquera-Açu"
          },
          {
              "name": "Parisi"
          },
          {
              "name": "Patrocínio Paulista"
          },
          {
              "name": "Paulicéia"
          },
          {
              "name": "Paulínia"
          },
          {
              "name": "Paulista Flórida"
          },
          {
              "name": "Paulistânia"
          },
          {
              "name": "Paulo de Faria"
          },
          {
              "name": "Pederneiras"
          },
          {
              "name": "Pedra Bela"
          },
          {
              "name": "Pedranópolis"
          },
          {
              "name": "Pedregulho"
          },
          {
              "name": "Pedreira"
          },
          {
              "name": "Pedrinhas Paulista"
          },
          {
              "name": "Pedro de Toledo"
          },
          {
              "name": "Penápolis"
          },
          {
              "name": "Pereira Barreto"
          },
          {
              "name": "Pereiras"
          },
          {
              "name": "Peruíbe"
          },
          {
              "name": "Piacatu"
          },
          {
              "name": "Piedade"
          },
          {
              "name": "Pilar do Sul"
          },
          {
              "name": "Pindamonhangaba"
          },
          {
              "name": "Pindorama"
          },
          {
              "name": "Pinhalzinho"
          },
          {
              "name": "Piquerobi"
          },
          {
              "name": "Piquete"
          },
          {
              "name": "Piracaia"
          },
          {
              "name": "Piracicaba"
          },
          {
              "name": "Piraju"
          },
          {
              "name": "Pirajuí"
          },
          {
              "name": "Pirangi"
          },
          {
              "name": "Pirapora do Bom Jesus"
          },
          {
              "name": "Pirapozinho"
          },
          {
              "name": "Pirassununga"
          },
          {
              "name": "Piratininga"
          },
          {
              "name": "Pitangueiras"
          },
          {
              "name": "Planalto"
          },
          {
              "name": "Platina"
          },
          {
              "name": "Poá"
          },
          {
              "name": "Poloni"
          },
          {
              "name": "Pompéia"
          },
          {
              "name": "Pongaí"
          },
          {
              "name": "Pontal"
          },
          {
              "name": "Pontalinda"
          },
          {
              "name": "Pontes Gestal"
          },
          {
              "name": "Populina"
          },
          {
              "name": "Porangaba"
          },
          {
              "name": "Porto Feliz"
          },
          {
              "name": "Porto Ferreira"
          },
          {
              "name": "Potim"
          },
          {
              "name": "Potirendaba"
          },
          {
              "name": "Pracinha"
          },
          {
              "name": "Pradópolis"
          },
          {
              "name": "Praia Grande"
          },
          {
              "name": "Pratânia"
          },
          {
              "name": "Presidente Alves"
          },
          {
              "name": "Presidente Bernardes"
          },
          {
              "name": "Presidente Epitácio"
          },
          {
              "name": "Presidente Prudente"
          },
          {
              "name": "Presidente Venceslau"
          },
          {
              "name": "Promissão"
          },
          {
              "name": "Quadra"
          },
          {
              "name": "Quatá"
          },
          {
              "name": "Queiroz"
          },
          {
              "name": "Queluz"
          },
          {
              "name": "Quintana"
          },
          {
              "name": "Rafard"
          },
          {
              "name": "Rancharia"
          },
          {
              "name": "Redenção da Serra"
          },
          {
              "name": "Regente Feijó"
          },
          {
              "name": "Reginópolis"
          },
          {
              "name": "Registro"
          },
          {
              "name": "Restinga"
          },
          {
              "name": "Ribeira"
          },
          {
              "name": "Ribeirão Bonito"
          },
          {
              "name": "Ribeirão Branco"
          },
          {
              "name": "Ribeirão Corrente"
          },
          {
              "name": "Ribeirão do Sul"
          },
          {
              "name": "Ribeirão dos Índios"
          },
          {
              "name": "Ribeirão Grande"
          },
          {
              "name": "Ribeirão Pires"
          },
          {
              "name": "Ribeirão Preto"
          },
          {
              "name": "Rifaina"
          },
          {
              "name": "Rincão"
          },
          {
              "name": "Rinópolis"
          },
          {
              "name": "Rio Claro"
          },
          {
              "name": "Rio das Pedras"
          },
          {
              "name": "Rio Grande da Serra"
          },
          {
              "name": "Riolândia"
          },
          {
              "name": "Riversul"
          },
          {
              "name": "Rosana"
          },
          {
              "name": "Roseira"
          },
          {
              "name": "Rubiácea"
          },
          {
              "name": "Rubinéia"
          },
          {
              "name": "Sabino"
          },
          {
              "name": "Sagres"
          },
          {
              "name": "Sales"
          },
          {
              "name": "Sales Oliveira"
          },
          {
              "name": "Salesópolis"
          },
          {
              "name": "Salmourão"
          },
          {
              "name": "Saltinho"
          },
          {
              "name": "Salto"
          },
          {
              "name": "Salto de Pirapora"
          },
          {
              "name": "Salto Grande"
          },
          {
              "name": "Sandovalina"
          },
          {
              "name": "Santa Adélia"
          },
          {
              "name": "Santa Albertina"
          },
          {
              "name": "Santa Bárbara d'Oeste"
          },
          {
              "name": "Santa Branca"
          },
          {
              "name": "Santa Clara d'Oeste"
          },
          {
              "name": "Santa Cruz da Conceição"
          },
          {
              "name": "Santa Cruz da Esperança"
          },
          {
              "name": "Santa Cruz das Palmeiras"
          },
          {
              "name": "Santa Cruz do Rio Pardo"
          },
          {
              "name": "Santa Ernestina"
          },
          {
              "name": "Santa Fé do Sul"
          },
          {
              "name": "Santa Gertrudes"
          },
          {
              "name": "Santa Isabel"
          },
          {
              "name": "Santa Lúcia"
          },
          {
              "name": "Santa Maria da Serra"
          },
          {
              "name": "Santa Mercedes"
          },
          {
              "name": "Santa Rita d'Oeste"
          },
          {
              "name": "Santa Rita do Passa Quatro"
          },
          {
              "name": "Santa Rosa de Viterbo"
          },
          {
              "name": "Santa Salete"
          },
          {
              "name": "Santana da Ponte Pensa"
          },
          {
              "name": "Santana de Parnaíba"
          },
          {
              "name": "Santo Anastácio"
          },
          {
              "name": "Santo André"
          },
          {
              "name": "Santo Antônio da Alegria"
          },
          {
              "name": "Santo Antônio de Posse"
          },
          {
              "name": "Santo Antônio do Aracanguá"
          },
          {
              "name": "Santo Antônio do Jardim"
          },
          {
              "name": "Santo Antônio do Pinhal"
          },
          {
              "name": "Santo Expedito"
          },
          {
              "name": "Santópolis do Aguapeí"
          },
          {
              "name": "Santos"
          },
          {
              "name": "São Bento do Sapucaí"
          },
          {
              "name": "São Bernardo do Campo"
          },
          {
              "name": "São Caetano do Sul"
          },
          {
              "name": "São Carlos"
          },
          {
              "name": "São Francisco"
          },
          {
              "name": "São João da Boa Vista"
          },
          {
              "name": "São João das Duas Pontes"
          },
          {
              "name": "São João de Iracema"
          },
          {
              "name": "São João do Pau d'Alho"
          },
          {
              "name": "São Joaquim da Barra"
          },
          {
              "name": "São José da Bela Vista"
          },
          {
              "name": "São José do Barreiro"
          },
          {
              "name": "São José do Rio Pardo"
          },
          {
              "name": "São José do Rio Preto"
          },
          {
              "name": "São José dos Campos"
          },
          {
              "name": "São Lourenço da Serra"
          },
          {
              "name": "São Luiz do Paraitinga"
          },
          {
              "name": "São Manuel"
          },
          {
              "name": "São Miguel Arcanjo"
          },
          {
              "name": "São Paulo"
          },
          {
              "name": "São Pedro"
          },
          {
              "name": "São Pedro do Turvo"
          },
          {
              "name": "São Roque"
          },
          {
              "name": "São Sebastião"
          },
          {
              "name": "São Sebastião da Grama"
          },
          {
              "name": "São Simão"
          },
          {
              "name": "São Vicente"
          },
          {
              "name": "Sarapuí"
          },
          {
              "name": "Sarutaiá"
          },
          {
              "name": "Sebastianópolis do Sul"
          },
          {
              "name": "Serra Azul"
          },
          {
              "name": "Serra Negra"
          },
          {
              "name": "Serrana"
          },
          {
              "name": "Sertãozinho"
          },
          {
              "name": "Sete Barras"
          },
          {
              "name": "Severínia"
          },
          {
              "name": "Silveiras"
          },
          {
              "name": "Socorro"
          },
          {
              "name": "Sorocaba"
          },
          {
              "name": "Sud Mennucci"
          },
          {
              "name": "Sumaré"
          },
          {
              "name": "Suzanápolis"
          },
          {
              "name": "Suzano"
          },
          {
              "name": "Tabapuã"
          },
          {
              "name": "Tabatinga"
          },
          {
              "name": "Taboão da Serra"
          },
          {
              "name": "Taciba"
          },
          {
              "name": "Taguaí"
          },
          {
              "name": "Taiaçu"
          },
          {
              "name": "Taiúva"
          },
          {
              "name": "Tambaú"
          },
          {
              "name": "Tanabi"
          },
          {
              "name": "Tapiraí"
          },
          {
              "name": "Tapiratiba"
          },
          {
              "name": "Taquaral"
          },
          {
              "name": "Taquaritinga"
          },
          {
              "name": "Taquarituba"
          },
          {
              "name": "Taquarivaí"
          },
          {
              "name": "Tarabai"
          },
          {
              "name": "Tarumã"
          },
          {
              "name": "Tatuí"
          },
          {
              "name": "Taubaté"
          },
          {
              "name": "Tejupá"
          },
          {
              "name": "Teodoro Sampaio"
          },
          {
              "name": "Terra Roxa"
          },
          {
              "name": "Tietê"
          },
          {
              "name": "Timburi"
          },
          {
              "name": "Torre de Pedra"
          },
          {
              "name": "Torrinha"
          },
          {
              "name": "Trabiju"
          },
          {
              "name": "Tremembé"
          },
          {
              "name": "Três Fronteiras"
          },
          {
              "name": "Tuiuti"
          },
          {
              "name": "Tupã"
          },
          {
              "name": "Tupi Paulista"
          },
          {
              "name": "Turiúba"
          },
          {
              "name": "Turmalina"
          },
          {
              "name": "Ubarana"
          },
          {
              "name": "Ubatuba"
          },
          {
              "name": "Ubirajara"
          },
          {
              "name": "Uchoa"
          },
          {
              "name": "União Paulista"
          },
          {
              "name": "Urânia"
          },
          {
              "name": "Uru"
          },
          {
              "name": "Urupês"
          },
          {
              "name": "Valentim Gentil"
          },
          {
              "name": "Valinhos"
          },
          {
              "name": "Valparaíso"
          },
          {
              "name": "Vargem"
          },
          {
              "name": "Vargem Grande do Sul"
          },
          {
              "name": "Vargem Grande Paulista"
          },
          {
              "name": "Várzea Paulista"
          },
          {
              "name": "Vera Cruz"
          },
          {
              "name": "Vinhedo"
          },
          {
              "name": "Viradouro"
          },
          {
              "name": "Vista Alegre do Alto"
          },
          {
              "name": "Vitória Brasil"
          },
          {
              "name": "Votorantim"
          },
          {
              "name": "Votuporanga"
          },
          {
              "name": "Zacarias"
          }
      ]
    },
  ]
  const technologies = [
    { name: '2D' },
    { name: '3D' },
    { name: '4D' },
    { name: 'D-BOX' },
    { name: 'IMAX' },
    { name: 'XD' },
    { name: 'VIP' },
  ]
  const genres = [
		{
			"id": 28,
			"name": "Ação"
		},
		{
			"id": 12,
			"name": "Aventura"
		},
		{
			"id": 16,
			"name": "Animação"
		},
		{
			"id": 35,
			"name": "Comédia"
		},
		{
			"id": 80,
			"name": "Crime"
		},
		{
			"id": 99,
			"name": "Documentário"
		},
		{
			"id": 18,
			"name": "Drama"
		},
		{
			"id": 10751,
			"name": "Família"
		},
		{
			"id": 14,
			"name": "Fantasia"
		},
		{
			"id": 36,
			"name": "História"
		},
		{
			"id": 27,
			"name": "Terror"
		},
		{
			"id": 10402,
			"name": "Música"
		},
		{
			"id": 9648,
			"name": "Mistério"
		},
		{
			"id": 10749,
			"name": "Romance"
		},
		{
			"id": 878,
			"name": "Ficção científica"
		},
		{
			"id": 10770,
			"name": "Cinema TV"
		},
		{
			"id": 53,
			"name": "Thriller"
		},
		{
			"id": 10752,
			"name": "Guerra"
		},
		{
			"id": 37,
			"name": "Faroeste"
		}
	]
  const configuration = {
    admin_accessible: false
  }

  await prisma.city.deleteMany({})
  await prisma.state.deleteMany({})
  await prisma.technology.deleteMany({})
  await prisma.genre.deleteMany({})

  for (const state of states) {
    await prisma.state.create({
      data: {
        name: state.name,
        cities: {
          createMany: {
            data: state.cities.map(city => ({ name: city.name }))
          }
        }
      }
    })
  }

  await prisma.technology.createMany({
    data: technologies.map(technology => ({ name: technology.name }))
  })

  await prisma.genre.createMany({
    data: genres
  })

  await prisma.configuration.create({
    data: configuration
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })