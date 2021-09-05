const comboList = document.getElementById('comboList');
const searchBar = document.getElementById('searchBar');
let nateflixCombos = [];

/// add more filtering options later by Date

/// JSON should be in chronological order, and all new entries should be
/// appended to the top of the JSON list. Maintain a google sheet, sorted by date (after the headers)

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCombos = nateflixCombos.filter((combo) => {
        return (
            combo.NAME.toLowerCase().includes(searchString) ||
            combo.SKILLS.toLowerCase().includes(searchString)
        );
    });
    displayCombos(filteredCombos);
});

const loadCombos = async () => {
    try {
        const res = await fetch("https://raw.githubusercontent.com/natekg/nateflix_test/main/nateflix_json.json");
        nateflixCombos = await res.json();
        displayCombos(nateflixCombos);
    } catch (err) {
        console.error(err);
    }
};

const displayCombos = (characters) => {
    const htmlString = characters
        .map((singleCombo) => {
            return `
            <li class="character">
                <a href="${singleCombo.LINK}"> <h2>${singleCombo.NAME}</h2></a>
                <p>${singleCombo.DATE}</p>
                <p>${singleCombo.SKILLS}</p>
                <img>${singleCombo.IMAGE}</img>
            </li>
        `;
        })
        .join('');
    comboList.innerHTML = htmlString;
};

loadCombos();
