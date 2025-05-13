---
title: "LLMs, Vibe Coding y el desarrollo de software"
categories:
  - IA
tags:
  - Vibe Coding
  - LLM
  - Software Development
toc: true
toc_label: "Índice"
toc_sticky: true
excerpt: "Reflexión sobre el uso de LLMs, el vibe coding y algunos conceptos clave para un uso responsable de la IA."
header:
  overlay_image: /assets/images/header-llm-vibe-coding-software.png
  overlay_filter: 0.6
  teaser: /assets/images/teaser-llm-vibe-coding-software.png
---
# LLMs, Vibe Coding y el desarrollo de software

# Introducción

El auge de los LLMs está redefiniendo industrias enteras, y el desarrollo de software no es una excepción. Su capacidad para generar código, potenciar la autoformación o asistir en tareas de depuración ha abierto un abanico de posibilidades que apenas estamos comenzando a explorar. Aunque su enorme potencial es evidente, esta nueva era también presenta desafíos y riesgos sobre los que merece la pena reflexionar.

La idea de este texto surge tras la lectura del artículo _"<a href="https://blog.sshh.io/p/how-to-stop-your-human-from-hallucinating" target="_blank">How to stop your human from hallucinating</a>"_, de Shrivu Shankar. El paralelismo que traza entre las alucinaciones de los LLMs y los errores humanos me resultó tremendamente interesante. En él, Shrivu argumenta cómo los profesionales competentes pueden cometer errores _(alucinaciones)_ si los procesos o la comunicación son imprecisos, de forma similar a como un LLM falla debido a la falta de contexto o datos ambiguos. La clave estaría no en culpar al individuo _(o la IA)_, sino en **mejorar los sistemas, los procesos y la información con la que operan**.

En este artículo, partiendo de uno de los conceptos de moda (el famoso _Vibe Coding_), abordaremos **desafíos, riesgos y buenas prácticas que consideramos cruciales para el uso responsable y efectivo de los LLMs** en el contexto del desarrollo de software.

El objetivo es evitar que nuestras herramientas, y sobre todo nosotros mismos, alucinemos en el proceso.

# Vibe Coding

## Concepto y origen

El término fue popularizado por <a href="https://en.wikipedia.org/wiki/Andrej_Karpathy" target="_blank">Andrej Karpathy</a>, una de las figuras más influyentes del campo de la inteligencia artificial durante febrero de 2025. En una <a href="https://x.com/karpathy/status/1886192184808149383" target="_blank">serie de tweets</a>, además de introducir el término, enfatiza lo divertido de la práctica y lo útil que lo ve para _"proyectos de fin de semana de usar y tirar"_.

**La técnica consiste en proporcionar a la IA indicaciones en lenguaje natural y aceptar el código resultante basándose más en una "sensación" o "intuición" _("vibe")_ de que podría funcionar, que en un análisis riguroso** o un conocimiento de su funcionamiento interno. Aceptar la respuesta del LLM, aplicar sin comprobar el diff, y seguir lanzando prompts hasta que la feature objetivo funcione: _"Just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works"_

El atractivo psicológico es tremendo, basado en dos factores muy potentes: la ilusión de una productividad acelerada, y la gratificación instantánea. **La promesa de "poder crear" sin requerir un aprendizaje o esfuerzo es algo difícil de ignorar**. Especialmente cuando se combina con la fascinación actual que existe con las capacidades de la IA.

Sin embargo, todo esto esconde importantes contrapartidas que analizamos a continuación, y sobre las que Karpathy ya hizo _spoiler_ en su famoso tweet de Febrero de 2025.

## Algunas ventajas, pero muchas limitaciones

Empecemos resaltando su principal virtud, y en mi opinión, su utilidad real: **la creación rápida de POCs, la exploración semi-instantánea de ideas, conceptos…** incluso por parte de perfiles sin una base técnica fuerte. Ya no hace falta profundizar en lenguajes o frameworks para validar _"eso que se te ha pasado por la cabeza"_. En este sentido, puede **actuar como un catalizador de la creatividad**, permitiendo materializar ideas de forma preliminar con una velocidad antes impensable.

