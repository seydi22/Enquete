import React, { useState } from 'react';
import { createComparatif } from '../services/api';

// --- Reusable SVG Icons (to avoid external dependencies) ---
const PlusCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrashIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);


// --- Modern Reusable Form Components ---
const FormSection = ({ title, number, children }) => (
  <div className="border-t border-neutral-dark/80 pt-8 mt-10 first:mt-0 first:pt-0 first:border-t-0">
    <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
      <span className="bg-primary/10 text-primary rounded-full w-9 h-9 inline-flex items-center justify-center mr-4 font-semibold text-lg">{number}</span>
      {title}
    </h2>
    <div className="space-y-6">{children}</div>
  </div>
);

const FieldWrapper = ({ label, children, required }) => (
  <div>
    <label className="block text-md font-medium text-text-secondary mb-2">
      {label} {required && <span className="text-error">*</span>}
    </label>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="block w-full px-4 py-2.5 text-text-primary bg-white border border-neutral-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition"
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className="block w-full px-4 py-2.5 text-text-primary bg-white border border-neutral-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition"
    rows="4"
  />
);

const RadioGroup = ({ name, value, onChange, options, legend }) => (
    <fieldset>
        <legend className="block text-md font-medium text-text-secondary mb-3">{legend}</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
            {options.map(option => (
                <label key={option.value} className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                        className="h-5 w-5 text-primary focus:ring-primary/60 border-neutral-dark"
                    />
                    <span className="text-text-primary">{option.label}</span>
                </label>
            ))}
        </div>
    </fieldset>
);

