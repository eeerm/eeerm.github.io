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
				hintText.innerHTML = `<b>${hint}</b><br><br>masz jeszcze <b>${hints}</b> wskazówek`;
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
	}, błędy: ${mistakes}, pominięto: ${skips}`;

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
		["befehlen", "befohlen", "rozkazywać"],
		["beginnen", "begonnen", "zaczynać"],
		["bieten", "geboten", "oferować"],
		["bitten", "gebeten", "prosić"],
		["bleiben", "geblieben", "zostawać"],
		["bringen", "gebracht", "przynosić"],
		["denken", "gedacht", "myśleć"],
		["dürfen", "gedurft", "mieć pozwolenie"],
		["empfehlen", "empfohlen", "polecać"],
		["essen", "gegessen", "jeść"],
		["fahren", "gefahren", "jechać"],
		["fangen", "gefangen", "łapać"],
		["finden", "gefunden", "znajdować"],
		["fliegen", "geflogen", "latać"],
		["fließen", "geflossen", "płynąć"],
		["frieren", "gefroren", "marznąć"],
		["geben", "gegeben", "dawać"],
		["gefallen", "gefallen", "podobać się"],
		["gehen", "gegangen", "iść"],
		["gelingen", "gelungen", "udać się"],
		["genießen", "genossen", "rozkoszować się"],
		["geschehen", "geschehen", "wydarzać się"],
		["gewinnen", "gewonnen", "wygrywać"],
		["greifen", "gegriffen", "sięgać"],
		["haben", "gehabt", "mieć"],
		["halten", "gehalten", "trzymać"],
		["heben", "gehoben", "podnosić"],
		["heißen", "geheißen", "nazywać się"],
		["helfen", "geholfen", "pomagać"],
	],
	[
		["kennen", "gekannt", "znać"],
		["kommen", "gekommen", "przychodzić"],
		["können", "gekonnt", "móc"],
		["laden", "geladen", "ładować"],
		["lassen", "gelassen", "pozwalać"],
		["laufen", "gelaufen", "biegać"],
		["leiden", "gelitten", "cierpieć"],
		["leihen", "geliehen", "pożyczać"],
		["liegen", "gelegen", "leżeć"],
		["lügen", "gelogen", "kłamać"],
		["messen", "gemessen", "mierzyć"],
		["mögen", "gemocht", "lubić"],
		["müssen", "gemusst", "musieć"],
		["nehmen", "genommen", "brać"],
		["nennen", "genannt", "nazywać"],
		["raten", "geraten", "radzić"],
		["reiben", "gerieben", "trzeć"],
		["reißen", "gerissen", "drzeć"],
		["reiten", "geritten", "jeździć konno"],
		["rennen", "gerannt", "pędzić"],
		["rufen", "gerufen", "wołać"],
		["schaffen", "geschaffen", "tworzyć"],
		["schlafen", "geschlafen", "spać"],
		["schneiden", "geschnitten", "ciąć"],
		["schreiben", "geschrieben", "pisać"],
		["schreien", "geschrien", "krzyczeć"],
		["schweigen", "geschwiegen", "milczeć"],
		["schwimmen", "geschwommen", "pływać"],
		["sehen", "gesehen", "patrzeć"],
		["sein", "gewesen", "być"],
	],
	[
		["singen", "gesungen", "śpiewać"],
		["sinken", "gesunken", "opadać"],
		["sitzen", "gesessen", "siedzieć"],
		["sollen", "gesollt", "mieć powinność"],
		["sprechen", "gesprochen", "mówić"],
		["springen", "gesprungen", "skakać"],
		["stehen", "gestanden", "stać"],
		["stehlen", "gestohlen", "kraść"],
		["steigen", "gestiegen", "podnosić się"],
		["sterben", "gestorben", "umierać"],
		["stoßen", "gestoßen", "popychać"],
		["streiten", "gestritten", "kłócić się"],
		["tragen", "getragen", "nosić"],
		["treffen", "getroffen", "spotykać"],
		["trinken", "getrunken", "pić"],
		["tun", "getan", "czynić"],
		["vergessen", "vergessen", "zapominać"],
		["verlieren", "verloren", "gubić"],
		["wachsen", "gewachsen", "rosnąć"],
		["waschen", "gewaschen", "myć"],
		["werden", "geworden", "zostać"],
		["werfen", "geworfen", "rzucać"],
		["wiegen", "gewogen", "ważyć"],
		["wissen", "gewusst", "wiedzieć"],
		["wollen", "gewollt", "chcieć"],
		["ziehen", "gezogen", "ciągnąć"],
		["zwingen", "gezwungen", "zmuszać"],
	],
];
