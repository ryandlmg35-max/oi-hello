-- 0001_migration.sql — Black Market 2026 (mirror: secao Medical / Drugs)
-- Mercado de escrow: vendedores, catalogo espelhado, variantes e campos de pedido.

-- ------------------------------------------------------------------ status do pedido
-- etapas extras do fluxo de escrow (o enum base tem pendente/pago/cancelado)
do $$
begin
  if exists (select 1 from pg_type where typname = 'pedido_status') then
    alter type public.pedido_status add value if not exists 'enviado';
    alter type public.pedido_status add value if not exists 'liberado';
    alter type public.pedido_status add value if not exists 'disputa';
  end if;
end $$;

-- ------------------------------------------------------------------ vendedores
create table if not exists public.vendedores (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nome text not null,
  nivel text not null default 'Silver Seller',
  envio text not null default 'Worldwide Shipping',
  ativo boolean not null default false,
  vendas integer not null default 0,
  avaliacao numeric(2,1) not null default 5.0,
  capa text,
  logo text,
  destaque boolean not null default false,
  criado_em timestamptz not null default now()
);
grant select on public.vendedores to anon, authenticated;
grant all on public.vendedores to service_role;
alter table public.vendedores enable row level security;
drop policy if exists "Leitura publica de vendedores" on public.vendedores;
create policy "Leitura publica de vendedores" on public.vendedores for select to anon, authenticated using (true);
drop policy if exists "Admin gerencia vendedores" on public.vendedores;
create policy "Admin gerencia vendedores" on public.vendedores for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------------ catalogo
alter table public.produtos
  add column if not exists categoria text,
  add column if not exists vendedor text,
  add column if not exists vendedor_slug text,
  add column if not exists envio text,
  add column if not exists numero_produto text,
  add column if not exists galeria text[],
  add column if not exists comentarios jsonb not null default '[]'::jsonb,
  add column if not exists vendas integer not null default 0;

-- variantes (o select do produto original: quantidade/preco por opcao)
create table if not exists public.produtos_variantes (
  id uuid primary key default gen_random_uuid(),
  produto_id uuid not null references public.produtos(id) on delete cascade,
  variante text not null,
  preco numeric(10,2) not null check (preco >= 0),
  preco_antigo text,
  imagem text,
  ordem integer not null default 0
);
grant select on public.produtos_variantes to anon, authenticated;
grant all on public.produtos_variantes to service_role;
alter table public.produtos_variantes enable row level security;
drop policy if exists "Leitura publica de variantes" on public.produtos_variantes;
create policy "Leitura publica de variantes" on public.produtos_variantes for select to anon, authenticated using (true);
drop policy if exists "Admin gerencia variantes" on public.produtos_variantes;
create policy "Admin gerencia variantes" on public.produtos_variantes for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create index if not exists produtos_variantes_produto_id_idx on public.produtos_variantes (produto_id);

-- os 3 produtos de exemplo do Lovable ficam arquivados (fora da vitrine)
update public.produtos set categoria = 'arquivados' where categoria is null;

insert into public.vendedores (id, slug, nome, nivel, envio, ativo, vendas, avaliacao, capa, logo, destaque) values
  ('41f05b52-ce82-4-31-a41f-0000ce820639', 'no-limit-pharmacy', 'No Limit Pharmacy', 'Gold Seller', 'Worldwide Shipping', true, 1367, 5.0, 'pic/nolimit/head.jpg', 'pic/nolimit/nolimit.png', false),
  ('54469542-7405-4740-a544-000074051ae9', 'walter-white', 'Walter White', 'Silver Seller', 'Incl. Overnight Shipping', true, 1277, 5.0, 'pic/walterwhite/whead.jpg', 'pic/walterwhite/ww.png', false),
  ('0fde2200-6ebc-46eb-8fde-00006ebc5053', 'cali-weed-store', 'Cali Weed Store', 'Silver Seller', 'Worldwide Shipping', true, 555, 5.0, 'pic/caliweedstore/calihead.jpg', 'pic/caliweedstore/cali.png', false),
  ('e182b81e-5312-4531-a-1e-00005312b6cd', 'perc-bros', 'Perc Bros', 'Silver Seller', 'Europe Shipping', true, 273, 5.0, 'pic/percbros/head.jpg', 'pic/percbros/logo.png', false),
  ('3b4d33c7-808e-4-7f-b3b4-0000808e8eaa', 'cannabis-store-amsterdam', 'Cannabis Store Amsterdam', 'Gold Seller', 'Europe Shipping', true, 254, 5.0, 'pic/amsterdam/head.jpeg', 'pic/amsterdam/logo.png', false),
  ('b951effb-a306-4-5c-b-46-0000a306e196', 'hash-king', 'Hash King', 'Gold Seller', 'Worldwide Shipping', false, 0, 5.0, 'pic/hashking/head.jpg', 'pic/hashking/logo.png', false)
on conflict (slug) do update set
  nome = excluded.nome,
  nivel = excluded.nivel,
  envio = excluded.envio,
  ativo = excluded.ativo,
  vendas = excluded.vendas,
  capa = excluded.capa,
  logo = excluded.logo,
  destaque = excluded.destaque;

