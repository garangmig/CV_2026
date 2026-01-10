import type { Skill } from "../types/skill";

export type SkillId = "R" | "MySQL" | "MongoDB" | "SQL" | "Tableau" | "Python" | "PHP" | "JavaScript" | "Excel" | "Google Cloud" | "Oracle Visual Builder Cloud Service" | "Oracle Integration Cloud" | "JDeveloper" | "APEX" | "PL/SQL" | "Oracle Transactional Business Intelligence" | "Oracle Fusion Applications" | "Oracle HCM" | "Oracle ERP" | "Azure";

export const SKILLS_REGISTRY: Record<SkillId, Skill> = {
    R: {
        id: "R",
        name: "R",
        level: 7,
        group: "DEVOPS",
        icon: { url: "/icons/r.png", alt: "R", title: "R" }
    },
    MySQL: {
        id: "MySQL",
        name: "MySQL",
        level: 7,
        group: "DATABASE",
        icon: { url: "/icons/mysql.png", alt: "MySQL", title: "MySQL" }
    },
    MongoDB: {
        id: "MongoDB",
        name: "MongoDB",
        level: 6,
        group: "DATABASE",
        icon: { url: "/icons/mongodb.png", alt: "MongoDB", title: "MongoDB" }
    },
    SQL: {
        id: "SQL",
        name: "SQL",
        level: 9,
        group: "DATABASE",
        icon: { url: "/icons/sql.png", alt: "SQL", title: "SQL" }
    },
    Tableau: {
        id: "Tableau",
        name: "Tableau",
        level: 6,
        group: "DEVOPS",
        icon: { url: "/icons/tableau.png", alt: "Tableau", title: "Tableau" }
    },
    Python: {
        id: "Python",
        name: "Python",
        level: 9,
        group: "DEVOPS",
        icon: { url: "/icons/python.png", alt: "Python", title: "Python" }
    },
    PHP: {
        id: "PHP",
        name: "PHP",
        level: 8,
        group: "DEVOPS",
        icon: { url: "/icons/php.png", alt: "PHP", title: "PHP" }
    },
    JavaScript: {
        id: "JavaScript",
        name: "JavaScript",
        shortName: "JS",
        level: 9,
        group: "DEVOPS",
        icon: { url: "/icons/javascript.png", alt: "JavaScript", title: "JavaScript" }
    },
    "Excel": {
        id: "Excel",
        name: "Excel",
        level: 8,
        group: "DATABASE",
        icon: { url: "/icons/excel.png", alt: "Excel", title: "Excel" }
    },
    "Google Cloud": {
        id: "Google Cloud",
        name: "Google Cloud",
        shortName: "GCP",
        level: 7,
        group: "CLOUD",
        icon: { url: "/icons/googlecloud.png", alt: "Google Cloud", title: "Google Cloud" }
    },
    "Oracle Visual Builder Cloud Service": {
        id: "Oracle Visual Builder Cloud Service",
        name: "Oracle Visual Builder Cloud Service",
        shortName: "VBCS",
        level: 9,
        group: "CLOUD",
        icon: { url: "/icons/oraclevisualbuildercloudservice.png", alt: "Oracle Visual Builder Cloud Service", title: "Oracle Visual Builder Cloud Service" }
    },
    "Oracle Integration Cloud": {
        id: "Oracle Integration Cloud",
        name: "Oracle Integration Cloud",
        shortName: "OIC",
        level: 9,
        group: "CLOUD",
        icon: { url: "/icons/oracleintegrationcloud.png", alt: "Oracle Integration Cloud", title: "Oracle Integration Cloud" }
    },
    JDeveloper: {
        id: "JDeveloper",
        name: "JDeveloper",
        shortName: "JDev",
        level: 7,
        group: "DEVOPS",
        icon: { url: "/icons/jdeveloper.png", alt: "JDeveloper", title: "JDeveloper" }
    },
    APEX: {
        id: "APEX",
        name: "APEX",
        level: 8,
        group: "CLOUD",
        icon: { url: "/icons/apex.png", alt: "APEX", title: "APEX" }
    },
    "PL/SQL": {
        id: "PL/SQL",
        name: "PL/SQL",
        level: 9,
        group: "DATABASE",
        icon: { url: "/icons/plsql.png", alt: "PLSQL", title: "PLSQL" }
    },
    "Oracle Transactional Business Intelligence": {
        id: "Oracle Transactional Business Intelligence",
        name: "Oracle Transactional Business Intelligence",
        shortName: "OTBI",
        level: 7,
        group: "CLOUD",
        icon: { url: "/icons/oracletransactionalbusinessintelligence.png", alt: "Oracle Transactional Business Intelligence", title: "Oracle Transactional Business Intelligence" }
    },
    "Oracle Fusion Applications": {
        id: "Oracle Fusion Applications",
        name: "Oracle Fusion Applications",
        shortName: "OFA",
        level: 7,
        group: "CLOUD",
        icon: { url: "/icons/oraclefusionapplications.png", alt: "Oracle Fusion Applications", title: "Oracle Fusion Applications" }
    },
    "Oracle HCM": {
        id: "Oracle HCM",
        name: "Oracle HCM",
        level: 7,
        group: "CLOUD",
        icon: { url: "/icons/oraclehcm.png", alt: "Oracle HCM", title: "Oracle HCM" }
    },
    "Oracle ERP": {
        id: "Oracle ERP",
        name: "Oracle ERP",
        level: 7,
        group: "CLOUD",
        icon: { url: "/icons/oracleerp.png", alt: "Oracle ERP", title: "Oracle ERP" }
    },
    Azure: {
        id: "Azure",
        name: "Azure",
        level: 7,
        group: "CLOUD",
        icon: { url: "/icons/azure.png", alt: "Azure", title: "Azure" }
    }
};
