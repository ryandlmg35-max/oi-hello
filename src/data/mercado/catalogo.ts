// CATALOGO ESTATICO — mirror da secao "Medical / Drugs" do Black Market 2026.
// Gerado a partir do site .onion original. Usado como fallback quando a migration
// 0001 ainda nao foi aplicada no Supabase. NAO EDITAR A MAO.

export type Categoria = { slug: string; nome: string; icone: string };

export type Comentario = {
  autor: string;
  data: string;
  corpo: string;
  compra: string;
};

export type Variante = {
  id: string;
  nome: string;
  variante: string;
  preco: number;
  precoTexto: string;
  precoAntigo: string;
  img: string;
  envio: string;
  origem: string;
};

export type Opcao = {
  original: string;
  rotulo: string;
  variante: string;
  preco: number;
  precoAntigo: string;
};

export type Produto = {
  id: string;
  chave: string;
  vendor: string;
  vendorSlug: string;
  produto: string;
  titulo: string;
  descricao: string;
  galeria: string[];
  imgPrincipal: string;
  logo: string;
  categoria: string;
  envio: string;
  vendas: number;
  comentarios: Comentario[];
  paises: string[];
  opcoes: Opcao[];
  variantes: Variante[];
};

export type Vendedor = {
  nome: string;
  slug: string;
  nivel: string;
  envio: string;
  capa: string;
  logo: string;
  ativo: boolean;
  vendas: number;
  topo: boolean;
  produtos: number;
};

export type Oferta = {
  id: string;
  nome: string;
  variante: string;
  preco: string;
  precoAntigo: string;
  envio: string;
  img: string;
  href: string;
};

export const CATEGORIAS: Categoria[] = [
  { slug: "drugs", nome: "Medical / Drugs", icone: "pill" },
];

export const VENDEDORES: Vendedor[] = [
  {
    "nome": "No Limit Pharmacy",
    "slug": "no-limit-pharmacy",
    "nivel": "Gold Seller",
    "envio": "Worldwide Shipping",
    "capa": "pic/nolimit/head.jpg",
    "logo": "pic/nolimit/nolimit.png",
    "ativo": true,
    "vendas": 1367,
    "topo": false,
    "produtos": 6
  },
  {
    "nome": "Walter White",
    "slug": "walter-white",
    "nivel": "Silver Seller",
    "envio": "Incl. Overnight Shipping",
    "capa": "pic/walterwhite/whead.jpg",
    "logo": "pic/walterwhite/ww.png",
    "ativo": true,
    "vendas": 1277,
    "topo": false,
    "produtos": 2
  },
  {
    "nome": "Cali Weed Store",
    "slug": "cali-weed-store",
    "nivel": "Silver Seller",
    "envio": "Worldwide Shipping",
    "capa": "pic/caliweedstore/calihead.jpg",
    "logo": "pic/caliweedstore/cali.png",
    "ativo": true,
    "vendas": 555,
    "topo": false,
    "produtos": 3
  },
  {
    "nome": "Perc Bros",
    "slug": "perc-bros",
    "nivel": "Silver Seller",
    "envio": "Europe Shipping",
    "capa": "pic/percbros/head.jpg",
    "logo": "pic/percbros/logo.png",
    "ativo": true,
    "vendas": 273,
    "topo": false,
    "produtos": 2
  },
  {
    "nome": "Cannabis Store Amsterdam",
    "slug": "cannabis-store-amsterdam",
    "nivel": "Gold Seller",
    "envio": "Europe Shipping",
    "capa": "pic/amsterdam/head.jpeg",
    "logo": "pic/amsterdam/logo.png",
    "ativo": true,
    "vendas": 254,
    "topo": false,
    "produtos": 2
  },
  {
    "nome": "Hash King",
    "slug": "hash-king",
    "nivel": "Gold Seller",
    "envio": "Worldwide Shipping",
    "capa": "pic/hashking/head.jpg",
    "logo": "pic/hashking/logo.png",
    "ativo": false,
    "vendas": 0,
    "topo": false,
    "produtos": 4
  }
];

