/**
 * @jsx React.DOM
 */
var React = require('react');

var Permissions = require('./lib/permissions.jsx');

// config
var PERMISSIONS_CONFIG_JSON = {
  "rights": [
    {
      "id": "view",
      "name": "Betrachten"
    },
    {
      "id": "download",
      "name": "Original exportieren"
    },
    {
      "id": "edit",
      "name": "Metadaten editieren"
    },
    {
      "id": "manage",
      "name": "Berechtigungen verwalten"
    }
  ],
  "primarySubject": {
    "id": "public",
    "name": "Öffentlichkeit",
    "entry": {
      "id": "Internet",
    },
    "overrides": true,
    "iconClass": "icon-privacy-open",
    "allowed": [ "view", "download" ]
  },
  "subjectGroups": [ 
    {
      "id": "users",
      "name": "Benutzer",
      "iconClass": "icon-privacy-private-alt",
      "adder": { "hint": "Name der Person" },
      "allowed": [ "view", "download", "edit", "manage"]
    },
    {
      "id": "groups",
      "name": "Gruppen",
      "iconClass": "icon-privacy-group-alt",
      "adder": { "hint": "Name der Gruppe" },
      "allowed": [ "view", "download", "edit" ]
    },
    {
      "id": "applications",
      "name": "API-Applikationen",
      "iconClass": "fa fa-flask",
      "adder": { "hint": "Name der Applikation" },
      "allowed": [ "view", "download" ]
    }
  ]
};

// import data for building static version
var PERMISSIONS_JSON = {
  
    // TODO: where do we get this from IRL?
    "_resources": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"],
    "_responsibleUser": {
      "name": "Admin, Adam",
      "id": "927ba041-9464-4e74-9823-c02d03fdfa5c"
    },
    // list of perms straight from the "API"
    "public": {
        "view": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"],
        "edit": [],
        "download": []
    },
    "you": {
        "view": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"],
        "name": "Admin, Adam",
        "id": "927ba041-9464-4e74-9823-c02d03fdfa5c",
        "download": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"],
        "edit": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"],
        "manage": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"]
    },
    "users": [{
        "id": "08ba1f4f-0522-4a77-b087-4f3d1dd94532",
        "name": "Normalo, Normin",
        "view": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"],
        "download": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"],
        "edit": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"],
        "manage": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"]
    }
    ],
    "groups": [{
        "id": "540e224a-6dff-4fb5-83ee-655325a79081",
        "name": "Bachelor Design - Vertiefung Visuelle Kommunikation - HS 2010 (DDE_FDE_BDE_VVK_10H.studierende)",
        "view": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"],
        "download": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"],
        "edit": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"]
    }
    ],
    "applications": [{
        "id": "a-fancy-application",
        "description": "An API application for testing",
        "view": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"],
        "download": ["5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"]
    }
    ]
};

// ## Render
// 
// > React.renderComponent(component, target)
// 
// renders the component and attaches it into the target
// here the instance of the component is configured via properties

React.renderComponent(
  <Permissions
    permissions={PERMISSIONS_JSON}
    config={PERMISSIONS_CONFIG_JSON}
    redirectUrl="/permissions/edit?_action=view&amp;media_resource_id=5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb" />,
  document.getElementById('react-container-permissions')
);