Pero **todo cambia cuando se plantea trasladar este estilo de trabajo a un entorno productivo**. Esa promesa de velocidad, corre el riesgo de transformarse rápidamente en un obstáculo. Sin una estrategia global, y una supervisión, es fácil que termine desembocando en un _"kaos técnico"_: dificultad de mantenimiento, extensión e incluso comprensión, agravado por las dificultades inherentes de los modelos para entender un contexto demasiado amplio, y las interdependencias entre proyectos y sistemas de gran envergadura.

Algunas problemáticas concretas:

* **La calidad del código:** A bajo nivel, la incoherencia, <a href="https://www.gitclear.com/ai_assistant_code_quality_2025_research" target="_blank">la falta de patrones de diseño sólidos y la perpetuación de soluciones erróneas</a>[^1] (aprendidas por el LLM de sus datos de entrenamiento) hacen que el software sea difícil de mantener y escalar. Pero sobre todo, personalmente me preocupa a alto nivel, la falta de una arquitectura coherente derivada de múltiples intervenciones aisladas de la IA compromete seriamente la integridad del sistema.
* **Las vulnerabilidades:** Surgen tanto del uso incorrecto o no supervisado de librerías y funcionalidades, como de las propias alucinaciones de los LLMs. Son ya un <a href="https://www.theregister.com/2025/04/12/ai_code_suggestions_sabotage_supply_chain/" target="_blank">vector de riesgo identificado e importante</a>[^2]. Por ejemplo, el exploit de alucinaciones en imports comunes ha dado lugar a una nueva forma de <a href="https://capec.mitre.org/data/definitions/630.html" target="_blank">typosquatting</a>[^3], rebautizada como "<a href="https://socket.dev/blog/slopsquatting-how-ai-hallucinations-are-fueling-a-new-class-of-supply-chain-attacks" target="_blank">slopsquatting</a>"[^4].
* **Soluciones ineficaces o subóptimas:** Causadas por la tendencia natural de los LLMs hacia el uso de fuerza bruta en sus soluciones. Algoritmos ineficientes que impactan negativamente en el rendimiento y la mantenibilidad. <a href="https://arxiv.org/pdf/2502.12115" target="_blank">Este efecto se acentúa en los contextos grandes, en proyectos reales.</a>[^5]
* **Dependencia excesiva de la IA:** Esta situación puede incluso derivar en una forma de vendor lock-in con la propia IA. Debido a las problemáticas listadas, es sencillo entrar en un modelo de dependencia, donde sólo una IA parece capaz de entender el código, creando una efecto bola de nieve y haciendo insostenible una solución a largo plazo.

Tras la parte negativa, ahora toca destacar que **estos problemas no son una condena inevitable**, sino que **se relacionan directamente con la ausencia de un marco de uso responsable y una supervisión crítica constante**. El _Vibe Coding_, como Karpathy dijo, es divertido y útil, pero la adopción en entornos productivos de la IA requiere un enfoque diferente. Un enfoque que a menudo se ve comprometido por la urgencia y las presiones del mercado.

# El espejismo del FOMO y la presión competitiva

Hoy en día el FOMO _(Fear of Missing Out)_ es bien conocido por todo el mundo. Industrias como las relacionadas con el entretenimiento (videojuegos, cine y series, música…) giran en torno a este concepto: si no estás ahí YA y AHORA, _"no disfrutas"_.

Pero ese miedo no es exclusivo de ellas, existe en también en el desarrollo de software, y unido a la presión competitiva del contexto actual, es muy difícil de ignorar.  El problema es que suele llevar a tomar decisiones precipitadas, a menudo sin una debida reflexión ni planificación estratégica sólida.

Hay preguntas y dudas que resuenan en la mente de cualquiera:  _"¿Si todo el equipo utilizase IA, sobraría gente?", "Si no la usase, ¿seguiría siendo competitivo?", "¿Puedes siquiera ser competitivo a largo plazo sin utilizarla?"_

En mi opinión, no se trataría tanto de que "sobrara gente", sino de que **la productividad del equipo se dispararía exponencialmente si se adopta con un enfoque adecuado**. Por otra parte, un equipo talentoso y bien organizado creo firmemente que puede seguir siendo competitivo sin adoptar la IA, sin duda, pero estaría renunciando a un multiplicador de fuerza e innovación significativo. Con el impacto que eso puede tener cuando hablamos de largo plazo.

La sensación generalizada es que no hay opción de "bajarse de este barco". **La verdadera cuestión no es si adoptar o no los LLMs, sino cómo integrar de forma responsable y estratégica una herramienta de este calibre.** No dejarnos llevar por el FOMO, hacerlo con buena letra.

