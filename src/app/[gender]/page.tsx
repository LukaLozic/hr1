import HomePage from "../HomePage";
import type { Metadata } from "next";

// Ova funkcija omogućuje dinamičko postavljanje meta tagova ovisno o ruti
export async function generateMetadata(
  { params }: { params: { gender: string } }
): Promise<Metadata> {
  const gender = params.gender?.toLowerCase() || "";
  let title = "Seks uživo – Pogledaj gole djevojke, muškarce i parove na kamerama";
  let description = "Gledaj seksi djevojke, muškarce i parove uživo! Klikni, izaberi i uživaj u vrućim showovima. Gledaj seks uživo odmah!";

  if (gender === "gole-zene") {
    title = "Gole žene uživo – Pogledaj napaljene cure na kamerama";
    description = "Prave gole žene pred kamerom. Uključi se sada i gledaj najseksi žene uživo, svaki dan, 0–24! Gole cure sa balkana spremne za akciju.";
  } else if (gender === "goli-muskarci") {
    title = "Goli Muškarci - Pogledaj gay sex na Balkanu";
    description = "Gledaj zgodne i napaljene muškarce kako se pokazuju i igraju pred kamerom.  Atraktivni muškarci koji provociraju, istraži tko je online";
  } else if (gender === "parovi") {
    title = "Parovi za seks – Istraži sex kamere i gledaj uživo akciju";
    description = "Uključi se u live show s parovima koji vole da ih se gleda. Strast, igra i pravi seks uživo, svaki dan – gledaj sad!";
  } else if (gender === "trans") {
    title = "Trans sex - Transići na sex kamerama";
    description = "Istraži trans seks u regiji i svijetu. Pogledaj gole transiće kako se jebu pred kamerama. Otkrij trans kamere ovdje.";
  }

  return { title, description };
}

// Ovo je serverska komponenta (defaultno u app routeru)
export default function GenderPage({ params }: { params: { gender: string } }) {
  return <HomePage genderParam={params.gender} />;
}