insert into public.produtos (
  id, nome, descricao, preco, imagem_url, estoque, criado_em,
  categoria, vendedor, vendedor_slug, envio, numero_produto, galeria, comentarios, vendas
) values
  ('1f42135f-950a-393d-9604-b5d10a458385', 'Blueberry Hash', 'Crafted with care using top-quality Blueberry strains and the latest extraction techniques
80% indica and 20% sativa composition
Up to 35% THC and 8% CBD
One of the tastys Hash compositions you can get on the market
Perfect Stealth Delivery
Shipping Worldwide
Contact: hking@x-mail.pro', 35.00, 'pic/hashking/bluehashhead.jpg', 25, now(), 'drugs', 'Hash King', 'hash-king', 'Incl. Overnight Shipping', '1', '{"pic/hashking/a1.jpg","pic/hashking/a2.jpg","pic/hashking/a3.jpg","pic/hashking/a4.jpg","pic/hashking/a5.jpg"}', $json$[{"autor":"Gmuschilover","data":"06. Nov 2026","corpo":"the dope is excellent! very good for reselling","compra":"AK47 Hash"},{"autor":"peter parker","data":"06. Nov 2026","corpo":"thanks to the hashking and blackmarket for its reliability.i only buy here","compra":"Blond Lebanese"},{"autor":"Lily","data":"06. Nov 2026","corpo":"great hash ! H.K is the fukn the best !!","compra":"Premium ICE"},{"autor":"Angel 1","data":"06. Nov 2026","corpo":"Very fast delivery, good packaging and very good stealth, nice support and very good dope: Good high and good flavors! Thanks !","compra":"AK47 Hash"},{"autor":"Banana x Gorilla","data":"06. Nov 2026","corpo":"Very good peace 5/5","compra":"AK47 Hash"},{"autor":"jamal k.","data":"04. Nov 2026","corpo":"Perfect 6bd to france","compra":"Blond Lebanese"}]$json$::jsonb, 375),
  ('afc66b75-5924-3dcd-9fa4-f7640fc17870', 'Oxycodone 20mg', '20mg Oxycodone Pills by Roxicodone
Oxycodone is an opioid pain medication thats used to help with pain that isnt relieved by non-opioid pain medications.
Discret Shipping to every country with tracking ID
Contact: nolimit@x-mail.pro', 35.00, 'pic/nolimit/oxihead.jpg', 25, now(), 'drugs', 'No Limit Pharmacy', 'no-limit-pharmacy', 'Incl. Overnight Shipping', '3', '{"pic/nolimit/c1.jpg","pic/nolimit/c2.jpg"}', $json$[{"autor":"Stanley70","data":"05. Nov 2026","corpo":"Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended","compra":"Tilidin 200mg"},{"autor":"Jerold M","data":"05. Nov 2026","corpo":"Thanks for shipping to uk. Im glad I didnt have to face any problems :)","compra":"Tilidin 200mg"},{"autor":"Paku man","data":"04. Nov 2026","corpo":"excellent service in usa","compra":"Oxycodone 20mg"},{"autor":"Elroy","data":"01. Nov 2026","corpo":"Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.","compra":"Calypsol Ketamine"},{"autor":"Royce G","data":"30. Oct 2026","corpo":"delivered within an hour via email and it worked just fine on the site","compra":"Ketamine HCL"},{"autor":"Alice One","data":"30. Oct 2026","corpo":"I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!","compra":"Ketamine HCL"}]$json$::jsonb, 1368),
  ('388e9245-0613-3e96-9aac-e71bd245990b', 'Peruvian Cocaine', 'Pеruvіаn Flake cocain(94% Pure)
Imроrtеd directly from Pеru аnd іt is аbоut 95 to 97% Purе with nо Addіtіvеѕ оr bath salts
Secured delivery to all location worldwide, stealth packaging wіth trасkіng numbеrѕ рrоvіdеd.
We also do overnight (Courier) for all our clients who bought 50 or 100.
Contact:', 90.00, 'pic/walterwhite/whead.jpg', 25, now(), 'drugs', 'Walter White', 'walter-white', 'Incl. Overnight Shipping', '2', '{"pic/walterwhite/b1.jpg","pic/walterwhite/b2.jpg","pic/walterwhite/b3.jpg"}', $json$[{"autor":"Tit1ano","data":"05. Nov 2026","corpo":"Hello friends , i am here to write a feedback for this vendor . when order here first time I was worried that I was not being cheated ,i have been paid $2600.00 for 100 Gram Fishscale Cocaine But I didnt get it in 7 days. i sent them email &amp; they replied product has been sent. confusing ,but After that 2 days I received the parcel. it may be the problem of delevary system . real vendor &amp; best quality product , thats all","compra":"Fishscale Cocaine"},{"autor":"Rahad k","data":"03. Nov 2026","corpo":"I Place An Order Several Days Ago, And Received Just In Time.","compra":"Peruvian Cocaine"},{"autor":"hitler","data":"01. Nov 2026","corpo":"Quick &amp; good stealth! cant tell about quality, will try!","compra":"Peruvian Cocaine"},{"autor":"maniac","data":"01. Nov 2026","corpo":"fast delivery and looks great - thanks!","compra":"Peruvian Cocaine"},{"autor":"Bart F.","data":"01. Nov 2026","corpo":"Hi guys ordered for the first time no problems good quality price performance is also right Packaging was also very good. Ill think about only ordering here xD definitely come back to recommend greetings from belgium","compra":"Peruvian Cocaine"},{"autor":"Jeremy","data":"29. Oct 2026","corpo":"so freunde muss mal sagen hab bei vielen verkäufern auf verschiedenen shops bestellt und muss sagen das dieser hier die beste flex am start hat sonst war bei vielen nur rotze dabei 100% reship und kunden support 1a++ kann ich nur empfehlen an leute die gutes flex suchen danke bro","compra":"Fishscale Cocaine"}]$json$::jsonb, 1277),
  ('05234f6e-436e-3e50-bf5b-c5f259fbe404', 'Amnezia Haze Core Cut', 'The Amnesia Haze Core Cut is a specific and highly regarded clone-only phenotype of the Amnesia Haze cannabis strain. It is a potent, sativa-dominant variety known for its energetic, creative, and long-lasting cerebral effects.
Key Characteristics
Genetics:
It originates from the classic Haze lines, with some sources tracing specific "Core Cuts" back to crosses like Cinderella 99 and Jack Herer or a specific clone from the company Hy-Pro. It is widely considered a stable and powerful representation of the Amnesia Haze lineage.
Effects:
The high is described as intense, euphoric, and activating, ideal for daytime use, creativity, and social situations. It is known for promoting focus and mental clarity, which makes it popular among users looking for stimulating effects.
Aroma and Flavor:
The strain features a distinct citrus and fruity flavor profile, with prominent notes of lemon and lime, often accompanied by spicy or bitter undertones. The main terpenes contributing to its aroma are terpinolene, caryophyllene, and pinene.
The term "Core Cut" refers to a specific, premium cut (clone) that is recognized for consistently exhibiting the most desirable traits of the Amnesia Haze strain. Many other Amnesia genetics are descendants of this original, highly sought-after clone.
Straight from the source to your door
32% THC Labor Tested
The flowers are dense and covered in a thick layer of resin.
STEALTH WORLDWIDE DELIVERY GUARANTEED.
Contact: calistore@x-mail.pro', 69.00, 'pic/caliweedstore/amneziahead.jpg', 25, now(), 'drugs', 'Cali Weed Store', 'cali-weed-store', 'Incl. Overnight Shipping', '1', '{"pic/caliweedstore/a1.jpg","pic/caliweedstore/a2.jpg","pic/caliweedstore/a3.jpg","pic/caliweedstore/a4.jpg","pic/caliweedstore/a5.jpg"}', $json$[{"autor":"crisis for sure","data":"06. Nov 2026","corpo":"This sore is amazing and the weed is super professional. Keep in mind its not for the rookie erb smoker. These are high class strains and shouldnt be taken lightly. You will enjoy it.","compra":"Amnezia Haze Core Cut"},{"autor":"dailyweed","data":"06. Nov 2026","corpo":"the mk is a pretty boss strain. I wasn’t expecting it to be as good as it was. Great deal","compra":"Amnezia Haze Core Cut"},{"autor":"Smokyswoop4209","data":"06. Nov 2026","corpo":"The Amnezia Core cut is the shit.. This strain checks all the boxes for a good contender in the department of Day Time Strains. Onset has you feeling floaty then it speeds up your heart rate a little. The delivery was on point. 5 Stars for the Cali weedstore","compra":"Amnezia Haze Core Cut"},{"autor":"barbados1","data":"06. Nov 2026","corpo":"This Weed is the absolute bestfor me. Never smoked such a strong shit before. I love it!!!","compra":"Amnezia Haze Core Cut"},{"autor":"Lisaadd777","data":"03. Nov 2026","corpo":"Good Vendor , Perfect stealth and good communication. Ordered the og kush and have a laugh with your friends. Always a good choice, a mood elevator and usually a good bang for the buck.","compra":"OG Cali Kush"},{"autor":"remywade88","data":"01. Nov 2026","corpo":"Amnesia hit hard and knocked out,its heavy stuff. I using this for reselling and my clients always come back","compra":"Amnezia Haze Core Cut"}]$json$::jsonb, 556),
  ('d5f7257b-314f-3b79-97fe-40a2e871d268', 'OG Cali Kush', 'Cali Kush (also known as California Kush or Kali Kush) is a popular hybrid cannabis strain known for its potent effects and complex flavor profile.
Originating in California, USA, it is generally Indica-dominant and highly valued for both recreational and medicinal use.
Common Effects: Feelings of happiness, euphoria, relaxation, and a potential increase in appetite.
Medicinal Uses:  Help to relieve stress, chronic pain, anxiety, depression, insomnia, and nausea
STEALTH WORLDWIDE DELIVERY GUARANTEED.
THC 17-24% Amazing Quality
Straight from the source to your door
Contact: calistore@x-mail.pro', 35.00, 'pic/caliweedstore/kalihead.jpg', 25, now(), 'drugs', 'Cali Weed Store', 'cali-weed-store', 'Incl. Overnight Shipping', '2', '{"pic/caliweedstore/b1.jpg","pic/caliweedstore/b2.jpg","pic/caliweedstore/b3.jpg","pic/caliweedstore/b4.jpg","pic/caliweedstore/b5.jpg","pic/caliweedstore/b6.jpg"}', $json$[{"autor":"crisis for sure","data":"06. Nov 2026","corpo":"This sore is amazing and the weed is super professional. Keep in mind its not for the rookie erb smoker. These are high class strains and shouldnt be taken lightly. You will enjoy it.","compra":"Amnezia Haze Core Cut"},{"autor":"dailyweed","data":"06. Nov 2026","corpo":"the mk is a pretty boss strain. I wasn’t expecting it to be as good as it was. Great deal","compra":"Amnezia Haze Core Cut"},{"autor":"Smokyswoop4209","data":"06. Nov 2026","corpo":"The Amnezia Core cut is the shit.. This strain checks all the boxes for a good contender in the department of Day Time Strains. Onset has you feeling floaty then it speeds up your heart rate a little. The delivery was on point. 5 Stars for the Cali weedstore","compra":"Amnezia Haze Core Cut"},{"autor":"barbados1","data":"06. Nov 2026","corpo":"This Weed is the absolute bestfor me. Never smoked such a strong shit before. I love it!!!","compra":"Amnezia Haze Core Cut"},{"autor":"Lisaadd777","data":"03. Nov 2026","corpo":"Good Vendor , Perfect stealth and good communication. Ordered the og kush and have a laugh with your friends. Always a good choice, a mood elevator and usually a good bang for the buck.","compra":"OG Cali Kush"},{"autor":"remywade88","data":"01. Nov 2026","corpo":"Amnesia hit hard and knocked out,its heavy stuff. I using this for reselling and my clients always come back","compra":"Amnezia Haze Core Cut"}]$json$::jsonb, 556),
  ('5c67ba31-395b-3af0-98f1-3d485a477a82', 'MK Ultra', 'The MK Ultra cannabis strain is a potent, award-winning, Indica-dominant hybrid known for its powerful, fast-acting, and "hypnotic" cerebral effects.
It is a cross between the legendary strains G13 and OG Kush, resulting in a deeply relaxing experience.
It is particularly effective as a sleep aid for those with insomnia and helps to alleviate chronic pain, stress, and anxiety.
It can also help stimulate appetite.
THC 16% to 24%
Straight from the source to your door.
STEALTH WORLDWIDE DELIVERY GUARANTEED.
Contact: calistore@x-mail.pro', 30.00, 'pic/caliweedstore/mkhead.jpg', 25, now(), 'drugs', 'Cali Weed Store', 'cali-weed-store', 'Incl. Overnight Shipping', '3', '{"pic/caliweedstore/c1.jpg","pic/caliweedstore/c2.jpg","pic/caliweedstore/c3.jpg"}', $json$[{"autor":"crisis for sure","data":"06. Nov 2026","corpo":"This sore is amazing and the weed is super professional. Keep in mind its not for the rookie erb smoker. These are high class strains and shouldnt be taken lightly. You will enjoy it.","compra":"Amnezia Haze Core Cut"},{"autor":"dailyweed","data":"06. Nov 2026","corpo":"the mk is a pretty boss strain. I wasn’t expecting it to be as good as it was. Great deal","compra":"Amnezia Haze Core Cut"},{"autor":"Smokyswoop4209","data":"06. Nov 2026","corpo":"The Amnezia Core cut is the shit.. This strain checks all the boxes for a good contender in the department of Day Time Strains. Onset has you feeling floaty then it speeds up your heart rate a little. The delivery was on point. 5 Stars for the Cali weedstore","compra":"Amnezia Haze Core Cut"},{"autor":"barbados1","data":"06. Nov 2026","corpo":"This Weed is the absolute bestfor me. Never smoked such a strong shit before. I love it!!!","compra":"Amnezia Haze Core Cut"},{"autor":"Lisaadd777","data":"03. Nov 2026","corpo":"Good Vendor , Perfect stealth and good communication. Ordered the og kush and have a laugh with your friends. Always a good choice, a mood elevator and usually a good bang for the buck.","compra":"OG Cali Kush"},{"autor":"remywade88","data":"01. Nov 2026","corpo":"Amnesia hit hard and knocked out,its heavy stuff. I using this for reselling and my clients always come back","compra":"Amnezia Haze Core Cut"}]$json$::jsonb, 556),
  ('02f7a2e0-16da-342d-86b8-707d0364726e', 'OG Haze', 'Experience the legendary, cup-winning genetics perfected in the coffee shops of Amsterdam.
Amsterdam Haze is the ultimate Sativa fuel, engineered for the creator, the thinker, and the innovator.
⚡️ Performance &amp; Effect:
A powerful, cerebral, and energetic high that cuts through mental fog, promoting intense focus, creativity, and euphoric uplift. Think of it as a clean, high-speed compiler for your mind—no lag, all output.
🌿 Profile:
A complex, mouth-watering blend of fresh, spicy Haze notes with a dominant sweet citrus core (lemon/lime) and a grounding earthy finish. Its pungent aroma is instantly recognizable as true A-list Amsterdam quality.
📈 Potency:
Featuring high-velocity THC levels (often 20-25%+), this strain is known for its fast-acting and long-lasting effects. It''s the stable, high-yield code you can rely on for a productive day or an inspired social session.
Amsterdam Haze. Where world-class genetics meet world-class performance.+
Shipping ONLY IN EUROPE.
Contact: amsterdam@x-mail.pro', 50.00, 'pic/amsterdam/oghazehead.jpg', 25, now(), 'drugs', 'Cannabis Store Amsterdam', 'cannabis-store-amsterdam', 'Incl. Overnight Shipping', '1', '{"pic/amsterdam/a1.jpg","pic/amsterdam/a2.jpg","pic/amsterdam/a3.jpg","pic/amsterdam/a4.jpg","pic/amsterdam/a5.jpg","pic/amsterdam/a6.jpg"}', $json$[{"autor":"Wildthough","data":"04. Nov 2026","corpo":"Awesome stuff. Great smell. Killer smoke Killer Shop..","compra":"Gelato 41"},{"autor":"Norman undercover","data":"01. Nov 2026","corpo":"Easy ordering.Super nice smell. Smoke was bomb. Stick dense buds. Definitely come back for","compra":"OG Haze"},{"autor":"iii333","data":"01. Nov 2026","corpo":"Best looking weed I have seen. Extremely sticky and pleasant to smoke.","compra":"Gelato 41"},{"autor":"OGQueen","data":"29. Oct 2026","corpo":"The Reasin kicked the shit out of me. Never smoked such a heavy shit before.","compra":"Gelato 41"},{"autor":"ducksmoke","data":"27. Oct 2026","corpo":"Love the OG Haze. Always such a tasteful, long lasting smoke! Great smell &amp; bag appeal and delivery to germany took only 2 days !","compra":"Amnezia Haze Core Cut"},{"autor":"juicy perl","data":"27. Oct 2026","corpo":"We loved this one it was super smooth. Will reorder","compra":"OG Haze"}]$json$::jsonb, 255),
  ('733548de-51cd-3c40-a526-23dbc1a70483', 'Gelato 41', 'Award Winning Hybrid (approx. 55% Sativa / 45% Indica or 60% Indica / 40% Sativa)
Cross between Sunset Sherbert and Thin Mint Girl Scout Cookies
THC Content	VERY High Potency 26% - 32%++
Dense buds with a range of colors from light green to purple, covered in golden-white trichomes
Primary Effects	Relaxing body high, euphoria, mood boost, creativity, and a sense of calm
Best Used For	Stress relief, anxiety, depression, unwinding in the evening, and promoting sleep at higher doses
26-32% THC
Shipping ONLY IN EUROPE.
Contact: amsterdam@x-mail.pro', 70.00, 'pic/amsterdam/gelatohead.jpg', 25, now(), 'drugs', 'Cannabis Store Amsterdam', 'cannabis-store-amsterdam', 'Incl. Overnight Shipping', '2', '{"pic/amsterdam/b1.jpg","pic/amsterdam/b2.jpg","pic/amsterdam/b3.jpg"}', $json$[{"autor":"Wildthough","data":"04. Nov 2026","corpo":"Awesome stuff. Great smell. Killer smoke Killer Shop..","compra":"Gelato 41"},{"autor":"Norman undercover","data":"01. Nov 2026","corpo":"Easy ordering.Super nice smell. Smoke was bomb. Stick dense buds. Definitely come back for","compra":"OG Haze"},{"autor":"iii333","data":"01. Nov 2026","corpo":"Best looking weed I have seen. Extremely sticky and pleasant to smoke.","compra":"Gelato 41"},{"autor":"OGQueen","data":"29. Oct 2026","corpo":"The Reasin kicked the shit out of me. Never smoked such a heavy shit before.","compra":"Gelato 41"},{"autor":"ducksmoke","data":"27. Oct 2026","corpo":"Love the OG Haze. Always such a tasteful, long lasting smoke! Great smell &amp; bag appeal and delivery to germany took only 2 days !","compra":"Amnezia Haze Core Cut"},{"autor":"juicy perl","data":"27. Oct 2026","corpo":"We loved this one it was super smooth. Will reorder","compra":"OG Haze"}]$json$::jsonb, 255),
  ('91d40104-521d-3e00-a563-17677c7e3d5f', 'Blond Lebanese', 'This AAAA+ cannabis concentrate is a gem from Lebanon’s rich hashish production history
Crafted using modern cultivation techniques, the buds are delicately rubbed on silk cloth and pressed to perfection
Up to 45% THC and 8% CBD
One of the strongest Hash compositions you can get on the market
Perfect Stealth Delivery
Shipping Worldwide
Contact: hking@x-mail.pro', 45.00, 'pic/hashking/blondhead.jpg', 25, now(), 'drugs', 'Hash King', 'hash-king', 'Incl. Overnight Shipping', '2', '{"pic/hashking/b1.jpg","pic/hashking/b2.jpg","pic/hashking/b3.jpg","pic/hashking/b4.jpg","pic/hashking/b5.jpg"}', $json$[{"autor":"Gmuschilover","data":"06. Nov 2026","corpo":"the dope is excellent! very good for reselling","compra":"AK47 Hash"},{"autor":"peter parker","data":"06. Nov 2026","corpo":"thanks to the hashking and blackmarket for its reliability.i only buy here","compra":"Blond Lebanese"},{"autor":"Lily","data":"06. Nov 2026","corpo":"great hash ! H.K is the fukn the best !!","compra":"Premium ICE"},{"autor":"Angel 1","data":"06. Nov 2026","corpo":"Very fast delivery, good packaging and very good stealth, nice support and very good dope: Good high and good flavors! Thanks !","compra":"AK47 Hash"},{"autor":"Banana x Gorilla","data":"06. Nov 2026","corpo":"Very good peace 5/5","compra":"AK47 Hash"},{"autor":"jamal k.","data":"04. Nov 2026","corpo":"Perfect 6bd to france","compra":"Blond Lebanese"}]$json$::jsonb, 375),
  ('952e49a8-5ce9-3171-ab84-1623e9ca2d8d', 'Premium ICE', 'Premium, high-end and craft cannabis extractions.
ICE / Melt / Resin
This is a highly concentrated and refined product that combines complex terpenes and cannabinoid molecules that deliver a more intense cerebral and psychoactive experience
Up to 55% THC and 4% CBD
Best qualitiy you can get on the market
Perfect Stealth Delivery
Shipping Worldwide
This is only for ADVANCED USERS.
Contact: hking@x-mail.pro', 45.00, 'pic/hashking/icehead.jpg', 25, now(), 'drugs', 'Hash King', 'hash-king', 'Incl. Overnight Shipping', '3', '{"pic/hashking/c1.jpg","pic/hashking/c2.jpg","pic/hashking/c3.jpg","pic/hashking/c4.jpg"}', $json$[{"autor":"Gmuschilover","data":"06. Nov 2026","corpo":"the dope is excellent! very good for reselling","compra":"AK47 Hash"},{"autor":"peter parker","data":"06. Nov 2026","corpo":"thanks to the hashking and blackmarket for its reliability.i only buy here","compra":"Blond Lebanese"},{"autor":"Lily","data":"06. Nov 2026","corpo":"great hash ! H.K is the fukn the best !!","compra":"Premium ICE"},{"autor":"Angel 1","data":"06. Nov 2026","corpo":"Very fast delivery, good packaging and very good stealth, nice support and very good dope: Good high and good flavors! Thanks !","compra":"AK47 Hash"},{"autor":"Banana x Gorilla","data":"06. Nov 2026","corpo":"Very good peace 5/5","compra":"AK47 Hash"},{"autor":"jamal k.","data":"04. Nov 2026","corpo":"Perfect 6bd to france","compra":"Blond Lebanese"}]$json$::jsonb, 375),
  ('1b24dbba-002b-3f5f-93bb-9d8d3fa7f954', 'AK47 Hash', 'AK-47 Hash is a premium import hash sourced directly from Afghanistan
The whole production is done by hand with no extra additives or solvent
Perfect for resell
Perfect Stealth Delivery
Shipping Worldwide
Contact: hking@x-mail.pro', 30.00, 'pic/hashking/47head.jpg', 25, now(), 'drugs', 'Hash King', 'hash-king', 'Incl. Overnight Shipping', '4', '{"pic/hashking/d1.jpg","pic/hashking/d2.jpg","pic/hashking/d3.jpg"}', $json$[{"autor":"Gmuschilover","data":"06. Nov 2026","corpo":"the dope is excellent! very good for reselling","compra":"AK47 Hash"},{"autor":"peter parker","data":"06. Nov 2026","corpo":"thanks to the hashking and blackmarket for its reliability.i only buy here","compra":"Blond Lebanese"},{"autor":"Lily","data":"06. Nov 2026","corpo":"great hash ! H.K is the fukn the best !!","compra":"Premium ICE"},{"autor":"Angel 1","data":"06. Nov 2026","corpo":"Very fast delivery, good packaging and very good stealth, nice support and very good dope: Good high and good flavors! Thanks !","compra":"AK47 Hash"},{"autor":"Banana x Gorilla","data":"06. Nov 2026","corpo":"Very good peace 5/5","compra":"AK47 Hash"},{"autor":"jamal k.","data":"04. Nov 2026","corpo":"Perfect 6bd to france","compra":"Blond Lebanese"}]$json$::jsonb, 375),
  ('1dbb02d4-34f6-345e-93c9-63c315190a35', 'Calypsol Ketamine', 'Calypsol Ketamine 500mg/10ml Injectable
Primarily for anesthesia, chronic pain and sedation in intensive care..
Discret International Express Shipping with tracking ID
Contact: nolimit@x-mail.pro', 79.00, 'pic/nolimit/ketahead.jpg', 25, now(), 'drugs', 'No Limit Pharmacy', 'no-limit-pharmacy', 'Incl. Overnight Shipping', '1', '{"pic/nolimit/a1.jpg","pic/nolimit/a2.jpg"}', $json$[{"autor":"Stanley70","data":"05. Nov 2026","corpo":"Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended","compra":"Tilidin 200mg"},{"autor":"Jerold M","data":"05. Nov 2026","corpo":"Thanks for shipping to uk. Im glad I didnt have to face any problems :)","compra":"Tilidin 200mg"},{"autor":"Paku man","data":"04. Nov 2026","corpo":"excellent service in usa","compra":"Oxycodone 20mg"},{"autor":"Elroy","data":"01. Nov 2026","corpo":"Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.","compra":"Calypsol Ketamine"},{"autor":"Royce G","data":"30. Oct 2026","corpo":"delivered within an hour via email and it worked just fine on the site","compra":"Ketamine HCL"},{"autor":"Alice One","data":"30. Oct 2026","corpo":"I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!","compra":"Ketamine HCL"}]$json$::jsonb, 1368),
  ('8437259c-190a-332d-9d5d-5fd48ea2ab1c', 'Ketamine HCL', 'Ketamine HCL Liquid 500mg/10ml Injectable
Primarily for anesthesia, chronic pain and sedation in intensive care..
Discret International Express Shipping with tracking ID
Contact: nolimit@x-mail.pro', 89.00, 'pic/nolimit/ketahead.jpg', 25, now(), 'drugs', 'No Limit Pharmacy', 'no-limit-pharmacy', 'Incl. Overnight Shipping', '2', '{"pic/nolimit/b1.jpg","pic/nolimit/b2.jpg"}', $json$[{"autor":"Stanley70","data":"05. Nov 2026","corpo":"Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended","compra":"Tilidin 200mg"},{"autor":"Jerold M","data":"05. Nov 2026","corpo":"Thanks for shipping to uk. Im glad I didnt have to face any problems :)","compra":"Tilidin 200mg"},{"autor":"Paku man","data":"04. Nov 2026","corpo":"excellent service in usa","compra":"Oxycodone 20mg"},{"autor":"Elroy","data":"01. Nov 2026","corpo":"Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.","compra":"Calypsol Ketamine"},{"autor":"Royce G","data":"30. Oct 2026","corpo":"delivered within an hour via email and it worked just fine on the site","compra":"Ketamine HCL"},{"autor":"Alice One","data":"30. Oct 2026","corpo":"I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!","compra":"Ketamine HCL"}]$json$::jsonb, 1368),
  ('36d1eaaf-053e-3b85-892d-1275f947d446', 'Oxycontin 40mg', 'Pharmacy online 40mg Oxycontin Pills by Purdue Pharma
Oxycontin treats severe, chronic pain. It is prescribed when other pain medications do not work well enough or cannot be tolerated
Discret Shipping to every country with tracking ID
Contact: nolimit@x-mail.pro', 40.00, 'pic/nolimit/oxihead.jpg', 25, now(), 'drugs', 'No Limit Pharmacy', 'no-limit-pharmacy', 'Incl. Overnight Shipping', '4', '{"pic/nolimit/d1.jpg"}', $json$[{"autor":"Stanley70","data":"05. Nov 2026","corpo":"Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended","compra":"Tilidin 200mg"},{"autor":"Jerold M","data":"05. Nov 2026","corpo":"Thanks for shipping to uk. Im glad I didnt have to face any problems :)","compra":"Tilidin 200mg"},{"autor":"Paku man","data":"04. Nov 2026","corpo":"excellent service in usa","compra":"Oxycodone 20mg"},{"autor":"Elroy","data":"01. Nov 2026","corpo":"Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.","compra":"Calypsol Ketamine"},{"autor":"Royce G","data":"30. Oct 2026","corpo":"delivered within an hour via email and it worked just fine on the site","compra":"Ketamine HCL"},{"autor":"Alice One","data":"30. Oct 2026","corpo":"I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!","compra":"Ketamine HCL"}]$json$::jsonb, 1368),
  ('31cdf37a-e450-3914-9466-245c5664bd3c', 'Xanax 2mg', 'Pharmacy online Pfizer Xanax Bars 2mg, Non prescription, Treatment: Anxiety, Intas Pharmaceuticals
Discret Shipping to every country with tracking ID
Contact: nolimit@x-mail.pro', 119.00, 'pic/nolimit/xanaxhead.jpg', 25, now(), 'drugs', 'No Limit Pharmacy', 'no-limit-pharmacy', 'Incl. Overnight Shipping', '5', '{"pic/nolimit/e1.jpg"}', $json$[{"autor":"Stanley70","data":"05. Nov 2026","corpo":"Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended","compra":"Tilidin 200mg"},{"autor":"Jerold M","data":"05. Nov 2026","corpo":"Thanks for shipping to uk. Im glad I didnt have to face any problems :)","compra":"Tilidin 200mg"},{"autor":"Paku man","data":"04. Nov 2026","corpo":"excellent service in usa","compra":"Oxycodone 20mg"},{"autor":"Elroy","data":"01. Nov 2026","corpo":"Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.","compra":"Calypsol Ketamine"},{"autor":"Royce G","data":"30. Oct 2026","corpo":"delivered within an hour via email and it worked just fine on the site","compra":"Ketamine HCL"},{"autor":"Alice One","data":"30. Oct 2026","corpo":"I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!","compra":"Ketamine HCL"}]$json$::jsonb, 1368),
  ('172228a0-abc7-3375-88c9-466b003e5fba', 'Tilidin 200mg', 'Pharmacy online TILIDIN comp. STADA 200 mg/16 mg
Tilidine is a synthetic opioid indicated in the treatment of severe pain.
Discret Shipping to every country with tracking ID
Contact: nolimit@x-mail.pro', 70.00, 'pic/nolimit/tilihead.jpg', 25, now(), 'drugs', 'No Limit Pharmacy', 'no-limit-pharmacy', 'Incl. Overnight Shipping', '6', '{"pic/nolimit/f1.jpg"}', $json$[{"autor":"Stanley70","data":"05. Nov 2026","corpo":"Their delivery was very fast, and communication was excellent. No Limit Pharmacy is trusted website .highly recommended","compra":"Tilidin 200mg"},{"autor":"Jerold M","data":"05. Nov 2026","corpo":"Thanks for shipping to uk. Im glad I didnt have to face any problems :)","compra":"Tilidin 200mg"},{"autor":"Paku man","data":"04. Nov 2026","corpo":"excellent service in usa","compra":"Oxycodone 20mg"},{"autor":"Elroy","data":"01. Nov 2026","corpo":"Time from order to delivery was very good. The item was just what was asked for it arrived well packed .excellent Ketamine.","compra":"Calypsol Ketamine"},{"autor":"Royce G","data":"30. Oct 2026","corpo":"delivered within an hour via email and it worked just fine on the site","compra":"Ketamine HCL"},{"autor":"Alice One","data":"30. Oct 2026","corpo":"I was amazed by the lightning-fast delivery! The communication with the vendor was also top-notch. Highly recommend!","compra":"Ketamine HCL"}]$json$::jsonb, 1368),
  ('757aae13-a631-379e-bd5d-981a96bace73', 'Blue Punisher 300mg', 'XTC Punisher 270mg Online are made from our pure MDMA crystals.
The pure crystals are ground down into a fine powder and then mixed with a safe, harmless binder and hard pressed into pills.
Our pills each contain a Strong Dose of 300mg of Pure MDMA and more.
Fast Shipping within the EU and comes with tracking ID by DHL
Contact: percbros@x-mail.pro', 120.00, 'pic/percbros/bluehead.jpg', 25, now(), 'drugs', 'Perc Bros', 'perc-bros', 'Incl. Overnight Shipping', '1', '{"pic/percbros/a1.jpg","pic/percbros/a2.jpg","pic/percbros/a3.jpg"}', $json$[{"autor":"Elon Musk","data":"06. Nov 2026","corpo":"Love the molys +++","compra":"Blue Punisher 300mg"},{"autor":"beliver","data":"05. Nov 2026","corpo":"best store on the whole darknet","compra":"Blue Tesla 230mg"},{"autor":"Lovemike","data":"05. Nov 2026","corpo":"The best xtc pills I ever popped they are my absolute favorite and I’ve popped a few of the bangers too!","compra":"Blue Punisher 300mg"},{"autor":"n.I","data":"05. Nov 2026","corpo":"Delivering was on point. 4 days to paris. very good stuff for resell. pills high grades","compra":"Blue Punisher 300mg"},{"autor":"Lovemike","data":"05. Nov 2026","corpo":"received within a week in Italy 100 percent recommended seller","compra":"Blue Tesla 230mg"},{"autor":"Lovemike","data":"04. Nov 2026","corpo":"perfect molys no bullshit","compra":"Blue Punisher 300mg"}]$json$::jsonb, 273),
  ('d8697e00-8c06-3102-8fd8-a73902b5d6aa', 'Blue Tesla 230mg', 'XTC Blue Tesla 230mg.
BLUE TESLA PILLS are synonymous with strength and power.
Our pills each contain a Strong Dose of 230mg of Pure MDMA and more.
Fast Shipping within the EU and comes with tracking ID by DHL
Contact: percbros@x-mail.pro', 130.00, 'pic/percbros/teslahead.jpg', 25, now(), 'drugs', 'Perc Bros', 'perc-bros', 'Incl. Overnight Shipping', '2', '{"pic/percbros/b1.jpg","pic/percbros/b2.jpg"}', $json$[{"autor":"Elon Musk","data":"06. Nov 2026","corpo":"Love the molys +++","compra":"Blue Punisher 300mg"},{"autor":"beliver","data":"05. Nov 2026","corpo":"best store on the whole darknet","compra":"Blue Tesla 230mg"},{"autor":"Lovemike","data":"05. Nov 2026","corpo":"The best xtc pills I ever popped they are my absolute favorite and I’ve popped a few of the bangers too!","compra":"Blue Punisher 300mg"},{"autor":"n.I","data":"05. Nov 2026","corpo":"Delivering was on point. 4 days to paris. very good stuff for resell. pills high grades","compra":"Blue Punisher 300mg"},{"autor":"Lovemike","data":"05. Nov 2026","corpo":"received within a week in Italy 100 percent recommended seller","compra":"Blue Tesla 230mg"},{"autor":"Lovemike","data":"04. Nov 2026","corpo":"perfect molys no bullshit","compra":"Blue Punisher 300mg"}]$json$::jsonb, 273),
  ('dd1c519f-2db3-3641-a041-44f2da130a42', 'Fishscale Cocaine', 'Colombian Fishscale Cocaine(96% Pure)
Quality uncut Colombian coke of 96% purity level - Finest selection
Secured delivery to all location worldwide, stealth packaging and tracking.
We also do overnight (Courier) for all our clients who bought 50 or 100.
Contact:', 99.00, 'pic/walterwhite/whead.jpg', 25, now(), 'drugs', 'Walter White', 'walter-white', 'Incl. Overnight Shipping', '1', '{"pic/walterwhite/a1.jpeg","pic/walterwhite/a2.jpeg","pic/walterwhite/a3.jpeg","pic/walterwhite/a4.jpeg","pic/walterwhite/a5.jpeg"}', $json$[{"autor":"Tit1ano","data":"05. Nov 2026","corpo":"Hello friends , i am here to write a feedback for this vendor . when order here first time I was worried that I was not being cheated ,i have been paid $2600.00 for 100 Gram Fishscale Cocaine But I didnt get it in 7 days. i sent them email &amp; they replied product has been sent. confusing ,but After that 2 days I received the parcel. it may be the problem of delevary system . real vendor &amp; best quality product , thats all","compra":"Fishscale Cocaine"},{"autor":"Rahad k","data":"03. Nov 2026","corpo":"I Place An Order Several Days Ago, And Received Just In Time.","compra":"Peruvian Cocaine"},{"autor":"hitler","data":"01. Nov 2026","corpo":"Quick &amp; good stealth! cant tell about quality, will try!","compra":"Peruvian Cocaine"},{"autor":"maniac","data":"01. Nov 2026","corpo":"fast delivery and looks great - thanks!","compra":"Peruvian Cocaine"},{"autor":"Bart F.","data":"01. Nov 2026","corpo":"Hi guys ordered for the first time no problems good quality price performance is also right Packaging was also very good. Ill think about only ordering here xD definitely come back to recommend greetings from belgium","compra":"Peruvian Cocaine"},{"autor":"Jeremy","data":"29. Oct 2026","corpo":"so freunde muss mal sagen hab bei vielen verkäufern auf verschiedenen shops bestellt und muss sagen das dieser hier die beste flex am start hat sonst war bei vielen nur rotze dabei 100% reship und kunden support 1a++ kann ich nur empfehlen an leute die gutes flex suchen danke bro","compra":"Fishscale Cocaine"}]$json$::jsonb, 1277)
on conflict (id) do update set
  nome = excluded.nome,
  descricao = excluded.descricao,
  preco = excluded.preco,
  imagem_url = excluded.imagem_url,
  categoria = excluded.categoria,
  vendedor = excluded.vendedor,
  vendedor_slug = excluded.vendedor_slug,
  envio = excluded.envio,
  galeria = excluded.galeria,
  comentarios = excluded.comentarios,
  vendas = excluded.vendas;

insert into public.produtos_variantes (id, produto_id, variante, preco, preco_antigo, imagem, ordem) values
  ('454f8733-93dd-380c-ab0f-ef10f58f1467', '1f42135f-950a-393d-9604-b5d10a458385', '5 GRAM', 35.00, '', 'pic/hashking/ahead.jpg', 0),
  ('ef0493a3-456e-3bf1-8c04-dbcf2db80b5d', '1f42135f-950a-393d-9604-b5d10a458385', '25 GRAM', 150.00, '', 'pic/hashking/bluehashhead.jpg', 1),
  ('08c78e27-1e6e-3ee8-8559-e216e2220ad0', '1f42135f-950a-393d-9604-b5d10a458385', '100 GRAM', 500.00, '', 'pic/hashking/bluehashhead.jpg', 2),
  ('ecc667bc-0a1f-3ed5-bf0a-0e099e024d49', '1f42135f-950a-393d-9604-b5d10a458385', '1 KILOGRAM', 3900.00, '', 'pic/hashking/bluehashhead.jpg', 3),
  ('ce6d8f8f-e701-345b-a848-f2036b09ea86', 'afc66b75-5924-3dcd-9fa4-f7640fc17870', '100 TABLETS', 35.00, '', 'pic/nolimit/chead.jpg', 0),
  ('63e36774-093d-36c7-97b2-dc12b87b4ba3', 'afc66b75-5924-3dcd-9fa4-f7640fc17870', '500 TABLETS', 119.00, '', 'pic/nolimit/oxihead.jpg', 1),
  ('844c6e7d-5e5e-3ce0-a43b-9956dc8d4894', 'afc66b75-5924-3dcd-9fa4-f7640fc17870', '1.000 TABLETS', 199.00, '', 'pic/nolimit/oxihead.jpg', 2),
  ('55d830fd-0556-3ce2-9689-606657efc596', '388e9245-0613-3e96-9aac-e71bd245990b', '2 GRAM', 90.00, '', 'pic/walterwhite/bhead.jpg', 0),
  ('8ba6bad8-f51f-33cf-9c29-457a7dbe91b6', '388e9245-0613-3e96-9aac-e71bd245990b', '5 GRAM', 150.00, '', 'pic/walterwhite/whead.jpg', 1),
  ('0029aba0-b785-3b42-8631-3dc09684be1e', '388e9245-0613-3e96-9aac-e71bd245990b', '25 GRAM', 650.00, '', 'pic/walterwhite/whead.jpg', 2),
  ('77d715b6-cbc1-3ea3-b842-f18673104bfe', '388e9245-0613-3e96-9aac-e71bd245990b', '100 GRAM', 2400.00, '', 'pic/walterwhite/whead.jpg', 3),
  ('5ffbe25e-b469-3be0-9dee-35944640507a', '05234f6e-436e-3e50-bf5b-c5f259fbe404', '5 G', 69.00, '', 'pic/caliweedstore/calihead.jpg', 0),
  ('c4ee33b9-9a04-350c-84c5-d93280916d53', '05234f6e-436e-3e50-bf5b-c5f259fbe404', '10 G', 99.00, '', 'pic/caliweedstore/amneziahead.jpg', 1),
  ('22a95930-7a6e-3e3f-a397-6bad005e931e', '05234f6e-436e-3e50-bf5b-c5f259fbe404', '25 G', 199.00, '', 'pic/caliweedstore/amneziahead.jpg', 2),
  ('080f943b-a056-3e0a-a5d1-07d7f9e73191', '05234f6e-436e-3e50-bf5b-c5f259fbe404', '50 G', 349.00, '', 'pic/caliweedstore/amneziahead.jpg', 3),
  ('8be75fa4-1013-3515-b039-3e3b17566d2e', '05234f6e-436e-3e50-bf5b-c5f259fbe404', '100 G', 599.00, '', 'pic/caliweedstore/amneziahead.jpg', 4),
  ('32de84bf-538d-3eae-abca-6c52db7d23bb', 'd5f7257b-314f-3b79-97fe-40a2e871d268', '3 GRAM', 35.00, '', 'pic/caliweedstore/bhead.jpg', 0),
  ('1a3c2be6-7877-3b65-b6e7-6f1dc742b1ed', 'd5f7257b-314f-3b79-97fe-40a2e871d268', '10 GRAM', 95.00, '', 'pic/caliweedstore/kalihead.jpg', 1),
  ('a926d0dd-97b1-3937-beae-da75d236b23a', 'd5f7257b-314f-3b79-97fe-40a2e871d268', '25 GRAM', 170.00, '', 'pic/caliweedstore/kalihead.jpg', 2),
  ('81042573-08fe-39b4-a3c5-e7030f2f72b8', 'd5f7257b-314f-3b79-97fe-40a2e871d268', '50 GRAM', 310.00, '', 'pic/caliweedstore/kalihead.jpg', 3),
  ('8efe8f8a-8153-31d7-8e27-3b6ce9b5c015', '5c67ba31-395b-3af0-98f1-3d485a477a82', '3 GRAM', 30.00, '', 'pic/caliweedstore/chead.jpg', 0),
  ('704b6b96-f808-31b3-9a67-1683be2f81bf', '5c67ba31-395b-3af0-98f1-3d485a477a82', '10 GRAM', 90.00, '', 'pic/caliweedstore/mkhead.jpg', 1),
  ('d0fd1723-5898-34cb-a837-c6f9d0794469', '5c67ba31-395b-3af0-98f1-3d485a477a82', '25 GRAM', 160.00, '', 'pic/caliweedstore/mkhead.jpg', 2),
  ('e03873c4-f294-3ed3-9ae6-72acd8a2f582', '5c67ba31-395b-3af0-98f1-3d485a477a82', '50 GRAM', 300.00, '', 'pic/caliweedstore/mkhead.jpg', 3),
  ('2a9593cd-3bd0-35bc-b07a-2cb1eb228491', '5c67ba31-395b-3af0-98f1-3d485a477a82', '100 GRAM', 559.00, '', 'pic/caliweedstore/mkhead.jpg', 4),
  ('994d1b58-9f74-3057-bb3b-7b18cd138afb', '02f7a2e0-16da-342d-86b8-707d0364726e', '5 GRAM', 50.00, '', 'pic/amsterdam/ahead.jpg', 0),
  ('fbc703b1-e09c-3e90-aede-be62f2105929', '02f7a2e0-16da-342d-86b8-707d0364726e', '25 GRAM', 200.00, '', 'pic/amsterdam/oghazehead.jpg', 1),
  ('7240a8af-9e9d-3985-9361-da5e41f057ba', '02f7a2e0-16da-342d-86b8-707d0364726e', '50 GRAM', 380.00, '', 'pic/amsterdam/oghazehead.jpg', 2),
  ('5ac79653-2ad6-3852-a588-723c64c5222e', '02f7a2e0-16da-342d-86b8-707d0364726e', '100 GRAM', 650.00, '', 'pic/amsterdam/oghazehead.jpg', 3),
  ('c685d1f2-68db-3faa-a608-9153cfe30990', '733548de-51cd-3c40-a526-23dbc1a70483', '5 GRAM', 70.00, '', 'pic/amsterdam/bhead.jpg', 0),
  ('06010ba0-30ea-391f-a6be-e8e3bf2c98ca', '733548de-51cd-3c40-a526-23dbc1a70483', '10 GRAM', 120.00, '', 'pic/amsterdam/gelatohead.jpg', 1),
  ('53d14632-0e76-33e3-83d9-012fedfc2655', '733548de-51cd-3c40-a526-23dbc1a70483', '100 GRAM', 899.00, '', 'pic/amsterdam/gelatohead.jpg', 2),
  ('e896ea82-ac30-3835-9cf7-5d7db48c7332', '91d40104-521d-3e00-a563-17677c7e3d5f', '5 GRAM', 45.00, '', 'pic/hashking/bhead.jpg', 0),
  ('cef48eda-0a23-35c9-b780-458a05ee5337', '91d40104-521d-3e00-a563-17677c7e3d5f', '25 GRAM', 200.00, '', 'pic/hashking/blondhead.jpg', 1),
  ('0647ecc3-1b83-3832-bcc5-cd3aa8733ec0', '91d40104-521d-3e00-a563-17677c7e3d5f', '100 GRAM', 750.00, '', 'pic/hashking/blondhead.jpg', 2),
  ('7d5f86ce-0edf-3a1c-8b9f-d88b849f2b51', '91d40104-521d-3e00-a563-17677c7e3d5f', '1 KILOGRAM', 6000.00, '', 'pic/hashking/blondhead.jpg', 3),
  ('2131004d-44a8-3798-bfef-a0be7395e121', '952e49a8-5ce9-3171-ab84-1623e9ca2d8d', '1 GRAM', 45.00, '', 'pic/hashking/chead.jpg', 0),
  ('25669de7-4914-371e-96fe-6a6493569750', '952e49a8-5ce9-3171-ab84-1623e9ca2d8d', '10 GRAM', 400.00, '', 'pic/hashking/icehead.jpg', 1),
  ('a6733685-7a0e-3bbd-950c-7114154362c9', '952e49a8-5ce9-3171-ab84-1623e9ca2d8d', '25 GRAM', 900.00, '', 'pic/hashking/icehead.jpg', 2),
  ('3ea3e2df-aa6c-3901-a375-4b7dc062e320', '1b24dbba-002b-3f5f-93bb-9d8d3fa7f954', '5 GRAM', 30.00, '', 'pic/hashking/dhead.jpg', 0),
  ('34f8e972-c45c-3a08-926c-bb1ac0d0ca73', '1b24dbba-002b-3f5f-93bb-9d8d3fa7f954', '25 GRAM', 130.00, '', 'pic/hashking/47head.jpg', 1),
  ('58f6e92f-1c1a-3d5a-aa02-b4532f50fa73', '1b24dbba-002b-3f5f-93bb-9d8d3fa7f954', '100 GRAM', 400.00, '', 'pic/hashking/47head.jpg', 2),
  ('1332228a-b7b9-3cb6-8468-1ea7dcf4c2fa', '1b24dbba-002b-3f5f-93bb-9d8d3fa7f954', '1 KILOGRAM', 3000.00, '', 'pic/hashking/47head.jpg', 3),
  ('49611b03-12c6-3bc0-b2a6-7e90baf54b68', '1dbb02d4-34f6-345e-93c9-63c315190a35', '5 VIALS', 79.00, '', 'pic/nolimit/ahead.jpg', 0),
  ('c1c005ff-7d20-3469-8cbf-37fa2deb71e2', '1dbb02d4-34f6-345e-93c9-63c315190a35', '10 VIALS', 129.00, '', 'pic/nolimit/ketahead.jpg', 1),
  ('d6149af3-792a-3f7e-b5c7-c31a70017dd5', '1dbb02d4-34f6-345e-93c9-63c315190a35', '25 VIALS', 199.00, '', 'pic/nolimit/ketahead.jpg', 2),
  ('5966c8f6-8a31-3314-8ed1-7a9f8903c765', '8437259c-190a-332d-9d5d-5fd48ea2ab1c', '5 VIALS', 89.00, '', 'pic/nolimit/bhead.jpg', 0),
  ('b28d04b2-7f38-3b89-8781-e6312fb0925a', '8437259c-190a-332d-9d5d-5fd48ea2ab1c', '10 VIALS', 139.00, '', 'pic/nolimit/ketahead.jpg', 1),
  ('cf79ade7-c4bd-3283-8e11-7386263e2c5d', '8437259c-190a-332d-9d5d-5fd48ea2ab1c', '25 VIALS', 199.00, '', 'pic/nolimit/ketahead.jpg', 2),
  ('33fbb03f-c25d-3f79-9dca-20a3d0ac97c4', '36d1eaaf-053e-3b85-892d-1275f947d446', '100 TABLETS', 40.00, '', 'pic/nolimit/dhead.jpg', 0),
  ('93848021-648b-37d4-beff-fe846c4c4cf5', '36d1eaaf-053e-3b85-892d-1275f947d446', '500 TABLETS', 160.00, '', 'pic/nolimit/oxihead.jpg', 1),
  ('35e2d04d-a66a-35be-b10a-4dd686ca2898', '36d1eaaf-053e-3b85-892d-1275f947d446', '1.000 TABLETS', 260.00, '', 'pic/nolimit/oxihead.jpg', 2),
  ('28d5dd49-d40b-3264-9b65-82d7b184af88', '31cdf37a-e450-3914-9466-245c5664bd3c', '50 TABLETS', 119.00, '', 'pic/nolimit/ehead.jpg', 0),
  ('ccee2e35-a144-372f-8967-caaa184a8738', '31cdf37a-e450-3914-9466-245c5664bd3c', '100 TABLETS', 199.00, '', 'pic/nolimit/xanaxhead.jpg', 1),
  ('4c3eb281-9a65-3825-a65b-de306ca61754', '31cdf37a-e450-3914-9466-245c5664bd3c', '1.000 TABLETS', 1500.00, '', 'pic/nolimit/xanaxhead.jpg', 2),
  ('84b9d121-0190-3dee-9a12-6722b023ede0', '172228a0-abc7-3375-88c9-466b003e5fba', '100 TABLETS', 70.00, '', 'pic/nolimit/fhead.jpg', 0),
  ('0bfb6a04-0c61-373d-b6b5-5355184fac8b', '172228a0-abc7-3375-88c9-466b003e5fba', '500 TABLETS', 300.00, '', 'pic/nolimit/tilihead.jpg', 1),
  ('f83d3c27-3c33-35ad-abe8-a7aac3698250', '172228a0-abc7-3375-88c9-466b003e5fba', '1.000 TABLETS', 4500.00, '', 'pic/nolimit/tilihead.jpg', 2),
  ('048c57c0-ffcf-3dd6-ad75-e36a633666f4', '757aae13-a631-379e-bd5d-981a96bace73', '50 TABLETS', 120.00, '', 'pic/percbros/ahead.jpg', 0),
  ('9128d4b9-c4c9-34cc-925d-141dae5f2023', '757aae13-a631-379e-bd5d-981a96bace73', '100 TABLETS', 199.00, '', 'pic/percbros/bluehead.jpg', 1),
  ('4a37f9e4-d16a-3058-a7c0-dc032f84b715', '757aae13-a631-379e-bd5d-981a96bace73', '500 TABLETS', 699.00, '', 'pic/percbros/bluehead.jpg', 2),
  ('abd02c21-b928-35b6-ac0d-a1531fa447e5', '757aae13-a631-379e-bd5d-981a96bace73', '1.000 TABLETS', 999.00, '', 'pic/percbros/bluehead.jpg', 3),
  ('9460a277-1e67-3b8f-a2a4-ba64dff5e4b6', 'd8697e00-8c06-3102-8fd8-a73902b5d6aa', '50 TABLETS', 130.00, '', 'pic/percbros/bhead.jpg', 0),
  ('f5a548bb-7c62-3d78-b869-8322cb1ef1cc', 'd8697e00-8c06-3102-8fd8-a73902b5d6aa', '100 TABLETS', 210.00, '', 'pic/percbros/teslahead.jpg', 1),
  ('54b2de45-3986-377d-8134-d0c50d6129ff', 'd8697e00-8c06-3102-8fd8-a73902b5d6aa', '500 TABLETS', 749.00, '', 'pic/percbros/teslahead.jpg', 2),
  ('c7d15300-c087-314f-9193-5262ef951b67', 'd8697e00-8c06-3102-8fd8-a73902b5d6aa', '1.000 TABLETS', 1099.00, '', 'pic/percbros/teslahead.jpg', 3),
  ('cda256b6-dd0a-3f41-a4f9-d9333cf515c8', 'dd1c519f-2db3-3641-a041-44f2da130a42', '3 GRAM', 99.00, '', 'pic/walterwhite/ahead.jpg', 0),
  ('c63ea410-0f17-32b2-9b53-da2d52766836', 'dd1c519f-2db3-3641-a041-44f2da130a42', '5 GRAM', 180.00, '', 'pic/walterwhite/whead.jpg', 1),
  ('dcd35ca0-a69a-354f-ba05-4692559e190a', 'dd1c519f-2db3-3641-a041-44f2da130a42', '50 GRAM', 1400.00, '', 'pic/walterwhite/whead.jpg', 2),
  ('d2bfd876-4e3b-3972-8adc-5aa61549a6cf', 'dd1c519f-2db3-3641-a041-44f2da130a42', '100 GRAM', 2600.00, '', 'pic/walterwhite/whead.jpg', 3)
on conflict (id) do update set
  produto_id = excluded.produto_id,
  variante = excluded.variante,
  preco = excluded.preco,
  preco_antigo = excluded.preco_antigo,
  imagem = excluded.imagem,
  ordem = excluded.ordem;

-- ------------------------------------------------------------------ pedidos
alter table public.pedidos
  add column if not exists chave_secreta text,
  add column if not exists pagamento text,
  add column if not exists moeda text not null default 'BTC',
  add column if not exists endereco jsonb,
  add column if not exists observacoes text;

alter table public.pedido_itens
  add column if not exists variante_id uuid references public.produtos_variantes(id) on delete set null,
  add column if not exists produto_nome text,
  add column if not exists variante text,
  add column if not exists vendedor text;