# El cambio de paradigma

El proceso, por la naturaleza disruptiva del mismo, va más allá de una adopción estándar de una nueva herramienta. Debe producirse un cambio de paradigma fundamental. No sólo cambiará nuestros procesos y formas de trabajar, sino que exigirá una evolución en cómo nosotros, como humanos, interactuamos y hacemos uso de estas herramientas. Para navegar esta transformación con éxito, es crucial **abordar tanto la dimensión humana y psicológica como los aspectos técnicos y organizativos** que implica.

## El enfoque humano y psicológico

Tres conceptos clave, que cualquier usuario de LLMs debería tener en cuenta.

### Humildad epistémica: La base del juicio crítico

El primer pilar para una interacción responsable prácticamente con cualquier fuente de información, pero especialmente con los LLMs es la <a href="https://en.wikipedia.org/wiki/Epistemic_humility" target="_blank">humildad epistémica</a>. El concepto invita a **reconocer las limitaciones y sesgos de cualquier conocimiento** _(incluso el propio)_. Aplicado a los LLMs implica asimilar que, a pesar de su impresionante capacidad para generar texto coherente y código funcional, no "comprenden" en el sentido humano. Creo sinceramente que el llamarlo Inteligencia Artificial juega en nuestra contra en ese sentido. Es importante entender que no es más que un proceso de generación estadístico. Terriblemente complejo y avanzado, pero no inteligente en el sentido estricto de la palabra.

Por tanto, <a href="https://www.linkedin.com/pulse/epistemic-humility-ai-fork-road-knowledge-creation-daisy-thomas-saqge/" target="_blank">deberíamos cuestionar sistemáticamente las respuestas aportadas por la IA en lugar de aceptarlas ciegamente</a>[^6] (hola de nuevo _Vibe Coding\!_). **Verificar, validar, contrastar… es la clave en un contexto en el que generar contenido es tan sencillo**. Esta humildad debe extenderse también a nosotros: debemos ser conscientes de que juzgar la calidad y corrección de las respuestas de un LLM requiere un esfuerzo cognitivo real y, a menudo, un conocimiento experto del dominio.

Solo desde este reconocimiento de las limitaciones mutuas (de la IA, y las nuestras) podemos ejercer un juicio crítico verdaderamente efectivo.

### Superando la indiferencia: El compromiso del técnico

Ligado directamente al concepto anterior, hay que destacar la necesidad de superar lo que se denomina la indiferencia epistemológica (<a href="https://www.pdcnet.org/8525737F00583637/file/57470D980359184D85258316006B0C15/$FILE/jpr_2018_0043_0000_0005_0024.pdf" target="_blank">_"Epistemic Insouciance_</a>"[^7]). Este término hace referencia a una **actitud de desinterés o despreocupación por la verdad o exactitud del conocimiento**. Es una situación relativamente común en el contexto social actual, donde la explosión de _fake news_ y contenidos falsos inunda redes y medios. Generando en el usuario una actitud de rechazo o indiferencia, donde la veracidad pierde importancia frente a contenidos que confirman sus expectativas.

La clave aquí es que un _"ciudadano"_ puede permitirse esa actitud en el día a día, pero un _"técnico"_, tiene una responsabilidad activa hacia el conocimiento. **Un enfoque de indiferencia, no sólo resulta insostenible sino que es peligroso para un profesional de cualquier ámbito**, y en el desarrollo de software no es diferente. Un desarrollador no puede permitirse el lujo de ser indiferente ante la calidad, la corrección o las implicaciones del código que escribe, integra o revisa.

No sólo se trata de _"hacer que funcione"_, sino de _"saber cómo funciona"_. Y sobre todo asegurar que funciona de forma segura y eficiente. La indiferencia epistemológica, en el desarrollo de software moderno asistido por IA, no es una opción. Es el camino más directo hacia el _"kaos técnico"_ que comentamos en puntos anteriores.

### Descarga cognitiva estratégica

