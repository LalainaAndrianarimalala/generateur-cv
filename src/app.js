const form = document.getElementById('cv-form');
        const cvContent = document.getElementById('cv-content');
        const photoInput = document.getElementById('photo');
        const experiencesContainer = document.getElementById('experiences-container');
        const educationContainer = document.getElementById('education-container');
        const skillsContainer = document.getElementById('skills-container');
        
        let uploadedPhoto = null;
        let experienceCount = 1;
        let educationCount = 1;
        let skillCount = 1;

        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    uploadedPhoto = event.target.result;
                    updateCV();
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Fonction pour formater le texte avec des sauts de ligne après chaque 3 phrases.
        function formatText(text) {
            if (!text) return '';
            const sentences = text.split(/[.?!]\s*/);
            let formattedText = '';
            for (let i = 0; i < sentences.length; i++) {
                formattedText += sentences[i].trim();
                if ((i + 1) % 3 === 0 && i < sentences.length - 1) {
                    formattedText += '.\n'; // Ajoute un point et un saut de ligne
                } else if (i < sentences.length - 1) {
                    formattedText += '. '; // Ajoute un point et un espace
                } else if (formattedText.slice(-1) !== '.') {
                    formattedText += '.'; // Assure que la dernière phrase se termine par un point
                }
            }
            return formattedText;
        }

        function updateCV() {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            let experiencesHTML = '';
            for (let i = 0; i < experienceCount; i++) {
                const title = formData.get(`exp-title-${i}`) || '';
                const company = formData.get(`exp-company-${i}`) || '';
                const dates = formData.get(`exp-dates-${i}`) || '';
                const responsibilities = (formData.get(`exp-responsibilities-${i}`) || '').split(';').filter(r => r.trim()).map(r => `<li>${r.trim()}</li>`).join('');
                if (title && company) {
                    experiencesHTML += `
                        <div class="cv-section-item mb-4">
                            <div class="flex flex-wrap justify-between items-start">
                                <h3 class="font-bold text-blue-800">${title}</h3>
                                <p class="text-sm text-gray-500">${dates}</p>
                            </div>
                            <p class="text-gray-600 italic">${company}</p>
                            <ul class="list-disc ml-4 mt-1 responsibility-list">${responsibilities}</ul>
                        </div>
                    `;
                }
            }

            let educationHTML = '';
            for (let i = 0; i < educationCount; i++) {
                const degree = formData.get(`edu-degree-${i}`) || '';
                const school = formData.get(`edu-school-${i}`) || '';
                const year = formData.get(`edu-year-${i}`) || '';
                if (degree && school) {
                    educationHTML += `
                        <div class="cv-section-item mb-4">
                            <h3 class="font-bold text-blue-800">${degree}</h3>
                            <p class="text-gray-600">${school}, ${year}</p>
                        </div>
                    `;
                }
            }

            const skillList = [];
            for (let i = 0; i < skillCount; i++) {
                const skill = formData.get(`skill-${i}`) || '';
                if (skill) {
                    skillList.push(skill);
                }
            }
            const skillsHTML = skillList.map(s => `<li>${s}</li>`).join('');
            
            const languages = (data.languages || '').split(';').filter(l => l.trim()).map(l => l.trim()).join(' ; ');
            const hobbies = (data.hobbies || '').split(';').filter(h => h.trim()).map(h => h.trim()).join(' ; ');
            
            const profilePicture = uploadedPhoto || 'https://placehold.co/120x120/1e3a8a/ffffff?text=Votre+Photo';
            
            const formattedProfile = formatText(data.profile);

            cvContent.innerHTML = `
                <div class="left-column flex flex-col items-center pt-8">
                    <img src="${profilePicture}" alt="Photo de profil" class="profile-picture mx-auto">
                    <h1 class="text-2xl font-bold text-slate-900 mt-4">${data.name || 'Nom et Prénom'}</h1>
                    <p class="text-slate-500 text-base font-light mb-8">${data.title || 'Titre Professionnel'}</p>

                    <div class="cv-section w-full text-left">
                        <h2 class="text-lg font-bold text-slate-700 border-b-2 border-sky-500 pb-2 mb-4">Coordonnées</h2>
                        <div class="contact-info text-slate-600">
                            <p class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.288 1.144a1 1 0 00-.472 1.258l.685.685a1 1 0 001.258-.472l1.144-2.288a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>${data.phone || 'Non spécifié'}</p>
                            <p class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V3" />
                            </svg>${data.email || 'Non spécifié'}</p>
                            <p class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>${data.address || 'Non spécifié'}</p>
                        </div>
                    </div>

                    <div class="cv-section w-full text-left">
                        <h2 class="text-lg font-bold text-slate-700 border-b-2 border-sky-500 pb-2 mb-4">Profil</h2>
                        <p class="text-slate-600 font-light whitespace-pre-wrap">${formattedProfile || 'Décrivez ici votre profil professionnel, vos compétences et vos objectifs de carrière.'}</p>
                    </div>

                    <div class="cv-section w-full text-left">
                        <h2 class="text-lg font-bold text-slate-700 border-b-2 border-sky-500 pb-2 mb-4">Compétences</h2>
                        <ul class="list-disc list-inside text-slate-600 font-light pl-4">
                            ${skillsHTML || '<li><span class="text-gray-400">Aucune compétence ajoutée.</span></li>'}
                        </ul>
                    </div>

                    <div class="cv-section w-full text-left">
                        <h2 class="text-lg font-bold text-slate-700 border-b-2 border-sky-500 pb-2 mb-4">Informations complémentaires</h2>
                        <div class="text-slate-600 font-light">
                            <p><span class="font-semibold">Langues:</span> ${languages || 'Non spécifié'}</p>
                            <p><span class="font-semibold">Loisirs:</span> ${hobbies || 'Non spécifié'}</p>
                        </div>
                    </div>
                </div>

                <div class="right-column pt-8">
                    <div class="cv-section">
                        <h2 class="text-lg font-bold text-slate-700 border-b-2 border-sky-500 pb-2 mb-4">Expériences Professionnelles</h2>
                        ${experiencesHTML || '<p class="text-sm text-gray-500 font-light">Aucune expérience ajoutée.</p>'}
                    </div>

                    <div class="cv-section">
                        <h2 class="text-lg font-bold text-slate-700 border-b-2 border-sky-500 pb-2 mb-4">Formation</h2>
                        ${educationHTML || '<p class="text-sm text-gray-500 font-light">Aucune formation ajoutée.</p>'}
                    </div>
                </div>
            `;
        }

        document.getElementById('add-experience').addEventListener('click', () => {
            const newItem = document.createElement('div');
            newItem.className = 'experience-item p-6 mb-6 rounded-xl bg-gray-50 border border-gray-200';
            newItem.innerHTML = `
                <label for="exp-title-${experienceCount}">Titre du poste</label>
                <input type="text" id="exp-title-${experienceCount}" name="exp-title-${experienceCount}" placeholder="Titre du poste">
                <label for="exp-company-${experienceCount}">Entreprise</label>
                <input type="text" id="exp-company-${experienceCount}" name="exp-company-${experienceCount}" placeholder="Entreprise">
                <label for="exp-dates-${experienceCount}">Dates</label>
                <input type="text" id="exp-dates-${experienceCount}" name="exp-dates-${experienceCount}" placeholder="Dates">
                <label for="exp-responsibilities-${experienceCount}">Responsabilités (séparées par des points-virgules)</label>
                <textarea id="exp-responsibilities-${experienceCount}" name="exp-responsibilities-${experienceCount}" rows="3" placeholder="Responsabilités"></textarea>
            `;
            experiencesContainer.appendChild(newItem);
            experienceCount++;
            updateCV();
        });

        document.getElementById('add-education').addEventListener('click', () => {
            const newItem = document.createElement('div');
            newItem.className = 'education-item p-6 mb-6 rounded-xl bg-gray-50 border border-gray-200';
            newItem.innerHTML = `
                <label for="edu-degree-${educationCount}">Diplôme</label>
                <input type="text" id="edu-degree-${educationCount}" name="edu-degree-${educationCount}" placeholder="Diplôme">
                <label for="edu-school-${educationCount}">Établissement</label>
                <input type="text" id="edu-school-${educationCount}" name="edu-school-${educationCount}" placeholder="Établissement">
                <label for="edu-year-${educationCount}">Année</label>
                <input type="text" id="edu-year-${educationCount}" name="edu-year-${educationCount}" placeholder="Année">
            `;
            educationContainer.appendChild(newItem);
            educationCount++;
            updateCV();
        });

        document.getElementById('add-skill').addEventListener('click', () => {
            const newItem = document.createElement('div');
            newItem.className = 'skill-item p-6 mb-6 rounded-xl bg-gray-50 border border-gray-200';
            newItem.innerHTML = `
                <label for="skill-${skillCount}">Compétence</label>
                <input type="text" id="skill-${skillCount}" name="skill-${skillCount}" placeholder="Compétence">
            `;
            skillsContainer.appendChild(newItem);
            skillCount++;
            updateCV();
        });
        
        form.addEventListener('input', updateCV);

        document.getElementById('download-button').addEventListener('click', () => {
            const element = document.getElementById('cv-content');
            const options = {
                filename: 'cv_rapide.pdf',
                margin: 0.5,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true
                },
                jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().set(options).from(element).save();
        });

        window.onload = updateCV;