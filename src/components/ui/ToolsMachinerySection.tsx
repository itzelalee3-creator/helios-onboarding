"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Cog,
  Hammer,
  ImageOff,
  PaintRoller,
  Ruler,
  Scissors,
  Search,
  SquarePlay,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface ToolInfo {
  id: string;
  name: string;
  /**
   * Exact filename (spaces/accents/case preserved) of the real photo,
   * copied into `public/` as-is — e.g. "Martillo de uña curva.jpeg".
   * Omitted for tools that don't have a real photo yet.
   */
  image?: string;
  useCase: string;
  epp: string[];
  practices: string[];
  // "" cuando la herramienta aún no tiene video asignado — el botón de
  // YouTube en el modal se oculta en ese caso. No se generan URLs sin que
  // el usuario las proporcione.
  youtubeUrl: string;
}

interface ToolEntry {
  id: string;
  /** Short text shown on the entry's tab. */
  label: string;
  /** Leaf entry: a single tool. Mutually exclusive with `subTools`. */
  tool?: ToolInfo;
  /** Group entry (e.g. "Discos para Esmeril/Amoladora"): nested menu. */
  subTools?: ToolInfo[];
}

interface ToolCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  entries: ToolEntry[];
}

const CATEGORIES: ToolCategory[] = [
  {
    id: "corte",
    label: "Corte y Desbaste",
    icon: Scissors,
    entries: [
      {
        id: "navajas-cutters",
        label: "Navajas y Bisturís / Cúters",
        tool: {
          id: "navajas-cutters",
          name: "Navajas, Bisturís y Cúters",
          image: "NAVAJA.webp",
          useCase:
            "Corte de precisión de balsa, pino, cartulina y films termoadhesivos en piezas delgadas — la herramienta de corte más usada del taller sobre base de corte.",
          epp: ["Lentes de protección"],
          practices: [
            "Corta siempre alejando la hoja de tu cuerpo y de tu mano de apoyo.",
            "Usa siempre una base de corte, nunca cortes directamente sobre la mesa.",
            "Cambia la hoja en cuanto pierda filo — una hoja desafilada obliga a forzar el corte.",
          ],
          youtubeUrl: "https://youtu.be/GR9JqrJghYM?si=EGgSbAR0OFaMllYz",
        },
      },
      {
        id: "segueta-manual",
        label: "Segueta manual",
        tool: {
          id: "segueta-manual",
          name: "Segueta Manual con Marco",
          image: "SEGUETA MANUAL.jpg",
          useCase:
            "Cortes manuales controlados en varillas de pino, pequeñas cuadernas y perfiles metálicos/plásticos delgados.",
          epp: ["Lentes de protección", "Guantes de trabajo"],
          practices: [
            "Mantener la tensión adecuada de la hoja y asegurar firmemente la pieza en el tornillo o prensa antes de cortar.",
          ],
          youtubeUrl: "",
        },
      },
      {
        id: "lima-bellota",
        label: 'Lima triangular Bellota 6"',
        tool: {
          id: "lima-bellota",
          name: "Lima Triangular Bellota de 6 Pulgadas",
          image: "Lima triangular bellota 6.jpeg",
          useCase:
            "Limado de esquinas interiores, rectificado de muescas rectangulares y biselado de piezas de madera o metal.",
          epp: ["Lentes de protección"],
          practices: [
            "Utilizar siempre con mango protector bien ajustado y limpiar las virutas con cepillo de alambre, nunca con la mano.",
          ],
          youtubeUrl: "",
        },
      },
      {
        id: "portalijas",
        label: "Portalijas",
        tool: {
          id: "portalijas",
          name: "Portalijas Manual de Taller",
          image: "PORTALIJAS.jpg",
          useCase:
            "Lijado uniforme y plano de bloques de balsa, bordes de ataque y perfiles alares sin deformar la madera.",
          epp: ["Mascarilla antipolvo", "Lentes de protección"],
          practices: [
            "Utilizar movimientos continuos a favor de la beta de la madera para evitar astillamiento.",
          ],
          youtubeUrl: "https://youtu.be/2kfzNUnpfqw?si=7R3EsG3gmeVjtmDX",
        },
      },
      {
        id: "discos-esmeril",
        label: "Discos para Esmeril/Amoladora",
        subTools: [
          {
            id: "disco-laminas",
            name: "Disco de Láminas",
            image: "DISCO DE LAMINAS.jpg",
            useCase:
              "Desbaste y acabado de superficies metálicas con un corte más suave que el disco de desbaste.",
            epp: ["Careta facial", "Guantes"],
            practices: [
              "Verifica que el disco esté certificado para la velocidad máxima de la amoladora.",
              "Inspecciona el disco antes de cada uso — nunca lo utilices si está agrietado o desgastado de forma irregular.",
              "Sujeta la pieza firmemente y mantén el cuerpo fuera de la línea de proyección de chispas.",
            ],
            youtubeUrl: "https://youtu.be/4MPPD7mPoY0?si=CkoKCSXO6vdye_m8",
          },
          {
            id: "disco-desbaste",
            name: "Disco de Desbaste",
            image: "DISCO DE DESVASTE.jpg",
            useCase:
              "Remoción rápida de material y rebabas en piezas y soportes metálicos.",
            epp: ["Careta facial", "Guantes"],
            practices: [
              "Nunca uses un disco de desbaste para cortar — está diseñado solo para desbastar.",
              "Aplica presión moderada y constante, sin forzar el disco.",
              "Deja que la amoladora alcance velocidad completa antes de tocar el material.",
            ],
            youtubeUrl: "https://youtu.be/4MPPD7mPoY0?si=CkoKCSXO6vdye_m8",
          },
          {
            id: "disco-abrasivo",
            name: "Disco Abrasivo (Corte)",
            image: "DISCO DE CORTE.jpg",
            useCase:
              "Corte de perfiles y varillas metálicas para soportes y herramentales del taller.",
            epp: ["Careta facial", "Guantes"],
            practices: [
              "Sujeta la pieza firmemente con una prensa antes de cortar.",
              "Corta en línea recta sin forzar el disco lateralmente — puede romperse.",
              "Nadie debe estar en la línea de proyección del disco mientras se usa.",
            ],
            youtubeUrl: "https://youtu.be/4MPPD7mPoY0?si=CkoKCSXO6vdye_m8",
          },
          {
            id: "disco-flap",
            name: "Disco Flap",
            image: "DISCO FLAP.webp",
            useCase:
              "Acabado y pulido fino de soldaduras y bordes metálicos después del desbaste.",
            epp: ["Careta facial", "Guantes"],
            practices: [
              "Usa movimientos suaves y constantes para evitar marcar la superficie.",
              "Verifica que el disco esté bien asegurado antes de encender la amoladora.",
              "Deja enfriar la pieza antes de tocarla — el pulido genera calor por fricción.",
            ],
            youtubeUrl: "https://youtu.be/4MPPD7mPoY0?si=CkoKCSXO6vdye_m8",
          },
        ],
      },
    ],
  },
  {
    id: "maquinas",
    label: "Máquinas y Rotativas",
    icon: Cog,
    entries: [
      {
        id: "dremel-lite-7760",
        label: "Dremel Lite (7760)",
        tool: {
          id: "dremel-lite-7760",
          name: "Dremel Lite Rotativa Inalámbrica (7760)",
          image: "Dremel Lite (Modelo 7760).webp",
          useCase:
            "Versión ligera de la rotativa Dremel para retoques rápidos, grabado fino y desbaste en piezas pequeñas.",
          epp: ["Lentes de protección", "Mascarilla antipolvo"],
          practices: [
            "Revisa que el accesorio esté bien asegurado antes de encender.",
            "Usa velocidad baja para materiales delicados como balsa o resina fresca.",
            "Mantén las manos alejadas del área de rotación del accesorio.",
          ],
          youtubeUrl: "https://youtu.be/3rN6UBe6wBg?si=9V0byG4aFa3FKmD_",
        },
      },
      {
        id: "dremel-8240",
        label: "Dremel 8240 (Rotativa 12V)",
        tool: {
          id: "dremel-8240",
          name: "Dremel Rotativa Inalámbrica 12V (8240)",
          image: "Dremel 8240 (Rotativa 12V).webp",
          useCase:
            "Desbaste, lijado fino de bordes, perforaciones pequeñas y ajuste de piezas de resina/fibra de carbono.",
          epp: ["Lentes de protección", "Mascarilla antipolvo"],
          practices: [
            "Apaga o retira la batería de 12V antes de cambiar accesorios con la llave.",
            "No fuerces el motor ni sobrepases las RPM recomendadas para el tipo de material.",
            "Mantén las manos alejadas del área de rotación del disco o broca.",
          ],
          youtubeUrl: "https://youtu.be/eo1maLU9uNM?si=6gpvqr3tO7NlLcCh",
        },
      },
      {
        id: "dremel-motosaw",
        label: "Dremel Moto-Saw (Sierra de banco)",
        tool: {
          id: "dremel-motosaw",
          name: "Dremel Moto-Saw MS20-01 (Sierra de calar)",
          image: "Dremel Moto-Saw (Sierra de calar de banco).webp",
          useCase:
            "Corte de alta precisión para costillas de balsa, cuadernas de pino y contrachapado.",
          epp: ["Lentes de protección", "Mascarilla antipolvo"],
          practices: [
            "Asegura la base firmemente a la mesa con la prensa de fijación.",
            "Mantén la tensión adecuada en la hoja de calar y guía el material suavemente sin empujar con fuerza.",
            "Desconecta la sierra antes de cambiar las hojas de corte.",
          ],
          youtubeUrl: "https://youtu.be/5nF0h-DNvOg?si=-J3hr_wsFRLFjvhV",
        },
      },
      {
        id: "dremel-blueprint-dd12v",
        label: "Dremel Blueprint DD12V-S1 (Taladro)",
        tool: {
          id: "dremel-blueprint-dd12v",
          name: "Dremel Blueprint DD12V-S1 Taladro 3 en 1",
          image: "Dremel Blueprint DD12V-S1 (Taladro 3 en 1).jpeg",
          useCase:
            "Perforaciones perpendiculares en cuadernas, soportes de motor y alineación con nivel láser.",
          epp: ["Lentes de protección"],
          practices: [
            "Fija siempre las piezas pequeñas con prensas C o sargentos antes de barrenar.",
            "Verifica la alineación con el nivel láser desmontable antes de iniciar el taladrado.",
            "Retira la batería de 12V al cambiar de broca o accesorio.",
          ],
          youtubeUrl: "https://youtu.be/4OuScwOQD4k?si=_ZeK20VczEhWhOMz",
        },
      },
      {
        id: "dremel-blueprint-mm12v",
        label: "Dremel Blueprint MM12V-S1 (Oscilante)",
        tool: {
          id: "dremel-blueprint-mm12v",
          name: "Dremel Blueprint MM12V-S1 Herramienta Oscilante",
          image: "Dremel Blueprint MM12V-S1 (Herramienta oscilante).webp",
          useCase:
            "Cortes al ras, lijado de esquinas de difícil acceso e interiores del fuselaje.",
          epp: ["Lentes de protección", "Mascarilla antipolvo", "Protección auditiva"],
          practices: [
            "Selecciona el accesorio adecuado (cuchilla o lija) según la aplicación.",
            "Sostén la herramienta con ambas manos y no presiones excesivamente contra la madera.",
            "Desconecta la batería antes de cambiar las cuchillas oscilantes.",
          ],
          youtubeUrl: "https://youtu.be/l1oPnVrtEnQ?si=BZxz7O0tA-qNH_GW",
        },
      },
      {
        id: "taladro-ryobi",
        label: "Taladro Ryobi D620H",
        tool: {
          id: "taladro-ryobi",
          name: "Taladro Ryobi D620H (Percusión, con Mango Auxiliar)",
          image: "Taladro de percusión Ryobi D620H (y Mango auxiliar).jpg",
          useCase:
            "Perforaciones en bancos de prueba y estructuras pesadas del taller.",
          epp: ["Lentes de protección"],
          practices: [
            "Usa el mango auxiliar en todo momento para mayor control — el modo percusión genera vibración considerable.",
            "Sujeta firmemente la pieza o banco antes de perforar.",
            "Selecciona la broca adecuada para el material (concreto, metal o madera) antes de iniciar.",
          ],
          youtubeUrl: "https://youtu.be/PWMPqFbcxmo",
        },
      },
      {
        id: "taladro-blackdecker",
        label: "Taladro Black+Decker",
        tool: {
          id: "taladro-blackdecker",
          name: "Taladro Black+Decker (con cable)",
          image: "Taladro eléctrico con cable Black+Decker.jpg",
          useCase: "Perforaciones continuas de taller.",
          epp: ["Lentes de protección"],
          practices: [
            "Mantén el cable de alimentación alejado de la zona de corte y de superficies calientes.",
            "Sujeta la pieza con prensa antes de perforar — nunca la sostengas solo con la mano.",
            "Verifica que la broca esté bien centrada y ajustada en el mandril antes de encender.",
          ],
          youtubeUrl: "https://youtube.com/shorts/UUrL6ELhdxk?si=DewVD873e6cfQN_Q",
        },
      },
      {
        id: "esmeriladora-ryobi",
        label: "Esmeriladora Angular Ryobi",
        tool: {
          id: "esmeriladora-ryobi",
          name: "Esmeriladora Angular Ryobi",
          image: "Esmeriladora angular Ryobi.jpg",
          useCase:
            "Corte y desbaste de perfiles metálicos y soportes rígidos.",
          epp: ["Careta facial", "Guantes"],
          practices: [
            "Herramienta de alto riesgo — nunca la operes sin supervisión de un líder de área si es tu primera vez.",
            "Verifica que el disco esté en buen estado y correctamente asegurado antes de encender.",
            "Sujeta la pieza firmemente y mantén el cuerpo fuera de la línea de proyección de chispas.",
          ],
          youtubeUrl: "https://youtu.be/lhwPmXmbFVg",
        },
      },
      {
        id: "sierra-craftsman",
        label: "Sierra de calar Craftsman",
        tool: {
          id: "sierra-craftsman",
          name: "Sierra de Calar Craftsman",
          useCase:
            "Cortes curvos y rectos en tableros de madera densa o contrachapado.",
          epp: ["Lentes de protección", "Mascarilla antipolvo"],
          practices: [
            "Sujeta el tablero firmemente con prensas antes de iniciar el corte.",
            "Deja que la hoja alcance velocidad completa antes de tocar el material.",
            "Sigue la línea de corte sin forzar el avance para evitar que la hoja se desvíe.",
          ],
          youtubeUrl: "",
        },
      },
      {
        id: "lijadora-ryobi",
        label: "Lijadora Ryobi ONE+ 18V",
        tool: {
          id: "lijadora-ryobi",
          name: "Lijadora Ryobi ONE+ 18V (1/4 de hoja, sin cable)",
          image: "Lijadora de un cuarto de hoja sin cable Ryobi ONE 18V.jpg",
          useCase: "Acabado final y emparejado de bloques de balsa/pino.",
          epp: ["Mascarilla antipolvo", "Lentes de protección"],
          practices: [
            "Deja que la lijadora haga el trabajo — no presiones con fuerza excesiva sobre la pieza.",
            "Usa la bolsa colectora de polvo o trabaja cerca de la zona de extracción del taller.",
            "Verifica que la lija esté bien sujeta antes de encender.",
          ],
          youtubeUrl: "https://youtu.be/zusqY26LjCA",
        },
      },
      {
        id: "accesorios-dremel",
        label: "Accesorios Dremel",
        subTools: [
          {
            id: "eje-flexible-225",
            name: "Eje Flexible Dremel 225",
            image: "Eje flexible Dremel 225.jpg",
            useCase:
              "Permite usar los accesorios Dremel con mayor alcance y precisión en zonas de difícil acceso del fuselaje.",
            epp: ["Lentes de protección"],
            practices: [
              "Asegura bien el eje al motor antes de encender — un ajuste flojo genera vibración excesiva.",
              "No dobles el eje flexible más allá del radio de curvatura recomendado.",
              "Guarda el eje extendido, no enrollado, para evitar dañar el cable interno.",
            ],
            youtubeUrl: "https://youtu.be/TSvhY2WW9A8",
          },
          {
            id: "workstation-220",
            name: "Estación de Trabajo Dremel Workstation 220",
            image: "Estación de trabajo Dremel Workstation 220.jpg",
            useCase:
              "Convierte la rotativa Dremel en herramienta de banco para perforaciones y cortes verticales precisos.",
            epp: ["Lentes de protección"],
            practices: [
              "Fija la estación firmemente a la mesa antes de usarla.",
              "Sujeta la pieza de trabajo con prensa — nunca la sostengas con la mano bajo la estación.",
              "Verifica que la profundidad de corte/perforación esté bien ajustada antes de iniciar.",
            ],
            youtubeUrl: "https://youtu.be/z9HGxsXDZig",
          },
          {
            id: "llave-amoladora",
            name: "Llave de Amoladora Angular",
            image: "Llave de amoladora angular.jpg",
            useCase:
              "Cambio seguro de discos en la esmeriladora angular Ryobi.",
            epp: ["Guantes"],
            practices: [
              "Desconecta la máquina y espera a que el disco se detenga por completo antes de cambiarlo.",
              "Verifica que el disco nuevo esté correctamente centrado y ajustado.",
              "Guarda la llave en su lugar designado para no perderla.",
            ],
            youtubeUrl: "https://youtu.be/Sz0HrEn1vRs",
          },
          {
            id: "llave-portabrocas",
            name: "Llave de Portabrocas",
            image: "Llave de portabrocas.jpg",
            useCase:
              "Ajuste y cambio de brocas en el taladro de banco y taladros con mandril de llave.",
            epp: [],
            practices: [
              "Retira siempre la llave del mandril antes de encender el taladro.",
              "Verifica que la broca quede centrada y firmemente sujeta.",
              "Guarda la llave junto al taladro correspondiente para no perderla.",
            ],
            youtubeUrl: "https://youtu.be/fA2Ri5_06Mo",
          },
          {
            id: "adaptadores-taladro",
            name: "Adaptadores para Taladro",
            image: "Adaptadores para taladro uno.jpeg",
            useCase:
              "Permiten usar brocas y puntillas de distintos calibres en los taladros del taller.",
            epp: [],
            practices: [
              "Verifica que el adaptador esté bien asentado antes de encender el taladro.",
              "No fuerces un adaptador que no corresponda al calibre del mandril.",
              "Guarda los adaptadores organizados por tamaño para agilizar su uso.",
            ],
            youtubeUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "manuales",
    label: "Herramientas Manuales y Ajuste",
    icon: Hammer,
    entries: [
      {
        id: "martillos",
        label: "Martillos",
        subTools: [
          {
            id: "martillo-bola",
            name: "Martillo de Bola",
            image: "Martillo de bola.jpeg",
            useCase:
              "Ajuste y asentado de piezas metálicas, remachado y trabajos de banco en soportes y herramentales.",
            epp: ["Lentes de protección"],
            practices: [
              "Verifica que la cabeza del martillo esté firmemente asegurada al mango antes de usarlo.",
              "Golpea siempre de forma perpendicular a la superficie para evitar que el martillo resbale.",
              "Mantén la zona de trabajo despejada de otras personas mientras lo usas.",
            ],
            youtubeUrl: "https://youtube.com/shorts/6uyIVF00ggc?si=6ULiCImNbRCDUHX_",
          },
          {
            id: "martillo-una-curva",
            name: "Martillo de Uña Curva",
            image: "Martillo de uña curva.jpeg",
            useCase:
              "Clavado y extracción de clavos en bases, bancadas y herramentales de madera del taller.",
            epp: ["Lentes de protección"],
            practices: [
              "Sujeta el mango cerca del extremo para mayor control y potencia.",
              "Al extraer un clavo, apoya el martillo sobre un taco de madera para no dañar la superficie.",
              "Verifica que no haya nadie cerca de la trayectoria del martillo antes de golpear.",
            ],
            youtubeUrl: "https://youtube.com/shorts/igg4kYjPbdk?si=Bk4XamaJgWw-fNqA",
          },
        ],
      },
      {
        id: "alicates-pinzas",
        label: "Alicates y Pinzas",
        subTools: [
          {
            id: "pinza-punta-larga",
            name: "Pinzas de Punta Larga",
            image: "Pinzas de punta larga.jpeg",
            useCase:
              "Sujeción y manipulación de piezas pequeñas y cables en espacios reducidos de la electrónica de a bordo.",
            epp: [],
            practices: [
              "No uses las pinzas como herramienta de corte si no están diseñadas para ello.",
              "Evita aplicar fuerza excesiva sobre componentes delicados como servos o conectores.",
              "Guárdalas en su lugar para evitar que se doblen las puntas.",
            ],
            youtubeUrl: "https://youtube.com/shorts/ARcd6m5yI_s?si=M9jhGv-gtSnr0kew",
          },
          {
            id: "mini-pinza-truper",
            name: "Mini Pinza de Punta de Aguja Truper",
            image: "Mini pinza de punta de aguja Truper.jpeg",
            useCase:
              "Trabajo de precisión en componentes electrónicos pequeños, conectores y cableado fino.",
            epp: [],
            practices: [
              "Usa movimientos suaves — las puntas finas se doblan con facilidad si se fuerzan.",
              "No la uses para tareas que requieran fuerza; para eso usa una pinza de presión.",
              "Guárdala en su estuche para proteger la punta.",
            ],
            youtubeUrl: "",
          },
          {
            id: "pinza-presion",
            name: "Pinza de Presión",
            image: "Pinza de presión.jpeg",
            useCase:
              "Sujeción firme y liberación rápida de piezas durante ensamble y soldadura.",
            epp: [],
            practices: [
              "Ajusta la presión de cierre según el material — demasiada fuerza puede marcar la pieza.",
              "Verifica que la pinza esté bien cerrada antes de soltarla sobre la pieza.",
              "No la uses como herramienta de golpeo.",
            ],
            youtubeUrl: "https://youtube.com/shorts/FgQPLdDMafY?si=DWoXYKYJOD931wVs",
          },
          {
            id: "pinza-mandibula-ancha",
            name: "Pinza de Presión de Mandíbula Ancha",
            image: "Pinza de presión de mandíbula ancha.jpeg",
            useCase:
              "Sujeción de piezas de mayor tamaño o superficie irregular durante el ensamble.",
            epp: [],
            practices: [
              "Protege superficies delicadas con un retazo de tela o goma entre la mandíbula y la pieza.",
              "Verifica que la pieza quede alineada antes de cerrar por completo.",
              "Ajusta el tornillo de presión gradualmente, no de golpe.",
            ],
            youtubeUrl: "",
          },
          {
            id: "crimpadora",
            name: "Crimpadora",
            image: "Crimpadora.jpeg",
            useCase:
              "Crimpado de terminales y conectores en el cableado de la electrónica de a bordo.",
            epp: [],
            practices: [
              "Verifica que el terminal y el calibre del cable coincidan con la matriz de la crimpadora.",
              "Aplica presión firme y uniforme hasta el tope de la herramienta.",
              "Revisa cada conexión crimpada antes de darla por terminada — una crimpada floja falla en vuelo.",
            ],
            youtubeUrl: "https://youtube.com/shorts/Kx1pKY6xFms?si=vLTxhji7J3ON2Hfv",
          },
        ],
      },
      {
        id: "destornilladores",
        label: "Destornilladores",
        subTools: [
          {
            id: "carraca-craftsman",
            name: "Destornillador de Carraca Craftsman",
            image: "Destornillador de carraca Craftsman.jpeg",
            useCase:
              "Atornillado rápido y repetitivo en ensambles y herramentales del taller.",
            epp: [],
            practices: [
              "Selecciona la punta correcta antes de aplicar fuerza.",
              "Verifica el sentido del mecanismo de carraca antes de usarlo para no forzar en el sentido equivocado.",
              "No lo uses como palanca — puede dañar el mecanismo interno.",
            ],
            youtubeUrl: "https://youtu.be/BEHehu8jlQI",
          },
          {
            id: "destornillador-pala",
            name: "Destornillador de Pala",
            image: "Destornillador de pala.jpeg",
            useCase:
              "Ajuste de tornillería de cabeza plana en estructuras y soportes generales.",
            epp: [],
            practices: [
              "Usa el tamaño de pala correcto para evitar dañar la ranura del tornillo.",
              "Aplica presión axial constante mientras giras.",
              "No lo uses como cincel o palanca.",
            ],
            youtubeUrl: "",
          },
          {
            id: "destornillador-estrella",
            name: "Destornillador de Estrella",
            image: "Destornillador de estrella.jpeg",
            useCase:
              "Ajuste de tornillería Phillips en electrónica, servos y ensambles generales.",
            epp: [],
            practices: [
              "Verifica que la punta no esté desgastada — una punta gastada resbala y daña el tornillo.",
              "Aplica presión axial constante mientras giras para evitar que resbale.",
              "No lo uses en tornillos de otro tipo de cabeza.",
            ],
            youtubeUrl: "",
          },
          {
            id: "destornillador-hex-bola",
            name: "Destornillador de Punta Hexagonal de Bola",
            image: "destornillador de punta hexagonal de bola.jpeg",
            useCase:
              "Ajuste de tornillería Allen en ángulo, útil en espacios de acceso limitado.",
            epp: [],
            practices: [
              "Usa la punta recta (no en ángulo) cuando necesites aplicar mayor torque.",
              "Verifica que la punta coincida exactamente con el calibre del tornillo.",
              "No fuerces la punta en ángulo con tornillos muy apretados — puede redondear la cabeza.",
            ],
            youtubeUrl: "",
          },
          {
            id: "atornillador-bauer",
            name: "Destornillador de Impacto Bauer 20V",
            image: "Destornillador de impacto Bauer 20V.jpeg",
            useCase:
              "Ensamble rápido de herramentales, bancadas y bases del taller.",
            epp: ["Lentes de protección"],
            practices: [
              "Selecciona la puntilla correcta para el tipo de tornillo antes de iniciar.",
              "No lo uses en tornillería pequeña o delicada — su torque puede trasroscar o dañar piezas finas.",
              "Retira la batería antes de cambiar de puntilla.",
            ],
            youtubeUrl: "https://youtube.com/shorts/B6nZfEd4KaQ?si=m86niYmbsAAxyQwS",
          },
          {
            id: "atornillador-corebilt",
            name: "Destornillador Eléctrico Inalámbrico Corebilt",
            image: "Destornillador eléctrico Corebilt.jpeg",
            useCase:
              "Ajuste fino de tornillería pequeña y servomotores sin trasroscar.",
            epp: ["Lentes de protección"],
            practices: [
              "Usa velocidad baja en tornillería pequeña para evitar trasroscar el material.",
              "Verifica que la puntilla esté bien asentada antes de aplicar torque.",
              "No fuerces el atornillador si sientes resistencia excesiva — revisa la rosca antes de continuar.",
            ],
            youtubeUrl: "",
          },
        ],
      },
      {
        id: "llaves-ajuste",
        label: "Llaves y Ajuste",
        subTools: [
          {
            id: "llaves-allen",
            name: "Juego de Llaves Hexagonales / Allen",
            image: "Juego de llaves hexagonales uno.jpeg",
            useCase:
              "Ajuste de tornillería Allen en soportes de motor, herramentales y ensambles — incluye llaves con mango en T, llaves de repuesto sueltas y los juegos plegables Husky y estándar.",
            epp: [],
            practices: [
              "Usa el tamaño exacto de llave para el tornillo — un tamaño incorrecto redondea la cabeza.",
              "Aplica el torque de forma gradual, sin golpes bruscos.",
              "Guarda cada llave en su juego correspondiente para no perder piezas sueltas.",
            ],
            youtubeUrl: "",
          },
          {
            id: "llave-stillson",
            name: "Llave de Tubo / Llave Stillson",
            image: "llave de tubo o llave Stillson.jpeg",
            useCase:
              "Ajuste y sujeción de piezas cilíndricas y tubería del taller.",
            epp: ["Guantes"],
            practices: [
              "Ajusta la apertura de la mordaza al diámetro exacto de la pieza antes de aplicar fuerza.",
              "Aplica la fuerza en la dirección de cierre de la mordaza para evitar que resbale.",
              "No uses una extensión improvisada para aumentar el torque — puede dañar la llave o la pieza.",
            ],
            youtubeUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "medicion",
    label: "Medición, Metrología y Trazo",
    icon: Ruler,
    entries: [
      {
        id: "vernier",
        label: "Calibrador Vernier / Pie de rey",
        tool: {
          id: "vernier",
          name: "Calibrador Vernier / Pie de rey",
          image: "Calibrador Vernier o Pie de rey.jpeg",
          useCase:
            "Medición precisa de espesores, diámetros y profundidades en piezas estructurales y componentes.",
          epp: [],
          practices: [
            "Limpia las quijadas antes de medir para evitar lecturas erróneas.",
            "No fuerces el cierre sobre la pieza — la presión excesiva distorsiona la medida.",
            "Guárdalo en su estuche para proteger la precisión del instrumento.",
          ],
          youtubeUrl: "https://youtube.com/shorts/INkCCKUBVhg?si=6o30p0W5q7EERZbh",
        },
      },
      {
        id: "transportador-digital",
        label: "Transportador de ángulos digital",
        tool: {
          id: "transportador-digital",
          name: "Transportador de Ángulos Digital",
          image: "Transportador de ángulos digital.jpeg",
          useCase:
            "Medición precisa de ángulos en superficies de control, diedro del ala y montajes de motor.",
          epp: [],
          practices: [
            "Calibra el transportador en cero sobre una superficie plana antes de medir.",
            "Limpia las caras de contacto antes de cada medición.",
            "Maneja con cuidado — es un instrumento electrónico sensible a caídas.",
          ],
          youtubeUrl: "https://youtu.be/3tqPJSzheOo",
        },
      },
      {
        id: "dinamometro",
        label: "Dinamómetro",
        tool: {
          id: "dinamometro",
          name: "Dinamómetro",
          image: "Dinamómetro.jpeg",
          useCase:
            "Medición de fuerza de tracción de motores y verificación de tensión en cables de control.",
          epp: [],
          practices: [
            "No excedas la capacidad máxima de carga del instrumento.",
            "Verifica que el punto de anclaje sea firme antes de aplicar tensión.",
            "Realiza la medición de forma gradual, sin tirones bruscos.",
          ],
          youtubeUrl: "https://youtu.be/3NpmKrBWnYI?si=MaL5tbAz5i2XEru1",
        },
      },
      {
        id: "flexometro",
        label: "Flexómetro (Flexo)",
        tool: {
          id: "flexometro",
          name: "Flexómetro (Flexo)",
          image: "Flexómetro (Flexo).jpeg",
          useCase:
            "Medición de longitudes generales en piezas, envergadura del ala y distancias del taller.",
          epp: [],
          practices: [
            "Retrae la cinta con cuidado para evitar que golpee los dedos.",
            "No la fuerces más allá de su extensión máxima marcada.",
            "Verifica que el gancho del extremo esté en buen estado para mediciones precisas.",
          ],
          youtubeUrl: "",
        },
      },
      {
        id: "reglas-precision",
        label: "Reglas de precisión (3 unidades)",
        tool: {
          id: "reglas-precision",
          name: "Reglas de Precisión (3 unidades)",
          image: "Reglas de precisión (3 unidades).jpeg",
          useCase:
            "Trazado de líneas rectas y verificación de planitud en piezas de balsa, pino y fibra.",
          epp: [],
          practices: [
            "Limpia el borde de la regla antes de usarla como guía de trazo.",
            "No la uses como guía de corte con cutter si no está diseñada para ello — puede dañar el borde.",
            "Guárdala plana para evitar que se deforme con el tiempo.",
          ],
          youtubeUrl: "",
        },
      },
      {
        id: "escuadra-taller",
        label: "Escuadra de taller",
        tool: {
          id: "escuadra-taller",
          name: "Escuadra de Taller",
          image: "Escuadra de taller.jpeg",
          useCase:
            "Trazado de ángulos rectos y verificación de alineación en cuadernas, largueros y ensambles.",
          epp: [],
          practices: [
            "Verifica que el borde de referencia esté limpio y sin rebabas antes de usarla.",
            "No la uses como regla de corte — está calibrada solo para trazado y verificación.",
            "Revisa periódicamente que mantenga el ángulo de 90° exacto.",
          ],
          youtubeUrl: "https://youtube.com/shorts/KqCHRFmia3A?si=VzGJviqFsC6uzHqe",
        },
      },
      {
        id: "nivel-mano",
        label: "Nivel de mano",
        tool: {
          id: "nivel-mano",
          name: "Nivel de Mano",
          image: "Nivel de mano.jpeg",
          useCase:
            "Verificación de horizontalidad en bancos de prueba, soportes de motor y montajes del taller.",
          epp: [],
          practices: [
            "Coloca el nivel sobre una superficie limpia y estable antes de leer la burbuja.",
            "Verifica la calibración del nivel periódicamente sobre una superficie conocida como plana.",
            "Manéjalo con cuidado — un golpe fuerte puede descalibrar el vial.",
          ],
          youtubeUrl: "https://youtube.com/shorts/ks5a5_1-nXQ?si=LsONwDmlYYncrv9e",
        },
      },
      {
        id: "bascula-digital",
        label: "Báscula digital",
        tool: {
          id: "bascula-digital",
          name: "Báscula Digital",
          image: "Báscula digital.jpg",
          useCase:
            "Pesaje de la aeronave completa y de componentes individuales para el control de peso del diseño.",
          epp: [],
          practices: [
            "Coloca la báscula sobre una superficie plana y estable antes de pesar.",
            "Verifica que esté en cero antes de cada medición.",
            "No excedas la capacidad máxima de peso indicada por el fabricante.",
          ],
          youtubeUrl: "https://youtu.be/ZvhznDmITII?si=NJh1O_dDqdZNoesb",
        },
      },
      {
        id: "pesas-variadas",
        label: "Pesas variadas",
        tool: {
          id: "pesas-variadas",
          name: "Pesas Variadas (Calibración / Contrapeso)",
          image: "Pesas variadas (para calibración y contrapeso).jpeg",
          useCase:
            "Calibración de básculas y dinamómetros, y uso como contrapeso en pruebas de balance del avión.",
          epp: [],
          practices: [
            "Verifica el valor exacto de cada pesa antes de usarla para calibrar.",
            "Manéjalas con cuidado — un golpe puede alterar su masa certificada.",
            "Guárdalas en su estuche o gabinete designado, ordenadas por valor.",
          ],
          youtubeUrl: "",
        },
      },
    ],
  },
  {
    id: "sujecion",
    label: "Sujeción, Ensamble y Fijación",
    icon: Wrench,
    entries: [
      {
        id: "sargentos-c",
        label: "Sargentos de tipo C",
        tool: {
          id: "sargentos-c",
          name: "Sargentos de Tipo C",
          image: "Sargentos de tipo C.jpeg",
          useCase:
            "Sujeción firme de piezas durante el pegado, laminado y ensamble mientras cura la resina o el adhesivo.",
          epp: ["Guantes de nitrilo"],
          practices: [
            "No apliques más presión de la necesaria — puede deformar piezas de balsa.",
            "Protege la superficie de la pieza con un retazo de madera o goma entre el sargento y el material.",
            "Revisa que la pieza quede alineada antes de apretar por completo.",
          ],
          youtubeUrl: "https://youtube.com/shorts/bU8m4nDpxsg?si=Fbjsq5udu3r6i39r",
        },
      },
      {
        id: "pinzas-resorte",
        label: "Pinzas de resorte",
        tool: {
          id: "pinzas-resorte",
          name: "Pinzas de Resorte / Prensas de Presión Rápida",
          image: "Pinzas de resorte o Prensas de presión rápida.jpeg",
          useCase:
            "Sujeción rápida y de baja presión para pegados ligeros y piezas delicadas de balsa.",
          epp: [],
          practices: [
            "Usa este tipo de pinza solo para piezas ligeras — no sustituye a un sargento en uniones de carga.",
            "Verifica que el resorte esté en buen estado antes de usarla.",
            "Distribuye varias pinzas a lo largo de la unión para una presión uniforme.",
          ],
          youtubeUrl: "",
        },
      },
      {
        id: "clips-sujecion",
        label: "Clips de sujeción",
        tool: {
          id: "clips-sujecion",
          name: "Clips de Sujeción",
          image: "Clips de sujeción.jpeg",
          useCase:
            "Sujeción temporal ligera de piezas y films durante el marcado o el pegado puntual.",
          epp: [],
          practices: [
            "No los uses en uniones que requieran presión firme o prolongada.",
            "Verifica que no dejen marca sobre superficies delicadas como el Monokote.",
            "Guárdalos organizados para tenerlos disponibles rápidamente durante el ensamble.",
          ],
          youtubeUrl: "",
        },
      },
      {
        id: "espatulas",
        label: "Espátulas",
        tool: {
          id: "espatulas",
          name: "Espátulas (madera/fierro y plástico)",
          image: "Espátulas (2 de madera y fierro, 3 de plástico).jpeg",
          useCase:
            "Aplicación y extendido de resina, masillas y adhesivos en laminado y acabado de superficies — el taller cuenta con espátulas de madera/fierro y de plástico según el trabajo.",
          epp: ["Guantes de nitrilo"],
          practices: [
            "Usa espátulas de plástico sobre superficies delicadas para evitar rayaduras.",
            "Limpia la espátula inmediatamente después de usarla, antes de que la resina cure.",
            "No uses la espátula de fierro para mezclar resina — puede alterar la mezcla con residuos metálicos.",
          ],
          youtubeUrl: "",
        },
      },
    ],
  },
  {
    id: "acabado",
    label: "Acabado, Pintura y Accesorios",
    icon: PaintRoller,
    entries: [
      {
        id: "pistola-calor",
        label: "Pistola de calor",
        tool: {
          id: "pistola-calor",
          name: "Decapadora / Pistola de Calor",
          image: "Pistola de calor o Decapadora.jpeg",
          useCase:
            "Encogimiento y tensado de Monokote / film termoadhesivo sobre estructuras de madera.",
          epp: ["Guantes resistentes al calor"],
          practices: [
            "Mantén la pistola en movimiento constante — nunca la dejes fija sobre un solo punto del film.",
            "Atención al riesgo de quemaduras: la boquilla y el aire de salida alcanzan temperaturas muy altas.",
            "Apaga y deja enfriar la pistola antes de guardarla.",
          ],
          youtubeUrl: "https://youtu.be/8zJ5QL0ZzWs?si=0XQKBQKGNjoxTvKL",
        },
      },
      {
        id: "rodillo-pintar",
        label: 'Rodillo 6" (152.4 mm)',
        tool: {
          id: "rodillo-pintar",
          name: 'Rodillo para Pintar de 6" (152.4 mm)',
          image: "Rodillo para pintar de 6 pulgadas (152.4 mm).jpeg",
          useCase:
            "Aplicación uniforme de pintura e imprimación en superficies grandes de fibra de vidrio y carrocería del avión.",
          epp: ["Mascarilla", "Guantes"],
          practices: [
            "Trabaja en la zona de pintura ventilada del taller, nunca en espacios cerrados.",
            "Aplica capas delgadas y uniformes — el exceso de pintura añade peso innecesario.",
            "Limpia el rodillo inmediatamente después de usarlo para prolongar su vida útil.",
          ],
          youtubeUrl: "",
        },
      },
      {
        id: "brochas",
        label: "Brochas / Brochaje",
        tool: {
          id: "brochas",
          name: "Brochas / Brochaje",
          image: "Brochas.jpeg",
          useCase:
            "Aplicación de pintura, resina y adhesivos en detalles finos y zonas de difícil acceso con el rodillo.",
          epp: ["Mascarilla", "Guantes de nitrilo"],
          practices: [
            "Selecciona el tamaño de brocha adecuado según el detalle a trabajar.",
            "Limpia la brocha con el solvente adecuado inmediatamente después de usarla.",
            "No mezcles brochas entre resina y pintura sin limpiarlas por completo.",
          ],
          youtubeUrl: "",
        },
      },
      {
        id: "cargador-bauer",
        label: "Cargador Bauer 20V",
        tool: {
          id: "cargador-bauer",
          name: "Cargador Rápido para Baterías Bauer 20V",
          image: "Cargador rápido para baterías Bauer 20V.jpeg",
          useCase:
            "Gestión de energía del taller para las baterías de las herramientas inalámbricas Bauer.",
          epp: [],
          practices: [
            "Mantén el cargador en una zona ventilada, alejada de materiales inflamables.",
            "No dejes baterías cargando sin supervisión durante periodos prolongados.",
            "Revisa que la batería no presente daños o hinchazón antes de colocarla a cargar.",
          ],
          youtubeUrl: "https://youtu.be/K57KndoaRqg?si=iNT2_GKETTK_FrZZ",
        },
      },
    ],
  },
];

function ToolPhoto({ image, name }: { image?: string; name: string }) {
  // Starts "failed" when there's no filename at all, so we never attempt a
  // request that's certain to 404 — only real fetch failures (typo, case
  // mismatch, file removed later) go through onError below.
  const [failed, setFailed] = useState(!image);

  if (!image || failed) {
    return (
      <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-center shadow-[0_0_24px_-8px_var(--color-teal-strong)] backdrop-blur-md">
        <ImageOff className="h-8 w-8 text-white/30" strokeWidth={1.5} aria-hidden />
        <p className="text-xs text-white/40">Foto pendiente: {name}</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_24px_-8px_var(--color-teal-strong)] backdrop-blur-md">
      {/* eslint-disable-next-line @next/next/no-img-element -- filenames
          contain spaces/accents; a plain <img> lets us control URI
          encoding directly and swap to the placeholder via onError. */}
      <img
        src={encodeURI(`/${image}`)}
        alt={name}
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

interface FlatTool extends ToolInfo {
  /** Label of the group entry this tool came from (e.g. "Discos para
   * Esmeril/Amoladora"), shown as a small tag on the card. Undefined for
   * tools that were already a standalone entry. */
  groupLabel?: string;
}

function flattenCategory(category: ToolCategory): FlatTool[] {
  const result: FlatTool[] = [];
  for (const entry of category.entries) {
    if (entry.tool) {
      result.push(entry.tool);
    } else if (entry.subTools) {
      for (const t of entry.subTools) {
        result.push({ ...t, groupLabel: entry.label });
      }
    }
  }
  return result;
}

interface Subgroup {
  id: string;
  label: string;
  toolIds: string[];
}

// Submódulos: a second grouping layer layered on top of `entries`, purely
// for how the catalog is browsed — independent of the entry/subTools shape
// used for the underlying data (some submódulos merge several entries,
// e.g. all 5 Dremel machines into one "Ecosistema Dremel" group).
const SUBGROUPS: Record<string, Subgroup[]> = {
  corte: [
    {
      id: "corte-manual",
      label: "Herramientas de Corte Manual",
      toolIds: ["navajas-cutters", "segueta-manual"],
    },
    {
      id: "lijado-limado",
      label: "Lijado y Limado",
      toolIds: ["portalijas", "lima-bellota"],
    },
    {
      id: "discos-abrasivos",
      label: "Consumibles y Discos Abrasivos",
      toolIds: ["disco-laminas", "disco-desbaste", "disco-abrasivo", "disco-flap"],
    },
  ],
  maquinas: [
    {
      id: "ecosistema-dremel",
      label: "Ecosistema Dremel",
      toolIds: [
        "dremel-lite-7760",
        "dremel-8240",
        "dremel-motosaw",
        "dremel-blueprint-dd12v",
        "dremel-blueprint-mm12v",
      ],
    },
    {
      id: "taladros-electricos",
      label: "Taladros y Maquinaria Eléctrica",
      toolIds: [
        "taladro-ryobi",
        "taladro-blackdecker",
        "sierra-craftsman",
        "esmeriladora-ryobi",
        "lijadora-ryobi",
      ],
    },
    {
      id: "estaciones-aditamentos",
      label: "Estaciones y Aditamentos",
      toolIds: [
        "eje-flexible-225",
        "workstation-220",
        "llave-amoladora",
        "llave-portabrocas",
        "adaptadores-taladro",
      ],
    },
  ],
  manuales: [
    {
      id: "impacto-trazo",
      label: "Impacto y Trazo Manual",
      toolIds: ["martillo-bola", "martillo-una-curva"],
    },
    {
      id: "alicates-crimpado",
      label: "Alicates, Pinzas y Crimpado",
      toolIds: [
        "pinza-punta-larga",
        "mini-pinza-truper",
        "pinza-presion",
        "pinza-mandibula-ancha",
        "crimpadora",
      ],
    },
    {
      id: "destornilladores-llaves",
      label: "Destornilladores y Llaves",
      toolIds: [
        "carraca-craftsman",
        "destornillador-pala",
        "destornillador-estrella",
        "destornillador-hex-bola",
        "atornillador-bauer",
        "atornillador-corebilt",
        "llaves-allen",
        "llave-stillson",
      ],
    },
  ],
  medicion: [
    {
      id: "medicion-dimensional",
      label: "Medición Dimensional y Trazo",
      toolIds: [
        "vernier",
        "transportador-digital",
        "flexometro",
        "reglas-precision",
        "escuadra-taller",
        "nivel-mano",
      ],
    },
    {
      id: "peso-calibracion",
      label: "Peso y Calibración",
      toolIds: ["dinamometro", "bascula-digital", "pesas-variadas"],
    },
  ],
  sujecion: [
    {
      id: "sujecion-fijacion",
      label: "Sujeción y Fijación",
      toolIds: ["sargentos-c", "pinzas-resorte", "clips-sujecion", "espatulas"],
    },
  ],
  acabado: [
    {
      id: "acabado-energia",
      label: "Acabado y Energía",
      toolIds: ["pistola-calor", "rodillo-pintar", "brochas", "cargador-bauer"],
    },
  ],
};

function ToolGrid({
  tools,
  onSelect,
}: {
  tools: FlatTool[];
  onSelect: (tool: FlatTool) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {tools.map((tool) => (
        <button
          key={tool.id}
          type="button"
          onClick={() => onSelect(tool)}
          className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-teal-strong/40 hover:shadow-2xl"
        >
          <ToolPhoto image={tool.image} name={tool.name} />
          <div className="flex flex-1 flex-col gap-1.5 p-3">
            {tool.groupLabel && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-teal-strong/70">
                {tool.groupLabel}
              </span>
            )}
            <p className="font-apple text-sm font-semibold leading-snug text-white drop-shadow-md">
              {tool.name}
            </p>
            {tool.epp.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-1 pt-1">
                {tool.epp.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-teal-strong/30 bg-teal-strong/10 px-2 py-0.5 text-[10px] font-semibold text-teal-strong"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-white/50 transition-colors group-hover:text-teal-strong">
              Ver ficha completa
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

function ToolDetailModal({
  categoryLabel,
  tool,
  onClose,
}: {
  categoryLabel: string;
  tool: FlatTool;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tool.name}
      onClick={onClose}
      className="animate-[fadein_0.3s_ease-out] fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[90vh] w-full max-w-2xl grid-cols-1 gap-6 overflow-y-auto rounded-2xl border border-white/10 bg-[#0d131cf2] p-5 shadow-2xl backdrop-blur-xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        <div className="flex flex-col gap-3">
          <ToolPhoto image={tool.image} name={tool.name} />
          {tool.youtubeUrl && tool.youtubeUrl.trim() !== "" && (
            <a
              href={tool.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-orange-strong bg-orange-strong/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-strong/25"
            >
              <SquarePlay className="h-4 w-4" aria-hidden />
              Ver video explicativo en YouTube
            </a>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-teal-strong">
              {categoryLabel.toUpperCase()}
              {tool.groupLabel ? ` · ${tool.groupLabel.toUpperCase()}` : ""}
            </p>
            <p className="font-apple mt-1 text-xl font-semibold text-white drop-shadow-md sm:text-2xl">
              {tool.name}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-strong/80">
              ¿Para qué se usa en Helios?
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-100 drop-shadow-md">
              {tool.useCase}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-strong/80">
              EPP obligatorio
            </p>
            {tool.epp.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {tool.epp.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-teal-strong/40 bg-teal-strong/10 px-3 py-1 text-xs font-semibold text-teal-strong"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-1 text-sm text-zinc-300">
                No requiere EPP especial más allá de la vestimenta básica del
                taller.
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-strong/80">
              Normas de seguridad y buenas prácticas
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {tool.practices.map((practice) => (
                <li
                  key={practice}
                  className="flex gap-2 text-sm leading-relaxed text-zinc-100 drop-shadow-md"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-strong" />
                  {practice}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ToolsMachinerySection({
  onToolOpen,
}: {
  /** Called with a tool's id the first time its detail modal is opened —
   * lets a parent (the landing cards) track browsing progress. */
  onToolOpen?: (id: string) => void;
} = {}) {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [subgroupId, setSubgroupId] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedTool, setSelectedTool] = useState<FlatTool | null>(null);

  const category = CATEGORIES[categoryIndex];
  const tools = flattenCategory(category);
  const subgroups = SUBGROUPS[category.id] ?? [];
  const query = search.trim().toLowerCase();

  function openTool(tool: FlatTool) {
    setSelectedTool(tool);
    onToolOpen?.(tool.id);
  }

  function selectCategory(i: number) {
    setCategoryIndex(i);
    setSubgroupId("all");
    setSearch("");
  }

  function toolsInSubgroup(subgroup: Subgroup) {
    const ids = new Set(subgroup.toolIds);
    return tools.filter((t) => ids.has(t.id));
  }

  // Text search collapses everything into one flat, filtered grid — a
  // submódulo layout doesn't help once the result set is already small.
  const searchResults = query
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.groupLabel?.toLowerCase().includes(query)
      )
    : null;

  const visibleSubgroups =
    subgroupId === "all" ? subgroups : subgroups.filter((s) => s.id === subgroupId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg backdrop-blur-md sm:p-6">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c, i) => {
          const isActive = i === categoryIndex;
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => selectCategory(i)}
              aria-pressed={isActive}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300",
                isActive
                  ? "border-teal-strong bg-teal-strong/15 text-white"
                  : "border-white/10 bg-white/5 text-white/60 hover:text-white/80"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
          aria-hidden
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar herramienta..."
          aria-label="Buscar herramienta en esta categoría"
          className="focus-ring w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 backdrop-blur-md transition-colors focus-visible:border-teal-strong/50"
        />
      </div>

      {/* Submódulo chips — hidden while searching (a filtered list doesn't
          need a second filter) and when the category has only one group. */}
      {!query && subgroups.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSubgroupId("all")}
            aria-pressed={subgroupId === "all"}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
              subgroupId === "all"
                ? "border-orange-strong/50 bg-orange-strong/10 text-orange-strong"
                : "border-white/10 bg-transparent text-white/50 hover:text-white/70"
            )}
          >
            Todos
          </button>
          {subgroups.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSubgroupId(s.id)}
              aria-pressed={subgroupId === s.id}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
                subgroupId === s.id
                  ? "border-orange-strong/50 bg-orange-strong/10 text-orange-strong"
                  : "border-white/10 bg-transparent text-white/50 hover:text-white/70"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
      </div>

      {/* Content: flat search results, or the category grouped into
          submódulos with a heading + divider each. */}
      {searchResults ? (
        searchResults.length > 0 ? (
          <ToolGrid tools={searchResults} onSelect={openTool} />
        ) : (
          <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-zinc-300 backdrop-blur-md">
            No se encontraron herramientas para &ldquo;{search}&rdquo; en esta categoría.
          </p>
        )
      ) : subgroups.length > 0 ? (
        <div className="flex flex-col gap-10">
          {visibleSubgroups.map((s) => {
            const groupTools = toolsInSubgroup(s);
            if (groupTools.length === 0) return null;
            return (
              <div key={s.id}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full border border-teal-strong/40 bg-teal-strong/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-teal-strong">
                    Submódulo
                  </span>
                  <h3 className="font-apple text-base font-semibold text-white drop-shadow-md sm:text-lg">
                    {s.label}
                  </h3>
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-white/30">{groupTools.length}</span>
                </div>
                <ToolGrid tools={groupTools} onSelect={openTool} />
              </div>
            );
          })}
        </div>
      ) : (
        <ToolGrid tools={tools} onSelect={openTool} />
      )}

      {selectedTool && (
        <ToolDetailModal
          categoryLabel={category.label}
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </div>
  );
}