El concepto de <a href="https://www.sciencedirect.com/science/article/abs/pii/S1364661316300985" target="_blank">descarga cognitiva</a>[^8] se refiere básicamente a _"reducir el esfuerzo mental necesario para ejecutar una tarea mediante el uso de recursos externos"_. En el contexto que estamos tratando, la relación es evidente. Delegamos la generación de código, búsqueda de información y demás tareas, liberando nuestra capacidad mental para otros objetivos. Y ahora ya imaginaréis por donde va a ir el siguiente razonamiento: esta aparente comodidad conlleva el <a href="https://www.mdpi.com/2075-4698/15/1/6" target="_blank">riesgo de atrofia de nuestras propias habilidades cognitivas</a>[^9][^10] si caemos en una delegación indiscriminada y, sobre todo, pasiva.

Es precisamente en este punto donde la descarga cognitiva estratégica se vuelve clave. No implica una renuncia, pero sí **es recomendable ser cuidadoso y selectivo sobre qué tareas delegamos y cuáles reservamos para nuestro _"músculo mental"_**. La tendencia que a priori suena más lógica es, precisamente, reservar nuestra energía para aquellas actividades que requieran un elevado juicio crítico, creatividad, o un profundo conocimiento del dominio y el contexto. Algunas de estas actividades podrían incluir:

* Diseño de arquitecturas.
* Revisión del código, especialmente el generado por IA.
* Resolución de problemas complejos, que requieran una comprensión holística del sistema.
* Toma de decisiones estratégicas sobre tecnologías a utilizar o estrategias a aplicar.

Esto tiene un aspecto positivo importante, y es que al enfocar nuestro esfuerzo en aspectos de mayor nivel, no sólo mitigamos el desaprendizaje, sino que podemos incluso refinar y profundizar en competencias nuevas o más valiosas.

## El enfoque técnico y organizativo

Temas tan cruciales como la seguridad, la privacidad o la selección de modelos ya han sido tratados en multitud de artículos, por lo que aquí nos centraremos en otros aspectos que consideramos igualmente relevantes.

### Prompts como Código (PaC): Trazabilidad y reproducibilidad

A medida que los LLMs se integran en el proceso de desarrollo, y la generación de código va tomando presencia, la gestión de los prompts que alimentan estos modelos adquiere una importancia crítica. Una buena práctica es <a href="https://medium.com/data-science-collective/version-control-for-prompts-why-it-matters-and-how-to-do-it-right-af2e334dd22c" target="_blank">apostar por un enfoque _"prompts-as-a-code"_</a>[^11], tratando las instrucciones que aportamos a los modelos con el mismo rigor y buenas prácticas que aplicamos al código fuente tradicional.

Este paradigma incluye el versionado y documentación de cada prompt. Pero va más allá de simplemente guardar diferentes versiones. Implica una trazabilidad completa de cambios (_qué_ cambió y _por qué_), la capacidad de revertir a versiones anteriores, pruebas de prompts antes de desplegarlos, gestión de variaciones A/B o rastreo de versiones por entorno. **El objetivo es que cualquier cambio relacionado con los prompts o modelos sea auditable y reproducible, permitiendo rastrear cómo y por qué la salida de un LLM ha variado con el tiempo**. Esto es crucial en entornos con alta generación de código automático. Un pequeño cambio en un prompt, o en el modelo subyacente, puede tener un impacto significativo en la funcionalidad, consistencia o seguridad del producto final.

Más allá del versionado, también debería enmarcar una gestión de prompts más amplia. **Considerarlos parte de la infraestructura de la aplicación**. Esto puede incluir desde la capacidad para realizar actualizaciones en caliente, monitorizar rendimiento y outputs, gestionar controles de acceso o coordinar cambios entre diferentes servicios.

La clave diferencial con el control de versiones tradicional es la naturaleza no determinista de los LLMs. No basta con pruebas unitarias sobre el prompt, **se requiere de un seguimiento continuo del output de los modelos** para gestionar esta variabilidad. Existen multitud de herramientas especializadas para facilitar la implantación, aunque la opción del uso directo de Git y su integración en pipelines es siempre una opción válida.

### Gobernanza y responsabilidad compartida

El proceso de integración de este tipo de herramientas requiere del establecimiento de marcos de gobernanza claros y, sobre todo, robustos. Tal y como destacan en <a href="https://www.sciencedirect.com/science/article/pii/S0963868724000672" target="_blank">_"Responsible artificial intelligence governance: A review and research framework"_</a>[^12], deberían basarse en un conjunto de prácticas estructurales, procedimentales y relacionales diseñadas para asegurar que los sistemas operen de manera ética, transparente y alineada con los valores humanos. Aspectos esenciales para **asegurar no sólo un uso legal, sino también seguro y eficiente** de este tipo de tecnología.

