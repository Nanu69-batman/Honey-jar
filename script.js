        // Function to set the theme
        function setTheme(theme) {
            document.body.className = ''; // Clear existing classes
            document.body.classList.add(theme); // Add the selected theme class
        }

        // Event listeners for theme switcher buttons
        document.getElementById('babyPinkButton').addEventListener('click', () => {
            setTheme('baby-pink-theme'); // Switch to baby pink theme
        });
        
        document.getElementById('babyBlueButton').addEventListener('click', () => {
            setTheme('baby-blue-theme'); // Switch to baby blue theme
        });
        
        document.getElementById('lavenderButton').addEventListener('click', () => {
            setTheme('lavender-theme'); // Switch to lavender theme
        });


        // Initialize the honey jar capacity
        const maxHours = 40; // Set your maximum hours
        let currentHours = parseInt(localStorage.getItem('honeyJarHours')) || 0;

        // Function to update the overlay div based on the hours in the jar
        function updateHoneyJar() {
            const overlay = document.getElementById('honeyOverlay');
            const honeyPercentage = (currentHours / maxHours) * 100;
            const honeyHeight = 100 - honeyPercentage;
            overlay.style.height = honeyHeight + '%';
            document.getElementById('currentHours').innerText = currentHours;
            localStorage.setItem('honeyJarHours', currentHours);
        }

        // Add hours to the jar
        document.getElementById('addHours').addEventListener('click', () => {
            const hoursToAdd = parseInt(document.getElementById('hoursInput').value);
            if (!isNaN(hoursToAdd) && hoursToAdd > 0) {
                currentHours = Math.min(currentHours + hoursToAdd, maxHours);
                updateHoneyJar();
            }
        });

        // Remove hours from the jar
        document.getElementById('removeHours').addEventListener('click', () => {
            const hoursToRemove = parseInt(document.getElementById('hoursInput').value);
            if (!isNaN(hoursToRemove) && hoursToRemove > 0) {
                currentHours = Math.max(currentHours - hoursToRemove, 0);
                updateHoneyJar();
            }
        });

        // Initial update of the jar
        updateHoneyJar();