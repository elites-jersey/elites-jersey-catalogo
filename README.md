# ELITES.JERSEY — catalogo

Sito statico in italiano: mostra le maglie, le foto e i prezzi. Non contiene carrello, checkout o pagamenti. Funziona senza installare programmi.

## Anteprima sul computer

Apri `index.html` con un browser. Per vedere il video introduttivo, prima copia il tuo file MP4 in `assets/` e chiamalo `intro.mp4`. Senza quel file, il pulsante d'ingresso apre direttamente il catalogo.

## Aggiungere il video

1. Esporta il video in formato MP4 (H.264) e, se possibile, tienilo sotto circa 30 MB.
2. Copialo in `assets/` con il nome `intro.mp4`.
3. La schermata iniziale mostra **Entra nello store** e **Salta intro**. Dopo il clic su Entra, il video parte; finisce automaticamente sul catalogo. L'audio è disattivato all'avvio e si può attivare con il pulsante in basso a sinistra.

La riproduzione parte dopo un clic perché i browser spesso bloccano i video avviati automaticamente con audio.

## Inserire il logo

Il logo ELITES.JERSEY inviato è già inserito nell’intestazione e nella copertina. Il file usato è `assets/elites-jersey-logo.png`.

## Aggiungere foto e cambiare prodotti

Il catalogo riunisce maglie e polo nella stessa griglia. Il filtro **Polo** mostra la polo nera del Brasile a 35 €; clicca sulla scheda per aprire le foto fronte e retro e usa le frecce per scorrerle. Il modello Real Madrid sembra corrispondere alla terza divisa 2024/25; il prezzo è da definire.

Per aggiungere una maglia o una polo, duplica una riga dentro `products` e assegna `category:'maglia'` oppure `category:'polo'`. Metti le foto in `assets/` e indica i nomi dei file in `imageFront` e `imageBack`. Ogni maglia è presentata come personalizzabile con nome, numero e badge.

## Pubblicazione gratuita con GitHub Pages

1. Crea o accedi a un account su [GitHub](https://github.com).
2. Crea un nuovo repository pubblico, ad esempio `elites-jersey-catalogo`.
3. Carica nel repository tutto il contenuto di questa cartella (`index.html`, `styles.css`, `script.js`, `README.md` e `assets/`). `index.html` deve stare nella cartella principale del repository.
4. Nel repository apri **Settings → Pages**.
5. In **Build and deployment**, scegli **Deploy from a branch**; seleziona il branch `main` e la cartella `/ (root)`, poi premi **Save**.
6. Dopo la pubblicazione, GitHub mostrerà l'indirizzo del sito nella stessa pagina di Pages. La prima pubblicazione può richiedere qualche minuto.

Per aggiornare il catalogo in futuro, modifica i file o ricarica quelli aggiornati nel repository: Pages ripubblicherà il sito automaticamente.