Estos marcos deben definir explícitamente roles y responsabilidades dentro de la organización. Este tema se trata en detalle en el artículo _"<a href="https://www.sngular.com/es/insights/356/gobernanza-de-la-inteligencia-artificial-desafios-y-perspectivas" target="_blank">Gobernanza de la Inteligencia Artificial</a>"_[^13]. Aunque la dirección establezca la visión, y el departamento legal asegure el cumplimiento, **la gobernanza es una responsabilidad compartida** que involucra múltiples niveles y áreas especializadas. Esto podría incluso incluir la asignación de figuras clave como _guardianes_ o _responsables_ de la IA _(AI Stewards)_. Lo que está claro es que la asignación de responsabilidades es fundamental para cada etapa del ciclo de vida, y las auditorías internas deberían enfocarse en ayudar a verificar estas políticas establecidas.

Aunque pueda sonar a un proceso burocrático más, una gobernanza bien implementada actúa como catalizador y debe potenciar la innovación precisamente al asegurar que esta se produce de una forma segura y sostenible. Casos como el <a href="https://www.sngular.com/es/insights/365/fakeeh-care-group-y-sngular-se-alian-para-impulsar-la-inteligencia-artificial-en-el-sector-sanitario-de-arabia-saudi" target="_blank">Centro de Excelencia de IA impulsado por Sngular y Fakeeh Care Group</a>[^14] son un claro ejemplo. Permite a las corporaciones **explotar y maximizar el potencial de la IA con mayor confianza**, minimizando riesgos y asegurando que los beneficios se materialicen de acuerdo con los objetivos y valores de la organización. Alcanzar un modelo de innovación responsable.

### Quality Engineering: pilar estratégico en la era de los LLMs

Tomando como partida los puntos anteriores, se desprende claramente que la figura ya clave de _Quality Engineering_ evolucionará para convertirse en un rol aún más estratégico.

Se introducen **nuevos desafíos que exigen una evolución en las prácticas tradicionales de QA/QE**, el más claro es la naturaleza no determinista de los sistemas basados en LLMs. Ya no es suficiente con probar funcionalidades con entradas y salidas predecibles, es necesario adaptarse a esa variabilidad y posibles comportamientos inesperados. El nuevo alcance no se limita sólo a la validación del código generado, también deberá abarcar aspectos como:

* **Validación del proceso de generación:** Calidad y robustez de los prompts y configuraciones que generan código. Evaluar reacciones ante entradas inesperadas o maliciosas.
* **Detección de alucinaciones y sesgos:** Identificar cuándo el LLM inventa o reproduce sesgos indeseados.
* **Pruebas de regresión sobre modelos:** Asegurar que las nuevas versiones de los LLMs o los reentrenamientos no degradan o rompen funcionalidades previas.

La relevancia de estas prácticas y retos es evidente. Nuestro compañero Fran Moreno <a href="https://www.linkedin.com/posts/franciscomorenosanz\_explorando-los-retos-en-el-testing-de-activity-7235214432476246018-Sea\_" target="_blank">ya había comentado desafíos similares</a>[^15] a los que se enfrentó en la implementación real de proyectos. En su caso, una estrategia de regresión sobre modelos entrenados para utilizar otro modelo como validador, solventando el problema del no determinismo en la respuesta.

### Formación contínua: Upskilling & Reskilling

Para finalizar, ninguna estrategia técnica u organizativa es efectiva si no lleva consigo un proceso de mejora y adquisición de esas nuevas competencias por parte de los equipos. Esta capacitación debería alinearse con lo comentado hasta ahora, no sólo es manejo de la IA, es también asimilar conceptos de _prompt engineering_ efectivo y desarrollar esas capacidades de revisión crítica que se han tratado.

En esencia, es lo mismo de siempre, una constante en el sector: **fomentar una cultura de aprendizaje y adaptación**. Algo más complejo en este caso, por la naturaleza de la herramienta incorporada, pero con un potencial de recompensa mayor si se alcanza ese punto dulce de eficiencia, responsabilidad e innovación en el uso de la IA.

# Conclusión

