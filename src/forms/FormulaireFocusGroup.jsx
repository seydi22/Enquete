import React, { useState } from 'react';
import { createParticipative } from '../services/api';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

// Reusable Components (assuming they are defined in a shared file)
const FormSection = ({ title, number, children, intro }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md mb-8 ${intro ? 'bg-primary-light text-white' : ''}`}>
    {title && <h2 className="text-2xl font-bold text-text-primary mb-6 border-b pb-4 flex items-center">
      <span className="bg-primary text-white rounded-full w-9 h-9 inline-flex items-center justify-center mr-4 text-lg">{number}</span>
      {title}
    </h2>}
    <div className="space-y-6">{children}</div>
  </div>
);

const FieldWrapper = ({ label, children, required }) => (
  <div>
    <label className="block text-md font-medium text-text-secondary mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="block w-full px-4 py-2.5 text-text-primary bg-neutral-lightest border border-neutral-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition"
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className="block w-full px-4 py-2.5 text-text-primary bg-neutral-lightest border border-neutral-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition"
    rows="4"
  />
);

const RadioGroup = ({ name, value, onChange, options, legend }) => (
    <fieldset>
        <legend className="block text-md font-medium text-text-secondary mb-2">{legend}</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
            {options.map(option => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={onChange} className="h-5 w-5 text-primary focus:ring-primary-light border-gray-300"/>
                    <span className="text-text-primary">{option.label}</span>
                </label>
            ))}
        </div>
    </fieldset>
);

const FormulaireFocusGroup = () => {
    const [formData, setFormData] = useState({
        identification: { localite: '', dateSeance: '', compositionGroupe: '', listeParticipants: [{ nomPrenom: '', age: '', sexe: '', fonction: '', contact: '', parcelleDimension: '', titreFoncier: '' }] },
        pertinence: {
            problematiquesAgricoles: '',
            repondBesoinLocaux: '',
            repondBesoinLocauxCommentaire: '',
            implicationActeurs: '', // Added
            aspectsPertinents: '', // Added
            besoinsNonCouvert: '' // Added
        },
        efficacite: {
            activitesRealiseesDelaisPlans: '',
            activitesRealiseesCommentaire: '',
            qualiteFormationsAppuis: '',
            coordinationSatisfaisante: '', // Added
            coordinationCommentaire: '', // Added
            difficultesSolutions: Array(5).fill({ difficulte: '', solution: '' }),
            difficultesCommentaire: '' // Added
        },
        efficience: { // Added section
            ressourcesOptimales: '',
            ressourcesOptimalesCommentaire: '',
            gaspillagesRetardsDoublons: '',
            gaspillagesRetardsDoublonsCommentaire: '',
            mecanismesFavorables: '',
            mecanismesFreinage: ''
        },
        resultatsImpacts: { // Added section
            changementsProductionAgricole: '',
            revenusConditionsVieEvolue: '',
            revenusConditionsVieExemples: '',
            capacitesTechniquesRenforcees: '',
            capacitesTechniquesExemples: '',
            innovationsBonnesPratiques: { innovations: '', bonnesPratiques: '' },
            beneficeFemmesJeunes: { casFemmes: '', casJeunes: '' },
            effetsIndirectsInattendus: { positifsIndirects: '', negatifsIndirects: '', positifsInattendus: '', negatifsInattendus: '' }
        },
        durabilitePerspectives: { // Added section
            acquisMaintenusFinancement: '',
            acquisMaintenusCommentaire: '',
            acteursLocauxMoyensNecessaires: '',
            acteursLocauxMoyensNecessairesCommentaire: '',
            partenariatsAppuisNecessaires: '',
            recommandationsDurabilite: ''
        },
        gouvernanceParticipation: { // Added section
            gestionParticipativeTransparente: '',
            gestionParticipativeTransparenteCommentaire: '',
            structuresLocalesRoleActif: '',
            structuresLocalesRoleActifCommentaire: '',
            mecanismesCommunicationSuivi: '',
            mecanismesCommunicationSuiviCommentaire: ''
        },
        recommandationsParticipants: { // Added section
            suggestionsAmeliorerProjet: '',
            leconsExperienceCollective: ''
        },
        animateur: '',
        dateAnimateur: '',
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        
        let currentState = { ...formData };
        let ref = currentState;

        for (let i = 0; i < keys.length - 1; i++) {
            ref = ref[keys[i]];
        }
        ref[keys[keys.length - 1]] = value;
        setFormData(currentState);
    };

    const handleParticipantChange = (e, index) => {
        const { name, value } = e.target;
        const newParticipants = [...formData.identification.listeParticipants];
        newParticipants[index] = { ...newParticipants[index], [name]: value };
        setFormData(prev => ({ ...prev, identification: { ...prev.identification, listeParticipants: newParticipants }}));
    };

    const addParticipant = () => {
        setFormData(prev => ({ ...prev, identification: { ...prev.identification, listeParticipants: [...prev.identification.listeParticipants, { nomPrenom: '', age: '', sexe: '', fonction: '', contact: '', parcelleDimension: '', titreFoncier: '' }] }}));
    };

    const removeParticipant = (index) => {
        setFormData(prev => ({ ...prev, identification: { ...prev.identification, listeParticipants: prev.identification.listeParticipants.filter((_, i) => i !== index) }}));
    };

    const handleTableChange = (section, field, index, e) => {
        const { name, value } = e.target;
        const newTableData = [...formData[section][field]];
        newTableData[index] = { ...newTableData[index], [name]: value };
        setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: newTableData } }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('Envoi en cours...');
        try {
            await createParticipative(formData);
            setMessage('Données envoyées avec succès !');
        } catch (error) {
            setMessage(`Erreur: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-text-primary mb-2">Questionnaire d’enquête participative (Focus group)</h1>
            <p className="text-center text-text-secondary mb-10">Évaluation finale du projet d’agriculture de proximité de Nouakchott</p>

            <form onSubmit={handleSubmit} className="space-y-8">
                <FormSection number="1" title="Introduction" intro>
                    <p className="text-lg"><strong>Objectif :</strong> Recueillir les perceptions, opinions et propositions des acteurs impliqués pour évaluer les résultats, impacts et durabilité du projet.</p>
                    <p><strong>Méthode :</strong> Discussion participative guidée par un animateur, sur la base des questions ci-dessous.</p>
                </FormSection>

                <FormSection number="2" title="Identification du groupe">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FieldWrapper label="Localité" required><Input name="identification.localite" value={formData.identification.localite} onChange={handleChange} /></FieldWrapper>
                        <FieldWrapper label="Date de la séance" required><Input type="date" name="identification.dateSeance" value={formData.identification.dateSeance} onChange={handleChange} /></FieldWrapper>
                    </div>
                    <FieldWrapper label="Composition du groupe (femmes, jeunes, producteurs, etc.)"><Textarea name="identification.compositionGroupe" value={formData.identification.compositionGroupe} onChange={handleChange} /></FieldWrapper>
                    
                    <h3 className="text-xl font-semibold text-text-primary pt-4">Liste des Participants</h3>
                    {formData.identification.listeParticipants.map((participant, index) => (
                        <div key={index} className="space-y-4 p-4 border rounded-md relative">
                            <button type="button" onClick={() => removeParticipant(index)} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition"><TrashIcon className="h-4 w-4" /></button>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FieldWrapper label={`Nom et Prénom #${index + 1}`}><Input name="nomPrenom" value={participant.nomPrenom} onChange={e => handleParticipantChange(e, index)} /></FieldWrapper>
                                <FieldWrapper label="Âge"><Input type="number" name="age" value={participant.age} onChange={e => handleParticipantChange(e, index)} /></FieldWrapper>
                                <FieldWrapper label="Sexe"><Input name="sexe" value={participant.sexe} onChange={e => handleParticipantChange(e, index)} /></FieldWrapper>
                                <FieldWrapper label="Fonction"><Input name="fonction" value={participant.fonction} onChange={e => handleParticipantChange(e, index)} /></FieldWrapper>
                                <FieldWrapper label="Contact"><Input name="contact" value={participant.contact} onChange={e => handleParticipantChange(e, index)} /></FieldWrapper>
                                <FieldWrapper label="Dimension Parcelle"><Input name="parcelleDimension" value={participant.parcelleDimension} onChange={e => handleParticipantChange(e, index)} /></FieldWrapper>
                                <FieldWrapper label="Titre Foncier"><Input name="titreFoncier" value={participant.titreFoncier} onChange={e => handleParticipantChange(e, index)} /></FieldWrapper>
                            </div>
                        </div>
                    ))}
                     <button type="button" onClick={addParticipant} className="flex items-center space-x-2 text-primary hover:text-primary-dark font-medium transition"><PlusCircleIcon className="h-6 w-6" /><span>Ajouter un participant</span></button>
                </FormSection>

                <FormSection number="3" title="Pertinence du projet">
                    <FieldWrapper label="Quelles étaient les principales problématiques agricoles dans votre zone avant le projet ?"><Textarea name="pertinence.problematiquesAgricoles" value={formData.pertinence.problematiquesAgricoles} onChange={handleChange} /></FieldWrapper>
                    <RadioGroup legend="Le projet répond-il réellement aux besoins et priorités locales ?" name="pertinence.repondBesoinLocaux" value={formData.pertinence.repondBesoinLocaux} onChange={handleChange} options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}/>
                    <FieldWrapper label="Commentaires et justificatifs"><Textarea name="pertinence.repondBesoinLocauxCommentaire" value={formData.pertinence.repondBesoinLocauxCommentaire} onChange={handleChange} /></FieldWrapper>
                </FormSection>

                <FormSection number="4" title="Efficacité de la mise en œuvre">
                    <RadioGroup legend="Les activités prévues ont-elles été réalisées dans les délais et selon les plans ?" name="efficacite.activitesRealiseesDelaisPlans" value={formData.efficacite.activitesRealiseesDelaisPlans} onChange={handleChange} options={[{ value: 'ouiDelaisOuiPlans', label: 'Oui, respect des délais et plans' }, { value: 'nonDelaisNonPlans', label: 'Non, écarts constatés' }]}/>
                    <FieldWrapper label="Commentaires"><Textarea name="efficacite.activitesRealiseesCommentaire" value={formData.efficacite.activitesRealiseesCommentaire} onChange={handleChange} /></FieldWrapper>
                    <FieldWrapper label="Comment évaluez-vous la qualité des formations et appuis techniques reçus ?"><Textarea name="efficacite.qualiteFormationsAppuis" value={formData.efficacite.qualiteFormationsAppuis} onChange={handleChange} /></FieldWrapper>
                    
                    <RadioGroup legend="La coordination entre acteurs (bénéficiaires/personnels du projet/services techniques/communes, groupements) a-t-elle été satisfaisante ?" name="efficacite.coordinationSatisfaisante" value={formData.efficacite.coordinationSatisfaisante} onChange={handleChange} options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}/>
                    <FieldWrapper label="Commentaires sur la coordination"><Textarea name="efficacite.coordinationCommentaire" value={formData.efficacite.coordinationCommentaire} onChange={handleChange} /></FieldWrapper>

                    <h3 className="text-xl font-semibold text-text-primary pt-4">Difficultés rencontrées et solutions proposées (05 par ordre d’importance)</h3>
                    {formData.efficacite.difficultesSolutions.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 border rounded-md">
                            <FieldWrapper label={`${index + 1}. Difficulté`}><Input name="difficulte" value={item.difficulte} onChange={e => handleTableChange('efficacite', 'difficultesSolutions', index, e)} /></FieldWrapper>
                            <FieldWrapper label="Solutions"><Input name="solution" value={item.solution} onChange={e => handleTableChange('efficacite', 'difficultesSolutions', index, e)} /></FieldWrapper>
                        </div>
                    ))}
                    <FieldWrapper label="Commentaires généraux sur les difficultés et solutions"><Textarea name="efficacite.difficultesCommentaire" value={formData.efficacite.difficultesCommentaire} onChange={handleChange} /></FieldWrapper>
                </FormSection>

                <FormSection number="5" title="Efficience (gestion des ressources)">
                    <RadioGroup legend="Les ressources disponibles ont-elles été utilisées de manière optimale ?" name="efficience.ressourcesOptimales" value={formData.efficience.ressourcesOptimales} onChange={handleChange} options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}/>
                    <FieldWrapper label="Commentaires"><Textarea name="efficience.ressourcesOptimalesCommentaire" value={formData.efficience.ressourcesOptimalesCommentaire} onChange={handleChange} /></FieldWrapper>
                    
                    <RadioGroup legend="Y a-t-il eu des gaspillages, retards ou doublons dans les actions ?" name="efficience.gaspillagesRetardsDoublons" value={formData.efficience.gaspillagesRetardsDoublons} onChange={handleChange} options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}/>
                    <FieldWrapper label="Commentaires"><Textarea name="efficience.gaspillagesRetardsDoublonsCommentaire" value={formData.efficience.gaspillagesRetardsDoublonsCommentaire} onChange={handleChange} /></FieldWrapper>

                    <FieldWrapper label="Mécanismes favorables (Quels mécanismes ont favorisé une bonne gestion du projet ?)"><Textarea name="efficience.mecanismesFavorables" value={formData.efficience.mecanismesFavorables} onChange={handleChange} /></FieldWrapper>
                    <FieldWrapper label="Mécanismes de freinage (Quels mécanismes ont freiné une bonne gestion du projet ?)"><Textarea name="efficience.mecanismesFreinage" value={formData.efficience.mecanismesFreinage} onChange={handleChange} /></FieldWrapper>
                </FormSection>

                <FormSection number="6" title="Résultats et impacts observés">
                    <FieldWrapper label="Quels changements concrets avez-vous observés dans la production agricole locale ?">
                        <Textarea name="resultatsImpacts.changementsProductionAgricole" value={formData.resultatsImpacts.changementsProductionAgricole} onChange={handleChange} />
                    </FieldWrapper>

                    <RadioGroup legend="Les revenus ou conditions de vie des bénéficiaires ont-ils évolué ?" name="resultatsImpacts.revenusConditionsVieEvolue" value={formData.resultatsImpacts.revenusConditionsVieEvolue} onChange={handleChange} options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}/>
                    <FieldWrapper label="Exemples justifiants la réponse">
                        <Textarea name="resultatsImpacts.revenusConditionsVieExemples" value={formData.resultatsImpacts.revenusConditionsVieExemples} onChange={handleChange} />
                    </FieldWrapper>

                    <RadioGroup legend="Le projet a-t-il renforcé les capacités techniques des producteurs ?" name="resultatsImpacts.capacitesTechniquesRenforcees" value={formData.resultatsImpacts.capacitesTechniquesRenforcees} onChange={handleChange} options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}/>
                    <FieldWrapper label="Exemples justifiants la réponse">
                        <Textarea name="resultatsImpacts.capacitesTechniquesExemples" value={formData.resultatsImpacts.capacitesTechniquesExemples} onChange={handleChange} />
                    </FieldWrapper>

                    <FieldWrapper label="Innovations (Quelles innovations ont émergé grâce au projet ?)">
                        <Textarea name="resultatsImpacts.innovationsBonnesPratiques.innovations" value={formData.resultatsImpacts.innovationsBonnesPratiques.innovations} onChange={handleChange} />
                    </FieldWrapper>
                    <FieldWrapper label="Bonnes pratiques (Quelles bonnes pratiques ont émergé grâce au projet ?)">
                        <Textarea name="resultatsImpacts.innovationsBonnesPratiques.bonnesPratiques" value={formData.resultatsImpacts.innovationsBonnesPratiques.bonnesPratiques} onChange={handleChange} />
                    </FieldWrapper>

                    <FieldWrapper label="Cas des femmes (Comment les femmes ont-elles bénéficié du projet ?)">
                        <Textarea name="resultatsImpacts.beneficeFemmesJeunes.casFemmes" value={formData.resultatsImpacts.beneficeFemmesJeunes.casFemmes} onChange={handleChange} />
                    </FieldWrapper>
                    <FieldWrapper label="Cas des jeunes (Comment les jeunes ont-ils bénéficié du projet ?)">
                        <Textarea name="resultatsImpacts.beneficeFemmesJeunes.casJeunes" value={formData.resultatsImpacts.beneficeFemmesJeunes.casJeunes} onChange={handleChange} />
                    </FieldWrapper>

                    <FieldWrapper label="Effets positifs indirects (Y a-t-il eu des effets indirects positifs ou inattendus ?)">
                        <Textarea name="resultatsImpacts.effetsIndirectsInattendus.positifsIndirects" value={formData.resultatsImpacts.effetsIndirectsInattendus.positifsIndirects} onChange={handleChange} />
                    </FieldWrapper>
                    <FieldWrapper label="Effets négatifs indirects (Y a-t-il eu des effets indirects négatifs ou inattendus ?)">
                        <Textarea name="resultatsImpacts.effetsIndirectsInattendus.negatifsIndirects" value={formData.resultatsImpacts.effetsIndirectsInattendus.negatifsIndirects} onChange={handleChange} />
                    </FieldWrapper>
                    <FieldWrapper label="Effets positifs inattendus">
                        <Textarea name="resultatsImpacts.effetsIndirectsInattendus.positifsInattendus" value={formData.resultatsImpacts.effetsIndirectsInattendus.positifsInattendus} onChange={handleChange} />
                    </FieldWrapper>
                    <FieldWrapper label="Effets négatifs inattendus">
                        <Textarea name="resultatsImpacts.effetsIndirectsInattendus.negatifsInattendus" value={formData.resultatsImpacts.effetsIndirectsInattendus.negatifsInattendus} onChange={handleChange} />
                    </FieldWrapper>
                </FormSection>

                <FormSection number="7" title="Durabilité et perspectives">
                    <RadioGroup legend="Les acquis du projet peuvent-ils être maintenus après la fin du financement ?" name="durabilitePerspectives.acquisMaintenusFinancement" value={formData.durabilitePerspectives.acquisMaintenusFinancement} onChange={handleChange} options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}/>
                    <FieldWrapper label="Commentaires"><Textarea name="durabilitePerspectives.acquisMaintenusCommentaire" value={formData.durabilitePerspectives.acquisMaintenusCommentaire} onChange={handleChange} /></FieldWrapper>
                    
                    <RadioGroup legend="Les acteurs locaux disposent-ils des moyens nécessaires pour poursuivre les activités ?" name="durabilitePerspectives.acteursLocauxMoyensNecessaires" value={formData.durabilitePerspectives.acteursLocauxMoyensNecessaires} onChange={handleChange} options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}/>
                    <FieldWrapper label="Commentaires"><Textarea name="durabilitePerspectives.acteursLocauxMoyensNecessairesCommentaire" value={formData.durabilitePerspectives.acteursLocauxMoyensNecessairesCommentaire} onChange={handleChange} /></FieldWrapper>

                    <FieldWrapper label="Quels partenariats ou appuis seraient nécessaires pour consolider les résultats ?">
                        <Textarea name="durabilitePerspectives.partenariatsAppuisNecessaires" value={formData.durabilitePerspectives.partenariatsAppuisNecessaires} onChange={handleChange} />
                    </FieldWrapper>

                    <FieldWrapper label="Quelles recommandations pour améliorer la durabilité des interventions ?">
                        <Textarea name="durabilitePerspectives.recommandationsDurabilite" value={formData.durabilitePerspectives.recommandationsDurabilite} onChange={handleChange} />
                    </FieldWrapper>
                </FormSection>

                <FormSection number="8" title="Gouvernance et participation">
                    <RadioGroup legend="Le mode de gestion du projet était-il participatif et transparent ?" name="gouvernanceParticipation.gestionParticipativeTransparente" value={formData.gouvernanceParticipation.gestionParticipativeTransparente} onChange={handleChange} options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}/>
                    <FieldWrapper label="Commentaires"><Textarea name="gouvernanceParticipation.gestionParticipativeTransparenteCommentaire" value={formData.gouvernanceParticipation.gestionParticipativeTransparenteCommentaire} onChange={handleChange} /></FieldWrapper>

                    <RadioGroup legend="Les structures locales (comités, coopératives, communes) ont-elles joué un rôle actif ?" name="gouvernanceParticipation.structuresLocalesRoleActif" value={formData.gouvernanceParticipation.structuresLocalesRoleActif} onChange={handleChange} options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}/>
                    <FieldWrapper label="Commentaires"><Textarea name="gouvernanceParticipation.structuresLocalesRoleActifCommentaire" value={formData.gouvernanceParticipation.structuresLocalesRoleActifCommentaire} onChange={handleChange} /></FieldWrapper>

                    <RadioGroup legend="Les mécanismes de communication et de suivi ont-ils permis une bonne circulation de l’information ?" name="gouvernanceParticipation.mecanismesCommunicationSuivi" value={formData.gouvernanceParticipation.mecanismesCommunicationSuivi} onChange={handleChange} options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}/>
                    <FieldWrapper label="Commentaires"><Textarea name="gouvernanceParticipation.mecanismesCommunicationSuiviCommentaire" value={formData.gouvernanceParticipation.mecanismesCommunicationSuiviCommentaire} onChange={handleChange} /></FieldWrapper>
                </FormSection>

                <FormSection number="9" title="Recommandations des participants">
                    <FieldWrapper label="Quelles sont vos principales suggestions pour améliorer ce type de projet à l’avenir ?">
                        <Textarea name="recommandationsParticipants.suggestionsAmeliorerProjet" value={formData.recommandationsParticipants.suggestionsAmeliorerProjet} onChange={handleChange} />
                    </FieldWrapper>
                    <FieldWrapper label="Quelles leçons tirez-vous de cette expérience collective ?">
                        <Textarea name="recommandationsParticipants.leconsExperienceCollective" value={formData.recommandationsParticipants.leconsExperienceCollective} onChange={handleChange} />
                    </FieldWrapper>
                </FormSection>

                <div className="flex justify-between items-center pt-8">
                    <div>
                        <FieldWrapper label="Fait par l'animateur"><Input name="animateur" value={formData.animateur} onChange={handleChange} /></FieldWrapper>
                    </div>
                     <div>
                        <FieldWrapper label="Date"><Input type="date" name="dateAnimateur" value={formData.dateAnimateur} onChange={handleChange} /></FieldWrapper>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-10 py-3.5 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300">
                        {isSubmitting ? 'Envoi en cours...' : 'Envoyer l’Enquête'}
                    </button>
                </div>
                {message && <p className={`mt-4 text-center p-3 rounded-lg ${message.includes('Erreur') ? 'bg-red-100 text-error' : 'bg-green-100 text-success'}`}>{message}</p>}
            </form>
        </div>
    );
};

export default FormulaireFocusGroup;
