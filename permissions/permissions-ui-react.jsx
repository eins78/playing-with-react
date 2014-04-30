/**
 * @jsx React.DOM
 */
 
// # UI Components
// 
// - Permissions
//     - PermissionsOverview
//         - ResponsibleOwnerOverview
//         - UserPermissionsOverview
//             - UserPermissionsOverviewList
//     - PermissionsSettings
//         - PermissionsSubjectGroup
//             - PermissionsSubject
//                 - PermissionsPresetSelector
//                 - PermissionCheckBox
//         - PermissionsSubject [primary subject]
// 
// - Permissions
//     - Overview
//         - ResponsibleOwner
//         - UserPermissions
//             - List
//     - Settings
//         - SubjectGroup
//             - Subject
//                 - PresetSelector
//                 - CheckBox
//         - Subject [primary subject]
// 

// var ReactComponent = React.createClass;
 
// ## General
// TODO

var madekLayoutSeparator = React.createClass({
  render: function () {
    var classes = ['separator'];
    var props = this.props;
    ['mod', 'spacing'].forEach(function (c) {
      if (props[c]) {
        classes.push(props[c]);
      }
    });
    
    return (
      <hr className={classes.join(' ')} />
    )
  }
});

// ## Permissions: Overview
// collection of specific overviews
var PermissionsOverview = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col1of2">
          <ResponsibleOwnerOverview/>
        </div>
        <div className="col1of2">
          <UserPermissionsOverview/>
        </div>
      </div>
    );
  }
});

// ### Responsible Owner Overview
// shows explanation and who the responsible user is.
var ResponsibleOwnerOverview = React.createClass({
  render: function () {
    return (
      <div className="ui-info-box">
        <h2 className="title-l ui-info-box-title">
          Verantwortliche Person
        </h2>
        <p className="ui-info-box-intro prm">
          Die verantwortliche Person hat alle Berechtigungen zu den ausgewählten Inhalten und kann diese auch löschen.
        </p>
        <ul className="inline">
          <li className="person-tag">
            Admin, Adam
          </li>
        </ul>
      </div>
    );
  }
});

// ### User Permissions Overview
// shows explanation and summary of users's permissions.
var UserPermissionsOverview = React.createClass({
  render: function () {
    return (
      <div className="ui-info-box">
      <h2 className="title-l ui-info-box-title">
        Ihre Berechtigungen
      </h2>
      <p className="ui-info-box-intro">
        Sie, Admin, Adam, haben gegenwärtig als Person oder als Mitglied einer Gruppe folgende Berechtigungen
      </p>
      <p className="ui-info-box-intro"></p>
      <UserPermissionsOverviewList/>
    </div>
    );
  }
});

// ### UserPermissionsOverviewList
// list of user's permission
var UserPermissionsOverviewList = React.createClass({
  render: function () {
    return (
      <ul className="inline">
        <li>Betrachten</li>
        <li>Original exportieren</li>
        <li>Metadaten editieren</li>
        <li>Berechtigungen verwalten</li>
      </ul>
    );
  }
});

// ## Permissions: Settings
// main control panel. 
// split into subject groups and a primary subject

var PermissionsSettings = React.createClass({
  render: function () {
    
    var config = this.props.config;
    var permissions = this.props.permissions;
    
    // build list of configured subjectGroups from data
    var subjectGroups = [];
    config.subjectGroups.forEach(function (group) {
      subjectGroups.push(
        <PermissionsSubjectGroup
          config={config}
          subjects={permissions[group.id]}
          name={group.id}
          title={group.name}
          icon={group.icon} 
          adder={group.adder} />
      );
    });
    
    // make a special entry for primary permissions
    // get permissions by configured 'id'
    var primaryPermissions = permissions[config.primarySubject.id];
    // combine it with the configured 'entry' // TODO: _.extend all props
    primaryPermissions.id = config.primarySubject.entry.id

    // build the primary subject
    var primarySubject = (
      <PermissionsSubjectGroup
        config={config}
        ref="primarySubject"
        subjects={[primaryPermissions]}
        name={config.primarySubject.id}
        title={config.primarySubject.name}
        icon={config.primarySubject.icon} />
    );
    
    return (
      <div>
        <h3 className="title-l mbs">
          Berechtigungen
        </h3>
        <div className="ui-rights-management">
          {subjectGroups}
          {primarySubject}
        </div>
      </div>
    );
  }
});