La era de los LLM es una de promesas y peligros _(como casi todas por otra parte…)_ . Si el _Vibe Coding_ funciona perfectamente como una advertencia de lo que puede ocurrir con una adopción a ciegas, la oportunidad de verdad reside en la integración de estas herramientas con juicio humano, responsabilidad y una estrategia clara.

Usar la IA como un "copiloto", con el humano siempre conduciendo. Balancear velocidad y robustez, fomentar el escepticismo y dominar la habilidad de usar _(y no usar)_ los LLMs de forma eficaz.

La humildad epistémica, el compromiso técnico, la estrategia de _prompts-as-a-code_, la definición de una gobernanza sólida o la importancia de una estrategia de calidad adecuada no son más que los mimbres con los que lograr el objetivo que apuntábamos al principio: la adopción exitosa, y evitar que tanto máquinas como humanos _"alucinemos"_ en el proceso.

[^1]:  [https://www.gitclear.com/ai\_assistant\_code\_quality\_2025\_research](https://www.gitclear.com/ai_assistant_code_quality_2025_research)

[^2]:  [https://www.theregister.com/2025/04/12/ai\_code\_suggestions\_sabotage\_supply\_chain/](https://www.theregister.com/2025/04/12/ai_code_suggestions_sabotage_supply_chain/)

[^3]:  [https://capec.mitre.org/data/definitions/630.html](https://capec.mitre.org/data/definitions/630.html)

[^4]:  [https://socket.dev/blog/slopsquatting-how-ai-hallucinations-are-fueling-a-new-class-of-supply-chain-attacks](https://socket.dev/blog/slopsquatting-how-ai-hallucinations-are-fueling-a-new-class-of-supply-chain-attacks)

[^5]:  [https://arxiv.org/pdf/2502.12115](https://arxiv.org/pdf/2502.12115)

[^6]:  [https://www.linkedin.com/pulse/epistemic-humility-ai-fork-road-knowledge-creation-daisy-thomas-saqge/](https://www.linkedin.com/pulse/epistemic-humility-ai-fork-road-knowledge-creation-daisy-thomas-saqge/)

[^7]:  [https://www.pdcnet.org/8525737F00583637/file/57470D980359184D85258316006B0C15/$FILE/jpr\_2018\_0043\_0000\_0005\_0024.pdf](https://www.pdcnet.org/8525737F00583637/file/57470D980359184D85258316006B0C15/$FILE/jpr_2018_0043_0000_0005_0024.pdf)

[^8]:  [https://www.sciencedirect.com/science/article/abs/pii/S1364661316300985](https://www.sciencedirect.com/science/article/abs/pii/S1364661316300985)

[^9]:  [https://www.mdpi.com/2075-4698/15/1/6](https://www.mdpi.com/2075-4698/15/1/6)

[^10]:  [https://drphilippahardman.substack.com/p/the-impact-of-gen-ai-on-human-learning](https://drphilippahardman.substack.com/p/the-impact-of-gen-ai-on-human-learning)

[^11]:  ​​[https://medium.com/data-science-collective/version-control-for-prompts-why-it-matters-and-how-to-do-it-right-af2e334dd22c](https://medium.com/data-science-collective/version-control-for-prompts-why-it-matters-and-how-to-do-it-right-af2e334dd22c)

[^12]:  [https://www.sciencedirect.com/science/article/pii/S0963868724000672](https://www.sciencedirect.com/science/article/pii/S0963868724000672)

[^13]:  [https://www.sngular.com/es/insights/356/gobernanza-de-la-inteligencia-artificial-desafios-y-perspectivas](https://www.sngular.com/es/insights/356/gobernanza-de-la-inteligencia-artificial-desafios-y-perspectivas)

[^14]:  [https://www.sngular.com/es/insights/365/fakeeh-care-group-y-sngular-se-alian-para-impulsar-la-inteligencia-artificial-en-el-sector-sanitario-de-arabia-saudi](https://www.sngular.com/es/insights/365/fakeeh-care-group-y-sngular-se-alian-para-impulsar-la-inteligencia-artificial-en-el-sector-sanitario-de-arabia-saudi)

[^15]:  [https://www.linkedin.com/posts/franciscomorenosanz\_explorando-los-retos-en-el-testing-de-activity-7235214432476246018-Sea\_](https://www.linkedin.com/posts/franciscomorenosanz_explorando-los-retos-en-el-testing-de-activity-7235214432476246018-Sea_)