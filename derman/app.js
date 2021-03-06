/*
	* ADD HINT SUPPORT
	? ALLOW KB SET SELECTION
	* IMPROVE ENDSCREEN
		* SHOW STATS NICER
	? SHOW ERRORS (as modal)

	? DARK MODE

*/
const out = document.querySelector(".out");
const input = document.querySelector(".in");
const hintBtn = document.querySelector(".hint");
const skipBtn = document.querySelector(".skip");
let [mistakes, skips, hints] = [0, 0, 0];

let words = [];

function createSetDisplay(set) {
	const setHeader = document.createElement("h2");
	setHeader.classList.add("w3-center", "w3-black", "w3-text-light-grey");
	setHeader.innerText = `ZESTAW ${set}`;
	setHeader.style.fontWeight = "bolder";

	// const setContent = document.createElement("img");
	// setContent.src = `./img/words${set}.png`;

	const setContent = document.createElement("div");
	setContent.classList.add("w3-container");
	const perColumn = Math.floor(wordSets[set].length / 3);

	Array.from({ length: perColumn }, (_, index) => {
		const start = index * perColumn;
		const wordColumn = wordSets[set]
			.slice(start, start + perColumn)
			.map((round) => round[0])
			.join("<br>");

		const column = document.createElement("div");
		column.classList.add("column", "w3-third", "w3-large");
		column.innerHTML = wordColumn;

		setContent.appendChild(column);
	});

	return [setHeader, setContent];
}
function createSetSelection() {
	const selectionHeader = document.createElement("h3");
	selectionHeader.classList.add(
		"w3-center",
		"w3-text-light-grey",
		"w3-black"
	);
	selectionHeader.innerText = "WYBIERZ ZESTAW";
	selectionHeader.style.fontWeight = "bolder";

	let selectionSetBtns = [];
	for (const i in wordSets) {
		const selectSetBtn = document.createElement("button");
		selectSetBtn.classList.add(
			"setsel",
			"w3-grey",
			"w3-jumbo",
			"w3-button",
			"w3-margin",
			"w3-round-large",
			"w3-hover-yellow"
		);
		selectSetBtn.style.width = "150px";

		const indexOfSet = document.createElement("p");
		indexOfSet.innerText = i;
		indexOfSet.style.fontWeight = "bolder";

		selectSetBtn.appendChild(indexOfSet);
		selectionSetBtns.push(selectSetBtn);
	}

	return [selectionHeader, selectionSetBtns];
}

function begin() {
	let [selectionHeader, selectionSetBtns] = createSetSelection();
	input.replaceChildren(selectionHeader, ...selectionSetBtns);

	for (const i in selectionSetBtns) {
		let btn = selectionSetBtns[i];
		btn.addEventListener("mouseover", () => {
			let [setHeader, setContent] = createSetDisplay(i);
			out.replaceChildren(setHeader, setContent);
		});

		btn.addEventListener("click", () => {
			words = wordSets[i].sort(() => Math.random() - 0.5);
			hints = Math.round(words.length / 4);
			game();
		});
	}
}

function createOutput(round) {
	const show = Math.floor(Math.random() * 3);

	const revealed = document.createElement("p");
	revealed.style.fontWeight = "bolder";
	revealed.innerText = `${round + 1}/${words.length}\n\n${
		words[round][show]
	}`;

	words[round].splice(show, 1);

	return [revealed];
}
function createInput() {
	const inputForm = document.createElement("form");
	inputForm.action = "javascript:void(0);";

	const inputField = document.createElement("input");
	inputField.setAttribute("type", "text");
	inputField.classList.add(
		"input-field",
		"w3-large",
		"w3-input",
		"w3-margin-top",
		"w3-bottombar"
	);
	document.addEventListener("keydown", () => inputField.focus());

	const guessButton = document.createElement("button");
	guessButton.classList.add(
		"check",
		"w3-button",
		"w3-grey",
		"w3-hover-yellow",
		"w3-round",
		"w3-margin",
		"w3-padding-large",
		"w3-xxxlarge"
	);
	guessButton.innerText = "CHECK";
	guessButton.style.fontWeight = "bolder";

	return [inputForm, inputField, guessButton];
}

