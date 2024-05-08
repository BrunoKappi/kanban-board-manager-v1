import moment from "moment";
import { v4 } from "uuid";

export const ExampleBoardID = "7d892f4c-1f15-4ae0-aa28-923b8892ec6d";

export const GetText = (Language?: string) => {
  if (!Language) {
    var Lang = localStorage.getItem("Kanban-Language") || "English";
  } else {
    var Lang = Language;
  }

  if (Lang === "English") {
    return {
      Board: {
        Name: "Example Board",
        Description: "Just an Example Board",
      },
      Columns: {
        Column1: {
          Title: "Todo",
          Cards: {
            Card1: {
              Title: "Design Website",
              Tasks: {
                Task1: "Create mockups",
                Task2: "Define color palette",
                Task3: "Choose fonts",
              },
            },
            Card2: {
              Title: "Develop Core Features",
              Tasks: {
                Task1: "Implement login system",
                Task2: "Create board creation interface",
                Task3: "Add drag and drop functionality",
              },
            },
          },
        },
        Column2: {
          Title: "Doing",
          Cards: {
            Card1: {
              Title: "Review Website Content",
              Tasks: {
                Task1: "Write homepage text",
                Task2: "Create documentation pages",
                Task3: "Review content",
              },
            },
            Card2: {
              Title: "Test Features",
              Tasks: {
                Task1: "Test login across different browsers",
                Task2: "Test drag and drop functionality on mobile devices",
              },
            },
            Card3: {
              Title: "Write Website Content",
              Tasks: {
                Task1: "Write homepage text",
                Task2: "Create documentation text",
              },
            },
          },
        },
        Column3: {
          Title: "Reviewing",
          Cards: {
            Card1: {
              Title: "Review Design",
              Tasks: {
                Task1: "Request feedback from peers",
                Task2: "Make adjustments based on received feedback",
              },
            },
          },
        },
        Column4: {
          Title: "Completed",
          Cards: {
            Card1: {
              Title: "Launch Website",
              Tasks: {
                Task1: "Set up web server",
                Task2: "Make launch announcement",
              },
            },
            Card2: {
              Title: "Perform User Testing",
              Tasks: {
                Task1: "Recruit participants for user testing",
                Task2: "Conduct usability tests on the website",
                Task3: "Gather feedback and make final adjustments based on user responses",
              },
            },
          },
        },
      },
    };
  } else if (Lang === "Portuguese-br") {
    return {
      Board: {
        Name: "Quadro de Exemplo",
        Description: "Apenas um Quadro de Exemplo",
      },
      Columns: {
        Column1: {
          Title: "A Fazer",
          Cards: {
            Card1: {
              Title: "Design do Website",
              Tasks: {
                Task1: "Criar mockups",
                Task2: "Definir paleta de cores",
                Task3: "Escolher fontes",
              },
            },
            Card2: {
              Title: "Desenvolver Recursos Principais",
              Tasks: {
                Task1: "Implementar sistema de login",
                Task2: "Criar interface de criação de quadro",
                Task3: "Adicionar funcionalidade de arrastar e soltar",
              },
            },
          },
        },
        Column2: {
          Title: "Fazendo",
          Cards: {
            Card1: {
              Title: "Revisar Conteúdo do Website",
              Tasks: {
                Task1: "Escrever texto da página inicial",
                Task2: "Criar páginas de documentação",
                Task3: "Revisar conteúdo",
              },
            },
            Card2: {
              Title: "Testar Recursos",
              Tasks: {
                Task1: "Testar login em diferentes navegadores",
                Task2: "Testar funcionalidade de arrastar e soltar em dispositivos móveis",
              },
            },
            Card3: {
              Title: "Escrever Conteúdo do Website",
              Tasks: {
                Task1: "Escrever texto da página inicial",
                Task2: "Criar páginas de documentação",
              },
            },
          },
        },
        Column3: {
          Title: "Revisando",
          Cards: {
            Card1: {
              Title: "Revisar Design",
              Tasks: {
                Task1: "Solicitar feedback dos colegas",
                Task2: "Fazer ajustes com base no feedback recebido",
              },
            },
          },
        },
        Column4: {
          Title: "Concluído",
          Cards: {
            Card1: {
              Title: "Lançar Website",
              Tasks: {
                Task1: "Configurar servidor web",
                Task2: "Fazer anúncio de lançamento",
              },
            },
            Card2: {
              Title: "Realizar Testes de Usuário",
              Tasks: {
                Task1: "Recrutar participantes para testes de usuário",
                Task2: "Conduzir testes de usabilidade no site",
                Task3: "Recopilar comentários e realizar ajustes finais com base nas respostas de usuários",
              },
            },
          },
        },
      },
    };
  } else if (Lang === "Spanish") {
    return {
      Board: {
        Name: "Tablero de Ejemplo",
        Description: "Solo un Tablero de Ejemplo",
      },
      Columns: {
        Column1: {
          Title: "Por Hacer",
          Cards: {
            Card1: {
              Title: "Diseñar Sitio Web",
              Tasks: {
                Task1: "Crear maquetas",
                Task2: "Definir paleta de colores",
                Task3: "Elegir fuentes",
              },
            },
            Card2: {
              Title: "Desarrollar Funcionalidades Principales",
              Tasks: {
                Task1: "Implementar sistema de inicio de sesión",
                Task2: "Crear interfaz de creación de tablero",
                Task3: "Agregar funcionalidad de arrastrar y soltar",
              },
            },
          },
        },
        Column2: {
          Title: "Haciendo",
          Cards: {
            Card1: {
              Title: "Revisar Contenido del Sitio Web",
              Tasks: {
                Task1: "Escribir texto de la página de inicio",
                Task2: "Crear páginas de documentación",
                Task3: "Revisar contenido",
              },
            },
            Card2: {
              Title: "Probar Funcionalidades",
              Tasks: {
                Task1: "Probar inicio de sesión en diferentes navegadores",
                Task2: "Probar funcionalidad de arrastrar y soltar en dispositivos móviles",
              },
            },
            Card3: {
              Title: "Escribir Contenido del Sitio Web",
              Tasks: {
                Task1: "Escribir texto de la página de inicio",
                Task2: "Crear páginas de documentación",
              },
            },
          },
        },
        Column3: {
          Title: "Revisando",
          Cards: {
            Card1: {
              Title: "Revisar Diseño",
              Tasks: {
                Task1: "Solicitar comentarios de los compañeros",
                Task2: "Hacer ajustes basados en los comentarios recibidos",
              },
            },
          },
        },
        Column4: {
          Title: "Completado",
          Cards: {
            Card1: {
              Title: "Lanzar Sitio Web",
              Tasks: {
                Task1: "Configurar servidor web",
                Task2: "Hacer anuncio de lanzamiento",
              },
            },
            Card2: {
              Title: "Realizar Pruebas de Usuario",
              Tasks: {
                Task1: "Reclutar participantes para pruebas de usuario",
                Task2: "Realizar pruebas de usabilidad en el sitio",
                Task3: "Recopilar comentarios y realizar ajustes finales basados en las respuestas de los usuarios",
              },
            },
          },
        },
      },
    };
  } else if (Lang === "French") {
    return {
      Board: {
        Name: "Tableau Exemple",
        Description: "Juste un Tableau Exemple",
      },
      Columns: {
        Column1: {
          Title: "À Faire",
          Cards: {
            Card1: {
              Title: "Concevoir Site Web",
              Tasks: {
                Task1: "Créer des maquettes",
                Task2: "Définir la palette de couleurs",
                Task3: "Choisir les polices",
              },
            },
            Card2: {
              Title: "Développer Fonctionnalités Principales",
              Tasks: {
                Task1: "Implémenter système de connexion",
                Task2: "Créer interface de création de tableau",
                Task3: "Ajouter fonctionnalité de glisser-déposer",
              },
            },
          },
        },
        Column2: {
          Title: "En Cours",
          Cards: {
            Card1: {
              Title: "Réviser Contenu du Site Web",
              Tasks: {
                Task1: "Écrire texte de la page d'accueil",
                Task2: "Créer des pages de documentation",
                Task3: "Réviser contenu",
              },
            },
            Card2: {
              Title: "Tester Fonctionnalités",
              Tasks: {
                Task1: "Tester connexion sur différents navigateurs",
                Task2: "Tester fonctionnalité de glisser-déposer sur appareils mobiles",
              },
            },
            Card3: {
              Title: "Écrire Contenu du Site Web",
              Tasks: {
                Task1: "Écrire texte de la page d'accueil",
                Task2: "Créer des pages de documentation",
              },
            },
          },
        },
        Column3: {
          Title: "Révision",
          Cards: {
            Card1: {
              Title: "Réviser Design",
              Tasks: {
                Task1: "Demander des retours des collègues",
                Task2: "Effectuer ajustements basés sur les retours reçus",
              },
            },
          },
        },
        Column4: {
          Title: "Terminé",
          Cards: {
            Card1: {
              Title: "Lancer Site Web",
              Tasks: {
                Task1: "Configurer serveur web",
                Task2: "Faire annonce de lancement",
              },
            },
            Card2: {
              Title: "Effectuer Tests Utilisateur",
              Tasks: {
                Task1: "Recruter participants pour tests utilisateur",
                Task2: "Effectuer tests de convivialité sur le site",
                Task3: "Recueillir retours et effectuer ajustements finaux basés sur réponses utilisateurs",
              },
            },
          },
        },
      },
    };
  } else if (Lang === "German") {
    return {
      Board: {
        Name: "Beispiel-Board",
        Description: "Nur ein Beispiel-Board",
      },
      Columns: {
        Column1: {
          Title: "Zu erledigen",
          Cards: {
            Card1: {
              Title: "Website gestalten",
              Tasks: {
                Task1: "Mockups erstellen",
                Task2: "Farbpalette definieren",
                Task3: "Schriftarten auswählen",
              },
            },
            Card2: {
              Title: "Hauptfunktionen entwickeln",
              Tasks: {
                Task1: "Login-System implementieren",
                Task2: "Board-Erstellungsinterface erstellen",
                Task3: "Drag-and-Drop-Funktionalität hinzufügen",
              },
            },
          },
        },
        Column2: {
          Title: "In Bearbeitung",
          Cards: {
            Card1: {
              Title: "Website-Inhalte überprüfen",
              Tasks: {
                Task1: "Homepage-Text schreiben",
                Task2: "Dokumentationsseiten erstellen",
                Task3: "Inhalt überprüfen",
              },
            },
            Card2: {
              Title: "Funktionen testen",
              Tasks: {
                Task1: "Login-Test in verschiedenen Browsern",
                Task2: "Drag-and-Drop-Funktionalität auf mobilen Geräten testen",
              },
            },
            Card3: {
              Title: "Website-Inhalte schreiben",
              Tasks: {
                Task1: "Homepage-Text schreiben",
                Task2: "Dokumentationstext erstellen",
              },
            },
          },
        },
        Column3: {
          Title: "Überprüfung",
          Cards: {
            Card1: {
              Title: "Design überprüfen",
              Tasks: {
                Task1: "Feedback von Kollegen anfordern",
                Task2: "Anpassungen basierend auf erhaltenem Feedback machen",
              },
            },
          },
        },
        Column4: {
          Title: "Abgeschlossen",
          Cards: {
            Card1: {
              Title: "Website veröffentlichen",
              Tasks: {
                Task1: "Webserver einrichten",
                Task2: "Veröffentlichungsankündigung machen",
              },
            },
            Card2: {
              Title: "Benutzertests durchführen",
              Tasks: {
                Task1: "Teilnehmer für Benutzertests rekrutieren",
                Task2: "Benutzertests auf der Website durchführen",
                Task3: "Feedback sammeln und finale Anpassungen basierend auf Benutzerantworten machen",
              },
            },
          },
        },
      },
    };
  } else {
    return {
      Board: {
        Name: "Example Board",
        Description: "Just an Example Board",
      },
      Columns: {
        Column1: {
          Title: "Todo",
          Cards: {
            Card1: {
              Title: "Design Website",
              Tasks: {
                Task1: "Create mockups",
                Task2: "Define color palette",
                Task3: "Choose fonts",
              },
            },
            Card2: {
              Title: "Develop Core Features",
              Tasks: {
                Task1: "Implement login system",
                Task2: "Create board creation interface",
                Task3: "Add drag and drop functionality",
              },
            },
          },
        },
        Column2: {
          Title: "Doing",
          Cards: {
            Card1: {
              Title: "Review Website Content",
              Tasks: {
                Task1: "Write homepage text",
                Task2: "Create documentation pages",
                Task3: "Review content",
              },
            },
            Card2: {
              Title: "Test Features",
              Tasks: {
                Task1: "Test login across different browsers",
                Task2: "Test drag and drop functionality on mobile devices",
              },
            },
            Card3: {
              Title: "Write Website Content",
              Tasks: {
                Task1: "Write homepage text",
                Task2: "Create documentation text",
              },
            },
          },
        },
        Column3: {
          Title: "Reviewing",
          Cards: {
            Card1: {
              Title: "Review Design",
              Tasks: {
                Task1: "Request feedback from peers",
                Task2: "Make adjustments based on received feedback",
              },
            },
          },
        },
        Column4: {
          Title: "Completed",
          Cards: {
            Card1: {
              Title: "Launch Website",
              Tasks: {
                Task1: "Set up web server",
                Task2: "Make launch announcement",
              },
            },
            Card2: {
              Title: "Perform User Testing",
              Tasks: {
                Task1: "Recruit participants for user testing",
                Task2: "Conduct usability tests on the website",
                Task3: "Gather feedback and make final adjustments based on user responses",
              },
            },
          },
        },
      },
    };
  }
};