export const PRODUTOS: Produto[] = [
  {
    "id": "1f42135f-950a-393d-9604-b5d10a458385",
    "chave": "hash-king#1",
    "vendor": "Hash King",
    "vendorSlug": "hash-king",
    "produto": "1",
    "titulo": "Blueberry Hash",
    "descricao": "Crafted with care using top-quality Blueberry strains and the latest extraction techniques\n80% indica and 20% sativa composition\nUp to 35% THC and 8% CBD\nOne of the tastys Hash compositions you can get on the market\nPerfect Stealth Delivery\nShipping Worldwide\nContact: hking@x-mail.pro",
    "galeria": [
      "pic/hashking/a1.jpg",
      "pic/hashking/a2.jpg",
      "pic/hashking/a3.jpg",
      "pic/hashking/a4.jpg",
      "pic/hashking/a5.jpg"
    ],
    "imgPrincipal": "pic/hashking/bluehashhead.jpg",
    "logo": "pic/hashking/logo.png",
    "vendas": 375,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Gmuschilover",
        "data": "06. Nov 2026",
        "corpo": "the dope is excellent! very good for reselling",
        "compra": "AK47 Hash"
      },
      {
        "autor": "peter parker",
        "data": "06. Nov 2026",
        "corpo": "thanks to the hashking and blackmarket for its reliability.i only buy here",
        "compra": "Blond Lebanese"
      },
      {
        "autor": "Lily",
        "data": "06. Nov 2026",
        "corpo": "great hash ! H.K is the fukn the best !!",
        "compra": "Premium ICE"
      },
      {
        "autor": "Angel 1",
        "data": "06. Nov 2026",
        "corpo": "Very fast delivery, good packaging and very good stealth, nice support and very good dope: Good high and good flavors! Thanks !",
        "compra": "AK47 Hash"
      },
      {
        "autor": "Banana x Gorilla",
        "data": "06. Nov 2026",
        "corpo": "Very good peace 5/5",
        "compra": "AK47 Hash"
      },
      {
        "autor": "jamal k.",
        "data": "04. Nov 2026",
        "corpo": "Perfect 6bd to france",
        "compra": "Blond Lebanese"
      }
    ],
    "opcoes": [
      {
        "original": "93",
        "rotulo": "5 GRAM Blueberry Hash for $35.00",
        "variante": "5 GRAM Blueberry Hash",
        "preco": 35,
        "precoAntigo": ""
      },
      {
        "original": "94",
        "rotulo": "25 GRAM Blueberry Hash for $150.00",
        "variante": "25 GRAM Blueberry Hash",
        "preco": 150,
        "precoAntigo": ""
      },
      {
        "original": "95",
        "rotulo": "100 GRAM Blueberry Hash for $500.00",
        "variante": "100 GRAM Blueberry Hash",
        "preco": 500,
        "precoAntigo": ""
      },
      {
        "original": "96",
        "rotulo": "1 KILOGRAM Blueberry Hash for $3900.00",
        "variante": "1 KILOGRAM Blueberry Hash",
        "preco": 3900,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "454f8733-93dd-380c-ab0f-ef10f58f1467",
        "nome": "Blueberry Hash",
        "variante": "5 GRAM",
        "preco": 35,
        "precoTexto": "$35.00",
        "precoAntigo": "",
        "img": "pic/hashking/ahead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "ef0493a3-456e-3bf1-8c04-dbcf2db80b5d",
        "nome": "Blueberry Hash",
        "variante": "25 GRAM",
        "preco": 150,
        "precoTexto": "$150.00",
        "precoAntigo": "",
        "img": "pic/hashking/bluehashhead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "08c78e27-1e6e-3ee8-8559-e216e2220ad0",
        "nome": "Blueberry Hash",
        "variante": "100 GRAM",
        "preco": 500,
        "precoTexto": "$500.00",
        "precoAntigo": "",
        "img": "pic/hashking/bluehashhead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "ecc667bc-0a1f-3ed5-bf0a-0e099e024d49",
        "nome": "Blueberry Hash",
        "variante": "1 KILOGRAM",
        "preco": 3900,
        "precoTexto": "$3900.00",
        "precoAntigo": "",
        "img": "pic/hashking/bluehashhead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "afc66b75-5924-3dcd-9fa4-f7640fc17870",
    "chave": "no-limit-pharmacy#3",
    "vendor": "No Limit Pharmacy",
    "vendorSlug": "no-limit-pharmacy",
    "produto": "3",
    "titulo": "Oxycodone 20mg",
    "descricao": "20mg Oxycodone Pills by Roxicodone\nOxycodone is an opioid pain medication thats used to help with pain that isnt relieved by non-opioid pain medications.\nDiscret Shipping to every country with tracking ID\nContact: nolimit@x-mail.pro",
    "galeria": [
      "pic/nolimit/c1.jpg",
      "pic/nolimit/c2.jpg"
    ],
    "imgPrincipal": "pic/nolimit/oxihead.jpg",
    "logo": "pic/nolimit/nolimit.png",
    "vendas": 1368,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Stanley70",
        "data": "05. Nov 2026",
        "corpo": "Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Jerold M",
        "data": "05. Nov 2026",
        "corpo": "Thanks for shipping to uk. Im glad I didnt have to face any problems :)",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Paku man",
        "data": "04. Nov 2026",
        "corpo": "excellent service in usa",
        "compra": "Oxycodone 20mg"
      },
      {
        "autor": "Elroy",
        "data": "01. Nov 2026",
        "corpo": "Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.",
        "compra": "Calypsol Ketamine"
      },
      {
        "autor": "Royce G",
        "data": "30. Oct 2026",
        "corpo": "delivered within an hour via email and it worked just fine on the site",
        "compra": "Ketamine HCL"
      },
      {
        "autor": "Alice One",
        "data": "30. Oct 2026",
        "corpo": "I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!",
        "compra": "Ketamine HCL"
      }
    ],
    "opcoes": [
      {
        "original": "125",
        "rotulo": "100 TABLETS Oxycodone 20mg for $35.00",
        "variante": "100 TABLETS Oxycodone 20mg",
        "preco": 35,
        "precoAntigo": ""
      },
      {
        "original": "126",
        "rotulo": "500 TABLETS Oxycodone 20mg for $119.00",
        "variante": "500 TABLETS Oxycodone 20mg",
        "preco": 119,
        "precoAntigo": ""
      },
      {
        "original": "127",
        "rotulo": "1.000 TABLETS Oxycodone 20mg for $199.00",
        "variante": "1.000 TABLETS Oxycodone 20mg",
        "preco": 199,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "ce6d8f8f-e701-345b-a848-f2036b09ea86",
        "nome": "Oxycodone 20mg",
        "variante": "100 TABLETS",
        "preco": 35,
        "precoTexto": "$35.00",
        "precoAntigo": "",
        "img": "pic/nolimit/chead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "63e36774-093d-36c7-97b2-dc12b87b4ba3",
        "nome": "Oxycodone 20mg",
        "variante": "500 TABLETS",
        "preco": 119,
        "precoTexto": "$119.00",
        "precoAntigo": "",
        "img": "pic/nolimit/oxihead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "844c6e7d-5e5e-3ce0-a43b-9956dc8d4894",
        "nome": "Oxycodone 20mg",
        "variante": "1.000 TABLETS",
        "preco": 199,
        "precoTexto": "$199.00",
        "precoAntigo": "",
        "img": "pic/nolimit/oxihead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "388e9245-0613-3e96-9aac-e71bd245990b",
    "chave": "walter-white#2",
    "vendor": "Walter White",
    "vendorSlug": "walter-white",
    "produto": "2",
    "titulo": "Peruvian Cocaine",
    "descricao": "Pеruvіаn Flake cocain(94% Pure)\nImроrtеd directly from Pеru аnd іt is аbоut 95 to 97% Purе with nо Addіtіvеѕ оr bath salts\nSecured delivery to all location worldwide, stealth packaging wіth trасkіng numbеrѕ рrоvіdеd.\nWe also do overnight (Courier) for all our clients who bought 50 or 100.\nContact:",
    "galeria": [
      "pic/walterwhite/b1.jpg",
      "pic/walterwhite/b2.jpg",
      "pic/walterwhite/b3.jpg"
    ],
    "imgPrincipal": "pic/walterwhite/whead.jpg",
    "logo": "pic/walterwhite/ww.png",
    "vendas": 1277,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Tit1ano",
        "data": "05. Nov 2026",
        "corpo": "Hello friends , i am here to write a feedback for this vendor . when order here first time I was worried that I was not being cheated ,i have been paid $2600.00 for 100 Gram Fishscale Cocaine But I didnt get it in 7 days. i sent them email &amp; they replied product has been sent. confusing ,but After that 2 days I received the parcel. it may be the problem of delevary system . real vendor &amp; best quality product , thats all",
        "compra": "Fishscale Cocaine"
      },
      {
        "autor": "Rahad k",
        "data": "03. Nov 2026",
        "corpo": "I Place An Order Several Days Ago, And Received Just In Time.",
        "compra": "Peruvian Cocaine"
      },
      {
        "autor": "hitler",
        "data": "01. Nov 2026",
        "corpo": "Quick &amp; good stealth! cant tell about quality, will try!",
        "compra": "Peruvian Cocaine"
      },
      {
        "autor": "maniac",
        "data": "01. Nov 2026",
        "corpo": "fast delivery and looks great - thanks!",
        "compra": "Peruvian Cocaine"
      },
      {
        "autor": "Bart F.",
        "data": "01. Nov 2026",
        "corpo": "Hi guys ordered for the first time no problems good quality price performance is also right Packaging was also very good. Ill think about only ordering here xD definitely come back to recommend greetings from belgium",
        "compra": "Peruvian Cocaine"
      },
      {
        "autor": "Jeremy",
        "data": "29. Oct 2026",
        "corpo": "so freunde muss mal sagen hab bei vielen verkäufern auf verschiedenen shops bestellt und muss sagen das dieser hier die beste flex am start hat sonst war bei vielen nur rotze dabei 100% reship und kunden support 1a++ kann ich nur empfehlen an leute die gutes flex suchen danke bro",
        "compra": "Fishscale Cocaine"
      }
    ],
    "opcoes": [
      {
        "original": "89",
        "rotulo": "2 GRAM Peruvian Cocaine for $90.00",
        "variante": "2 GRAM Peruvian Cocaine",
        "preco": 90,
        "precoAntigo": ""
      },
      {
        "original": "90",
        "rotulo": "5 GRAM Peruvian Cocaine for $150.00",
        "variante": "5 GRAM Peruvian Cocaine",
        "preco": 150,
        "precoAntigo": ""
      },
      {
        "original": "91",
        "rotulo": "25 GRAM Peruvian Cocaine for $650.00",
        "variante": "25 GRAM Peruvian Cocaine",
        "preco": 650,
        "precoAntigo": ""
      },
      {
        "original": "92",
        "rotulo": "100 GRAM Peruvian Cocaine for $2400.00",
        "variante": "100 GRAM Peruvian Cocaine",
        "preco": 2400,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "55d830fd-0556-3ce2-9689-606657efc596",
        "nome": "Peruvian Cocaine",
        "variante": "2 GRAM",
        "preco": 90,
        "precoTexto": "$90.00",
        "precoAntigo": "",
        "img": "pic/walterwhite/bhead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "8ba6bad8-f51f-33cf-9c29-457a7dbe91b6",
        "nome": "Peruvian Cocaine",
        "variante": "5 GRAM",
        "preco": 150,
        "precoTexto": "$150.00",
        "precoAntigo": "",
        "img": "pic/walterwhite/whead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "0029aba0-b785-3b42-8631-3dc09684be1e",
        "nome": "Peruvian Cocaine",
        "variante": "25 GRAM",
        "preco": 650,
        "precoTexto": "$650.00",
        "precoAntigo": "",
        "img": "pic/walterwhite/whead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "77d715b6-cbc1-3ea3-b842-f18673104bfe",
        "nome": "Peruvian Cocaine",
        "variante": "100 GRAM",
        "preco": 2400,
        "precoTexto": "$2400.00",
        "precoAntigo": "",
        "img": "pic/walterwhite/whead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "05234f6e-436e-3e50-bf5b-c5f259fbe404",
    "chave": "cali-weed-store#1",
    "vendor": "Cali Weed Store",
    "vendorSlug": "cali-weed-store",
    "produto": "1",
    "titulo": "Amnezia Haze Core Cut",
    "descricao": "The Amnesia Haze Core Cut is a specific and highly regarded clone-only phenotype of the Amnesia Haze cannabis strain. It is a potent, sativa-dominant variety known for its energetic, creative, and long-lasting cerebral effects.\nKey Characteristics\nGenetics:\nIt originates from the classic Haze lines, with some sources tracing specific \"Core Cuts\" back to crosses like Cinderella 99 and Jack Herer or a specific clone from the company Hy-Pro. It is widely considered a stable and powerful representation of the Amnesia Haze lineage.\nEffects:\nThe high is described as intense, euphoric, and activating, ideal for daytime use, creativity, and social situations. It is known for promoting focus and mental clarity, which makes it popular among users looking for stimulating effects.\nAroma and Flavor:\nThe strain features a distinct citrus and fruity flavor profile, with prominent notes of lemon and lime, often accompanied by spicy or bitter undertones. The main terpenes contributing to its aroma are terpinolene, caryophyllene, and pinene.\nThe term \"Core Cut\" refers to a specific, premium cut (clone) that is recognized for consistently exhibiting the most desirable traits of the Amnesia Haze strain. Many other Amnesia genetics are descendants of this original, highly sought-after clone.\nStraight from the source to your door\n32% THC Labor Tested\nThe flowers are dense and covered in a thick layer of resin.\nSTEALTH WORLDWIDE DELIVERY GUARANTEED.\nContact: calistore@x-mail.pro",
    "galeria": [
      "pic/caliweedstore/a1.jpg",
      "pic/caliweedstore/a2.jpg",
      "pic/caliweedstore/a3.jpg",
      "pic/caliweedstore/a4.jpg",
      "pic/caliweedstore/a5.jpg"
    ],
    "imgPrincipal": "pic/caliweedstore/amneziahead.jpg",
    "logo": "pic/caliweedstore/cali.png",
    "vendas": 556,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "crisis for sure",
        "data": "06. Nov 2026",
        "corpo": "This sore is amazing and the weed is super professional. Keep in mind its not for the rookie erb smoker. These are high class strains and shouldnt be taken lightly. You will enjoy it.",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "dailyweed",
        "data": "06. Nov 2026",
        "corpo": "the mk is a pretty boss strain. I wasn’t expecting it to be as good as it was. Great deal",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "Smokyswoop4209",
        "data": "06. Nov 2026",
        "corpo": "The Amnezia Core cut is the shit.. This strain checks all the boxes for a good contender in the department of Day Time Strains. Onset has you feeling floaty then it speeds up your heart rate a little. The delivery was on point. 5 Stars for the Cali weedstore",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "barbados1",
        "data": "06. Nov 2026",
        "corpo": "This Weed is the absolute bestfor me. Never smoked such a strong shit before. I love it!!!",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "Lisaadd777",
        "data": "03. Nov 2026",
        "corpo": "Good Vendor , Perfect stealth and good communication. Ordered the og kush and have a laugh with your friends. Always a good choice, a mood elevator and usually a good bang for the buck.",
        "compra": "OG Cali Kush"
      },
      {
        "autor": "remywade88",
        "data": "01. Nov 2026",
        "corpo": "Amnesia hit hard and knocked out,its heavy stuff. I using this for reselling and my clients always come back",
        "compra": "Amnezia Haze Core Cut"
      }
    ],
    "opcoes": [
      {
        "original": "60",
        "rotulo": "5 G Amnezia Haze Core Cut for $69.00",
        "variante": "5 G Amnezia Haze Core Cut",
        "preco": 69,
        "precoAntigo": ""
      },
      {
        "original": "61",
        "rotulo": "10 G Amnezia Haze Core Cut for $99.00",
        "variante": "10 G Amnezia Haze Core Cut",
        "preco": 99,
        "precoAntigo": ""
      },
      {
        "original": "62",
        "rotulo": "25 G Amnezia Haze Core Cut for $199.00",
        "variante": "25 G Amnezia Haze Core Cut",
        "preco": 199,
        "precoAntigo": ""
      },
      {
        "original": "63",
        "rotulo": "50 G Amnezia Haze Core Cut for $349.00",
        "variante": "50 G Amnezia Haze Core Cut",
        "preco": 349,
        "precoAntigo": ""
      },
      {
        "original": "64",
        "rotulo": "100 G Amnezia Haze Core Cut for $599.00",
        "variante": "100 G Amnezia Haze Core Cut",
        "preco": 599,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "5ffbe25e-b469-3be0-9dee-35944640507a",
        "nome": "Amnezia Haze Core Cut",
        "variante": "5 G",
        "preco": 69,
        "precoTexto": "$69.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/calihead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "c4ee33b9-9a04-350c-84c5-d93280916d53",
        "nome": "Amnezia Haze Core Cut",
        "variante": "10 G",
        "preco": 99,
        "precoTexto": "$99.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/amneziahead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "22a95930-7a6e-3e3f-a397-6bad005e931e",
        "nome": "Amnezia Haze Core Cut",
        "variante": "25 G",
        "preco": 199,
        "precoTexto": "$199.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/amneziahead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "080f943b-a056-3e0a-a5d1-07d7f9e73191",
        "nome": "Amnezia Haze Core Cut",
        "variante": "50 G",
        "preco": 349,
        "precoTexto": "$349.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/amneziahead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "8be75fa4-1013-3515-b039-3e3b17566d2e",
        "nome": "Amnezia Haze Core Cut",
        "variante": "100 G",
        "preco": 599,
        "precoTexto": "$599.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/amneziahead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "d5f7257b-314f-3b79-97fe-40a2e871d268",
    "chave": "cali-weed-store#2",
    "vendor": "Cali Weed Store",
    "vendorSlug": "cali-weed-store",
    "produto": "2",
    "titulo": "OG Cali Kush",
    "descricao": "Cali Kush (also known as California Kush or Kali Kush) is a popular hybrid cannabis strain known for its potent effects and complex flavor profile.\nOriginating in California, USA, it is generally Indica-dominant and highly valued for both recreational and medicinal use.\nCommon Effects: Feelings of happiness, euphoria, relaxation, and a potential increase in appetite.\nMedicinal Uses:  Help to relieve stress, chronic pain, anxiety, depression, insomnia, and nausea\nSTEALTH WORLDWIDE DELIVERY GUARANTEED.\nTHC 17-24% Amazing Quality\nStraight from the source to your door\nContact: calistore@x-mail.pro",
    "galeria": [
      "pic/caliweedstore/b1.jpg",
      "pic/caliweedstore/b2.jpg",
      "pic/caliweedstore/b3.jpg",
      "pic/caliweedstore/b4.jpg",
      "pic/caliweedstore/b5.jpg",
      "pic/caliweedstore/b6.jpg"
    ],
    "imgPrincipal": "pic/caliweedstore/kalihead.jpg",
    "logo": "pic/caliweedstore/cali.png",
    "vendas": 556,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "crisis for sure",
        "data": "06. Nov 2026",
        "corpo": "This sore is amazing and the weed is super professional. Keep in mind its not for the rookie erb smoker. These are high class strains and shouldnt be taken lightly. You will enjoy it.",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "dailyweed",
        "data": "06. Nov 2026",
        "corpo": "the mk is a pretty boss strain. I wasn’t expecting it to be as good as it was. Great deal",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "Smokyswoop4209",
        "data": "06. Nov 2026",
        "corpo": "The Amnezia Core cut is the shit.. This strain checks all the boxes for a good contender in the department of Day Time Strains. Onset has you feeling floaty then it speeds up your heart rate a little. The delivery was on point. 5 Stars for the Cali weedstore",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "barbados1",
        "data": "06. Nov 2026",
        "corpo": "This Weed is the absolute bestfor me. Never smoked such a strong shit before. I love it!!!",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "Lisaadd777",
        "data": "03. Nov 2026",
        "corpo": "Good Vendor , Perfect stealth and good communication. Ordered the og kush and have a laugh with your friends. Always a good choice, a mood elevator and usually a good bang for the buck.",
        "compra": "OG Cali Kush"
      },
      {
        "autor": "remywade88",
        "data": "01. Nov 2026",
        "corpo": "Amnesia hit hard and knocked out,its heavy stuff. I using this for reselling and my clients always come back",
        "compra": "Amnezia Haze Core Cut"
      }
    ],
    "opcoes": [
      {
        "original": "65",
        "rotulo": "3 GRAM OG Cali Kush for $35.00",
        "variante": "3 GRAM OG Cali Kush",
        "preco": 35,
        "precoAntigo": ""
      },
      {
        "original": "66",
        "rotulo": "10 GRAM OG Cali Kush for $95.00",
        "variante": "10 GRAM OG Cali Kush",
        "preco": 95,
        "precoAntigo": ""
      },
      {
        "original": "67",
        "rotulo": "25 GRAM OG Cali Kush for $170.00",
        "variante": "25 GRAM OG Cali Kush",
        "preco": 170,
        "precoAntigo": ""
      },
      {
        "original": "68",
        "rotulo": "50 GRAM OG Cali Kush for $310.00",
        "variante": "50 GRAM OG Cali Kush",
        "preco": 310,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "32de84bf-538d-3eae-abca-6c52db7d23bb",
        "nome": "OG Cali Kush",
        "variante": "3 GRAM",
        "preco": 35,
        "precoTexto": "$35.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/bhead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "1a3c2be6-7877-3b65-b6e7-6f1dc742b1ed",
        "nome": "OG Cali Kush",
        "variante": "10 GRAM",
        "preco": 95,
        "precoTexto": "$95.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/kalihead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "a926d0dd-97b1-3937-beae-da75d236b23a",
        "nome": "OG Cali Kush",
        "variante": "25 GRAM",
        "preco": 170,
        "precoTexto": "$170.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/kalihead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "81042573-08fe-39b4-a3c5-e7030f2f72b8",
        "nome": "OG Cali Kush",
        "variante": "50 GRAM",
        "preco": 310,
        "precoTexto": "$310.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/kalihead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "5c67ba31-395b-3af0-98f1-3d485a477a82",
    "chave": "cali-weed-store#3",
    "vendor": "Cali Weed Store",
    "vendorSlug": "cali-weed-store",
    "produto": "3",
    "titulo": "MK Ultra",
    "descricao": "The MK Ultra cannabis strain is a potent, award-winning, Indica-dominant hybrid known for its powerful, fast-acting, and \"hypnotic\" cerebral effects.\nIt is a cross between the legendary strains G13 and OG Kush, resulting in a deeply relaxing experience.\nIt is particularly effective as a sleep aid for those with insomnia and helps to alleviate chronic pain, stress, and anxiety.\nIt can also help stimulate appetite.\nTHC 16% to 24%\nStraight from the source to your door.\nSTEALTH WORLDWIDE DELIVERY GUARANTEED.\nContact: calistore@x-mail.pro",
    "galeria": [
      "pic/caliweedstore/c1.jpg",
      "pic/caliweedstore/c2.jpg",
      "pic/caliweedstore/c3.jpg"
    ],
    "imgPrincipal": "pic/caliweedstore/mkhead.jpg",
    "logo": "pic/caliweedstore/cali.png",
    "vendas": 556,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "crisis for sure",
        "data": "06. Nov 2026",
        "corpo": "This sore is amazing and the weed is super professional. Keep in mind its not for the rookie erb smoker. These are high class strains and shouldnt be taken lightly. You will enjoy it.",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "dailyweed",
        "data": "06. Nov 2026",
        "corpo": "the mk is a pretty boss strain. I wasn’t expecting it to be as good as it was. Great deal",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "Smokyswoop4209",
        "data": "06. Nov 2026",
        "corpo": "The Amnezia Core cut is the shit.. This strain checks all the boxes for a good contender in the department of Day Time Strains. Onset has you feeling floaty then it speeds up your heart rate a little. The delivery was on point. 5 Stars for the Cali weedstore",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "barbados1",
        "data": "06. Nov 2026",
        "corpo": "This Weed is the absolute bestfor me. Never smoked such a strong shit before. I love it!!!",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "Lisaadd777",
        "data": "03. Nov 2026",
        "corpo": "Good Vendor , Perfect stealth and good communication. Ordered the og kush and have a laugh with your friends. Always a good choice, a mood elevator and usually a good bang for the buck.",
        "compra": "OG Cali Kush"
      },
      {
        "autor": "remywade88",
        "data": "01. Nov 2026",
        "corpo": "Amnesia hit hard and knocked out,its heavy stuff. I using this for reselling and my clients always come back",
        "compra": "Amnezia Haze Core Cut"
      }
    ],
    "opcoes": [
      {
        "original": "75",
        "rotulo": "3 GRAM MK Ultra for $30.00",
        "variante": "3 GRAM MK Ultra",
        "preco": 30,
        "precoAntigo": ""
      },
      {
        "original": "76",
        "rotulo": "10 GRAM MK Ultra for $90.00",
        "variante": "10 GRAM MK Ultra",
        "preco": 90,
        "precoAntigo": ""
      },
      {
        "original": "77",
        "rotulo": "25 GRAM MK Ultra for $160.00",
        "variante": "25 GRAM MK Ultra",
        "preco": 160,
        "precoAntigo": ""
      },
      {
        "original": "78",
        "rotulo": "50 GRAM MK Ultra for $300.00",
        "variante": "50 GRAM MK Ultra",
        "preco": 300,
        "precoAntigo": ""
      },
      {
        "original": "79",
        "rotulo": "100 GRAM MK Ultra for $559.00",
        "variante": "100 GRAM MK Ultra",
        "preco": 559,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "8efe8f8a-8153-31d7-8e27-3b6ce9b5c015",
        "nome": "MK Ultra",
        "variante": "3 GRAM",
        "preco": 30,
        "precoTexto": "$30.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/chead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "704b6b96-f808-31b3-9a67-1683be2f81bf",
        "nome": "MK Ultra",
        "variante": "10 GRAM",
        "preco": 90,
        "precoTexto": "$90.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/mkhead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "d0fd1723-5898-34cb-a837-c6f9d0794469",
        "nome": "MK Ultra",
        "variante": "25 GRAM",
        "preco": 160,
        "precoTexto": "$160.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/mkhead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "e03873c4-f294-3ed3-9ae6-72acd8a2f582",
        "nome": "MK Ultra",
        "variante": "50 GRAM",
        "preco": 300,
        "precoTexto": "$300.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/mkhead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "2a9593cd-3bd0-35bc-b07a-2cb1eb228491",
        "nome": "MK Ultra",
        "variante": "100 GRAM",
        "preco": 559,
        "precoTexto": "$559.00",
        "precoAntigo": "",
        "img": "pic/caliweedstore/mkhead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "02f7a2e0-16da-342d-86b8-707d0364726e",
    "chave": "cannabis-store-amsterdam#1",
    "vendor": "Cannabis Store Amsterdam",
    "vendorSlug": "cannabis-store-amsterdam",
    "produto": "1",
    "titulo": "OG Haze",
    "descricao": "Experience the legendary, cup-winning genetics perfected in the coffee shops of Amsterdam.\nAmsterdam Haze is the ultimate Sativa fuel, engineered for the creator, the thinker, and the innovator.\n⚡️ Performance &amp; Effect:\nA powerful, cerebral, and energetic high that cuts through mental fog, promoting intense focus, creativity, and euphoric uplift. Think of it as a clean, high-speed compiler for your mind—no lag, all output.\n🌿 Profile:\nA complex, mouth-watering blend of fresh, spicy Haze notes with a dominant sweet citrus core (lemon/lime) and a grounding earthy finish. Its pungent aroma is instantly recognizable as true A-list Amsterdam quality.\n📈 Potency:\nFeaturing high-velocity THC levels (often 20-25%+), this strain is known for its fast-acting and long-lasting effects. It's the stable, high-yield code you can rely on for a productive day or an inspired social session.\nAmsterdam Haze. Where world-class genetics meet world-class performance.+\nShipping ONLY IN EUROPE.\nContact: amsterdam@x-mail.pro",
    "galeria": [
      "pic/amsterdam/a1.jpg",
      "pic/amsterdam/a2.jpg",
      "pic/amsterdam/a3.jpg",
      "pic/amsterdam/a4.jpg",
      "pic/amsterdam/a5.jpg",
      "pic/amsterdam/a6.jpg"
    ],
    "imgPrincipal": "pic/amsterdam/oghazehead.jpg",
    "logo": "pic/amsterdam/logo.png",
    "vendas": 255,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Wildthough",
        "data": "04. Nov 2026",
        "corpo": "Awesome stuff. Great smell. Killer smoke Killer Shop..",
        "compra": "Gelato 41"
      },
      {
        "autor": "Norman undercover",
        "data": "01. Nov 2026",
        "corpo": "Easy ordering.Super nice smell. Smoke was bomb. Stick dense buds. Definitely come back for",
        "compra": "OG Haze"
      },
      {
        "autor": "iii333",
        "data": "01. Nov 2026",
        "corpo": "Best looking weed I have seen. Extremely sticky and pleasant to smoke.",
        "compra": "Gelato 41"
      },
      {
        "autor": "OGQueen",
        "data": "29. Oct 2026",
        "corpo": "The Reasin kicked the shit out of me. Never smoked such a heavy shit before.",
        "compra": "Gelato 41"
      },
      {
        "autor": "ducksmoke",
        "data": "27. Oct 2026",
        "corpo": "Love the OG Haze. Always such a tasteful, long lasting smoke! Great smell &amp; bag appeal and delivery to germany took only 2 days !",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "juicy perl",
        "data": "27. Oct 2026",
        "corpo": "We loved this one it was super smooth. Will reorder",
        "compra": "OG Haze"
      }
    ],
    "opcoes": [
      {
        "original": "48",
        "rotulo": "5 GRAM OG Haze for $50.00",
        "variante": "5 GRAM OG Haze",
        "preco": 50,
        "precoAntigo": ""
      },
      {
        "original": "49",
        "rotulo": "25 GRAM OG Haze for $200.00",
        "variante": "25 GRAM OG Haze",
        "preco": 200,
        "precoAntigo": ""
      },
      {
        "original": "50",
        "rotulo": "50 GRAM OG Haze for $380.00",
        "variante": "50 GRAM OG Haze",
        "preco": 380,
        "precoAntigo": ""
      },
      {
        "original": "57",
        "rotulo": "100 GRAM OG Haze for $650.00",
        "variante": "100 GRAM OG Haze",
        "preco": 650,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "994d1b58-9f74-3057-bb3b-7b18cd138afb",
        "nome": "OG Haze",
        "variante": "5 GRAM",
        "preco": 50,
        "precoTexto": "$50.00",
        "precoAntigo": "",
        "img": "pic/amsterdam/ahead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "fbc703b1-e09c-3e90-aede-be62f2105929",
        "nome": "OG Haze",
        "variante": "25 GRAM",
        "preco": 200,
        "precoTexto": "$200.00",
        "precoAntigo": "",
        "img": "pic/amsterdam/oghazehead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "7240a8af-9e9d-3985-9361-da5e41f057ba",
        "nome": "OG Haze",
        "variante": "50 GRAM",
        "preco": 380,
        "precoTexto": "$380.00",
        "precoAntigo": "",
        "img": "pic/amsterdam/oghazehead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "5ac79653-2ad6-3852-a588-723c64c5222e",
        "nome": "OG Haze",
        "variante": "100 GRAM",
        "preco": 650,
        "precoTexto": "$650.00",
        "precoAntigo": "",
        "img": "pic/amsterdam/oghazehead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "733548de-51cd-3c40-a526-23dbc1a70483",
    "chave": "cannabis-store-amsterdam#2",
    "vendor": "Cannabis Store Amsterdam",
    "vendorSlug": "cannabis-store-amsterdam",
    "produto": "2",
    "titulo": "Gelato 41",
    "descricao": "Award Winning Hybrid (approx. 55% Sativa / 45% Indica or 60% Indica / 40% Sativa)\nCross between Sunset Sherbert and Thin Mint Girl Scout Cookies\nTHC Content\tVERY High Potency 26% - 32%++\nDense buds with a range of colors from light green to purple, covered in golden-white trichomes\nPrimary Effects\tRelaxing body high, euphoria, mood boost, creativity, and a sense of calm\nBest Used For\tStress relief, anxiety, depression, unwinding in the evening, and promoting sleep at higher doses\n26-32% THC\nShipping ONLY IN EUROPE.\nContact: amsterdam@x-mail.pro",
    "galeria": [
      "pic/amsterdam/b1.jpg",
      "pic/amsterdam/b2.jpg",
      "pic/amsterdam/b3.jpg"
    ],
    "imgPrincipal": "pic/amsterdam/gelatohead.jpg",
    "logo": "pic/amsterdam/logo.png",
    "vendas": 255,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Wildthough",
        "data": "04. Nov 2026",
        "corpo": "Awesome stuff. Great smell. Killer smoke Killer Shop..",
        "compra": "Gelato 41"
      },
      {
        "autor": "Norman undercover",
        "data": "01. Nov 2026",
        "corpo": "Easy ordering.Super nice smell. Smoke was bomb. Stick dense buds. Definitely come back for",
        "compra": "OG Haze"
      },
      {
        "autor": "iii333",
        "data": "01. Nov 2026",
        "corpo": "Best looking weed I have seen. Extremely sticky and pleasant to smoke.",
        "compra": "Gelato 41"
      },
      {
        "autor": "OGQueen",
        "data": "29. Oct 2026",
        "corpo": "The Reasin kicked the shit out of me. Never smoked such a heavy shit before.",
        "compra": "Gelato 41"
      },
      {
        "autor": "ducksmoke",
        "data": "27. Oct 2026",
        "corpo": "Love the OG Haze. Always such a tasteful, long lasting smoke! Great smell &amp; bag appeal and delivery to germany took only 2 days !",
        "compra": "Amnezia Haze Core Cut"
      },
      {
        "autor": "juicy perl",
        "data": "27. Oct 2026",
        "corpo": "We loved this one it was super smooth. Will reorder",
        "compra": "OG Haze"
      }
    ],
    "opcoes": [
      {
        "original": "59",
        "rotulo": "5 GRAM Gelato 41 for $70.00",
        "variante": "5 GRAM Gelato 41",
        "preco": 70,
        "precoAntigo": ""
      },
      {
        "original": "252",
        "rotulo": "10 GRAM Gelato 41 for $120.00",
        "variante": "10 GRAM Gelato 41",
        "preco": 120,
        "precoAntigo": ""
      },
      {
        "original": "253",
        "rotulo": "100 GRAM Gelato 41 for $899.00",
        "variante": "100 GRAM Gelato 41",
        "preco": 899,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "c685d1f2-68db-3faa-a608-9153cfe30990",
        "nome": "Gelato 41",
        "variante": "5 GRAM",
        "preco": 70,
        "precoTexto": "$70.00",
        "precoAntigo": "",
        "img": "pic/amsterdam/bhead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "06010ba0-30ea-391f-a6be-e8e3bf2c98ca",
        "nome": "Gelato 41",
        "variante": "10 GRAM",
        "preco": 120,
        "precoTexto": "$120.00",
        "precoAntigo": "",
        "img": "pic/amsterdam/gelatohead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "53d14632-0e76-33e3-83d9-012fedfc2655",
        "nome": "Gelato 41",
        "variante": "100 GRAM",
        "preco": 899,
        "precoTexto": "$899.00",
        "precoAntigo": "",
        "img": "pic/amsterdam/gelatohead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "91d40104-521d-3e00-a563-17677c7e3d5f",
    "chave": "hash-king#2",
    "vendor": "Hash King",
    "vendorSlug": "hash-king",
    "produto": "2",
    "titulo": "Blond Lebanese",
    "descricao": "This AAAA+ cannabis concentrate is a gem from Lebanon’s rich hashish production history\nCrafted using modern cultivation techniques, the buds are delicately rubbed on silk cloth and pressed to perfection\nUp to 45% THC and 8% CBD\nOne of the strongest Hash compositions you can get on the market\nPerfect Stealth Delivery\nShipping Worldwide\nContact: hking@x-mail.pro",
    "galeria": [
      "pic/hashking/b1.jpg",
      "pic/hashking/b2.jpg",
      "pic/hashking/b3.jpg",
      "pic/hashking/b4.jpg",
      "pic/hashking/b5.jpg"
    ],
    "imgPrincipal": "pic/hashking/blondhead.jpg",
    "logo": "pic/hashking/logo.png",
    "vendas": 375,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Gmuschilover",
        "data": "06. Nov 2026",
        "corpo": "the dope is excellent! very good for reselling",
        "compra": "AK47 Hash"
      },
      {
        "autor": "peter parker",
        "data": "06. Nov 2026",
        "corpo": "thanks to the hashking and blackmarket for its reliability.i only buy here",
        "compra": "Blond Lebanese"
      },
      {
        "autor": "Lily",
        "data": "06. Nov 2026",
        "corpo": "great hash ! H.K is the fukn the best !!",
        "compra": "Premium ICE"
      },
      {
        "autor": "Angel 1",
        "data": "06. Nov 2026",
        "corpo": "Very fast delivery, good packaging and very good stealth, nice support and very good dope: Good high and good flavors! Thanks !",
        "compra": "AK47 Hash"
      },
      {
        "autor": "Banana x Gorilla",
        "data": "06. Nov 2026",
        "corpo": "Very good peace 5/5",
        "compra": "AK47 Hash"
      },
      {
        "autor": "jamal k.",
        "data": "04. Nov 2026",
        "corpo": "Perfect 6bd to france",
        "compra": "Blond Lebanese"
      }
    ],
    "opcoes": [
      {
        "original": "101",
        "rotulo": "5 GRAM Blond Lebanese for $45.00",
        "variante": "5 GRAM Blond Lebanese",
        "preco": 45,
        "precoAntigo": ""
      },
      {
        "original": "102",
        "rotulo": "25 GRAM Blond Lebanese for $200.00",
        "variante": "25 GRAM Blond Lebanese",
        "preco": 200,
        "precoAntigo": ""
      },
      {
        "original": "103",
        "rotulo": "100 GRAM Blond Lebanese for $750.00",
        "variante": "100 GRAM Blond Lebanese",
        "preco": 750,
        "precoAntigo": ""
      },
      {
        "original": "104",
        "rotulo": "1 KILOGRAM Blond Lebanese for $6000.00",
        "variante": "1 KILOGRAM Blond Lebanese",
        "preco": 6000,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "e896ea82-ac30-3835-9cf7-5d7db48c7332",
        "nome": "Blond Lebanese",
        "variante": "5 GRAM",
        "preco": 45,
        "precoTexto": "$45.00",
        "precoAntigo": "",
        "img": "pic/hashking/bhead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "cef48eda-0a23-35c9-b780-458a05ee5337",
        "nome": "Blond Lebanese",
        "variante": "25 GRAM",
        "preco": 200,
        "precoTexto": "$200.00",
        "precoAntigo": "",
        "img": "pic/hashking/blondhead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "0647ecc3-1b83-3832-bcc5-cd3aa8733ec0",
        "nome": "Blond Lebanese",
        "variante": "100 GRAM",
        "preco": 750,
        "precoTexto": "$750.00",
        "precoAntigo": "",
        "img": "pic/hashking/blondhead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "7d5f86ce-0edf-3a1c-8b9f-d88b849f2b51",
        "nome": "Blond Lebanese",
        "variante": "1 KILOGRAM",
        "preco": 6000,
        "precoTexto": "$6000.00",
        "precoAntigo": "",
        "img": "pic/hashking/blondhead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "952e49a8-5ce9-3171-ab84-1623e9ca2d8d",
    "chave": "hash-king#3",
    "vendor": "Hash King",
    "vendorSlug": "hash-king",
    "produto": "3",
    "titulo": "Premium ICE",
    "descricao": "Premium, high-end and craft cannabis extractions.\nICE / Melt / Resin\nThis is a highly concentrated and refined product that combines complex terpenes and cannabinoid molecules that deliver a more intense cerebral and psychoactive experience\nUp to 55% THC and 4% CBD\nBest qualitiy you can get on the market\nPerfect Stealth Delivery\nShipping Worldwide\nThis is only for ADVANCED USERS.\nContact: hking@x-mail.pro",
    "galeria": [
      "pic/hashking/c1.jpg",
      "pic/hashking/c2.jpg",
      "pic/hashking/c3.jpg",
      "pic/hashking/c4.jpg"
    ],
    "imgPrincipal": "pic/hashking/icehead.jpg",
    "logo": "pic/hashking/logo.png",
    "vendas": 375,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Gmuschilover",
        "data": "06. Nov 2026",
        "corpo": "the dope is excellent! very good for reselling",
        "compra": "AK47 Hash"
      },
      {
        "autor": "peter parker",
        "data": "06. Nov 2026",
        "corpo": "thanks to the hashking and blackmarket for its reliability.i only buy here",
        "compra": "Blond Lebanese"
      },
      {
        "autor": "Lily",
        "data": "06. Nov 2026",
        "corpo": "great hash ! H.K is the fukn the best !!",
        "compra": "Premium ICE"
      },
      {
        "autor": "Angel 1",
        "data": "06. Nov 2026",
        "corpo": "Very fast delivery, good packaging and very good stealth, nice support and very good dope: Good high and good flavors! Thanks !",
        "compra": "AK47 Hash"
      },
      {
        "autor": "Banana x Gorilla",
        "data": "06. Nov 2026",
        "corpo": "Very good peace 5/5",
        "compra": "AK47 Hash"
      },
      {
        "autor": "jamal k.",
        "data": "04. Nov 2026",
        "corpo": "Perfect 6bd to france",
        "compra": "Blond Lebanese"
      }
    ],
    "opcoes": [
      {
        "original": "105",
        "rotulo": "1 GRAM Premium ICE for $45.00",
        "variante": "1 GRAM Premium ICE",
        "preco": 45,
        "precoAntigo": ""
      },
      {
        "original": "106",
        "rotulo": "10 GRAM Premium ICE for $400.00",
        "variante": "10 GRAM Premium ICE",
        "preco": 400,
        "precoAntigo": ""
      },
      {
        "original": "107",
        "rotulo": "25 GRAM Premium ICE for $900.00",
        "variante": "25 GRAM Premium ICE",
        "preco": 900,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "2131004d-44a8-3798-bfef-a0be7395e121",
        "nome": "Premium ICE",
        "variante": "1 GRAM",
        "preco": 45,
        "precoTexto": "$45.00",
        "precoAntigo": "",
        "img": "pic/hashking/chead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "25669de7-4914-371e-96fe-6a6493569750",
        "nome": "Premium ICE",
        "variante": "10 GRAM",
        "preco": 400,
        "precoTexto": "$400.00",
        "precoAntigo": "",
        "img": "pic/hashking/icehead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "a6733685-7a0e-3bbd-950c-7114154362c9",
        "nome": "Premium ICE",
        "variante": "25 GRAM",
        "preco": 900,
        "precoTexto": "$900.00",
        "precoAntigo": "",
        "img": "pic/hashking/icehead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "1b24dbba-002b-3f5f-93bb-9d8d3fa7f954",
    "chave": "hash-king#4",
    "vendor": "Hash King",
    "vendorSlug": "hash-king",
    "produto": "4",
    "titulo": "AK47 Hash",
    "descricao": "AK-47 Hash is a premium import hash sourced directly from Afghanistan\nThe whole production is done by hand with no extra additives or solvent\nPerfect for resell\nPerfect Stealth Delivery\nShipping Worldwide\nContact: hking@x-mail.pro",
    "galeria": [
      "pic/hashking/d1.jpg",
      "pic/hashking/d2.jpg",
      "pic/hashking/d3.jpg"
    ],
    "imgPrincipal": "pic/hashking/47head.jpg",
    "logo": "pic/hashking/logo.png",
    "vendas": 375,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Gmuschilover",
        "data": "06. Nov 2026",
        "corpo": "the dope is excellent! very good for reselling",
        "compra": "AK47 Hash"
      },
      {
        "autor": "peter parker",
        "data": "06. Nov 2026",
        "corpo": "thanks to the hashking and blackmarket for its reliability.i only buy here",
        "compra": "Blond Lebanese"
      },
      {
        "autor": "Lily",
        "data": "06. Nov 2026",
        "corpo": "great hash ! H.K is the fukn the best !!",
        "compra": "Premium ICE"
      },
      {
        "autor": "Angel 1",
        "data": "06. Nov 2026",
        "corpo": "Very fast delivery, good packaging and very good stealth, nice support and very good dope: Good high and good flavors! Thanks !",
        "compra": "AK47 Hash"
      },
      {
        "autor": "Banana x Gorilla",
        "data": "06. Nov 2026",
        "corpo": "Very good peace 5/5",
        "compra": "AK47 Hash"
      },
      {
        "autor": "jamal k.",
        "data": "04. Nov 2026",
        "corpo": "Perfect 6bd to france",
        "compra": "Blond Lebanese"
      }
    ],
    "opcoes": [
      {
        "original": "112",
        "rotulo": "5 GRAM AK47 Hash for $30.00",
        "variante": "5 GRAM AK47 Hash",
        "preco": 30,
        "precoAntigo": ""
      },
      {
        "original": "113",
        "rotulo": "25 GRAM AK47 Hash for $130.00",
        "variante": "25 GRAM AK47 Hash",
        "preco": 130,
        "precoAntigo": ""
      },
      {
        "original": "114",
        "rotulo": "100 GRAM AK47 Hash for $400.00",
        "variante": "100 GRAM AK47 Hash",
        "preco": 400,
        "precoAntigo": ""
      },
      {
        "original": "115",
        "rotulo": "1 KILOGRAM AK47 Hash for $3000.00",
        "variante": "1 KILOGRAM AK47 Hash",
        "preco": 3000,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "3ea3e2df-aa6c-3901-a375-4b7dc062e320",
        "nome": "AK47 Hash",
        "variante": "5 GRAM",
        "preco": 30,
        "precoTexto": "$30.00",
        "precoAntigo": "",
        "img": "pic/hashking/dhead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "34f8e972-c45c-3a08-926c-bb1ac0d0ca73",
        "nome": "AK47 Hash",
        "variante": "25 GRAM",
        "preco": 130,
        "precoTexto": "$130.00",
        "precoAntigo": "",
        "img": "pic/hashking/47head.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "58f6e92f-1c1a-3d5a-aa02-b4532f50fa73",
        "nome": "AK47 Hash",
        "variante": "100 GRAM",
        "preco": 400,
        "precoTexto": "$400.00",
        "precoAntigo": "",
        "img": "pic/hashking/47head.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "1332228a-b7b9-3cb6-8468-1ea7dcf4c2fa",
        "nome": "AK47 Hash",
        "variante": "1 KILOGRAM",
        "preco": 3000,
        "precoTexto": "$3000.00",
        "precoAntigo": "",
        "img": "pic/hashking/47head.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "1dbb02d4-34f6-345e-93c9-63c315190a35",
    "chave": "no-limit-pharmacy#1",
    "vendor": "No Limit Pharmacy",
    "vendorSlug": "no-limit-pharmacy",
    "produto": "1",
    "titulo": "Calypsol Ketamine",
    "descricao": "Calypsol Ketamine 500mg/10ml Injectable\nPrimarily for anesthesia, chronic pain and sedation in intensive care..\nDiscret International Express Shipping with tracking ID\nContact: nolimit@x-mail.pro",
    "galeria": [
      "pic/nolimit/a1.jpg",
      "pic/nolimit/a2.jpg"
    ],
    "imgPrincipal": "pic/nolimit/ketahead.jpg",
    "logo": "pic/nolimit/nolimit.png",
    "vendas": 1368,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Stanley70",
        "data": "05. Nov 2026",
        "corpo": "Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Jerold M",
        "data": "05. Nov 2026",
        "corpo": "Thanks for shipping to uk. Im glad I didnt have to face any problems :)",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Paku man",
        "data": "04. Nov 2026",
        "corpo": "excellent service in usa",
        "compra": "Oxycodone 20mg"
      },
      {
        "autor": "Elroy",
        "data": "01. Nov 2026",
        "corpo": "Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.",
        "compra": "Calypsol Ketamine"
      },
      {
        "autor": "Royce G",
        "data": "30. Oct 2026",
        "corpo": "delivered within an hour via email and it worked just fine on the site",
        "compra": "Ketamine HCL"
      },
      {
        "autor": "Alice One",
        "data": "30. Oct 2026",
        "corpo": "I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!",
        "compra": "Ketamine HCL"
      }
    ],
    "opcoes": [
      {
        "original": "116",
        "rotulo": "5 VIALS Calypsol Ketamine for $79.00",
        "variante": "5 VIALS Calypsol Ketamine",
        "preco": 79,
        "precoAntigo": ""
      },
      {
        "original": "117",
        "rotulo": "10 VIALS Calypsol Ketamine for $129.00",
        "variante": "10 VIALS Calypsol Ketamine",
        "preco": 129,
        "precoAntigo": ""
      },
      {
        "original": "118",
        "rotulo": "25 VIALS Calypsol Ketamine for $199.00",
        "variante": "25 VIALS Calypsol Ketamine",
        "preco": 199,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "49611b03-12c6-3bc0-b2a6-7e90baf54b68",
        "nome": "Calypsol Ketamine",
        "variante": "5 VIALS",
        "preco": 79,
        "precoTexto": "$79.00",
        "precoAntigo": "",
        "img": "pic/nolimit/ahead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "c1c005ff-7d20-3469-8cbf-37fa2deb71e2",
        "nome": "Calypsol Ketamine",
        "variante": "10 VIALS",
        "preco": 129,
        "precoTexto": "$129.00",
        "precoAntigo": "",
        "img": "pic/nolimit/ketahead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "d6149af3-792a-3f7e-b5c7-c31a70017dd5",
        "nome": "Calypsol Ketamine",
        "variante": "25 VIALS",
        "preco": 199,
        "precoTexto": "$199.00",
        "precoAntigo": "",
        "img": "pic/nolimit/ketahead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "8437259c-190a-332d-9d5d-5fd48ea2ab1c",
    "chave": "no-limit-pharmacy#2",
    "vendor": "No Limit Pharmacy",
    "vendorSlug": "no-limit-pharmacy",
    "produto": "2",
    "titulo": "Ketamine HCL",
    "descricao": "Ketamine HCL Liquid 500mg/10ml Injectable\nPrimarily for anesthesia, chronic pain and sedation in intensive care..\nDiscret International Express Shipping with tracking ID\nContact: nolimit@x-mail.pro",
    "galeria": [
      "pic/nolimit/b1.jpg",
      "pic/nolimit/b2.jpg"
    ],
    "imgPrincipal": "pic/nolimit/ketahead.jpg",
    "logo": "pic/nolimit/nolimit.png",
    "vendas": 1368,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Stanley70",
        "data": "05. Nov 2026",
        "corpo": "Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Jerold M",
        "data": "05. Nov 2026",
        "corpo": "Thanks for shipping to uk. Im glad I didnt have to face any problems :)",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Paku man",
        "data": "04. Nov 2026",
        "corpo": "excellent service in usa",
        "compra": "Oxycodone 20mg"
      },
      {
        "autor": "Elroy",
        "data": "01. Nov 2026",
        "corpo": "Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.",
        "compra": "Calypsol Ketamine"
      },
      {
        "autor": "Royce G",
        "data": "30. Oct 2026",
        "corpo": "delivered within an hour via email and it worked just fine on the site",
        "compra": "Ketamine HCL"
      },
      {
        "autor": "Alice One",
        "data": "30. Oct 2026",
        "corpo": "I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!",
        "compra": "Ketamine HCL"
      }
    ],
    "opcoes": [
      {
        "original": "122",
        "rotulo": "5 VIALS Ketamine HCL for $89.00",
        "variante": "5 VIALS Ketamine HCL",
        "preco": 89,
        "precoAntigo": ""
      },
      {
        "original": "123",
        "rotulo": "10 VIALS Ketamine HCL for $139.00",
        "variante": "10 VIALS Ketamine HCL",
        "preco": 139,
        "precoAntigo": ""
      },
      {
        "original": "124",
        "rotulo": "25 VIALS Ketamine HCL for $199.00",
        "variante": "25 VIALS Ketamine HCL",
        "preco": 199,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "5966c8f6-8a31-3314-8ed1-7a9f8903c765",
        "nome": "Ketamine HCL",
        "variante": "5 VIALS",
        "preco": 89,
        "precoTexto": "$89.00",
        "precoAntigo": "",
        "img": "pic/nolimit/bhead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "b28d04b2-7f38-3b89-8781-e6312fb0925a",
        "nome": "Ketamine HCL",
        "variante": "10 VIALS",
        "preco": 139,
        "precoTexto": "$139.00",
        "precoAntigo": "",
        "img": "pic/nolimit/ketahead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "cf79ade7-c4bd-3283-8e11-7386263e2c5d",
        "nome": "Ketamine HCL",
        "variante": "25 VIALS",
        "preco": 199,
        "precoTexto": "$199.00",
        "precoAntigo": "",
        "img": "pic/nolimit/ketahead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "36d1eaaf-053e-3b85-892d-1275f947d446",
    "chave": "no-limit-pharmacy#4",
    "vendor": "No Limit Pharmacy",
    "vendorSlug": "no-limit-pharmacy",
    "produto": "4",
    "titulo": "Oxycontin 40mg",
    "descricao": "Pharmacy online 40mg Oxycontin Pills by Purdue Pharma\nOxycontin treats severe, chronic pain. It is prescribed when other pain medications do not work well enough or cannot be tolerated\nDiscret Shipping to every country with tracking ID\nContact: nolimit@x-mail.pro",
    "galeria": [
      "pic/nolimit/d1.jpg"
    ],
    "imgPrincipal": "pic/nolimit/oxihead.jpg",
    "logo": "pic/nolimit/nolimit.png",
    "vendas": 1368,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Stanley70",
        "data": "05. Nov 2026",
        "corpo": "Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Jerold M",
        "data": "05. Nov 2026",
        "corpo": "Thanks for shipping to uk. Im glad I didnt have to face any problems :)",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Paku man",
        "data": "04. Nov 2026",
        "corpo": "excellent service in usa",
        "compra": "Oxycodone 20mg"
      },
      {
        "autor": "Elroy",
        "data": "01. Nov 2026",
        "corpo": "Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.",
        "compra": "Calypsol Ketamine"
      },
      {
        "autor": "Royce G",
        "data": "30. Oct 2026",
        "corpo": "delivered within an hour via email and it worked just fine on the site",
        "compra": "Ketamine HCL"
      },
      {
        "autor": "Alice One",
        "data": "30. Oct 2026",
        "corpo": "I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!",
        "compra": "Ketamine HCL"
      }
    ],
    "opcoes": [
      {
        "original": "128",
        "rotulo": "100 TABLETS Oxycontin 40mg for $40.00",
        "variante": "100 TABLETS Oxycontin 40mg",
        "preco": 40,
        "precoAntigo": ""
      },
      {
        "original": "129",
        "rotulo": "500 TABLETS Oxycontin 40mg for $160.00",
        "variante": "500 TABLETS Oxycontin 40mg",
        "preco": 160,
        "precoAntigo": ""
      },
      {
        "original": "130",
        "rotulo": "1.000 TABLETS Oxycontin 40mg for $260.00",
        "variante": "1.000 TABLETS Oxycontin 40mg",
        "preco": 260,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "33fbb03f-c25d-3f79-9dca-20a3d0ac97c4",
        "nome": "Oxycontin 40mg",
        "variante": "100 TABLETS",
        "preco": 40,
        "precoTexto": "$40.00",
        "precoAntigo": "",
        "img": "pic/nolimit/dhead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "93848021-648b-37d4-beff-fe846c4c4cf5",
        "nome": "Oxycontin 40mg",
        "variante": "500 TABLETS",
        "preco": 160,
        "precoTexto": "$160.00",
        "precoAntigo": "",
        "img": "pic/nolimit/oxihead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "35e2d04d-a66a-35be-b10a-4dd686ca2898",
        "nome": "Oxycontin 40mg",
        "variante": "1.000 TABLETS",
        "preco": 260,
        "precoTexto": "$260.00",
        "precoAntigo": "",
        "img": "pic/nolimit/oxihead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "31cdf37a-e450-3914-9466-245c5664bd3c",
    "chave": "no-limit-pharmacy#5",
    "vendor": "No Limit Pharmacy",
    "vendorSlug": "no-limit-pharmacy",
    "produto": "5",
    "titulo": "Xanax 2mg",
    "descricao": "Pharmacy online Pfizer Xanax Bars 2mg, Non prescription, Treatment: Anxiety, Intas Pharmaceuticals\nDiscret Shipping to every country with tracking ID\nContact: nolimit@x-mail.pro",
    "galeria": [
      "pic/nolimit/e1.jpg"
    ],
    "imgPrincipal": "pic/nolimit/xanaxhead.jpg",
    "logo": "pic/nolimit/nolimit.png",
    "vendas": 1368,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Stanley70",
        "data": "05. Nov 2026",
        "corpo": "Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Jerold M",
        "data": "05. Nov 2026",
        "corpo": "Thanks for shipping to uk. Im glad I didnt have to face any problems :)",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Paku man",
        "data": "04. Nov 2026",
        "corpo": "excellent service in usa",
        "compra": "Oxycodone 20mg"
      },
      {
        "autor": "Elroy",
        "data": "01. Nov 2026",
        "corpo": "Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.",
        "compra": "Calypsol Ketamine"
      },
      {
        "autor": "Royce G",
        "data": "30. Oct 2026",
        "corpo": "delivered within an hour via email and it worked just fine on the site",
        "compra": "Ketamine HCL"
      },
      {
        "autor": "Alice One",
        "data": "30. Oct 2026",
        "corpo": "I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!",
        "compra": "Ketamine HCL"
      }
    ],
    "opcoes": [
      {
        "original": "131",
        "rotulo": "50 TABLETS Xanax 2mg for $119.00",
        "variante": "50 TABLETS Xanax 2mg",
        "preco": 119,
        "precoAntigo": ""
      },
      {
        "original": "132",
        "rotulo": "100 TABLETS Xanax 2mg for $199.00",
        "variante": "100 TABLETS Xanax 2mg",
        "preco": 199,
        "precoAntigo": ""
      },
      {
        "original": "133",
        "rotulo": "1.000 TABLETS Xanax 2mg for $1500.00",
        "variante": "1.000 TABLETS Xanax 2mg",
        "preco": 1500,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "28d5dd49-d40b-3264-9b65-82d7b184af88",
        "nome": "Xanax 2mg",
        "variante": "50 TABLETS",
        "preco": 119,
        "precoTexto": "$119.00",
        "precoAntigo": "",
        "img": "pic/nolimit/ehead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "ccee2e35-a144-372f-8967-caaa184a8738",
        "nome": "Xanax 2mg",
        "variante": "100 TABLETS",
        "preco": 199,
        "precoTexto": "$199.00",
        "precoAntigo": "",
        "img": "pic/nolimit/xanaxhead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "4c3eb281-9a65-3825-a65b-de306ca61754",
        "nome": "Xanax 2mg",
        "variante": "1.000 TABLETS",
        "preco": 1500,
        "precoTexto": "$1500.00",
        "precoAntigo": "",
        "img": "pic/nolimit/xanaxhead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "172228a0-abc7-3375-88c9-466b003e5fba",
    "chave": "no-limit-pharmacy#6",
    "vendor": "No Limit Pharmacy",
    "vendorSlug": "no-limit-pharmacy",
    "produto": "6",
    "titulo": "Tilidin 200mg",
    "descricao": "Pharmacy online TILIDIN comp. STADA 200 mg/16 mg\nTilidine is a synthetic opioid indicated in the treatment of severe pain.\nDiscret Shipping to every country with tracking ID\nContact: nolimit@x-mail.pro",
    "galeria": [
      "pic/nolimit/f1.jpg"
    ],
    "imgPrincipal": "pic/nolimit/tilihead.jpg",
    "logo": "pic/nolimit/nolimit.png",
    "vendas": 1368,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Stanley70",
        "data": "05. Nov 2026",
        "corpo": "Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Jerold M",
        "data": "05. Nov 2026",
        "corpo": "Thanks for shipping to uk. Im glad I didnt have to face any problems :)",
        "compra": "Tilidin 200mg"
      },
      {
        "autor": "Paku man",
        "data": "04. Nov 2026",
        "corpo": "excellent service in usa",
        "compra": "Oxycodone 20mg"
      },
      {
        "autor": "Elroy",
        "data": "01. Nov 2026",
        "corpo": "Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.",
        "compra": "Calypsol Ketamine"
      },
      {
        "autor": "Royce G",
        "data": "30. Oct 2026",
        "corpo": "delivered within an hour via email and it worked just fine on the site",
        "compra": "Ketamine HCL"
      },
      {
        "autor": "Alice One",
        "data": "30. Oct 2026",
        "corpo": "I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!",
        "compra": "Ketamine HCL"
      }
    ],
    "opcoes": [
      {
        "original": "134",
        "rotulo": "100 TABLETS Tilidin 200mg for $70.00",
        "variante": "100 TABLETS Tilidin 200mg",
        "preco": 70,
        "precoAntigo": ""
      },
      {
        "original": "135",
        "rotulo": "500 TABLETS Tilidin 200mg for $300.00",
        "variante": "500 TABLETS Tilidin 200mg",
        "preco": 300,
        "precoAntigo": ""
      },
      {
        "original": "136",
        "rotulo": "1.000 TABLETS Tilidin 200mg for $4500.00",
        "variante": "1.000 TABLETS Tilidin 200mg",
        "preco": 4500,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "84b9d121-0190-3dee-9a12-6722b023ede0",
        "nome": "Tilidin 200mg",
        "variante": "100 TABLETS",
        "preco": 70,
        "precoTexto": "$70.00",
        "precoAntigo": "",
        "img": "pic/nolimit/fhead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "0bfb6a04-0c61-373d-b6b5-5355184fac8b",
        "nome": "Tilidin 200mg",
        "variante": "500 TABLETS",
        "preco": 300,
        "precoTexto": "$300.00",
        "precoAntigo": "",
        "img": "pic/nolimit/tilihead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "f83d3c27-3c33-35ad-abe8-a7aac3698250",
        "nome": "Tilidin 200mg",
        "variante": "1.000 TABLETS",
        "preco": 4500,
        "precoTexto": "$4500.00",
        "precoAntigo": "",
        "img": "pic/nolimit/tilihead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "757aae13-a631-379e-bd5d-981a96bace73",
    "chave": "perc-bros#1",
    "vendor": "Perc Bros",
    "vendorSlug": "perc-bros",
    "produto": "1",
    "titulo": "Blue Punisher 300mg",
    "descricao": "XTC Punisher 270mg Online are made from our pure MDMA crystals.\nThe pure crystals are ground down into a fine powder and then mixed with a safe, harmless binder and hard pressed into pills.\nOur pills each contain a Strong Dose of 300mg of Pure MDMA and more.\nFast Shipping within the EU and comes with tracking ID by DHL\nContact: percbros@x-mail.pro",
    "galeria": [
      "pic/percbros/a1.jpg",
      "pic/percbros/a2.jpg",
      "pic/percbros/a3.jpg"
    ],
    "imgPrincipal": "pic/percbros/bluehead.jpg",
    "logo": "pic/percbros/logo.png",
    "vendas": 273,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Elon Musk",
        "data": "06. Nov 2026",
        "corpo": "Love the molys +++",
        "compra": "Blue Punisher 300mg"
      },
      {
        "autor": "beliver",
        "data": "05. Nov 2026",
        "corpo": "best store on the whole darknet",
        "compra": "Blue Tesla 230mg"
      },
      {
        "autor": "Lovemike",
        "data": "05. Nov 2026",
        "corpo": "The best xtc pills I ever popped they are my absolute favorite and I’ve popped a few of the bangers too!",
        "compra": "Blue Punisher 300mg"
      },
      {
        "autor": "n.I",
        "data": "05. Nov 2026",
        "corpo": "Delivering was on point. 4 days to paris. very good stuff for resell. pills high grades",
        "compra": "Blue Punisher 300mg"
      },
      {
        "autor": "Lovemike",
        "data": "05. Nov 2026",
        "corpo": "received within a week in Italy 100 percent recommended seller",
        "compra": "Blue Tesla 230mg"
      },
      {
        "autor": "Lovemike",
        "data": "04. Nov 2026",
        "corpo": "perfect molys no bullshit",
        "compra": "Blue Punisher 300mg"
      }
    ],
    "opcoes": [
      {
        "original": "141",
        "rotulo": "50 TABLETS Blue Punisher 300mg for $120.00",
        "variante": "50 TABLETS Blue Punisher 300mg",
        "preco": 120,
        "precoAntigo": ""
      },
      {
        "original": "142",
        "rotulo": "100 TABLETS Blue Punisher 300mg for $199.00",
        "variante": "100 TABLETS Blue Punisher 300mg",
        "preco": 199,
        "precoAntigo": ""
      },
      {
        "original": "143",
        "rotulo": "500 TABLETS Blue Punisher 300mg for $699.00",
        "variante": "500 TABLETS Blue Punisher 300mg",
        "preco": 699,
        "precoAntigo": ""
      },
      {
        "original": "144",
        "rotulo": "1.000 TABLETS Blue Punisher 300mg for $999.00",
        "variante": "1.000 TABLETS Blue Punisher 300mg",
        "preco": 999,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "048c57c0-ffcf-3dd6-ad75-e36a633666f4",
        "nome": "Blue Punisher 300mg",
        "variante": "50 TABLETS",
        "preco": 120,
        "precoTexto": "$120.00",
        "precoAntigo": "",
        "img": "pic/percbros/ahead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "9128d4b9-c4c9-34cc-925d-141dae5f2023",
        "nome": "Blue Punisher 300mg",
        "variante": "100 TABLETS",
        "preco": 199,
        "precoTexto": "$199.00",
        "precoAntigo": "",
        "img": "pic/percbros/bluehead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "4a37f9e4-d16a-3058-a7c0-dc032f84b715",
        "nome": "Blue Punisher 300mg",
        "variante": "500 TABLETS",
        "preco": 699,
        "precoTexto": "$699.00",
        "precoAntigo": "",
        "img": "pic/percbros/bluehead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "abd02c21-b928-35b6-ac0d-a1531fa447e5",
        "nome": "Blue Punisher 300mg",
        "variante": "1.000 TABLETS",
        "preco": 999,
        "precoTexto": "$999.00",
        "precoAntigo": "",
        "img": "pic/percbros/bluehead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "d8697e00-8c06-3102-8fd8-a73902b5d6aa",
    "chave": "perc-bros#2",
    "vendor": "Perc Bros",
    "vendorSlug": "perc-bros",
    "produto": "2",
    "titulo": "Blue Tesla 230mg",
    "descricao": "XTC Blue Tesla 230mg.\nBLUE TESLA PILLS are synonymous with strength and power.\nOur pills each contain a Strong Dose of 230mg of Pure MDMA and more.\nFast Shipping within the EU and comes with tracking ID by DHL\nContact: percbros@x-mail.pro",
    "galeria": [
      "pic/percbros/b1.jpg",
      "pic/percbros/b2.jpg"
    ],
    "imgPrincipal": "pic/percbros/teslahead.jpg",
    "logo": "pic/percbros/logo.png",
    "vendas": 273,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Elon Musk",
        "data": "06. Nov 2026",
        "corpo": "Love the molys +++",
        "compra": "Blue Punisher 300mg"
      },
      {
        "autor": "beliver",
        "data": "05. Nov 2026",
        "corpo": "best store on the whole darknet",
        "compra": "Blue Tesla 230mg"
      },
      {
        "autor": "Lovemike",
        "data": "05. Nov 2026",
        "corpo": "The best xtc pills I ever popped they are my absolute favorite and I’ve popped a few of the bangers too!",
        "compra": "Blue Punisher 300mg"
      },
      {
        "autor": "n.I",
        "data": "05. Nov 2026",
        "corpo": "Delivering was on point. 4 days to paris. very good stuff for resell. pills high grades",
        "compra": "Blue Punisher 300mg"
      },
      {
        "autor": "Lovemike",
        "data": "05. Nov 2026",
        "corpo": "received within a week in Italy 100 percent recommended seller",
        "compra": "Blue Tesla 230mg"
      },
      {
        "autor": "Lovemike",
        "data": "04. Nov 2026",
        "corpo": "perfect molys no bullshit",
        "compra": "Blue Punisher 300mg"
      }
    ],
    "opcoes": [
      {
        "original": "145",
        "rotulo": "50 TABLETS Blue Tesla 230mg for $130.00",
        "variante": "50 TABLETS Blue Tesla 230mg",
        "preco": 130,
        "precoAntigo": ""
      },
      {
        "original": "146",
        "rotulo": "100 TABLETS Blue Tesla 230mg for $210.00",
        "variante": "100 TABLETS Blue Tesla 230mg",
        "preco": 210,
        "precoAntigo": ""
      },
      {
        "original": "147",
        "rotulo": "500 TABLETS Blue Tesla 230mg for $749.00",
        "variante": "500 TABLETS Blue Tesla 230mg",
        "preco": 749,
        "precoAntigo": ""
      },
      {
        "original": "148",
        "rotulo": "1.000 TABLETS Blue Tesla 230mg for $1099.00",
        "variante": "1.000 TABLETS Blue Tesla 230mg",
        "preco": 1099,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "9460a277-1e67-3b8f-a2a4-ba64dff5e4b6",
        "nome": "Blue Tesla 230mg",
        "variante": "50 TABLETS",
        "preco": 130,
        "precoTexto": "$130.00",
        "precoAntigo": "",
        "img": "pic/percbros/bhead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "f5a548bb-7c62-3d78-b869-8322cb1ef1cc",
        "nome": "Blue Tesla 230mg",
        "variante": "100 TABLETS",
        "preco": 210,
        "precoTexto": "$210.00",
        "precoAntigo": "",
        "img": "pic/percbros/teslahead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "54b2de45-3986-377d-8134-d0c50d6129ff",
        "nome": "Blue Tesla 230mg",
        "variante": "500 TABLETS",
        "preco": 749,
        "precoTexto": "$749.00",
        "precoAntigo": "",
        "img": "pic/percbros/teslahead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "c7d15300-c087-314f-9193-5262ef951b67",
        "nome": "Blue Tesla 230mg",
        "variante": "1.000 TABLETS",
        "preco": 1099,
        "precoTexto": "$1099.00",
        "precoAntigo": "",
        "img": "pic/percbros/teslahead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  },
  {
    "id": "dd1c519f-2db3-3641-a041-44f2da130a42",
    "chave": "walter-white#1",
    "vendor": "Walter White",
    "vendorSlug": "walter-white",
    "produto": "1",
    "titulo": "Fishscale Cocaine",
    "descricao": "Colombian Fishscale Cocaine(96% Pure)\nQuality uncut Colombian coke of 96% purity level - Finest selection\nSecured delivery to all location worldwide, stealth packaging and tracking.\nWe also do overnight (Courier) for all our clients who bought 50 or 100.\nContact:",
    "galeria": [
      "pic/walterwhite/a1.jpeg",
      "pic/walterwhite/a2.jpeg",
      "pic/walterwhite/a3.jpeg",
      "pic/walterwhite/a4.jpeg",
      "pic/walterwhite/a5.jpeg"
    ],
    "imgPrincipal": "pic/walterwhite/whead.jpg",
    "logo": "pic/walterwhite/ww.png",
    "vendas": 1277,
    "categoria": "drugs",
    "envio": "Incl. Overnight Shipping",
    "paises": [],
    "comentarios": [
      {
        "autor": "Tit1ano",
        "data": "05. Nov 2026",
        "corpo": "Hello friends , i am here to write a feedback for this vendor . when order here first time I was worried that I was not being cheated ,i have been paid $2600.00 for 100 Gram Fishscale Cocaine But I didnt get it in 7 days. i sent them email &amp; they replied product has been sent. confusing ,but After that 2 days I received the parcel. it may be the problem of delevary system . real vendor &amp; best quality product , thats all",
        "compra": "Fishscale Cocaine"
      },
      {
        "autor": "Rahad k",
        "data": "03. Nov 2026",
        "corpo": "I Place An Order Several Days Ago, And Received Just In Time.",
        "compra": "Peruvian Cocaine"
      },
      {
        "autor": "hitler",
        "data": "01. Nov 2026",
        "corpo": "Quick &amp; good stealth! cant tell about quality, will try!",
        "compra": "Peruvian Cocaine"
      },
      {
        "autor": "maniac",
        "data": "01. Nov 2026",
        "corpo": "fast delivery and looks great - thanks!",
        "compra": "Peruvian Cocaine"
      },
      {
        "autor": "Bart F.",
        "data": "01. Nov 2026",
        "corpo": "Hi guys ordered for the first time no problems good quality price performance is also right Packaging was also very good. Ill think about only ordering here xD definitely come back to recommend greetings from belgium",
        "compra": "Peruvian Cocaine"
      },
      {
        "autor": "Jeremy",
        "data": "29. Oct 2026",
        "corpo": "so freunde muss mal sagen hab bei vielen verkäufern auf verschiedenen shops bestellt und muss sagen das dieser hier die beste flex am start hat sonst war bei vielen nur rotze dabei 100% reship und kunden support 1a++ kann ich nur empfehlen an leute die gutes flex suchen danke bro",
        "compra": "Fishscale Cocaine"
      }
    ],
    "opcoes": [
      {
        "original": "81",
        "rotulo": "3 GRAM Fishscale Cocaine for $99.00",
        "variante": "3 GRAM Fishscale Cocaine",
        "preco": 99,
        "precoAntigo": ""
      },
      {
        "original": "82",
        "rotulo": "5 GRAM Fishscale Cocaine for $180.00",
        "variante": "5 GRAM Fishscale Cocaine",
        "preco": 180,
        "precoAntigo": ""
      },
      {
        "original": "83",
        "rotulo": "50 GRAM Fishscale Cocaine for $1400.00",
        "variante": "50 GRAM Fishscale Cocaine",
        "preco": 1400,
        "precoAntigo": ""
      },
      {
        "original": "84",
        "rotulo": "100 GRAM Fishscale Cocaine for $2600.00",
        "variante": "100 GRAM Fishscale Cocaine",
        "preco": 2600,
        "precoAntigo": ""
      }
    ],
    "variantes": [
      {
        "id": "cda256b6-dd0a-3f41-a4f9-d9333cf515c8",
        "nome": "Fishscale Cocaine",
        "variante": "3 GRAM",
        "preco": 99,
        "precoTexto": "$99.00",
        "precoAntigo": "",
        "img": "pic/walterwhite/ahead.jpg",
        "envio": "Incl. Overnight Shipping",
        "origem": "card"
      },
      {
        "id": "c63ea410-0f17-32b2-9b53-da2d52766836",
        "nome": "Fishscale Cocaine",
        "variante": "5 GRAM",
        "preco": 180,
        "precoTexto": "$180.00",
        "precoAntigo": "",
        "img": "pic/walterwhite/whead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "dcd35ca0-a69a-354f-ba05-4692559e190a",
        "nome": "Fishscale Cocaine",
        "variante": "50 GRAM",
        "preco": 1400,
        "precoTexto": "$1400.00",
        "precoAntigo": "",
        "img": "pic/walterwhite/whead.jpg",
        "envio": "",
        "origem": "select"
      },
      {
        "id": "d2bfd876-4e3b-3972-8adc-5aa61549a6cf",
        "nome": "Fishscale Cocaine",
        "variante": "100 GRAM",
        "preco": 2600,
        "precoTexto": "$2600.00",
        "precoAntigo": "",
        "img": "pic/walterwhite/whead.jpg",
        "envio": "",
        "origem": "select"
      }
    ]
  }
];

export const listarPorCategoria = (categoria: string): Produto[] =>
  PRODUTOS.filter((p) => p.categoria === categoria);

export const listarPorVendedor = (vendorSlug: string): Produto[] =>
  PRODUTOS.filter((p) => p.vendorSlug === vendorSlug);

export const produtoPorChave = (chave: string): Produto | null =>
  PRODUTOS.find((p) => p.chave === chave) ?? null;

export const produtoPorId = (id: string): Produto | null =>
  PRODUTOS.find((p) => p.id === id) ?? null;

export const vendedorPorSlug = (slug: string): Vendedor | null =>
  VENDEDORES.find((v) => v.slug === slug) ?? null;

export const totalAnuncios = (): number =>
  PRODUTOS.reduce((acc, p) => acc + p.variantes.length, 0);