async function game() {
	hintBtn.classList.remove("w3-disabled");
	skipBtn.classList.remove("w3-disabled");

	for (let roundIndex = 0; roundIndex < words.length; roundIndex++) {
		let hint_used = false;

		let [revealed] = createOutput(roundIndex);
		out.replaceChildren(revealed);

		let [inputForm, inputField, guessButton] = createInput();
		inputForm.replaceChildren(inputField, guessButton);
		input.replaceChildren(inputForm);

		const copyBtns = document.querySelectorAll(".copy");
		for (const i in copyBtns) {
			if (isNaN(i)) break;
			copyBtns[i].addEventListener("click", () => {
				inputField.value += copyBtns[i].innerText.at(-1);
				navigator.clipboard.writeText(copyBtns[i].innerText.at(-1));
			});
		}

		const hintMenu = document.querySelector(".hintmenu");
		const hintText = document.querySelector(".hinttext");
		hintBtn.addEventListener("click", () => {
			let hint = words[roundIndex];
			if (!hint_used) {
				hint_used = true;
				hints--;
				hintText.innerHTML = `<b>${hint}</b><br><br>masz jeszcze <b>${hints}</b> wskaz??wek`;
			}
			hintMenu.style.display = "block";
		});

		await Promise.race([
			getAndCheckGuess(guessButton, roundIndex),
			skip(skipBtn),
		]).then((value) => {
			if (!hint_used) hints++;
			switch (value) {
				case "guessed":
					break;
				case "skip":
					skips++;
					break;
			}
		});
	}
	end();
}

function areEqualArrays(arr1, arr2) {
	if (
		arr1.length !== arr2.length ||
		!arr1
			.slice()
			.sort()
			.every((e, i) => e === arr2.slice().sort()[i])
	) {
		return false;
	} else {
		return true;
	}
}

function getAndCheckGuess(checkBtn, roundIndex) {
	return new Promise((resolve) => {
		checkBtn.addEventListener("click", () => {
			const inputField = document.querySelector(".input-field");
			let ans = inputField.value.trim();
			let answerArray = ans.split(",");

			if (!areEqualArrays(answerArray, words[roundIndex])) {
				mistakes++;
				inputField.classList.add("w3-pale-red", "w3-border-red");
				setTimeout(
					() =>
						inputField.classList.remove(
							"w3-pale-red",
							"w3-border-red"
						),
					1000
				);
			} else {
				inputField.classList.add("w3-pale-green", "w3-border-green");
				setTimeout(() => resolve("guessed"), 1000);
			}
		});
	});
}

function skip(skipBtn) {
	return new Promise((resolve) => {
		skipBtn.addEventListener("click", () => resolve("skip"));
	});
}

function createEndScreen() {
	const endHeader = document.createElement("h2");
	endHeader.classList.add("w3-text-light-grey", "w3-black");
	endHeader.style.fontWeight = "bolder";
	endHeader.innerText = "KONIEC";

	const endScreen = document.createElement("p");
	endScreen.innerText = `poprawnych: ${words.length - mistakes - skips}/${
		words.length
	}, b????dy: ${mistakes}, pomini??to: ${skips}`;

	return [endHeader, endScreen];
}

function createReset() {
	const reset = document.createElement("button");
	reset.classList.add(
		"reset",
		"w3-button",
		"w3-grey",
		"w3-hover-light-green",
		"w3-hover-text-lime",
		"w3-round",
		"w3-margin",
		"w3-padding-large",
		"w3-xxxlarge"
	);
	reset.innerText = "RESTART";
	reset.style.fontWeight = "bolder";
	reset.addEventListener("click", () => window.location.reload());

	return reset;
}

function end() {
	let [endHeader, endScreen] = createEndScreen();
	out.replaceChildren(endHeader, endScreen);

	let reset = createReset();
	input.replaceChildren(reset);
}

window.onload = () => {
	begin();
};

