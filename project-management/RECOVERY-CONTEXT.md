# MAGIC BOOK — CAPSULE DE RÉCUPÉRATION IA

## But
Ce fichier existe pour permettre une reprise fiable du projet après une panne, une perte de contexte, une mise à jour de ChatGPT, un changement de session ou un changement d’agent IA. Il ne contient aucun secret ni clé API.

**Dernière consolidation : 2026-08-21 — America/Montreal**

## Ordre de lecture obligatoire pour une reprise
1. `project-management/00-PILOTAGE-MAITRE.md`
2. `project-management/RECOVERY-CONTEXT.md`
3. `project-management/CREATION-JOURNAL.md`
4. `project-management/WORKSTREAMS.md`
5. Les commits GitHub récents sur `main`
6. Les derniers déploiements/logs Vercel avant toute modification de production

## Identité technique du projet
- Produit : Magic Book
- Production web/PWA : **3.6.0**
- Dépôt GitHub : `magicjolab-star/jolab-magic-book-2.1`
- Branche de production : `main`
- Projet Vercel : `jolab-magic-book-2.0`
- URL Vercel principale : `https://jolab-magic-book-20.vercel.app/`
- Android : préparation API 36
- Automobile : architecture préparée mais **cachée et désactivée**
- Play Store : **reporté** jusqu’à stabilisation des modifications restantes

## État IA au 21 août 2026
### Moteur actuel
- Gemini demeure le moteur de production de `/api/evaluate` afin d’éviter une régression.
- La clé Gemini est attendue uniquement côté serveur via variable d’environnement.

### OpenAI — préparation terminée, activation à compléter
- SDK JavaScript officiel OpenAI ajouté dans `package.json`.
- Helper serveur : `lib/openai.js`.
- Responses API préparée avec réponse JSON structurée.
- Modèle par défaut configuré : `gpt-5.6-terra`.
- Commit d’intégration : `092bdbaeaad9ab5e8cf4ad461d6b1d40a30d135f`.
- **Action utilisateur encore requise :** créer/récupérer une clé OpenAI et ajouter `OPENAI_API_KEY` dans Vercel > Settings > Environment Variables > Production > Sensitive.
- Ne jamais écrire la vraie clé dans GitHub, ce fichier, un screenshot public ou un clavardage.
- Après ajout de la variable : redéployer Vercel, vérifier `READY`, tester OpenAI côté serveur, puis seulement décider s’il devient moteur principal ou fallback.

## Priorités de reprise
1. Configurer `OPENAI_API_KEY` dans Vercel sans partager la clé.
2. Redéployer et confirmer que Vercel est `READY`.
3. Tester OpenAI côté serveur en gardant Gemini actif.
4. Vérifier logs Vercel et endpoint d’évaluation.
5. Vérifier la sauvegarde quotidienne GitHub → Google Drive.
6. Stabiliser les correctifs Magic Book 3.6 / PWA / Android.
7. Intégration Wix seulement après validation de stabilité.
8. Play Store seulement après les modifications restantes et la validation finale.

## Sauvegarde et reprise après incident
- Workflow GitHub : `.github/workflows/daily-backup.yml`.
- Il génère quotidiennement :
  - `Magic-Book-repository.bundle` : dépôt Git restaurable avec historique/références Git;
  - `Magic-Book-source.zip` : snapshot du code source;
  - `BACKUP-INFO.txt` : date, dépôt, commit et ref.
- Commit d’installation du workflow : `f5ec07d812b6df1636134d31492bd80af76b5365`.
- Un dossier Google Drive distinct existe : **Magic Book - Sauvegardes automatiques**.
- Une tâche quotidienne vérifie le dernier artifact GitHub et le copie dans Google Drive sans doublon; elle doit signaler toute erreur de sauvegarde.
- Les fichiers de `project-management/` font partie de chaque archive quotidienne afin de sauvegarder non seulement le code, mais aussi les décisions et le contexte de création.

## Fonctions importantes déjà retenues dans 3.6.0
- Interface premium bleu nuit / doré.
- NIV/VIN optionnel.
- Authentification courriel OTP et historique cloud.
- PWA active.
- Android préparé sur API 36.
- Architecture Automobile en arrière-plan mais désactivée.

## Règles de sécurité de reprise
- Toujours lire cette capsule avant de modifier la production après une perte de contexte.
- Toujours vérifier le HEAD de `main` et le dernier déploiement Vercel avant d’écrire.
- Ne jamais restaurer une vieille sauvegarde par-dessus `main` sans comparaison préalable.
- Ne jamais exposer les variables d’environnement, clés API, keystores ou secrets dans le dépôt public.
- Avant une opération risquée : conserver un point de restauration Git identifiable.
- Toute nouvelle décision majeure doit être inscrite dans `00-PILOTAGE-MAITRE.md` et, si elle affecte la reprise, dans ce fichier.

## Point d’attention à vérifier lors d’une reprise
Le fichier `vercel.json` doit être contrôlé avant toute modification de routage ou de version affichée afin de confirmer que la racine publique pointe bien vers la version voulue. Ne pas supposer que le numéro de fichier HTML correspond automatiquement à la version produit affichée.

## Instruction à un futur assistant
Si le contexte conversationnel est incomplet : **ne pas deviner**. Lire les fichiers ci-dessus, inspecter les commits récents et Vercel, reconstruire l’état réel, puis présenter à l’utilisateur un résumé de reprise avant toute modification destructive.
