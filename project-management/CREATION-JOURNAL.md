# MAGIC BOOK — JOURNAL DE CRÉATION / REPRISE

Ce journal sert de sauvegarde de création. Il conserve les étapes importantes du développement afin de reconstruire le projet après une panne, une perte de contexte ou une mise à jour d’outils.

## 2026-08-21

### État produit
- Production web/PWA identifiée comme Magic Book 3.6.0.
- Dépôt principal : `magicjolab-star/jolab-magic-book-2.1`.
- Branche production : `main`.
- Projet Vercel relié : `jolab-magic-book-2.0`.
- Android préparé sur API 36.
- Version Automobile préparée mais cachée et désactivée.
- Play Store reporté jusqu’à stabilisation finale.

### Intégration OpenAI préparée
- Ajout de `package.json` avec dépendance `openai` et Node 24.x.
- Ajout de `.gitignore` pour protéger `.env` et secrets locaux.
- Ajout de `.env.example` sans secret.
- Ajout de `lib/openai.js` pour la Responses API.
- Modèle configuré par défaut : `gpt-5.6-terra`.
- Commit : `092bdbaeaad9ab5e8cf4ad461d6b1d40a30d135f`.
- Vercel a déployé ce commit avec état READY et sans erreur de build.
- Gemini reste moteur de production tant qu’OpenAI n’est pas testé.
- Étape restante : ajouter `OPENAI_API_KEY` dans Vercel > Production > Sensitive, puis redéployer et tester.

### Sauvegardes automatiques
- Dossier Google Drive créé : `Magic Book - Sauvegardes automatiques`.
- ID du dossier : `1UK4vO0qMTmCbk3ia1pcCYKO3LFnB-5d8`.
- Workflow GitHub ajouté : `.github/workflows/daily-backup.yml`.
- Sauvegarde quotidienne prévue à 06:00 UTC.
- Contenu : bundle Git complet, ZIP du code source et fichier d’information de sauvegarde.
- Commit du workflow : `f5ec07d812b6df1636134d31492bd80af76b5365`.
- Une tâche quotidienne a été configurée pour récupérer le dernier artifact GitHub et le copier vers le dossier Google Drive, sans doublon et avec alerte en cas d’échec.

### Sauvegarde de contexte / création
- Ajout de `project-management/RECOVERY-CONTEXT.md`.
- Ce fichier indique l’ordre de lecture, l’état réel du projet, les décisions, les prochaines étapes, les règles de sécurité et les références de restauration.
- Commit : `e7948c07faf6766acedc1515925af56315d479bd`.

### Priorité de reprise
1. Ajouter la clé OpenAI dans Vercel sans la partager dans un chat ou GitHub.
2. Redéployer Vercel.
3. Vérifier READY et les logs.
4. Tester OpenAI côté serveur avec Gemini conservé comme sécurité.
5. Vérifier le premier cycle complet de sauvegarde GitHub → Google Drive.
6. Stabiliser Magic Book 3.6 / PWA / Android.
7. Intégration Wix après validation de stabilité.
8. Play Store après validation finale.

## Règle de maintenance du journal
À chaque changement majeur de direction, de version, d’architecture, de déploiement ou de sécurité, ajouter une entrée datée ici avec : décision, fichiers touchés, commit ou déploiement, état des tests, risques et prochaine étape.
