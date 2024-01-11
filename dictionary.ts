import "server-only";
import type { Locale } from "@/i18n.config";

const dictionaries = {
en: () => import("@/dictionaries/en.json").then((module) => module.default),
fi: () => import("@/dictionaries/fi.json").then((module) => module.default),
sv: () => import("@/dictionaries/sv.json").then((module) => module.default),
de: () => import("@/dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
return locale == "en" 
? dictionaries.en() 
: locale == "fi"
? dictionaries.fi()
: locale == "de"
? dictionaries.de()
: dictionaries.sv();
};