/**
 * @jsx React.DOM
 */
 
// # UI Components
 
// ## General
// TODO

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

var PermissionsSettings = React.createClass({
  render: function () {
    return (
      <div>
        <h3 className="title-l mbs">
          Berechtigungen
        </h3>
        <div className="ui-rights-management">
        
          <PermissionsSubjectGroup
            name="users"
            title="Personen"
            icon="icon-privacy-private-alt" />
            
          <PermissionsSubjectGroup
            name="groups"
            title="Gruppen"
            icon="icon-privacy-group-alt" />
            
          <PermissionsSubjectGroup
            name="apiapps"
            title="API-Applikationen"
            icon="fa fa-flask" />
            
          <PermissionsSubjectGroup
            name="public" 
            general={true}
            title="Öffentlichkeit"
            icon="icon-privacy-open" />
          
        </div>
      </div>
    );
  }
});

var PermissionsSubjectGroup = React.createClass({
  render: function () {
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
                <td className="ui-rights-check-title">Betrachten</td>
                <td className="ui-rights-check-title">Original exportieren</td>
                <td className="ui-rights-check-title">Metadaten editieren</td>
                <td className="ui-rights-check-title">Berechtigungen verwalten</td>
              </tr>
            </thead>
            <tbody>
              <PermissionsSubject
                user="08ba1f4f"
                name="Normalo, Normin"
              />
            </tbody>
          </table>
          <div className="ui-add-subject ptx row" id="add{this.props.name.capitalize}">
            <div className="col1of3">
              <input autoComplete="off" 
                     className="small block ui-autocomplete-input"
                     name="user" 
                     placeholder="Name der Person"
                     type="text"
              />
              <span className="ui-helper-hidden-accessible" aria-live="polite" role="status"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var PermissionsSubject = React.createClass({
  render: function () {
    var user = {
      id: this.props.user,
      name: this.props.name
    }
    return (
      <tr data-id="08ba1f4f-0522-4a77-b087-4f3d1dd94532"
        data-is-current-user-group=""
        data-is-current-user="false"
        data-name={user.name}
        data-type="userpermission"
       >
        <td className="ui-rights-user">
          <a className="button small ui-rights-remove"
            title="Berechtigung entfernen">
            <i className="icon-close small"></i>
          </a>
          <span className="text" title={user.name}>
            <i className="current-user-icon icon-privacy-private"></i>
              {user.name}
          </span>
        </td>
        
        <PermissionsPresetSelecter/>
        
        <PermissionCheckBox
          userSelection={true}
          name="view"
          title="Betrachten"
        />
        <PermissionCheckBox
          userSelection={true}
          name="export"
          title="Export original"
        />
        <PermissionCheckBox
          userSelection={false}
          name="edit"
          title="Edit metadata"
        />
        <PermissionCheckBox
          userSelection={false}
          name="manage"
          title="Manage permissions"
        />
        
      </tr>
    );
  }
});

var PermissionsPresetSelecter = React.createClass({
  render: function () {
    return (
      <td className="ui-rights-role">
        <div className="small">
          <select className="ui-rights-role-select"
        defaultSelected="viewAndExport"
          >
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
            type="checkbox"
          />
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
              data-manageable={this.props.isManageable}
              data-media-resource-id={this.props.mediaResource}
              data-redirect-url= {this.props.redirectUrl}
        >
          <PermissionsOverview/>
          <hr className="separator light mvl"/>
          <PermissionsSettings/>
        </form>
    );
  }
});
 
// ## Render
// 
// renders the component and attaches it to the target
// 
// > React.renderComponent(component, target)
React.renderComponent(
  <Permissions
    mediaResource="5b8a97e9"
    isManageable={true}
    redirectUrl="/permissions/edit?_action=view&amp;media_resource_id=5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb" />,
  document.getElementById('ux-permissions')
);

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