const wordSets = [
	[
		["backen", "gebacken", "piec"],
		["befehlen", "befohlen", "rozkazywa??"],
		["beginnen", "begonnen", "zaczyna??"],
		["bieten", "geboten", "oferowa??"],
		["bitten", "gebeten", "prosi??"],
		["bleiben", "geblieben", "zostawa??"],
		["bringen", "gebracht", "przynosi??"],
		["denken", "gedacht", "my??le??"],
		["d??rfen", "gedurft", "mie?? pozwolenie"],
		["empfehlen", "empfohlen", "poleca??"],
		["essen", "gegessen", "je????"],
		["fahren", "gefahren", "jecha??"],
		["fangen", "gefangen", "??apa??"],
		["finden", "gefunden", "znajdowa??"],
		["fliegen", "geflogen", "lata??"],
		["flie??en", "geflossen", "p??yn????"],
		["frieren", "gefroren", "marzn????"],
		["geben", "gegeben", "dawa??"],
		["gefallen", "gefallen", "podoba?? si??"],
		["gehen", "gegangen", "i????"],
		["gelingen", "gelungen", "uda?? si??"],
		["genie??en", "genossen", "rozkoszowa?? si??"],
		["geschehen", "geschehen", "wydarza?? si??"],
		["gewinnen", "gewonnen", "wygrywa??"],
		["greifen", "gegriffen", "si??ga??"],
		["haben", "gehabt", "mie??"],
		["halten", "gehalten", "trzyma??"],
		["heben", "gehoben", "podnosi??"],
		["hei??en", "gehei??en", "nazywa?? si??"],
		["helfen", "geholfen", "pomaga??"],
	],
	[
		["kennen", "gekannt", "zna??"],
		["kommen", "gekommen", "przychodzi??"],
		["k??nnen", "gekonnt", "m??c"],
		["laden", "geladen", "??adowa??"],
		["lassen", "gelassen", "pozwala??"],
		["laufen", "gelaufen", "biega??"],
		["leiden", "gelitten", "cierpie??"],
		["leihen", "geliehen", "po??ycza??"],
		["liegen", "gelegen", "le??e??"],
		["l??gen", "gelogen", "k??ama??"],
		["messen", "gemessen", "mierzy??"],
		["m??gen", "gemocht", "lubi??"],
		["m??ssen", "gemusst", "musie??"],
		["nehmen", "genommen", "bra??"],
		["nennen", "genannt", "nazywa??"],
		["raten", "geraten", "radzi??"],
		["reiben", "gerieben", "trze??"],
		["rei??en", "gerissen", "drze??"],
		["reiten", "geritten", "je??dzi?? konno"],
		["rennen", "gerannt", "p??dzi??"],
		["rufen", "gerufen", "wo??a??"],
		["schaffen", "geschaffen", "tworzy??"],
		["schlafen", "geschlafen", "spa??"],
		["schneiden", "geschnitten", "ci????"],
		["schreiben", "geschrieben", "pisa??"],
		["schreien", "geschrien", "krzycze??"],
		["schweigen", "geschwiegen", "milcze??"],
		["schwimmen", "geschwommen", "p??ywa??"],
		["sehen", "gesehen", "patrze??"],
		["sein", "gewesen", "by??"],
	],
	[
		["singen", "gesungen", "??piewa??"],
		["sinken", "gesunken", "opada??"],
		["sitzen", "gesessen", "siedzie??"],
		["sollen", "gesollt", "mie?? powinno????"],
		["sprechen", "gesprochen", "m??wi??"],
		["springen", "gesprungen", "skaka??"],
		["stehen", "gestanden", "sta??"],
		["stehlen", "gestohlen", "kra????"],
		["steigen", "gestiegen", "podnosi?? si??"],
		["sterben", "gestorben", "umiera??"],
		["sto??en", "gesto??en", "popycha??"],
		["streiten", "gestritten", "k????ci?? si??"],
		["tragen", "getragen", "nosi??"],
		["treffen", "getroffen", "spotyka??"],
		["trinken", "getrunken", "pi??"],
		["tun", "getan", "czyni??"],
		["vergessen", "vergessen", "zapomina??"],
		["verlieren", "verloren", "gubi??"],
		["wachsen", "gewachsen", "rosn????"],
		["waschen", "gewaschen", "my??"],
		["werden", "geworden", "zosta??"],
		["werfen", "geworfen", "rzuca??"],
		["wiegen", "gewogen", "wa??y??"],
		["wissen", "gewusst", "wiedzie??"],
		["wollen", "gewollt", "chcie??"],
		["ziehen", "gezogen", "ci??gn????"],
		["zwingen", "gezwungen", "zmusza??"],
	],
];
