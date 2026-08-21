# 00 — MAGIC BOOK | PILOTAGE MAÎTRE

## Rôle
Ce document est la source de vérité du projet Magic Book. Il centralise les décisions, priorités, versions, validations, risques, éléments prêts à intégrer et déploiements.

Le clavardage **00 — MAGIC BOOK | PILOTAGE MAÎTRE** est le point de contrôle principal. Les autres clavardages spécialisés travaillent dans leur périmètre et renvoient leurs décisions/éléments prêts ici avant intégration ou déploiement.

## État actuel
- Production web/PWA : **Magic Book 3.6.0**
- Dépôt : `magicjolab-star/jolab-magic-book-2.1`
- Branche production : `main`
- Production : `https://jolab-magic-book-20.vercel.app/`
- Phase actuelle : **améliorations avant préparation finale Play Store**
- Play Store : **à garder pour plus tard, après les modifications restantes**
- Version Automobile : **architecture préparée, totalement cachée et désactivée**

## Autorité du 00
Le 00 peut coordonner l'ensemble du projet : UX/UI, contenu, données, liens, bugs, code, roadmap, tests, conformité, releases, Commercial, bêta et performance. Toute action reste limitée aux accès/outils effectivement disponibles et aux autorisations de l'utilisateur.

## Règle de déploiement
Aucun élément provenant d'un clavardage spécialisé ne doit être considéré comme prêt pour production avant :
1. validation fonctionnelle;
2. intégration dans le lot de release;
3. tests;
4. vérification conformité si nécessaire;
5. décision GO depuis le 00/11.

## Flux officiel
`14 Brainstorming → 07 Roadmap → 06 Développement → 08 Intégration & tests → 09 Préparation mise à jour → 10 Conformité → 11 Release/Déploiement → 15 Performance`

## Statuts
`IDÉE` · `À ÉTUDIER` · `APPROUVÉ` · `EN COURS` · `À TESTER` · `VALIDÉ` · `BLOQUÉ` · `PRÊT RELEASE` · `DÉPLOYÉ` · `REPORTÉ`

## Identifiants
- Décision : `MB-DEC-###`
- Fonction : `MB-FEA-###`
- Bug : `MB-BUG-###`
- Donnée : `MB-DATA-###`
- Lien : `MB-LINK-###`
- Conformité : `MB-COMP-###`
- Test : `MB-TEST-###`
- Release : `MB-REL-###`
- Idée : `MB-IDEA-###`

## Décisions actives
- `MB-DEC-001` — La version Automobile reste invisible et inaccessible jusqu'à décision ultérieure.
- `MB-DEC-002` — La mise en marché Play Store est reportée jusqu'à la fin des modifications restantes.
- `MB-DEC-003` — Le clavardage 00 devient le gestionnaire maître du projet.
- `MB-DEC-004` — Les sujets sont séparés par clavardage spécialisé afin de réduire les oublis et collisions.

## Protocole de retour vers 00
Chaque clavardage spécialisé doit terminer un bloc de transfert contenant :
- ID;
- résumé;
- décision prise;
- fichiers/éléments touchés;
- statut;
- tests effectués;
- risque ou dépendance;
- destination suivante.

## Journal de release
### Production 3.6.0
- Interface premium bleu nuit / doré
- NIV/VIN optionnel
- Authentification courriel OTP + historique cloud
- PWA active
- Android préparé sur API 36
- Automobile préparée en arrière-plan mais désactivée

### Prochaine release
- Numéro : à fixer lorsque le prochain lot sera stabilisé
- Contenu : en construction via les clavardages spécialisés
