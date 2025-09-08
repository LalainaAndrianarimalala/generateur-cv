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
                            <div class="flex justify-between items-start">
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
            
            const languages = (data.languages || '').split(';').filter(l => l.trim()).map(l => l.trim()).join('; ');
            const hobbies = (data.hobbies || '').split(';').filter(h => h.trim()).map(h => h.trim()).join('; ');
            
            const profilePicture = uploadedPhoto || 'https://placehold.co/120x120/1e3a8a/ffffff?text=Votre+Photo';

            cvContent.innerHTML = `
                <div class="left-column">
                    <div class="mb-6 text-center">
                        <img src="${profilePicture}" alt="Photo de profil" class="profile-picture mx-auto">
                        <h1 class="text-xl font-bold text-blue-900 mt-2">${data.name || 'Nom et Prénom'}</h1>
                        <p class="text-gray-500 text-sm">${data.title || 'Titre Professionnel'}</p>
                    </div>

                    <div class="cv-section mt-6">
                        <h2 class="text-sm font-bold text-gray-700">Coordonnées</h2>
                        <div class="contact-info mt-2 text-gray-600">
                            <p><span class="font-semibold">Téléphone:</span> ${data.phone || 'Non spécifié'}</p>
                            <p><span class="font-semibold">E-mail:</span> ${data.email || 'Non spécifié'}</p>
                            <p><span class="font-semibold">Adresse:</span> ${data.address || 'Non spécifié'}</p>
                        </div>
                    </div>

                    <div class="cv-section mt-6">
                        <h2 class="text-sm font-bold text-gray-700">Profil</h2>
                        <p class="mt-2 text-gray-600">${data.profile || 'Décrivez ici votre profil professionnel, vos compétences et vos objectifs de carrière.'}</p>
                    </div>

                    <div class="cv-section mt-6">
                        <h2 class="text-sm font-bold text-gray-700">Compétences</h2>
                        <ul class="list-disc list-inside mt-2 text-gray-600">
                            ${skillsHTML || '<li><span class="text-gray-400">Aucune compétence ajoutée.</span></li>'}
                        </ul>
                    </div>

                    <div class="cv-section mt-6">
                        <h2 class="text-sm font-bold text-gray-700">Informations complémentaires</h2>
                        <div class="mt-2 text-gray-600">
                            <p><span class="font-semibold">Langues:</span> ${languages || 'Non spécifié'}</p>
                            <p><span class="font-semibold">Loisirs:</span> ${hobbies || 'Non spécifié'}</p>
                        </div>
                    </div>
                </div>

                <div class="right-column">
                    <div class="cv-section">
                        <h2 class="text-sm font-bold text-gray-700">Expériences Professionnelles</h2>
                        ${experiencesHTML || '<p class="text-sm text-gray-500 mt-2">Aucune expérience ajoutée.</p>'}
                    </div>

                    <div class="cv-section mt-6">
                        <h2 class="text-sm font-bold text-gray-700">Formation</h2>
                        ${educationHTML || '<p class="text-sm text-gray-500 mt-2">Aucune formation ajoutée.</p>'}
                    </div>
                </div>
            `;
        }

        document.getElementById('add-experience').addEventListener('click', () => {
            const newItem = document.createElement('div');
            newItem.className = 'experience-item p-4 mb-4 border rounded-lg bg-gray-50';
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
            newItem.className = 'education-item p-4 mb-4 border rounded-lg bg-gray-50';
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
            newItem.className = 'skill-item p-4 mb-4 border rounded-lg bg-gray-50';
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