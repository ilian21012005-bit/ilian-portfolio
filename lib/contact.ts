function env(name: string, fallback = "") {
  return process.env[name] || fallback;
}

/** Données publiques (injectées au build) : utiliser uniquement des NEXT_PUBLIC_* */
export const CONTACT = {
  name: env("NEXT_PUBLIC_CONTACT_NAME", "Prénom Nom"),
  email: env("NEXT_PUBLIC_CONTACT_EMAIL", ""),
  phone: env("NEXT_PUBLIC_CONTACT_PHONE", ""),
  location: env("NEXT_PUBLIC_CONTACT_LOCATION", ""),
  linkedinUrl: env("NEXT_PUBLIC_CONTACT_LINKEDIN_URL", ""),
  githubUrl: env("NEXT_PUBLIC_CONTACT_GITHUB_URL", ""),
  cvUrl: env("NEXT_PUBLIC_CONTACT_CV_URL", "/cv.pdf"),
} as const;