const Table = ({ headers, children }) => (
    <div className="overflow-x-auto rounded-lg border border-neutral-dark/80">
        <table className="min-w-full divide-y divide-neutral-dark/80">
            <thead className="bg-neutral-light/60">
                <tr>
                    {headers.map(header => (
                        <th key={header} scope="col" className="px-6 py-4 text-left text-sm font-bold text-text-primary tracking-wider uppercase">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-light bg-white">
                {children}
            </tbody>
        </table>
    </div>
);


const FormulaireComparatif = () => {
    // ... (State and handlers remain the same)
    const [formData, setFormData] = useState({
        identification: { typeRepondant: '', groupementNom: '', groupementType: '', groupementAutrePrecision: '', individuelNom: '', individuelSexe: '', individuelAge: '', individuelGroupement: '', individuelStatut: '', individuelStatutAutrePrecision: '', parcelleStatut: '', parcelleStatutAutrePrecision: '', fgNombreFemmes: '', fgNombreHommes: '', fgJeunes: '', superficieExploitee: '', fertilisant: '', speculationPrincipale: '' },
        speculationsCultivees: Array(8).fill({ speculation: '', avantProjet: '', apresProjet: '', changementObserve: '' }),
        speculationsCommentaires: '',
        fertilisationPratiques: [
            { type: 'Utilisation d’engrais chimiques', avantProjet: '', apresProjet: '', changementsObserves: '' },
            { type: 'Utilisation de fumier ou compost', avantProjet: '', apresProjet: '', changementsObserves: '' },
            { type: 'Rotation / association de cultures', avantProjet: '', apresProjet: '', changementsObserves: '' },
            { type: 'Utilisation de semences améliorées / paysanes', avantProjet: '', apresProjet: '', changementsObserves: '' },
        ],
        irrigationGestionEau: [
            { aspect: 'Source d’eau', avantProjet: '', apresProjet: '', evolutionPercue: '' },
            { aspect: 'Type d’irrigation', avantProjet: '', apresProjet: '', evolutionPercue: '' },
            { aspect: 'Coût de l’irrigation', avantProjet: '', apresProjet: '', evolutionPercue: '' },
            { aspect: 'Niveau de maîtrise de l’eau', avantProjet: '', apresProjet: '', evolutionPercue: '' },
        ],
        rendementProduction: [{ culturePrincipale: '', rendementAvant: '', rendementApres: '', variation: '', facteursAmelioration: '' }],
        pratiquesAgroecologiques: [
            { pratique: 'Compostage / engrais organiques', avantProjet: '', introduiteRenforcee: '', impactObserve: '' },
            { pratique: 'Lutte biologique / naturelle contre les ravageurs', avantProjet: '', introduiteRenforcee: '', impactObserve: '' },
            { pratique: 'Paillage, couverture végétale', avantProjet: '', introduiteRenforcee: '', impactObserve: '' },
            { pratique: 'Rotation ou association culturale', avantProjet: '', introduiteRenforcee: '', impactObserve: '' },
            { pratique: 'Plantation de fruitiers / haies vives', avantProjet: '', introduiteRenforcee: '', impactObserve: '' },
            { pratique: 'Réduction de l’usage des produits chimiques', avantProjet: '', introduiteRenforcee: '', impactObserve: '' },
            { pratique: 'Autre (à préciser)', avantProjet: '', introduiteRenforcee: '', impactObserve: '' },
        ],
        impactGlobal: { ameliorationsPratiquesAgricoles: '', formationsBeneficie: '', formationsTheme: '', appreciationEncadrementTechnique: '',             contributionProductiviteRentabilite: '',
            contributionCommercialisationProduction: '', // New field for commercialization
            durabiliteChangementsIntroduits: '', difficultesPersistantes: '', recommandationsAgricultureDurable: '' },
        syntheseObservations: { observationsGenerales: '', appreciationGlobaleEvolution: '', signatures: '' },
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        
        if (keys.length > 1) {
            const [section, field] = keys;
            setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value }}));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleTableChange = (sectionName, index, e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newTableData = [...prev[sectionName]];
            newTableData[index] = { ...newTableData[index], [name]: value };
            return { ...prev, [sectionName]: newTableData };
        });
    };

    const addTableRow = (sectionName, newRowObject) => {
        setFormData(prev => ({ ...prev, [sectionName]: [...prev[sectionName], newRowObject]}));
    };

    const removeTableRow = (sectionName, index) => {
        setFormData(prev => ({ ...prev, [sectionName]: prev[sectionName].filter((_, i) => i !== index)}));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('Envoi en cours...');
        try {
            await createComparatif(formData);
            setMessage('Données envoyées avec succès !');
        } catch (error) {
            setMessage(`Erreur: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    // The form now seamlessly integrates into the parent card from Saisie.jsx
    <div>
        <div className="text-center">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Questionnaire Comparatif</h1>
            <p className="text-text-secondary mb-10">Évaluation finale du projet d’agriculture de proximité (Nouakchott)</p>
        </div>

        <form onSubmit={handleSubmit}>
            <FormSection number="1" title="Identification du répondant">
                <RadioGroup legend="Type de répondant" name="identification.typeRepondant" value={formData.identification.typeRepondant} onChange={handleChange} options={[{ value: 'groupement', label: 'Groupement' }, { value: 'individuel', label: 'Individuel' }, { value: 'fg', label: 'Focus Group (FG)' }]}/>

                <div className="mt-6 space-y-6">
                    {/* --- Champs pour GROUPEMENT --- */}
                    {formData.identification.typeRepondant === 'groupement' && (
                        <div className="p-6 border border-neutral-dark/60 rounded-lg bg-neutral-light/30 space-y-6">
                            <h3 className="font-semibold text-lg text-text-primary">Détails du groupement</h3>
                            <FieldWrapper label="Nom du groupement">
                                <Input name="identification.groupementNom" value={formData.identification.groupementNom} onChange={handleChange} />
                            </FieldWrapper>
                            <RadioGroup
                                legend="Type"
                                name="identification.groupementType"
                                value={formData.identification.groupementType}
                                onChange={handleChange}
                                options={[{ value: 'cooperative', label: 'Coopérative' }, { value: 'gie', label: 'GIE' }, { value: 'autre', label: 'Autre' }]}
                            />
                            {formData.identification.groupementType === 'autre' && (
                                <FieldWrapper label="Précisez le type">
                                    <Input name="identification.groupementAutrePrecision" value={formData.identification.groupementAutrePrecision} onChange={handleChange} placeholder="Autre type de groupement" />
                                </FieldWrapper>
                            )}
                        </div>
                    )}

                    {/* --- Champs pour INDIVIDUEL --- */}
                    {formData.identification.typeRepondant === 'individuel' && (
                        <div className="p-6 border border-neutral-dark/60 rounded-lg bg-neutral-light/30 space-y-6">
                            <h3 className="font-semibold text-lg text-text-primary">Détails de l'individuel</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FieldWrapper label="Nom">
                                    <Input name="identification.individuelNom" value={formData.identification.individuelNom} onChange={handleChange} />
                                </FieldWrapper>
                                <FieldWrapper label="Âge">
                                    <Input type="number" name="identification.individuelAge" value={formData.identification.individuelAge} onChange={handleChange} />
                                </FieldWrapper>
                                <RadioGroup
                                    legend="Sexe"
                                    name="identification.individuelSexe"
                                    value={formData.identification.individuelSexe}
                                    onChange={handleChange}
                                    options={[{ value: 'homme', label: 'Homme' }, { value: 'femme', label: 'Femme' }]}
                                />
                            </div>
                            <div className="pt-4 border-t border-neutral-dark/40">
                                <h4 className="font-medium text-md text-text-secondary mb-3">Parcelle</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FieldWrapper label="Surface (m²)">
                                        <Input type="number" name="identification.superficieExploitee" value={formData.identification.superficieExploitee} onChange={handleChange} />
                                    </FieldWrapper>
                                    <div>
                                        <RadioGroup
                                            legend="Statut de la parcelle"
                                            name="identification.parcelleStatut"
                                            value={formData.identification.parcelleStatut}
                                            onChange={handleChange}
                                            options={[{ value: 'pour_moi', label: 'Pour moi' }, { value: 'location', label: 'Location' }, { value: 'pret', label: 'Prêt' }, { value: 'autre', label: 'Autre' }]}
                                        />
                                        {formData.identification.parcelleStatut === 'autre' && (
                                            <FieldWrapper label="Précisez le statut">
                                                <Input name="identification.parcelleStatutAutrePrecision" value={formData.identification.parcelleStatutAutrePrecision} onChange={handleChange} placeholder="Autre statut" className="mt-2"/>
                                            </FieldWrapper>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* --- Champs pour FOCUS GROUP --- */}
                    {formData.identification.typeRepondant === 'fg' && (
                         <div className="p-6 border border-neutral-dark/60 rounded-lg bg-neutral-light/30 space-y-6">
                            <h3 className="font-semibold text-lg text-text-primary">Détails du Focus Group</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FieldWrapper label="Nombre de femmes">
                                    <Input type="number" name="identification.fgNombreFemmes" value={formData.identification.fgNombreFemmes} onChange={handleChange} />
                                </FieldWrapper>
                                <FieldWrapper label="Nombre d'hommes">
                                    <Input type="number" name="identification.fgNombreHommes" value={formData.identification.fgNombreHommes} onChange={handleChange} />
                                </FieldWrapper>
                                <FieldWrapper label="Nombre de jeunes (< 35 ans)">
                                    <Input type="number" name="identification.fgJeunes" value={formData.identification.fgJeunes} onChange={handleChange} />
                                </FieldWrapper>
                            </div>
                        </div>
                    )}

                    {/* --- Champ STATUT (commun à Groupement et Individuel) --- */}
                    {(formData.identification.typeRepondant === 'groupement' || formData.identification.typeRepondant === 'individuel') && (
                        <div className="pt-6 border-t border-neutral-dark/20">
                            <RadioGroup
                                legend="Statut du répondant"
                                name="identification.individuelStatut"
                                value={formData.identification.individuelStatut}
                                onChange={handleChange}
                                options={[{ value: 'producteur', label: 'Producteur' }, { value: 'encadreur', label: 'Encadreur' }, { value: 'responsable_groupement', label: 'Responsable de groupement' }, { value: 'autre', label: 'Autre' }]}
                            />
                            {formData.identification.individuelStatut === 'autre' && (
                                <FieldWrapper label="Précisez le statut">
                                    <Input name="identification.individuelStatutAutrePrecision" value={formData.identification.individuelStatutAutrePrecision} onChange={handleChange} placeholder="Autre statut" className="mt-2" />
                                </FieldWrapper>
                            )}
                        </div>
                    )}
                </div>
            </FormSection>

            <FormSection number="2" title="Spéculations cultivées">
                <p className="text-text-secondary -mt-4 mb-6">Listez les 8 spéculations prioritaires.</p>
                <Table headers={['Spéculation', 'Avant le projet', 'Après le projet', 'Changement observé']}>
                    {formData.speculationsCultivees.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap"><Input name="speculation" value={row.speculation} onChange={e => handleTableChange('speculationsCultivees', index, e)} /></td>
                            <td className="px-6 py-4 whitespace-nowrap"><Input name="avantProjet" value={row.avantProjet} onChange={e => handleTableChange('speculationsCultivees', index, e)} /></td>
                            <td className="px-6 py-4 whitespace-nowrap"><Input name="apresProjet" value={row.apresProjet} onChange={e => handleTableChange('speculationsCultivees', index, e)} /></td>
                            <td className="px-6 py-4 whitespace-nowrap"><Input name="changementObserve" value={row.changementObserve} onChange={e => handleTableChange('speculationsCultivees', index, e)} /></td>
                        </tr>
                    ))}
                </Table>
                <FieldWrapper label="Commentaires / observations"><Textarea name="speculationsCommentaires" value={formData.speculationsCommentaires} onChange={handleChange} /></FieldWrapper>
            </FormSection>

            <FormSection number="3" title="Fertilisation et pratiques culturales">
                 <Table headers={['Type de fertilisation / pratique', 'Avant le projet', 'Après le projet', 'Changements observés']}>
                    {formData.fertilisationPratiques.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 text-sm text-text-secondary">{row.type}</td>
                            <td className="px-6 py-4"><Input name="avantProjet" value={row.avantProjet} onChange={e => handleTableChange('fertilisationPratiques', index, e)} /></td>
                            <td className="px-6 py-4"><Input name="apresProjet" value={row.apresProjet} onChange={e => handleTableChange('fertilisationPratiques', index, e)} /></td>
                            <td className="px-6 py-4"><Input name="changementsObserves" value={row.changementsObserves} onChange={e => handleTableChange('fertilisationPratiques', index, e)} /></td>
                        </tr>
                    ))}
                </Table>
            </FormSection>

            <FormSection number="4" title="Irrigation et gestion de l’eau">
                <Table headers={['Aspect', 'Avant le projet', 'Après le projet', 'Évolution perçue']}>
                    {formData.irrigationGestionEau.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 text-sm text-text-secondary">{row.aspect}</td>
                            <td className="px-6 py-4"><Input name="avantProjet" value={row.avantProjet} onChange={e => handleTableChange('irrigationGestionEau', index, e)} /></td>
                            <td className="px-6 py-4"><Input name="apresProjet" value={row.apresProjet} onChange={e => handleTableChange('irrigationGestionEau', index, e)} /></td>
                            <td className="px-6 py-4"><Input name="evolutionPercue" value={row.evolutionPercue} onChange={e => handleTableChange('irrigationGestionEau', index, e)} /></td>
                        </tr>
                    ))}
                </Table>
            </FormSection>

            <FormSection number="5" title="Rendement et production">
                <div className="space-y-4">
                    {formData.rendementProduction.map((item, index) => (
                        <div key={index} className="space-y-4 p-5 border border-neutral-dark/80 rounded-lg relative bg-white">
                             {formData.rendementProduction.length > 1 && (
                                <button type="button" onClick={() => removeTableRow('rendementProduction', index)} className="absolute -top-3 -right-3 bg-error text-white rounded-full p-1.5 hover:bg-red-600 transition shadow-md"><TrashIcon className="h-4 w-4" /></button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                                <FieldWrapper label="Culture principale"><Input name="culturePrincipale" value={item.culturePrincipale} onChange={e => handleTableChange('rendementProduction', index, e)} required /></FieldWrapper>
                                <FieldWrapper label="Rdt. avant (kg/m2)"><Input type="number" name="rendementAvant" value={item.rendementAvant} onChange={e => handleTableChange('rendementProduction', index, e)} required /></FieldWrapper>
                                <FieldWrapper label="Rdt. après (kg/m2)"><Input type="number" name="rendementApres" value={item.rendementApres} onChange={e => handleTableChange('rendementProduction', index, e)} required /></FieldWrapper>
                                <FieldWrapper label="Variation (%)"><Input name="variation" value={item.variation} onChange={e => handleTableChange('rendementProduction', index, e)} required /></FieldWrapper>
                                <FieldWrapper label="Facteurs d’amélioration"><Input name="facteursAmelioration" value={item.facteursAmelioration} onChange={e => handleTableChange('rendementProduction', index, e)} required /></FieldWrapper>
                            </div>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={() => addTableRow('rendementProduction', { culturePrincipale: '', rendementAvant: '', rendementApres: '', variation: '', facteursAmelioration: '' })} className="flex items-center space-x-2 text-primary hover:text-primary-dark font-medium transition mt-4">
                    <PlusCircleIcon className="h-6 w-6" /><span>Ajouter une ligne de culture</span>
                </button>
            </FormSection>
            
            <FormSection number="6" title="Introduction de pratiques agroécologiques">
                <Table headers={['Pratique agroécologique', 'Avant projet', 'Introduite / renforcée', 'Impact observé']}>
                    {formData.pratiquesAgroecologiques.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 text-sm text-text-secondary">{row.pratique}</td>
                            <td className="px-6 py-4"><Input name="avantProjet" value={row.avantProjet} onChange={e => handleTableChange('pratiquesAgroecologiques', index, e)} /></td>
                            <td className="px-6 py-4"><Input name="introduiteRenforcee" value={row.introduiteRenforcee} onChange={e => handleTableChange('pratiquesAgroecologiques', index, e)} /></td>
                            <td className="px-6 py-4"><Input name="impactObserve" value={row.impactObserve} onChange={e => handleTableChange('pratiquesAgroecologiques', index, e)} /></td>
                        </tr>
                    ))}
                </Table>
            </FormSection>
            
            <FormSection number="7" title="Impact global du projet">
                <FieldWrapper label="Quelles améliorations concrètes avez-vous observées sur vos pratiques agricoles ?"><Textarea name="impactGlobal.ameliorationsPratiquesAgricoles" value={formData.impactGlobal.ameliorationsPratiquesAgricoles} onChange={handleChange} /></FieldWrapper>
                
                <div>
                    <RadioGroup
                        legend="Avez-vous bénéficié de formations ?"
                        name="impactGlobal.formationsBeneficie"
                        value={formData.impactGlobal.formationsBeneficie}
                        onChange={handleChange}
                        options={[{ value: 'oui', label: 'Oui' }, { value: 'non', label: 'Non' }]}
                    />
                    {formData.impactGlobal.formationsBeneficie === 'oui' && (
                        <FieldWrapper label="Thématiques">
                            <Input
                                name="impactGlobal.formationsTheme"
                                value={formData.impactGlobal.formationsTheme}
                                onChange={handleChange}
                                placeholder="Précisez les thèmes"
                                className="mt-2"
                            />
                        </FieldWrapper>
                    )}
                </div>

                <FieldWrapper label="Comment appréciez-vous l’encadrement technique ?"><Textarea name="impactGlobal.appreciationEncadrementTechnique" value={formData.impactGlobal.appreciationEncadrementTechnique} onChange={handleChange} /></FieldWrapper>
                
                <FieldWrapper label="Le projet a-t-il contribué à une meilleure productivité et rentabilité ?"><Textarea name="impactGlobal.contributionProductiviteRentabilite" value={formData.impactGlobal.contributionProductiviteRentabilite} onChange={handleChange} /></FieldWrapper>
                <FieldWrapper label="Le projet a-t-il contribué à une meilleure commercialisation de votre production ?"><Textarea name="impactGlobal.contributionCommercialisationProduction" value={formData.impactGlobal.contributionCommercialisationProduction} onChange={handleChange} /></FieldWrapper>
                <FieldWrapper label="Comment évaluez-vous la durabilité des changements introduits ?"><Textarea name="impactGlobal.durabiliteChangementsIntroduits" value={formData.impactGlobal.durabiliteChangementsIntroduits} onChange={handleChange} /></FieldWrapper>
                <FieldWrapper label="Quelles sont les principales difficultés persistantes ?"><Textarea name="impactGlobal.difficultesPersistantes" value={formData.impactGlobal.difficultesPersistantes} onChange={handleChange} /></FieldWrapper>
                <FieldWrapper label="Quelles recommandations feriez-vous pour renforcer l’agriculture durable ?"><Textarea name="impactGlobal.recommandationsAgricultureDurable" value={formData.impactGlobal.recommandationsAgricultureDurable} onChange={handleChange} /></FieldWrapper>
            </FormSection>
            
            <FormSection number="8" title="Synthèse et observations de l’évaluateur">
                <FieldWrapper label="Observations générales"><Textarea name="syntheseObservations.observationsGenerales" value={formData.syntheseObservations.observationsGenerales} onChange={handleChange} /></FieldWrapper>
                <FieldWrapper label="Appréciation globale de l’évolution (avant / après)"><Textarea name="syntheseObservations.appreciationGlobaleEvolution" value={formData.syntheseObservations.appreciationGlobaleEvolution} onChange={handleChange} /></FieldWrapper>
                <FieldWrapper label="Signatures (évaluateateur / représentant du groupement)"><Textarea name="syntheseObservations.signatures" value={formData.syntheseObservations.signatures} onChange={handleChange} /></FieldWrapper>
            </FormSection>

            <div className="flex justify-end pt-8">
                <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-10 py-4 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/60 disabled:bg-neutral-dark disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-primary/40">
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le Questionnaire'}
                </button>
            </div>
            {message && <p className={`mt-4 text-center p-3 rounded-lg ${message.includes('Erreur') ? 'bg-red-100 text-error' : 'bg-green-100 text-success-dark'}`}>{message}</p>}
        </form>
    </div>
  );
};

export default FormulaireComparatif;
