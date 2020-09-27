const config = {
  "Cardiovascular System": {
    "1. Myocardial Infarct": {
      severe: {
        s_card__a_minf__g3a: "MI ≤ 6 months ago",
      },
      moderate: {
        s_card__a_minf__g2a: "MI > 6 months ago",
      },
      mild: {
        s_card__a_minf__g1a: "Old MI by ECG only, age undetermined",
      },
    },
    "2. Angina / Coronary Artery Disease": {
      severe: {
        s_card__a_acad__g3a: "Unstable angina",
      },
      moderate: {
        s_card__a_acad__g2a: "Chronic exertional angina",
        s_card__a_acad__g2b:
          "Recent (≤ 6 months ago) Coronary Artery Bypass Graft (CABG) or Percutaneous Transluminal Coronary Angioplasty (PTCA)",
        s_card__a_acad__g2c: "Recent (≤ 6 months ago) coronary stent",
      },
      mild: {
        s_card__a_acad__g1a:
          "ECG or stress test evidence or catheterization evidence of coronary disease without symptoms",
        s_card__a_acad__g1b:
          "Angina pectoris not requiring hospitalization CABG or PTCA (> 6 months ago)",
        s_card__a_acad__g1c: "CABG or PTCA (> 6 months ago)",
        s_card__a_acad__g1d: "Coronary stent (> 6 months ago)",
      },
    },
    "3. Congestive Heart Failure (CHF)": {
      severe: {
        s_card__a_chf__g3a: "Hospitalized for CHF within past 6 months",
        s_card__a_chf__g3b: "Ejection fraction < 20%",
      },
      moderate: {
        s_card__a_chf__g2a: "Hospitalized for CHF > 6 months prior",
        s_card__a_chf__g2b: "CHF with dyspnea which limits activities",
      },
      mild: {
        s_card__a_chf__g1a: "CHF with dyspnea which has responded to treatment",
        s_card__a_chf__g1b: "Exertional dyspnea",
        s_card__a_chf__g1c: "Paroxysmal Nocturnal Dyspnea (PND)",
      },
    },
    "4. Arrhythmias": {
      severe: {
        s_card__a_arrythm__g3a: "Ventricular arrhythmia ≤ 6 months ago",
      },
      moderate: {
        s_card__a_arrythm__g2a: "Ventricular arrhythmia > 6 months ago",
        s_card__a_arrythm__g2b: "Chronic atrial fibrillation or flutter",
        s_card__a_arrythm__g2c: "Pacemaker",
      },
      mild: {
        s_card__a_arrythm__g1a: "Sick Sinus Syndrome",
      },
    },
    "5. Hypertension": {
      severe: {
        s_card__a_hypertens__g3a: "DBP ≥ 130 mm Hg",
        s_card__a_hypertens__g3b:
          "Severe malignant papilledema or other eye changes",
        s_card__a_hypertens__g3c: "Encephalopathy",
      },
      moderate: {
        s_card__a_hypertens__g2a: "DBP 115-129 mm Hg",
        s_card__a_hypertens__g2b:
          "DBP 90-114 mm Hg while taking antihypertensive medications",
        s_card__a_hypertens__g2c:
          "Secondary cardiovascular symptoms: vertigo, epistaxis, headaches",
      },
      mild: {
        s_card__a_hypertens__g1a:
          "DBP 90-114 mm Hg while not taking antihypertensive medications",
        s_card__a_hypertens__g1b:
          "DBP < 90 mm Hg while taking antihypertensive medications",
        s_card__a_hypertens__g1c: "Hypertension, not otherwise specified",
      },
    },
    "6. Venous Disease": {
      severe: {
        s_card__a_vendis__g3a: "Recent PE (≤ 6 months ago)",
        s_card__a_vendis__g3b: "Use of venous filter for PE's",
      },
      moderate: {
        s_card__a_vendis__g2a: "DVT controlled with Coumadin or heparin",
        s_card__a_vendis__g2b: "Old PE > 6 months ago",
      },
      mild: {
        s_card__a_vendis__g1a:
          "Old DVT no longer treated with Coumadin or Heparin",
      },
    },
    "7. Peripheral Arterial Disease": {
      severe: {
        s_card__a_peripartdis__g3a:
          "Bypass or amputation for gangrene or arterial insufficiency < 6 months ago",
        s_card__a_peripartdis__g3b:
          "Untreated thoracic or abdominal aneurysm (≥ 6 cm)",
      },
      moderate: {
        s_card__a_peripartdis__g2a:
          "Bypass or amputation for gangrene or arterial insufficiency > 6 months ago",
        s_card__a_peripartdis__g2b: "Chronic insufficiency",
      },
      mild: {
        s_card__a_peripartdis__g1a: "Intermittent claudication",
        s_card__a_peripartdis__g1b:
          "Untreated thoracic or abdominal aneurysm (< 6 cm)",
        s_card__a_peripartdis__g1c:
          "s/p abdominal or thoracic aortic aneurysm repair",
      },
    },
  },
  "Respiratory System": {
    "8. Respiratory Disease": {
      severe: {
        s_reso__a_resp__g3a: "Marked pulmonary insufficiency",
        s_reso__a_resp__g3b:
          "Restrictive Lung Disease or COPD with dyspnea at rest despite treatment",
        s_reso__a_resp__g3c: "Chronic supplemental O_2",
        s_reso__a_resp__g3d: "CO_2 retention (pCO_2 > 50 torr)",
        s_reso__a_resp__g3e: "Baseline pO2 < 50 torr",
        s_reso__a_resp__g3f: "FEV1 (< 50%)",
      },
      moderate: {
        s_reso__a_resp__g2a:
          "Restrictive Lung Disease or COPD (chronic bronchitis, emphysema, or asthma) with dyspnea which limits activities",
        s_reso__a_resp__g2b: "FEV1 (51%-65%)",
      },
      mild: {
        s_reso__a_resp__g1a:
          "Restrictive Lung Disease or COPD (chronic bronchitis, emphysema, or asthma) with dyspnea which has responded to treatment",
        s_reso__a_resp__g1b: "FEV1 (66%-80%)",
      },
    },
  },
  "Gastrointestinal System": {
    "9. Hepatic": {
      severe: {
        s_gi__a_hep__g3a:
          "Portal hypertension and/or esophageal bleeding ≤ 6 months ago (Encephalopathy, Ascites, Jaundice with Total Bilirubin > 2)",
      },
      moderate: {
        s_gi__a_hep__g2a:
          "Chronic hepatitis, cirrhosis, portal hypertension with moderate symptoms 'compensated hepatic failure'",
      },
      mild: {
        s_gi__a_hep__g1a:
          "Chronic hepatitis or cirrhosis without portal hypertension",
        s_gi__a_hep__g1b: "Acute hepatitis without cirrhosis",
        s_gi__a_hep__g1c:
          "Chronic liver disease manifested on biopsy or persistently elevated bilirubin (> 3 mg/dl)",
      },
    },
    "10. Stomach / Intestine": {
      severe: {
        s_gi__a_stomint__g3a:
          "Recent ulcers (≤ 6 months ago) requiring blood transfusion",
      },
      moderate: {
        s_gi__a_stomint__g2a:
          "Ulcers requiring surgery or transfusion > 6 months ago",
      },
      mild: {
        s_gi__a_stomint__g1a: "Diagnosis of ulcers treated with meds",
        s_gi__a_stomint__g1b: "Chronic malabsorption syndrome",
        s_gi__a_stomint__g1c:
          "Inflammatory bowel disease (IBD) on meds or h/o with complications and/or surgery",
      },
    },
    "11. Pancreas": {
      severe: {
        s_gi__a_pancrs__g3a:
          "Acute or chronic pancreatitis with major complications (phlegmon, abscess, or pseudocyst)",
      },
      moderate: {
        s_gi__a_pancrs__g2a: "Uncomplicated acute pancreatitis",
        s_gi__a_pancrs__g2b:
          "Chronic pancreatitis with minor complications (malabsorption, impaired glucose tolerance, or GI bleeding)",
      },
      mild: {
        s_gi__a_pancrs__g1a: "Chronic pancreatitis w/o complications",
      },
    },
  },
  "Renal System": {
    "12. End-Stage Renal Disease": {
      severe: {
        s_renl__a_esrendis__g3a:
          "Creatinine > 3 mg% with multi-organ failure, shock, or sepsis",
        s_renl__a_esrendis__g3b: "Acute dialysis",
      },
      moderate: {
        s_renl__a_esrendis__g2a:
          "Chronic Renal Insufficiency with creatinine > 3 mg%",
        s_renl__a_esrendis__g2b: "Chronic dialysis",
      },
      mild: {
        s_renl__a_esrendis__g1a:
          "Chronic Renal Insufficiency with creatinine 2-3 mg%",
      },
    },
  },
  "Endocrine System": {
    "13. Diabetes Mellitus": {
      severe: {
        s_endoc__a_diabmel__g3a: "Hospitalization ≤ 6 months ago for DKA",
        s_endoc__a_diabmel__g3b: {
          description: "Diabetes causing end-organ failure including",
          bullets: [
            "retinopathy",
            "neuropathy",
            "nephropathy",
            "coronary disease",
            "peripheral arterial disease",
          ],
        },
      },
      moderate: {
        s_endoc__a_diabmel__g2a: "IDDM without complications",
        s_endoc__a_diabmel__g2b: "Poorly controlled AODM",
      },
      mild: {
        s_endoc__a_diabmel__g1a: "AODM controlled by oral agents only",
      },
    },
  },
  "Neurological System": {
    "14. Stroke": {
      severe: {
        s_neur__a_stroke__g3a:
          "Acute stroke with significant neurologic deficit",
      },
      moderate: {
        s_neur__a_stroke__g2a: "Old stroke with neurologic residual",
      },
      mild: {
        s_neur__a_stroke__g1a: "Stroke with no residual",
        s_neur__a_stroke__g1b: "Past or recent TIA",
      },
    },
    "15. Dementia": {
      severe: {
        s_neur__a_dementia__g3a:
          "Severe dementia requiring full support for activities of daily living",
      },
      moderate: {
        s_neur__a_dementia__g2a:
          "Moderate dementia (not completely self-sufficient, needs supervising)",
      },
      mild: {
        s_neur__a_dementia__g1a: "Mild dementia (can take care of self)",
      },
    },
    "16. Paralysis": {
      severe: {
        s_neur__a_paralysis__g3a:
          "Paraplegia or hemiplegia requiring full support for activities of daily living",
      },
      moderate: {
        s_neur__a_paralysis__g2a:
          "Paraplegia or hemiplegia requiring wheelchair, able to do some self care",
      },
      mild: {
        s_neur__a_paralysis__g1a:
          "Paraplegia or hemiplegia, ambulatory and providing most of self care",
      },
    },
    "17. Neuromuscular": {
      severe: {
        s_neur__a_neuromusc__g3a:
          "MS, Parkinson's, Myasthenia Gravis, or other chronic neuromuscular disorder and requiring full support for activities of daily living",
      },
      moderate: {
        s_neur__a_neuromusc__g2a:
          "MS, Parkinson's, Myasthenia Gravis, or other chronic neuromuscular disorder, but able to do some self care",
      },
      mild: {
        s_neur__a_neuromusc__g1a:
          "MS, Parkinson's, Myasthenia Gravis, or other chronic neuromuscular disorder, but ambulatory and providing most of self care",
      },
    },
  },
  Psychiatric: {
    "18. Mental Illness": {
      severe: {
        s_psyc__a_mentill__g3a: "Recent suicidal attempt",
        s_psyc__a_mentill__g3b: "Active schizophrenia",
      },
      moderate: {
        s_psyc__a_mentill__g2a:
          "Major depression or bipolar disorder uncontrolled",
        s_psyc__a_mentill__g2b: "Schizophrenia controlled w/ meds",
      },
      mild: {
        s_psyc__a_mentill__g1a:
          "Major depression or bipolar disorder controlled w/ medication",
      },
    },
  },
  Rheumatologic: {
    description:
      "Include Rheumatoid Arthritis, Systemic Lupus, Mixed Connective Tissue Disorder, Polymyositis, Rheumatic Polymyositis",
    "19. Rheumatologic Disease": {
      severe: {
        s_rheum__a_rheumdis__g3a:
          "Connective Tissue Disorder with secondary end-organ failure (renal, cardiac, CNS)",
      },
      moderate: {
        s_rheum__a_rheumdis__g2a:
          "Connective Tissue Disorder on steroids or immunosuppressant medications",
      },
      mild: {
        s_rheum__a_rheumdis__g1a:
          "Connective Tissue Disorder on NSAIDS or no treatment",
      },
    },
  },
  "Immunological System": {
    description:
      "AIDS should not be considered a comorbidity for Kaposi's Sarcoma or Non-Hodgkin's Lymphoma.",
    "20. AIDS": {
      severe: {
        s_immun__a_aids__g3a:
          "Fulminant AIDS w/KS, MAI, PCP (AIDS defining illness)",
      },
      moderate: {
        s_immun__a_aids__g2a: "HIV_+ with h/o defining illness CD4_+ < 200/μL",
      },
      mild: {
        s_immun__a_aids__g1a: "Asymptomatic HIV_+ patient",
        s_immun__a_aids__g1b:
          "HIV_+ w/o h/o AIDS defining illness CD4_+ > 200/μL",
      },
    },
  },
  Malignancy: {
    description:
      "Excluding Cutaneous Basal Cell Ca., Cutaneous SCCA, Carcinoma in-situ, and Intraepithelial Neoplasm",
    "21.  Solid Tumor Including Melanoma": {
      severe: {
        s_malig__a_stumr__g3a: "Uncontrolled cancer",
        s_malig__a_stumr__g3b: "Newly diagnosed but not yet treated",
        s_malig__a_stumr__g3c: "Metastatic solid tumor",
      },
      moderate: {
        s_malig__a_stumr__g2a:
          "Any controlled solid tumor without documented metastases, but initially diagnosed and treated within the last 5 years",
      },
      mild: {
        s_malig__a_stumr__g1a:
          "Any controlled solid tumor without documented metastases, but initially diagnosed and treated > 5 years ago",
      },
    },
    "22. Leukemia and Myeloma": {
      severe: {
        s_malig__a_leukmyel__g3a: "Relapse",
        s_malig__a_leukmyel__g3b: "Disease out of control",
      },
      moderate: {
        s_malig__a_leukmyel__g2a: "1_st remission or new dx < 1 yr",
        s_malig__a_leukmyel__g2b: "Chronic suppressive therapy",
      },
      mild: {
        s_malig__a_leukmyel__g1a:
          "H/o leukemia or myeloma with last Rx > 1 yr prior",
      },
    },
    "23. Lymphoma": {
      severe: {
        s_malig__a_lymphma__g3a: "Relapse",
      },
      moderate: {
        s_malig__a_lymphma__g2a: "1_st remission or new dx < 1 yr",
        s_malig__a_lymphma__g2b: "Chronic suppressive therapy",
      },
      mild: {
        s_malig__a_lymphma__g1a: "H/o lymphoma with last Rx > 1 yr prior",
      },
    },
  },
  "Substance Abuse": {
    description:
      "Must be accompanied by social, behavioral, or medical complications",
    "24. Alcohol": {
      severe: {
        s_substab__a_alchl__g3a: "Delirium tremens",
      },
      moderate: {
        s_substab__a_alchl__g2a:
          "Active alcohol abuse with social, behavioral, or medical complications",
      },
      mild: {
        s_substab__a_alchl__g1a: "H/o alcohol abuse but not presently drinking",
      },
    },
    "25. Illicit Drugs": {
      severe: {
        s_substab__a_ildrgs__g3a: "Acute Withdrawal Syndrome",
      },
      moderate: {
        s_substab__a_ildrgs__g2a:
          "Active substance abuse with social, behavioral, or medical complications",
      },
      mild: {
        s_substab__a_ildrgs__g1a: "H/o substance abuse but not presently using",
      },
    },
  },
  "Body Weight": {
    "26: Obesity": {
      moderate: {
        s_bodywt__a_obesty__g2a: "Morbid (i.e., BMI ≥ 38)",
      },
    },
  },
};
