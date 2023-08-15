var popupContainer = document.createElement('div');
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '10px';
    popupContainer.style.right = '10px';
    popupContainer.style.background = '#f0f0f0';
    popupContainer.style.border = '1px solid #ccc';
    popupContainer.style.borderRadius = '8px';
    popupContainer.style.padding = '20px';
    popupContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
    popupContainer.style.zIndex = '9999';

    // Add input fields and dropdown
    popupContainer.innerHTML = `
        <label for="jobTitle">Job Title:</label><br>
        <input type="text" id="jobTitle" style="width: 100%; margin-bottom: 10px;"><br>
        <label for="skills">Skills:</label><br>
        <input type="text" id="skills" style="width: 100%; margin-bottom: 10px;"><br>
        <label for="location">Location:</label><br>
        <select id="location" style="width: 100%; margin-bottom: 20px;">
            <option value="Anywhere">Anywhere</option>
            <option value="Americas">Americas</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
        </select><br>
        <button id="findTalent" style="background-color: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Find Talent</button>
        <button id="closePopup" style="background-color: #ccc; color: #333; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-left: 10px;">Close</button>
    `;

    // Append the popup to the body
    document.body.appendChild(popupContainer);

    // Function to handle 'Find Talent' button click
    function findTalentClick() {
        var jobTitle = document.getElementById('jobTitle').value;
        var skills = document.getElementById('skills').value;
        var location = document.getElementById('location').value;

        // Remove unwanted words/characters from jobTitle and skills
        var unwantedWords = [" of ", " and ", "the", "senior ", "sr ", "sr. ", "&", ","];
        jobTitle = jobTitle.toLowerCase();
        skills = skills.toLowerCase();
        for (var word of unwantedWords) {
            jobTitle = jobTitle.replace(new RegExp(word, 'g'), ' ');
            skills = skills.replace(new RegExp(word, 'g'), ' ');
        }

        // Format jobTitle for Google search
        var formattedJobTitle = jobTitle.split(' ').map(part => 'intitle:' + part).join(' ') + ` | "${jobTitle}"`;

        // Construct search query
        var locationParam = '';
        if (location === 'Americas') {
            locationParam = '-inurl:uk.linkedin -inurl:de.linkedin -inurl:fr.linkedin';
        } else if (location === 'Europe') {
            locationParam = '(inurl:uk.linkedin | inurl:de.linkedin | inurl:fr.linkedin | inurl:it.linkedin | inurl:es.linkedin)';
        } else if (location === 'Oceania') {
            locationParam = '-"United States" -inurl:uk.linkedin';
        }
        
        var searchQuery = `https://www.google.com/search?q=${encodeURIComponent(formattedJobTitle)}+${encodeURIComponent(skills)}+${encodeURIComponent(locationParam)}+site%3Alinkedin.com%2Fin&num=100`;
        window.open(searchQuery, '_blank');
    }

    // Function to close the popup
    function closePopupClick() {
        document.body.removeChild(popupContainer);
    }

    // Attach click event listeners
    document.getElementById('findTalent').addEventListener('click', findTalentClick);
    document.getElementById('closePopup').addEventListener('click', closePopupClick);