const Data = GetText();

export const ExampleBoard1 = {
  BoardId: ExampleBoardID,
  BoardName: Data?.Board?.Name,
  BoardColumnsQtd: 4,
  Description: Data?.Board?.Description,
  CreatedAt: moment().valueOf(),
  LastEditedAt: moment().valueOf(),
  Shared: false,
  Public: false,
  PublicURL: "",
  OwnerUid: "",
  PuclicEdit: false,
  AllowDuplicate: false,
  Collaborators: [],
  docID: "",
  ColorColumns: true,
  Columns: [
    {
      ColumId: v4(),
      ColumnTitle: Data?.Columns?.Column1?.Title,
      ColumnColor: "red",
      CreatedAt: moment().valueOf(),
      LastEditedAt: moment().valueOf(),
      Visible: true,
      CardsQtd: 2,
      Cards: [
        {
          ShowTasksOnCard: false,
          StartAt: 0,
          EndAt: 0,
          CardId: v4(),
          CardTitle: Data?.Columns?.Column1?.Cards?.Card1?.Title,
          CardNotes: "",
          CardDescription: "",
          CreatedAt: moment().valueOf(),
          LastEditedAt: moment().valueOf(),
          Notes: "",
          TasksQtd: 3,
          Tags: ["Tag1"],
          Tasks: [
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column1?.Cards?.Card1?.Tasks?.Task1,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column1?.Cards?.Card1?.Tasks?.Task2,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column1?.Cards?.Card1?.Tasks?.Task3,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
          ],
        },
        {
          ShowTasksOnCard: true,
          StartAt: 0,
          EndAt: 0,
          CardId: v4(),
          CardTitle: Data?.Columns?.Column1?.Cards?.Card2?.Title,
          CardNotes: "",
          CardDescription: "",
          CreatedAt: moment().valueOf(),
          LastEditedAt: moment().valueOf(),
          Notes: "",
          TasksQtd: 3,
          Tags: ["Tag2"],
          Tasks: [
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column1?.Cards?.Card2?.Tasks?.Task1,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column1?.Cards?.Card2?.Tasks?.Task2,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column1?.Cards?.Card2?.Tasks?.Task3,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
          ],
        },
      ],
    },
    {
      ColumId: v4(),
      ColumnTitle: Data?.Columns?.Column2?.Title,
      ColumnColor: "blue",
      CreatedAt: moment().valueOf(),
      LastEditedAt: moment().valueOf(),
      Visible: true,
      CardsQtd: 3,
      Cards: [
        {
          ShowTasksOnCard: false,
          StartAt: 0,
          EndAt: 0,
          CardId: v4(),
          CardTitle: Data?.Columns?.Column2?.Cards?.Card1?.Title,
          CardNotes: "",
          CardDescription: "",
          CreatedAt: moment().valueOf(),
          LastEditedAt: moment().valueOf(),
          Notes: "",
          TasksQtd: 2,
          Tags: ["Tag3"],
          Tasks: [
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column2?.Cards?.Card1?.Tasks?.Task1,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column2?.Cards?.Card1?.Tasks?.Task2,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
          ],
        },
        {
          ShowTasksOnCard: true,
          StartAt: 0,
          EndAt: 0,
          CardId: v4(),
          CardTitle: Data?.Columns?.Column2?.Cards?.Card2?.Title,
          CardNotes: "",
          CardDescription: "",
          CreatedAt: moment().valueOf(),
          LastEditedAt: moment().valueOf(),
          Notes: "",
          TasksQtd: 2,
          Tags: ["Tag4"],
          Tasks: [
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column2?.Cards?.Card2?.Tasks?.Task1,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column2?.Cards?.Card2?.Tasks?.Task2,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
          ],
        },
        {
          ShowTasksOnCard: false,
          StartAt: 0,
          EndAt: 0,
          CardId: v4(),
          CardTitle: Data?.Columns?.Column2?.Cards?.Card3?.Title,
          CardNotes: "",
          CardDescription: "",
          CreatedAt: moment().valueOf(),
          LastEditedAt: moment().valueOf(),
          Notes: "",
          TasksQtd: 2,
          Tags: ["Tag5"],
          Tasks: [
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column2?.Cards?.Card3?.Tasks?.Task1,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column2?.Cards?.Card3?.Tasks?.Task2,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
          ],
        },
      ],
    },
    {
      ColumId: v4(),
      ColumnTitle: Data?.Columns?.Column3?.Title,
      ColumnColor: "slate",
      CreatedAt: moment().valueOf(),
      LastEditedAt: moment().valueOf(),
      Visible: true,
      CardsQtd: 1,
      Cards: [
        {
          ShowTasksOnCard: true,
          StartAt: 0,
          EndAt: 0,
          CardId: v4(),
          CardTitle: Data?.Columns?.Column3?.Cards?.Card1?.Title,
          CardNotes: "",
          CardDescription: "",
          CreatedAt: moment().valueOf(),
          LastEditedAt: moment().valueOf(),
          Notes: "",
          TasksQtd: 2,
          Tags: ["Tag6"],
          Tasks: [
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column3?.Cards?.Card1?.Tasks?.Task1,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column3?.Cards?.Card1?.Tasks?.Task2,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
          ],
        },
      ],
    },
    {
      ColumId: v4(),
      ColumnTitle: Data?.Columns?.Column4?.Title,
      ColumnColor: "green",
      CreatedAt: moment().valueOf(),
      LastEditedAt: moment().valueOf(),
      Visible: true,
      CardsQtd: 2,
      Cards: [
        {
          ShowTasksOnCard: false,
          StartAt: 0,
          EndAt: 0,
          CardId: v4(),
          CardTitle: Data?.Columns?.Column4?.Cards?.Card1?.Title,
          CardNotes: "",
          CardDescription: "",
          CreatedAt: moment().valueOf(),
          LastEditedAt: moment().valueOf(),
          Notes: "",
          TasksQtd: 2,
          Tags: ["Tag7"],
          Tasks: [
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column4?.Cards?.Card1?.Tasks?.Task1,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column4?.Cards?.Card1?.Tasks?.Task2,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
          ],
        },
        {
          ShowTasksOnCard: false,
          StartAt: 0,
          EndAt: 0,
          CardId: v4(),
          CardTitle: Data?.Columns?.Column4?.Cards?.Card2?.Title,
          CardNotes: "",
          CardDescription: "",
          CreatedAt: moment().valueOf(),
          LastEditedAt: moment().valueOf(),
          Notes: "",
          TasksQtd: 3,
          Tags: ["Tag8"],
          Tasks: [
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column4?.Cards?.Card2?.Tasks?.Task1,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column4?.Cards?.Card2?.Tasks?.Task2,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
            {
              TaskId: v4(),
              TaskTitle: Data?.Columns?.Column4?.Cards?.Card2?.Tasks?.Task3,
              Completed: false,
              CreatedAt: moment().valueOf(),
              LastEditedAt: moment().valueOf(),
            },
          ],
        },
      ],
    },
  ],
  Tags: [
    {
      TagId: "Tag1",
      TagName: "Design",
      TagColor: "slate",
    },
    {
      TagId: "Tag2",
      TagName: "Development",
      TagColor: "red",
    },
    {
      TagId: "Tag3",
      TagName: "Testing",
      TagColor: "blue",
    },
    {
      TagId: "Tag4",
      TagName: "Review",
      TagColor: "slate",
    },
    {
      TagId: "Tag5",
      TagName: "Content",
      TagColor: "sky",
    },
    {
      TagId: "Tag6",
      TagName: "High",
      TagColor: "red",
    },
    {
      TagId: "Tag7",
      TagName: "Medium",
      TagColor: "orange",
    },
    {
      TagId: "Tag8",
      TagName: "Low",
      TagColor: "green",
    },
  ],
};
