# Mural Colaborativo · Ajustes de FC

Um **mural colaborativo ao vivo** para o encontro de treinamento "Ajustes de FC",
dividido em **dois links independentes** que conversam entre si pelo Firebase Firestore:

| Página | Onde abrir | Para quê |
|---|---|---|
| **`participante.html`** | No celular de cada pessoa do time | Digita o nome e responde os 5 blocos discursivos. |
| **`telao.html`** | Na tela projetada pela facilitadora | Mostra as contribuições de todos em tempo real, com seletor de bloco e contador. |

Os dois arquivos leem e escrevem na **mesma coleção do Firestore (`mural_fc`)**, por isso
se conversam mesmo em telas/dispositivos diferentes. O telão atualiza via `onSnapshot`
(tempo real nativo) **e** por um polling de garantia a cada 3 segundos.

---

## Stack

- HTML/CSS/JS puro — sem build, sem framework.
- **Firebase Firestore** via SDK compat (`10.12.2`).
- Identidade visual roxa da Estante Mágica (`css/styles.css`).

```
.
├─ telao.html              (tela de projeção)
├─ participante.html       (celular do time)
├─ logo_EM.png
├─ css/
│   └─ styles.css          (estilo-base do treinamentoEG + ajustes do mural)
└─ js/
    └─ firebase-config.js  (config + initializeApp + const db)
```

---

## 1) Configurar o Firebase

Abra `js/firebase-config.js` e cole a config do **mesmo projeto Firebase do Quiz do Clube**
(no console: *Configurações do projeto → Seus apps → SDK config*):

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
```

> Esse objeto **não é segredo** — ele vai no front-end de qualquer forma.
> Quem protege os dados são as regras do Firestore (abaixo).

### Regras do Firestore

Como é um treinamento interno e temporário, libere leitura/escrita **apenas** na coleção do mural,
mantendo intactas as regras já existentes do quiz:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /mural_fc/{doc} {
      allow read, write: if true;
    }
    // ... manter as regras existentes do quiz intactas
  }
}
```

### Estrutura de dados (`mural_fc`)

Um documento por resposta:

| Campo | Tipo | Exemplo |
|---|---|---|
| `bloco` | número (0–4) | `1` |
| `nome` | string | `"Yolanda"` |
| `texto` | string | `"..."` |
| `ts` | serverTimestamp | (ordenação) |

Se a mesma pessoa (mesmo `nome`) reenviar no mesmo `bloco`, a resposta anterior é **substituída**
(não duplica).

---

## 2) Testar localmente

```bash
python3 -m http.server 8000
```

- Participante: <http://localhost:8000/participante.html>
- Telão: <http://localhost:8000/telao.html>

Abra os dois em abas/dispositivos diferentes — ao enviar no participante, a resposta aparece
no telão em segundos.

---

## 3) Publicar no GitHub Pages

1. Faça commit e push dos arquivos para o repositório.
2. No GitHub: **Settings → Pages**.
3. Em *Build and deployment → Source*, escolha **Deploy from a branch**.
4. Selecione a branch (ex.: `main`) e a pasta `/ (root)` e salve.
5. Aguarde o deploy. Os links finais ficam:
   - Telão: `https://amandappEM.github.io/treinamento-FC/telao.html`
   - Participante: `https://amandappEM.github.io/treinamento-FC/participante.html`

> Se publicar num repositório chamado `mural-fc`, os links viram `.../mural-fc/telao.html`.

---

## Dica para o dia do encontro

- Abra o **telão** na tela projetada.
- Mande o link do **participante** no grupo do time (ou gere um QR code do link).
- As respostas aparecem no telão em segundos.
- Use **"Limpar este bloco"** para reaproveitar o mesmo link em outra turma.
