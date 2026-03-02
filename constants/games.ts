// constants/games.ts
import { calendar } from "./calendar";

/**
 * Mapeia seu slug -> ISO2 (código de 2 letras)
 * (Tem que bater com os países que você usa no app/bandeiras)
 */
export const SLUG_TO_ISO2: Record<string, string> = {
  mexico: "MX",
  "south-africa": "ZA",
  "korea-republic": "KR",
  canada: "CA",
  usa: "US",
  paraguay: "PY",
  qatar: "QA",
  switzerland: "CH",
  brazil: "BR",
  marocco: "MA", // (o certo é morocco, mas seu slug é marocco)
  haiti: "HT",
  scotland: "GB", // não existe ISO separado no country-list, usa GB
  germany: "DE",
  "curaçao": "CW",
  netherlands: "NL",
  japan: "JP",
  "costa-do-marfim": "CI",
  ecuador: "EC",
  tunisia: "TN",
  spain: "ES",
  "cabo-verde": "CV",
  belgium: "BE",
  egypt: "EG",
  "saudi-arabia": "SA",
  uruguay: "UY",
  iran: "IR",
  "new-zealand": "NZ",
  france: "FR",
  senegal: "SN",
  norway: "NO",
  argentina: "AR",
  algeria: "DZ",
  austria: "AT",
  jordan: "JO",
  portugal: "PT",
  england: "GB",
  croatia: "HR",
  ghana: "GH",
  panama: "PA",
  uzbekistan: "UZ",
  colombia: "CO",
};

export type GuessGame = {
  id: string;
  date: string; // ISO
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null;
};

// Se seu calendário não tem ano, a gente assume um ano fixo.
const DEFAULT_YEAR = 2026;

/**
 * Converte "11/06" OU "11-06" + "16:00" => ISO
 * Sem timezone perfeito. Para exibir, você pode formatar localmente depois.
 */
function toISO(dateDDMM: string, hourHHMM: string) {
  // aceita "11/06" ou "11-06"
  const [ddStr, mmStr] = dateDDMM.includes("/")
    ? dateDDMM.split("/")
    : dateDDMM.split("-");

  const dd = Number(ddStr);
  const mm = Number(mmStr);

  const [hhStr, minStr] = hourHHMM.split(":");
  const hh = Number(hhStr);
  const min = Number(minStr);

  // validação pra não estourar RangeError
  if (
    !Number.isFinite(dd) ||
    !Number.isFinite(mm) ||
    !Number.isFinite(hh) ||
    !Number.isFinite(min)
  ) {
    throw new Error(`Data/hora inválida: "${dateDDMM}" "${hourHHMM}"`);
  }

  const d = new Date(Date.UTC(DEFAULT_YEAR, mm - 1, dd, hh, min, 0));
  return d.toISOString();
}

export const GAMES: GuessGame[] = calendar.flatMap((card) =>
  card.games
    // palpite precisa de 2 times
    .filter((g) => !!g.player1 && !!g.player2)
    .map((g) => {
      const p1 = String(g.player1);
      const p2 = String(g.player2);

      const iso1 = SLUG_TO_ISO2[p1];
      const iso2 = SLUG_TO_ISO2[p2];

      // id estável e seguro pra URL
      const safeDate = String(card.date).replaceAll("/", "-");
      const safeHour = String(g.hour).replace(":", ""); // 16:00 -> 1600
      const id = `${safeDate}-${safeHour}-${p1}-vs-${p2}`;

      return {
        id,
        date: toISO(card.date, g.hour),
        firstTeamCountryCode: iso1 ?? p1, // fallback pra enxergar erro
        secondTeamCountryCode: iso2 ?? p2, // fallback pra enxergar erro
        guess: null,
      };
    })
);