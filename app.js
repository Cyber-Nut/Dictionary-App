const BASEURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const searchBtn = document.querySelector("#btn-search");
const audioBtn = document.querySelector(".audio");
const inputText = document.querySelector("#input");
const definitionText = document.querySelector("#definition-text");
const wordHead = document.querySelector("#word-heading");


searchBtn.addEventListener("click", async ()=>{
    if(inputText.value === ""){
        location.reload();
    }

    try{
        let URL = BASEURL + encodeURIComponent(inputText.value);
        wordHead.innerText = inputText.value;
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Word not found'); // Handle error if word is not found
        }
        console.log(response);
        let data = await response.json();
        console.log(data);

        let wordData = data[0];
        let meanings = wordData.meanings;
        let firstMeaning = meanings[0];
        let firstDefinition = firstMeaning.definitions[0].definition; //This retrieves the first definition from the definitions array.
        definitionText.textContent = firstDefinition;

        let phonetics = wordData.phonetics; // Get the phonetics array
        if (phonetics.length > 0 && phonetics[0].audio) { // Check if there's audio
            audioBtn.src = phonetics[0].audio; // Set the audio source for the button
            audioBtn.style.cursor = "pointer"; // Change cursor to pointer
            audioBtn.onclick = function () {
                let audio = new Audio(phonetics[0].audio); // Create a new Audio object
                audio.play(); // Play the audio
            };
        } else {
            audioBtn.style.display = "none"; // Hide audio button if no audio is available
        }

    }
    catch(e){
        definitionText.textContent = "No such word exist in the dictionary";
    }
})



