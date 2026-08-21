# MAGIC BOOK — STRUCTURE OFFICIELLE DES CLAVARDAGES

## 00 — PILOTAGE MAÎTRE
Gestion centrale, priorités, décisions, statut global, coordination, GO/NO-GO.

## 01 — UX / UI / VISUEL
Couleurs, icônes, logo, habillage, typographie, cartes, responsive, splash, captures.

## 02 — TEXTES / CONTENU / MENUS
Titres, labels, placeholders, traductions, menus déroulants, avertissements, messages utilisateurs.

## 03 — BASE DE DONNÉES VÉHICULES
Marques, modèles, années, catégories, accessoires, valeurs, fournisseurs, gammes complètes.

## 04 — LIENS & DESTINATIONS
Facebook, Marketplace, Kijiji, LesPAC, sites, téléphone, courriel, deep links et vérification des liens.

## 05 — BUGS / PROBLÈMES À RÉGLER
Reproduction, priorité, appareil, navigateur, comportement attendu/obtenu, statut des correctifs.

## 06 — CODE & NOUVELLES FONCTIONS
Fonctions actuelles ou futures, API, calculs, PWA, Android, architecture Automobile, options activables.

## 07 — IDÉES / NOTES / ROADMAP
Idées futures, backlog, possibilités à conserver sans les injecter immédiatement en production.

## 08 — INTÉGRATION & TESTS
Tests fonctionnels, mobile, bureau, PWA, Android, Supabase, API IA, formulaires, liens, impression, régressions.

## 09 — PRÉPARATION DES MISES À JOUR
Contenu de release, numéros de version, manifest, cache, notes de version, fichiers modifiés.

## 10 — LOIS / CONFORMITÉ / PROPRIÉTÉ INTELLECTUELLE
Loi 25, confidentialité, données, logos tiers, marques, droits d’auteur, licences, API, disclaimers.

## 11 — RELEASE / DÉPLOIEMENT
Regroupement final validé, GitHub, Vercel, Supabase, PWA, Android, rollback, tests post-déploiement.

## 12 — COMMERCIAL MAGIC BOOK | ABONNEMENT
Forfaits, comptes professionnels, quotas, paiements, gestion d’équipe, tableaux de bord, rapports, API pro.

## 13 — BETA / AVANT-PREMIÈRE
Fonctions expérimentales, testeurs, feedback, crashs, validation avant production.

## 14 — BRAINSTORMING & ÉVALUATION D’IDÉES
Valeur utilisateur, valeur commerciale, difficulté, coût, risque, impact, faisabilité, dépendances.

## 15 — PERFORMANCE / COMPARAISONS / RENDEMENT
Vitesse, précision, erreurs, coût API, taux d’utilisation, comparaison versions/modèles IA, rendement produit.

---

# Règles communes

1. Chaque clavardage reste dans son périmètre.
2. Toute décision importante retourne dans le 00.
3. Les modifications de production passent obligatoirement par 08 → 09 → 10 si nécessaire → 11.
4. Les idées non approuvées ne sont pas intégrées directement au code de production.
5. Les éléments transférés utilisent les identifiants `MB-*` définis dans `00-PILOTAGE-MAITRE.md`.
6. En cas de conflit entre deux clavardages, le 00 tranche et conserve la décision finale.
