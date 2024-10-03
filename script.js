        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyCVtw5H7TtRzs4fUzs3JNZb3Lps8jnHjzg",
          authDomain: "honey-jar-cb103.firebaseapp.com",
          databaseURL: "https://honey-jar-cb103-default-rtdb.firebaseio.com",
          projectId: "honey-jar-cb103",
          storageBucket: "honey-jar-cb103.appspot.com",
          messagingSenderId: "226096927592",
          appId: "1:226096927592:web:edce57dbf11b98fdf3fcdd",
          measurementId: "G-L62Q1PZJF9"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
    
    
        import {getDatabase, set, get, update, remove, ref, child, push, onValue,}
        from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js"
    
        const db = getDatabase();
        const studyHoursRef = ref(db, 'studyHours');
    
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
        const maxHours = 70;
        document.getElementById("maxHours").innerText = maxHours;
        let currentHours = 0;  // Initially set to 0; will be updated from Firebase
    
        // Function to update the overlay div based on the hours in the jar
        function updateHoneyJar() {
            const overlay = document.getElementById('honeyOverlay');
            const honeyPercentage = (currentHours / maxHours) * 100;
            const honeyHeight = 100 - honeyPercentage;
            overlay.style.height = 100 - honeyPercentage + '%';
            document.getElementById('currentHours').innerText = currentHours;
        }
    
        // Function to set `currentHours` in Firebase
        function updateStudyHoursInDatabase(hours) {
            set(studyHoursRef, { hours });
        }
    
        // Listen for changes in the Firebase database and update `currentHours`
        onValue(studyHoursRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.hours !== undefined) {
                currentHours = data.hours;
                updateHoneyJar();  // Update UI whenever data changes
            } else {
                currentHours = 0;  // If no data in Firebase, default to 0
                updateHoneyJar();
            }
        });
    
        // Add hours to the jar
        document.getElementById('addHours').addEventListener('click', () => {
            const hoursToAdd = parseInt(document.getElementById('hoursInput').value);
            if (!isNaN(hoursToAdd) && hoursToAdd > 0) {
                currentHours = Math.min(currentHours + hoursToAdd, maxHours);
                updateHoneyJar();
                updateStudyHoursInDatabase(currentHours);  // Update Firebase
            }
        });
    
        // Remove hours from the jar
        document.getElementById('removeHours').addEventListener('click', () => {
            const hoursToRemove = parseInt(document.getElementById('hoursInput').value);
            if (!isNaN(hoursToRemove) && hoursToRemove > 0) {
                currentHours = Math.max(currentHours - hoursToRemove, 0);
                updateHoneyJar();
                updateStudyHoursInDatabase(currentHours);  // Update Firebase
            }
        });
    
        // Initial update of the jar
        updateHoneyJar();