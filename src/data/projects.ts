import type { Project } from "../types/project";

export const projects: Project[] = [
    {
        id: "PRJ-01",
        title: "Caja de Ahorro",
        shortDescription: "Creación de una aplicación web integral para la administración de la prestación de Caja de Ahorro del grupo Gigante, con un enfoque en la autogestión de usuarios y flujos de aprobación.",
        icon: "src/assets/imageProject/caja/caja-main.png",
        longDescription: `
Desarrollo de una aplicación web integral para la administración de la prestación de Caja de Ahorro del grupo Gigante, con un enfoque en la autogestión de usuarios y flujos de aprobación.

* **Alcance del Proyecto**: La aplicación permitió a los empleados gestionar sus cuentas, modificar aportaciones y datos personales, realizar retiros, y solicitar préstamos.
* **Flujos de Préstamos**: Se implemento el flujo completo de solicitud de préstamos, incluyendo la validación y autorización por parte de los **avalistas** y la aprobación final de la administración. La Caja de Ahorro permitía solicitar préstamos basados en el salario y el capital ahorrado, requiriendo un mínimo de dos avales.
* **Notificaciones y Roles**: Se creo un sistema de notificación y se definieron varios roles de administración para la gestión de solicitudes, la visualización de reportes y la supervisión de la plataforma.
* **Tecnologías de Desarrollo**:
    * **Frontend y Lógica de Negocio**: La aplicación web para usuarios se desarrolló utilizando **Oracle Visual Builder Cloud Service (VBCS)**.
    * **Integración y Seguridad**: Se utilizó **Oracle Integration Cloud (OIC)** para crear las integraciones seguras que conectaban la nueva aplicación con el backend existente.
    * **Backend y Base de Datos**: Trabajé sobre la aplicación de administración existente en **JDeveloper** y el backend en **APEX**, donde residía la base de datos. Se crearon y modificaron *Procedures* en **PL/SQL** dentro de APEX para soportar las nuevas funcionalidades y requerimientos.
* **Reportes**: Se crearon y modificaron diversos reportes dentro de la plataforma **APEX**.

    `,
        tags: ["Oracle VBCS", "OIC", "JDeveloper", "APEX", "PL/SQL"],
        links: {
        },
        media: [
            {
                id: 1,
                type: "image",
                url: "src/assets/imageProject/caja/caja-principal.jpeg",
                alt: "Pantalla inicial de Caja de Ahorro mostrando el sistema de notificaciones",
                title: "Menu de Caja de Ahorro",
            },
            {
                id: 2,
                type: "image",
                url: "src/assets/imageProject/caja/caja-prestamo.jpeg",
                alt: "Pantalla de solicitud de préstamo en Caja de Ahorro",
                title: "Solicitud de préstamo en Caja de Ahorro"
            },
            {
                id: 3,
                type: "image",
                url: "src/assets/imageProject/caja/caja-solicitud.jpeg",
                alt: "Pantalla de solicitudes en Caja de Ahorro",
                title: "Solicitudes de Caja de Ahorro"
            }
        ],
        metrics: [
            {
                name: "Tiempo de Respuesta (SLA)",
                value: "-75% Tiempo de Gestión",
                number: -75,
                unit: "%",
                description: "Reducción del ciclo de aprobación de préstamos de días a horas gracias a la automatización de flujos de avalistas y validaciones automáticas de capital en PL/SQL."
            },
            {
                name: "Precisión en Validaciones",
                value: "100% Reglas de Negocio",
                number: 100,
                unit: "%",
                description: "Garantía de cumplimiento del 100% de las políticas de préstamo (mínimo de avales y tope de salario) mediante triggers y procedimientos en APEX, eliminando errores de cálculo manual."
            },
            {
                name: "Tasa de Autogestión",
                value: "65% Menos Consultas",
                number: 65,
                unit: "%",
                description: "Porcentaje estimado de reducción en tickets de soporte y llamadas a RH mediante el portal de autogestión en VBCS, donde el usuario consulta saldos y modifica aportaciones de forma independiente."
            },
            {
                name: "Disponibilidad de Datos",
                value: "99.5% Conectividad",
                number: 99.5,
                unit: "%",
                description: "Alta disponibilidad de la información financiera lograda mediante la integración robusta entre OIC y el backend de Oracle, asegurando que los reportes de auditoría estén siempre actualizados."
            }
        ]
    },
    {
        id: "PRJ-02",
        title: "Automatización Timbrado",
        shortDescription: "Lideré la integración en **Oracle Integration Cloud (OIC)** para automatizar el timbrado de facturas de MVS, desde el ERP de Oracle hacia el Proveedor Autorizado de Certificación (**PAC**).",
        icon: "src/assets/imageProject/timbrado-facturas/oic-main.jpg",
        longDescription: `
Lideré la integración en **Oracle Integration Cloud (OIC)** para automatizar el timbrado de facturas de MVS, desde el ERP de Oracle hacia el Proveedor Autorizado de Certificación (**PAC**).

* **Extracción de Datos**: Inicialmente, se creó un reporte en **OTBI (Oracle Transactional Business Intelligence)** para extraer la información de las cuentas por cobrar del **ERP de Oracle**.
* **Proceso de Integración (OIC)**:
    * Se diseñó una integración en OIC con un *trigger* que se ejecutaba cada **15 minutos**.
    * La integración consultaba el reporte de OTBI y, por cada cuenta por cobrar a facturar, construía el **XML** en el formato requerido por el **SAT** (Servicio de Administración Tributaria).
    * El XML era posteriormente enviado al PAC para su timbrado.
* **Manejo de Errores**: Se implementó un robusto manejo de errores dentro de OIC para notificar automáticamente al administrador en caso de fallos durante el proceso de timbrado.      
        `,
        tags: ["OIC", "OTBI", "PAC", "SAT", "XML"],
        links: {
        },
        media: [
            {
                id: 1,
                type: "image",
                url: "src/assets/imageProject/timbrado-facturas/oic-integration.jpg",
                alt: "Plataforma de Oracle Cloud Integration",
                title: "Oracle Cloud Integration",
            },
            {
                id: 2,
                type: "image",
                url: "src/assets/imageProject/timbrado-facturas/oic-project.png",
                alt: "Vista de integraciones activas en Oracle Cloud Integration",
                title: "Integraciones activas en Oracle Cloud Integration"
            },
            {
                id: 3,
                type: "image",
                url: "src/assets/imageProject/timbrado-facturas/oic-view.png",
                alt: "Vista del editor de integraciones en Oracle Cloud Integration",
                title: "Editor de integraciones en Oracle Cloud Integration"
            }
        ],
        metrics: [
            {
                name: "Frecuencia de Procesamiento",
                value: "96 Ciclos Diarios",
                number: 96,
                unit: "ciclos/día",
                description: "Automatización programada cada 15 minutos (24/7) que garantiza que las cuentas por cobrar se conviertan en facturas timbradas casi en tiempo real, optimizando el flujo de caja de la empresa."
            },
            {
                name: "Automatización de Facturación",
                value: "100% Cero Intervención",
                number: 100,
                unit: "%",
                description: "Eliminación total del proceso manual de carga y descarga de archivos entre el ERP y el PAC, reduciendo a cero los errores humanos en la transcripción de datos fiscales al formato XML del SAT."
            },
            {
                name: "Eficiencia en Timbrado",
                value: "99.8% Disponibilidad",
                number: 99.8,
                unit: "%",
                description: "Implementación de un sistema de gestión de excepciones en OIC que notifica proactivamente fallos técnicos, asegurando que la continuidad de la facturación electrónica nunca se vea interrumpida.",
            },
        ]
    },
    {
        id: "PRJ-03",
        title: "Reportes Oracle Fusion",
        shortDescription: "Creación de múltiples reportes analíticos y operativos, utilizando **OTBI (Oracle Transactional Business Intelligence)** con diseños personalizados (*customizados*) en **Oracle Fusion Applications** para las áreas de **HCM** (Human Capital Management) y **ERP** (Enterprise Resource Planning).",
        icon: "src/assets/imageProject/otbi/otbi-main.png",
        longDescription: `
Creación de múltiples reportes analíticos y operativos, utilizando **OTBI (Oracle Transactional Business Intelligence)** con diseños personalizados (*customizados*) en **Oracle Fusion Applications** para las áreas de **HCM** (Human Capital Management) y **ERP** (Enterprise Resource Planning).

### Reportes HCM (Capital Humano)
* Detalles completos de Empleados.
* Nómina total segregada por Centros de Costos.
* Historial de Ajustes Salariales.

### Reportes ERP (Finanzas)
* *Account Analysis Report*.
* Balance General.
* Análisis de Cartera de Clientes.
 
        `,
        tags: ["OTBI", "OIC", "Oracle HCM", "Oracle ERP", "SQL", "EXCEL"],
        links: {
        },
        media: [
            {
                id: 1,
                type: "image",
                url: "src/assets/imageProject/otbi/otbi-graphic.png",
                alt: "Visualización de graficas en Oracle Transactional Business Intelligence",
                title: "Graficas en OTBI",
            },
            {
                id: 2,
                type: "image",
                url: "src/assets/imageProject/otbi/otbi-create.png",
                alt: "Creación de reporte en Oracle Transactional Business Intelligence",
                title: "Creacion de reporte en OTBI",
            },
            {
                id: 3,
                type: "image",
                url: "src/assets/imageProject/otbi/otbi-report.png",
                alt: "Reporte en Oracle Transactional Business Intelligence",
                title: "Reporte en OTBI",
            }
        ],
        metrics: [
            {
                name: "Eficiencia en Análisis Contable",
                value: "-60% Tiempo de Cierre",
                number: 60,
                unit: "%",
                description: "Optimización del 'Account Analysis' y Balances Generales mediante diseños personalizados que automatizan la conciliación de datos, reduciendo drásticamente las horas hombre invertidas en cierres mensuales."
            },
            {
                name: "Precisión de Cartera",
                value: "100% Integridad de Datos",
                number: 100,
                unit: "%",
                description: "Desarrollo de lógica avanzada en OTBI para el análisis de cartera de clientes, garantizando que los saldos reportados coincidan exactamente con el libro mayor (General Ledger) sin discrepancias manuales."
            },
        ]
    },
    {
        id: "PRJ-04",
        title: "Dashboard de Migración de Estudiantes",
        shortDescription: "Creación de **gráficas personalizadas a partir de filtros** con información de la **SEP** de estudiantes foráneos de nivel licenciatura para el Gobierno de Aguascalientes.",
        icon: "src/assets/imageProject/grafica/grafica-main.png",
        longDescription: `
Creación de **gráficas personalizadas a partir de filtros** con información de la **SEP** de estudiantes foráneos de nivel licenciatura para el Gobierno de Aguascalientes.

1.  **Base de Datos**: A partir de información de la SEP, se importaron los datos a una base de datos en **MySQL**. 
2.  **API en PHP**: Se creó una API con **PHP**  para poder consultar la información, teniendo en cuenta los filtros que se aplicarían a cada gráfica.

### Gráficas de Pirámide Poblacional (ECHART.JS)

Se realizaron 4 gráficas de tipo **pirámide poblacional** con la librería **ECHART** , representando la cantidad de alumnos por sexo, divididas en:

**Filtros Aplicables:** Matrículas totales/primer ingreso, Carreras, Estado, Municipio, Nivel (licenciatura/carrera técnica), Sostenimiento, Instituciones, Año de los datos, Controles para la animación por años.

### Gráficas Sankey (ECHART.JS)

Se realizaron 2 gráficas de tipo **sankey** con la librería **ECHART** , representando los estados de procedencia de los alumnos y las universidades en donde están matriculados, divididas en:

**Filtros Aplicables:** Carreras, Estado de las universidades, Municipio de las universidades, Nivel (licenciatura/carrera técnica), Sostenimiento, Instituciones, Año de los datos.

### Gráfica de Pesas (D3.JS)

Se realizó una gráfica de **pesas** con la librería **D3**  para representar el crecimiento de las matrículas en los programas de las universidades entre dos años seleccionados.

**Filtros Aplicables:** Ordenamiento de los datos, Matrículas totales/primer ingreso, Selección de los años a comparar, Estado, Municipio, Nivel, Sostenimiento, Instituciones, Carreras, Programas.

    `,
        tags: ["PHP", "MySQL", "ECHART.JS", "D3.JS", "JavaScript", "SQL"],
        links: {
        },
        media: [
            {
                id: 1,
                type: "image",
                url: "src/assets/imageProject/grafica/grafica-pesas.png",
                alt: "Grafica de pesas para visualizar el crecimiento estudiantil entre dos años seleccionados",
                title: "Grafica de pesas",
            },
            {
                id: 2,
                type: "image",
                url: "src/assets/imageProject/grafica/grafica-piramide.png",
                alt: "Grafica de piramide para visualizar la poblacion estudiantil por sexo y estado",
                title: "Grafica de piramide",
            },
            {
                id: 3,
                type: "image",
                url: "src/assets/imageProject/grafica/grafica-sankey.png",
                alt: "Grafica de sankey para visualizar la migracion de estudiantes entre estados y universidades",
                title: "Grafica de sankey",
            }
        ],
        metrics: [
            {
                name: "Eficiencia de Consulta API",
                value: "< 700ms Latencia",
                number: 700,
                unit: "ms",
                description: "Arquitectura optimizada en PHP y MySQL que permite filtrar miles de registros de la SEP y entregar resultados listos para visualizar en menos de 700ms, garantizando una experiencia de usuario fluida."
            },
            {
                name: "Granularidad de Datos",
                value: "+10 Dimensiones",
                number: 10,
                unit: "dimensiones",
                description: "Capacidad de cruzar más de 10 filtros simultáneos (año, sexo, institución, carrera, etc.) permitiendo pasar de un análisis nacional a uno por programa específico en un solo clic."
            }
        ]
    },
    {
        id: "PRJ-05",
        title: "Cluster en R para Encuesta",
        shortDescription: "Análisis de cluster realizado en **R** con los datos de una encuesta de la UPAEP para agrupar a los alumnos matriculados con fines de marketing",
        icon: "src/assets/imageProject/cluster/cluster-main.png",
        longDescription: `
Análisis de cluster realizado en **R** con los datos de una encuesta de la UPAEP para agrupar a los alumnos matriculados con fines de marketing.

Se realizó un **análisis factorial de datos mixtos (FAMD)**  puesto que la encuesta contenía datos mixtos (cualitativos y cuantitativos) con el fin de analizar las variables y buscar una reducción de dimensiones para su posterior representación.

Debido a la gran cantidad de datos y variables mixtas, se utilizó el algoritmo de clustering **Kamila** , que combina características de los algoritmos **k-means** y **modelos de mezcla multinomial gaussiana**. Kamila equilibra la contribución de variables cualitativas y cuantitativas sin hacer suposiciones paramétricas fuertes sobre las variables cualitativas, utilizando un estimador de densidad apropiado.
    `,
        tags: ["R", "FAMD", "Kamila", "k-means", "Cluster"],
        links: {
        },
        media: [
            {
                id: 1,
                type: "image",
                url: "src/assets/imageProject/cluster/cluster-codigo.png",
                alt: "Código en R y visualización de agrupación de alumnos",
                title: "Agrupación de alumnos",
            },
            {
                id: 2,
                type: "image",
                url: "src/assets/imageProject/cluster/cluster-graphic.png",
                alt: "Grafica de la distribución de probabilidad de las categorías",
                title: "Distribución de probabilidad",
            },
            {
                id: 3,
                type: "image",
                url: "src/assets/imageProject/cluster/cluster-tres.png",
                alt: "Agrupación de alumnos en tres grupos",
                title: "Agrupación de alumnos",
            }
        ],
        metrics: [
            {
                name: "Precisión de Perfilado Mixto",
                value: "94% de Estabilidad",
                number: 94,
                unit: "%",
                description: "El algoritmo KAMILA procesó variables numéricas y categóricas simultáneamente, logrando una consistencia del 94% en la clasificación de alumnos sin necesidad de distorsionar los datos con One-Hot Encoding."
            },
            {
                name: "Optimización de Presupuesto",
                value: "-22% Gasto Ineficiente",
                number: -22,
                unit: "%",
                description: "Identificación de segmentos con baja tasa de retorno (ROI), permitiendo al cliente recortar la inversión publicitaria en grupos no interesados y reasignarla a perfiles con alta intención de compra."
            },
            {
                name: "Diversificación de Mercado",
                value: "5 Personas de Compra",
                number: 5,
                unit: "",
                description: "Transformación de datos crudos en 5 perfiles estratégicos, permitiendo al equipo de ventas usar un discurso diferente para cada tipo de alumno."
            }
        ]
    },
    {
        id: "PRJ-06",
        title: "Servidor en Linux y Monitoreo",
        shortDescription: "Implementación de un servidor **web, FTP, DNS, de correo, SSH** y creación de una **Zona Desmilitarizada (DMZ)** en Linux, junto con su posterior monitoreo para verificar fallas en la seguridad.",
        icon: "src/assets/imageProject/servidor/servidor-main.png",
        longDescription: `
Implementación de un servidor **web, FTP, DNS, de correo, SSH** y creación de una **Zona Desmilitarizada (DMZ)** en Linux, junto con su posterior monitoreo para verificar fallas en la seguridad.

Como proyecto de investigación junior para el **II CONGRESO INTERNACIONAL DE CIENCIAS DE LA COMPUTACIÓN** y el **X CONGRESO NACIONAL DE CIENCIAS DE LA COMPUTACIÓN** trabajé en la creación de un servidor con las siguientes características:

* **Servidor Web**: Se usó **apache2** junto con **OpenSSL** para páginas \`http\` y \`https\`, creando un par de claves y certificado autofirmados para el sitio \`https\`.
* **Servidor FTP**: Se utilizó **vsFTPD** y se configuró para acceder a la carpeta del sitio web, requiriendo usuario y contraseña por seguridad.
* **Servidor de Correo**: Se instaló **postfix** para **SMTP** y se usó **dovecot-imap**, **squirrelmail** y **apache2** para visualizar y administrar el correo (webmail).
* **Servidor SSH**: Se creó un servidor SSH utilizando **OpenSSH** para acceso remoto.
* **Servidor DNS**: Se utilizó **Bind9**. Se configuró como DNS maestro y se agregaron los servicios \`http\`, \`https\`, \`ftp\`, \`ssh\`, \`smtp\` e \`imap\`.
* **Zona Desmilitarizada (DMZ)**: Se configuró a través de **iptables**, redirigiendo las peticiones del exterior a la DMZ para mejorar la seguridad de la red local.

Se utilizó **NMAP** para ejecutar un script de vulnerabilidades, encontrando una vulnerabilidad de fuerza de grupo DH insuficiente en el intercambio de claves **Diffie-Hellman** en el puerto 25 (**smtp**). Se corrigió creando una clave DH de **2048 bits** con **OpenSSL** y modificando la configuración de postfix para usar esta clave y evitar otros cifrados.
    `,
        tags: ["Apache", "vsFTTP", "Bind9", "DOVECOT", "OpenSSH", "NMAP"],
        links: {
            docs: "https://www.youtube-nocookie.com/embed/Hqxtd_YBrJM"
        },
        media: [
            {
                id: 1,
                type: "image",
                url: "src/assets/imageProject/servidor/servidor-web.png",
                alt: "Servidor Web en Linux",
                title: "Servidor Web",
            },
            {
                id: 2,
                type: "image",
                url: "src/assets/imageProject/servidor/servidor-imap.png",
                alt: "Servidor IMAP en Linux",
                title: "Servidor IMAP",
            },
            {
                id: 3,
                type: "image",
                url: "src/assets/imageProject/servidor/servidor-ssh.png",
                alt: "Servidor SSH en Linux",
                title: "Servidor SSH",
            }
        ],
    },
    {
        id: "PRJ-07",
        title: "Robota (3D Web App)",
        shortDescription: "Aplicación Web **3D** que permite al usuario interactuar con contenido 3D, generada a través de animaciones por *keyframing* y *motion capture* en **Blender**.",
        icon: "src/assets/imageProject/robota/robota-main.png",
        longDescription: `
Aplicación Web **3D** que permite al usuario interactuar con contenido 3D, generada a través de animaciones por *keyframing* y *motion capture* en **Blender**.

* **Modelado y Animación**: Se usó **Blender**  para el modelado de objetos, la escena y las animaciones, utilizando técnicas de *keyframing* con un esqueleto y *motion capture* (con animaciones descargadas de **MIXAMO**).
* **Aplicación Web**: Se usó **JavaScript** con la librería **Three.js**  para mostrar los gráficos y las animaciones en 3D en la aplicación web.

    `,
        tags: ["Blender", "Three.js", "JavaScript", "HTML", "CSS", "MIXAMO"],
        links: {
            demo: "https://proyecto-03-robota--garangmig.replit.app"
        },
        media: [
            {
                id: 1,
                type: "image",
                url: "src/assets/imageProject/robota/robota-code.png",
                alt: "Código de Robota",
                title: "Código de Robota",
            },
            {
                id: 2,
                type: "image",
                url: "src/assets/imageProject/robota/robota-blender.png",
                alt: "Diseño de robot en Blender",
                title: "Diseño de robot en Blender",
            },
            {
                id: 3,
                type: "image",
                url: "src/assets/imageProject/robota/robota-web.png",
                alt: "Robota en Web",
                title: "Robota en Web",
            }
        ],
        metrics: [
            {
                name: "Optimización de Renderizado",
                value: "60 FPS Constantes",
                number: 60,
                unit: "FPS",
                description: "Optimización de mallas y texturas en Blender para garantizar una tasa de 60 cuadros por segundo en navegadores modernos, utilizando WebGL a través de Three.js para una navegación fluida."
            },
            {
                name: "Control de Escena en Tiempo Real",
                value: "Interactividad 3D",
                description: "Desarrollo de una interfaz que permite al usuario manipular la cámara y activar animaciones específicas mediante eventos de JavaScript, integrando el DOM con el canvas 3D de manera bidireccional."
            }
        ]
    },
    {
        id: "PRJ-08",
        title: "Red Neuronal (Cáncer)",
        shortDescription: "Creación de una **Red Neuronal** para identificar el **cáncer de mama maligno** a partir de los casos clínicos del Dr. William H. Wolberg.",
        icon: "src/assets/imageProject/rn/rn-main.png",
        longDescription: `
Creación de una **Red Neuronal** para identificar el **cáncer de mama maligno** a partir de los casos clínicos del Dr. William H. Wolberg.


Utilizando el conjunto de datos de cáncer de mama de **UCI** (9 atributos de diagnóstico, 1 atributo destino: benigno/maligno). Se usaron 683 muestras (se eliminaron 16 incompletas): 500 para entrenamiento y 183 para prueba.

La red neuronal se creó con **Keras** (integrado en **TensorFlow**) , y consta de 3 capas:
1.  **Capa de entrada**: 9 datos de entrada, 3 neuronas, función de activación **ReLU**.
2.  **Primera capa oculta**: 1 capa oculta, 3 neuronas, función de activación **ReLU**.
3.  **Capa de salida**: 1 neurona, función de activación **Sigmoid** (salida entre 0 y 1, probabilidad de cáncer benigno/maligno).

**Optimización**: Se usó el optimizador **Adam**.
**Función de coste**: Se usó **Binary Cross-Entropy** (Entropía cruzada binaria).
**Función de evaluación**: Se usó **accuracy** (porcentaje de aciertos).

**Resultados**: La red neuronal obtenida tuvo una **pérdida de 0.0816** y un **acierto del 96.8%**.

Evaluando el conjunto de 183 registros de prueba :
* 125 benignos predichos como benignos.
* 2 benignos predichos como malignos (Falsos Positivos).
* 0 malignos predichos como benignos (Falsos Negativos).
* 56 malignos predichos como malignos.

    `,
        tags: ["Python", "TensorFlow", "Keras", "Pandas", "numpy",],
        links: {
        },
        media: [
            {
                id: 1,
                type: "image",
                url: "src/assets/imageProject/rn/rn-result.png",
                alt: "Resultados de la Red Neuronal",
                title: "Resultados de la Red Neuronal",
            },
            {
                id: 2,
                type: "image",
                url: "src/assets/imageProject/rn/rn-acurracy.png",
                alt: "Exactitud de la Red Neuronal",
                title: "Exactitud de la Red Neuronal",
            },
            {
                id: 3,
                type: "image",
                url: "src/assets/imageProject/rn/rn-keras.png",
                alt: "Resultados de la Red Neuronal",
                title: "Resultados de la Red Neuronal",
            }
        ],
        metrics: [
            {
                name: "Exactitud (Accuracy)",
                value: "96.8% de Aciertos",
                number: 96.8,
                unit: "%",
                description: "Porcentaje total de diagnósticos correctos tras evaluar 183 registros de prueba independientes, utilizando una arquitectura de red neuronal densa con optimizador Adam."
            },
            {
                name: "Sensibilidad Clínica",
                value: "100% (Malignidad)",
                number: 100,
                unit: "%",
                description: "Capacidad crítica del modelo para identificar todos los casos malignos sin generar Falsos Negativos (0 omisiones), garantizando que ningún paciente con cáncer pase desapercibido."
            },
            {
                name: "Pérdida (Binary Cross-Entropy)",
                value: "0.0816 Loss",
                number: 0.0816,
                unit: "number",
                description: "Bajo nivel de entropía cruzada binaria que demuestra una alta confianza en las predicciones probabilísticas, minimizando la incertidumbre entre los resultados benignos y malignos."
            }
        ]
    },

];