var PermissionsSubjectGroup = React.createClass({
  render: function () {
    var config = this.props.config;
    var subjects = this.props.subjects;
    
    // build list of subjects from data
    var subjectList = [];
    if (subjects) {
      subjects.forEach(function (subject) {
        subjectList.push(
          <PermissionsSubject
            subject={subject}
            config={config} />
        );
      });
      
    };
    
    var tableHeaderRights = [];
    config.rights.forEach(function (right) {
      tableHeaderRights.push(
        <td className="ui-rights-check-title">{right.name}</td>
      );
    });
    
    // TODO: config. >component?
    var adder = this.props.adder;
    var subjectAdder = function () {
      if (adder) {
        return (
            <div className="ui-add-subject ptx row" id="add{this.props.name.capitalize}">
              <div className="col1of3">
                <input autoComplete="off" 
                       className="small block ui-autocomplete-input"
                       name="user" 
                       placeholder={adder.hint}
                       type="text" />
                <span className="ui-helper-hidden-accessible" aria-live="polite" role="status"></span>
              </div>
            </div>
        );
      }
    };
    
    return (
      <div className={"ui-rights-management-"+this.props.name}>
        <div className="ui-rights-body">
          <table className="ui-rights-group">
            <thead>
              <tr>
                <td className="ui-rights-user-title">
                  {this.props.title} <i className={this.props.icon}></i>
                </td>
                <td className="ui-rights-role-title">Berechtigung</td>
                {tableHeaderRights}
              </tr>
            </thead>
            <tbody>
              {subjectList}
            </tbody>
          </table>
          {subjectAdder()}
        </div>
      </div>
    );
  }
});

var PermissionsSubject = React.createClass({
  render: function () {
    var config = this.props.config;
    var subject = this.props.subject;
    // use 'id' if there is no 'name'
    subject.name = subject.name || subject.id;
    
    var rightsRow = [];
    this.props.config.rights.forEach(function (right) {
      rightsRow.push(
        <PermissionCheckBox
          userSelection={true} // TODO: set from data
          name={right}
          title={right} />
      );
    });

    return (
      <tr data-id="08ba1f4f-0522-4a77-b087-4f3d1dd94532"
        data-is-current-user-group=""
        data-is-current-user="false"
        data-name={subject.name}
        data-type="userpermission" >
        
        <td className="ui-rights-user">
          <a className="button small ui-rights-remove"
            title="Berechtigung entfernen">
            <i className="icon-close small"></i>
          </a>
          <span className="text" title={subject.name}>
            <i className="current-user-icon icon-privacy-private"></i>
              {subject.name}
          </span>
        </td>
        
        <PermissionsPresetSelector/>
        
        {rightsRow}
        
      </tr>
    );
  }
});

var PermissionsPresetSelector = React.createClass({
  render: function () {
    return (
      <td className="ui-rights-role">
        <div className="small">
          <select className="ui-rights-role-select"
                  defaultSelected="viewAndExport" >
            <option name="responsible" value="Bevollmächtigte/r">
              Bevollmächtigte/r
            </option>
            <option name="viewer" value="Betrachter/in">
              Betrachter/in
            </option>
            <option name="viewAndExport" value="Betrachter/in &amp; Original">
              Betrachter/in &amp; Original
            </option>
            <option name="locked" value="Gesperrt">
              Gesperrt
            </option>
            <option name="editor" value="Redakteur/in">
              Redakteur/in
            </option>
            <option name="mixed" disabled="disabled">
              Gemischte Werte
            </option>
            <option name="custo," disabled="disabled">
              Angepasste Werte
            </option>
          </select>
        </div>
      </td>
    );
  }
});

var PermissionCheckBox = React.createClass({
  render: function () {
    var selection = this.props.userSelection;
    var name = this.props.name;
    var title = this.props.title;
    return (
      <td className="ui-rights-check view">
        <i className="ui-right-overwritten-by-public" title="Betrachten (überschrieben durch die Öffentlichen Berechtigungen)">
           <i className="icon-privacy-open"></i>
        </i>
        <label className="ui-rights-check-label">
          <input 
            defaultChecked={!!selection}
            onChange={this.props.CheckBoxHandler} // TODO
            name={name}
            title={title}
            value="true"
            type="checkbox" />
        </label>
      </td>
    );
  }
});

// ## Meta-Component: Permissions

var Permissions = React.createClass({
  render: function () {
    return (
        <form id="ui-rights-management"
              data-media-resource-id={'mr-'+this.props.mediaResource}
              data-redirect-url={this.props.redirectUrl} >
          <PermissionsOverview permissions={this.props.permissions}/>
          <madekLayoutSeparator mod="light" spacing="mvl" />
          <PermissionsSettings permissions={this.props.permissions} config={this.props.config}/>
        </form>
    );
  }
});

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
// renders the component and attaches it to the target
// here the instance of the component is configured via properties
React.renderComponent(
  <Permissions
    permissions={PERMISSIONS_JSON}
    config={PERMISSIONS_CONFIG_JSON}
    redirectUrl="/permissions/edit?_action=view&amp;media_resource_id=5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb" />,
  document.getElementById('ux-permissions')
);
