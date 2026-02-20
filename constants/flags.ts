import CanadaSquare from "../assets/images/icon-canada-square.svg";
import CanadaRound from "../assets/images/icon-canada.svg";

import MexicoSquare from "../assets/images/icon-mexico-square.svg";
import MexicoRound from "../assets/images/icon-mexico.svg";

import UsaSquare from "../assets/images/icon-usa-square.svg";
import UsaRound from "../assets/images/icon-usa.svg";

import PanamaSquare from "../assets/images/icon-panama-square.svg";
import PanamaRound from "../assets/images/icon-panama.svg";

import HaitiSquare from "../assets/images/icon-haiti-square.svg";
import HaitiRound from "../assets/images/icon-haiti.svg";

import CuracaoSquare from "../assets/images/icon-curacao-square.svg";
import CuracaoRound from "../assets/images/icon-curacao.svg";

// --- CONMEBOL ---
import ArgentinaSquare from "../assets/images/icon-argentina-square.svg";
import ArgentinaRound from "../assets/images/icon-argentina.svg";

import BrazilSquare from "../assets/images/icon-brazil-square.svg";
import BrazilRound from "../assets/images/icon-brazil.svg";

import EcuadorSquare from "../assets/images/icon-ecuador-square.svg";
import EcuadorRound from "../assets/images/icon-ecuador.svg";

import UruguaySquare from "../assets/images/icon-uruguay-square.svg";
import UruguayRound from "../assets/images/icon-uruguay.svg";

import ColombiaSquare from "../assets/images/icon-colombia-square.svg";
import ColombiaRound from "../assets/images/icon-colombia.svg";

import ParaguaySquare from "../assets/images/icon-paraguay-square.svg";
import ParaguayRound from "../assets/images/icon-paraguay.svg";

// --- UEFA ---
import EnglandSquare from "../assets/images/icon-england-square.svg";
import EnglandRound from "../assets/images/icon-england.svg";

import FranceSquare from "../assets/images/icon-france-square.svg";
import FranceRound from "../assets/images/icon-france.svg";

import CroatiaSquare from "../assets/images/icon-croatia-square.svg";
import CroatiaRound from "../assets/images/icon-croatia.svg";

import PortugalSquare from "../assets/images/icon-portugal-square.svg";
import PortugalRound from "../assets/images/icon-portugal.svg";

import NorwaySquare from "../assets/images/icon-norway-square.svg";
import NorwayRound from "../assets/images/icon-norway.svg";

import GermanySquare from "../assets/images/icon-germany-square.svg";
import GermanyRound from "../assets/images/icon-germany.svg";

import NetherlandsSquare from "../assets/images/icon-netherlands-square.svg";
import NetherlandsRound from "../assets/images/icon-netherlands.svg";

import BelgiumSquare from "../assets/images/icon-belgium-square.svg";
import BelgiumRound from "../assets/images/icon-belgium.svg";

import AustriaSquare from "../assets/images/icon-austria-square.svg";
import AustriaRound from "../assets/images/icon-austria.svg";

import SwitzerlandSquare from "../assets/images/icon-switzerland-square.svg";
import SwitzerlandRound from "../assets/images/icon-switzerland.svg";

import SpainSquare from "../assets/images/icon-spain-square.svg";
import SpainRound from "../assets/images/icon-spain.svg";

import ScotlandSquare from "../assets/images/icon-scotland-square.svg";
import ScotlandRound from "../assets/images/icon-scotland.svg";

// --- AFC ---
import JapanSquare from "../assets/images/icon-japan-square.svg";
import JapanRound from "../assets/images/icon-japan.svg";

import IranSquare from "../assets/images/icon-iran-square.svg";
import IranRound from "../assets/images/icon-iran.svg";

import UzbekistanSquare from "../assets/images/icon-uzbekistan-square.svg";
import UzbekistanRound from "../assets/images/icon-uzbekistan.svg";

// OBS: no seu calendário antigo você usa "korea-republic" (e não "south-korea")
import KoreaRepublicSquare from "../assets/images/icon-korea-republic-square.svg";
import KoreaRepublicRound from "../assets/images/icon-korea-republic.svg";

import JordanSquare from "../assets/images/icon-jordan-square.svg";
import JordanRound from "../assets/images/icon-jordan.svg";

import AustraliaSquare from "../assets/images/icon-australia-square.svg";
import AustraliaRound from "../assets/images/icon-australia.svg";

import QatarSquare from "../assets/images/icon-qatar-square.svg";
import QatarRound from "../assets/images/icon-qatar.svg";

import SaudiArabiaSquare from "../assets/images/icon-saudi-arabia-square.svg";
import SaudiArabiaRound from "../assets/images/icon-saudi-arabia.svg";

// --- OFC ---
import NewZealandSquare from "../assets/images/icon-new-zealand-square.svg";
import NewZealandRound from "../assets/images/icon-new-zealand.svg";

// --- CAF ---
import MoroccoSquare from "../assets/images/icon-morocco-square.svg";
import MoroccoRound from "../assets/images/icon-morocco.svg";

import TunisiaSquare from "../assets/images/icon-tunisia-square.svg";
import TunisiaRound from "../assets/images/icon-tunisia.svg";

import EgyptSquare from "../assets/images/icon-egypt-square.svg";
import EgyptRound from "../assets/images/icon-egypt.svg";

import AlgeriaSquare from "../assets/images/icon-algeria-square.svg";
import AlgeriaRound from "../assets/images/icon-algeria.svg";

import GhanaSquare from "../assets/images/icon-ghana-square.svg";
import GhanaRound from "../assets/images/icon-ghana.svg";

// OBS: no seu calendário antigo você usa "cabo-verde"
import CaboVerdeSquare from "../assets/images/icon-cabo-verde-square.svg";
import CaboVerdeRound from "../assets/images/icon-cabo-verde.svg";

import SouthAfricaSquare from "../assets/images/icon-south-africa-square.svg";
import SouthAfricaRound from "../assets/images/icon-south-africa.svg";

// OBS: no seu calendário antigo você usa "costa-do-marfim" (Ivory Coast)
import CostaDoMarfimSquare from "../assets/images/icon-costa-do-marfim-square.svg";
import CostaDoMarfimRound from "../assets/images/icon-costa-do-marfim.svg";

import SenegalSquare from "../assets/images/icon-senegal-square.svg";
import SenegalRound from "../assets/images/icon-senegal.svg";



export type TeamKey = keyof typeof flagsRound
export type SvgComponent = React.FC<{ width?: number; height?: number }>
export function isTeamKey(team: string): team is TeamKey {
  return team in flagsRound
}
export const flagsRound = {
  // Hosts/CONCACAF
  canada: CanadaRound,
  mexico: MexicoRound,
  usa: UsaRound,
  panama: PanamaRound,
  haiti: HaitiRound,
  curacao: CuracaoRound,

  // CONMEBOL
  argentina: ArgentinaRound,
  brazil: BrazilRound,
  ecuador: EcuadorRound,
  uruguay: UruguayRound,
  colombia: ColombiaRound,
  paraguay: ParaguayRound,

  // UEFA
  england: EnglandRound,
  france: FranceRound,
  croatia: CroatiaRound,
  portugal: PortugalRound,
  norway: NorwayRound,
  germany: GermanyRound,
  netherlands: NetherlandsRound,
  belgium: BelgiumRound,
  austria: AustriaRound,
  switzerland: SwitzerlandRound,
  spain: SpainRound,
  scotland: ScotlandRound,

  // AFC
  japan: JapanRound,
  iran: IranRound,
  uzbekistan: UzbekistanRound,
  "korea-republic": KoreaRepublicRound,
  jordan: JordanRound,
  australia: AustraliaRound,
  qatar: QatarRound,
  "saudi-arabia": SaudiArabiaRound,

  // OFC
  "new-zealand": NewZealandRound,

  // CAF
  morocco: MoroccoRound,
  tunisia: TunisiaRound,
  egypt: EgyptRound,
  algeria: AlgeriaRound,
  ghana: GhanaRound,
  "cabo-verde": CaboVerdeRound,
  "south-africa": SouthAfricaRound,
  "costa-do-marfim": CostaDoMarfimRound,
  senegal: SenegalRound,
} satisfies Record<string, SvgComponent>;

export const flagsSquare = {
  // Hosts/CONCACAF
  canada: CanadaSquare,
  mexico: MexicoSquare,
  usa: UsaSquare,
  panama: PanamaSquare,
  haiti: HaitiSquare,
  curacao: CuracaoSquare,

  // CONMEBOL
  argentina: ArgentinaSquare,
  brazil: BrazilSquare,
  ecuador: EcuadorSquare,
  uruguay: UruguaySquare,
  colombia: ColombiaSquare,
  paraguay: ParaguaySquare,

  // UEFA
  england: EnglandSquare,
  france: FranceSquare,
  croatia: CroatiaSquare,
  portugal: PortugalSquare,
  norway: NorwaySquare,
  germany: GermanySquare,
  netherlands: NetherlandsSquare,
  belgium: BelgiumSquare,
  austria: AustriaSquare,
  switzerland: SwitzerlandSquare,
  spain: SpainSquare,
  scotland: ScotlandSquare,

  // AFC
  japan: JapanSquare,
  iran: IranSquare,
  uzbekistan: UzbekistanSquare,
  "korea-republic": KoreaRepublicSquare,
  jordan: JordanSquare,
  australia: AustraliaSquare,
  qatar: QatarSquare,
  "saudi-arabia": SaudiArabiaSquare,

  // OFC
  "new-zealand": NewZealandSquare,

  // CAF
  morocco: MoroccoSquare,
  tunisia: TunisiaSquare,
  egypt: EgyptSquare,
  algeria: AlgeriaSquare,
  ghana: GhanaSquare,
  "cabo-verde": CaboVerdeSquare,
  "south-africa": SouthAfricaSquare,
  "costa-do-marfim": CostaDoMarfimSquare,
  senegal: SenegalSquare,
} satisfies Record<string, SvgComponent>;

export type FlagVariant = "round" | "square";

export function getFlag(
  team: string | undefined,
  variant: "round" | "square" = "round",
) {
  if (!team) return null;
  if (!isTeamKey(team)) return null;

  return variant === "round" ? flagsRound[team] : flagsSquare[team];
}
