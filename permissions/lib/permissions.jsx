/**
 * @jsx React.DOM
 */
var React = require('react');
var madek = require('./madek-ui.jsx');

// no dot notation yet in JSX :(
var madekLayoutSeparator = madek.Layout.Separator;
var madekList = madek.List;

// # Permissions
// 
// - `<Permissions>`
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

var Permissions = module.exports = React.createClass({
  render: function () {
    return (
        <form id="ui-rights-management"
              data-redirect-url={this.props.redirectUrl} >
          <PermissionsOverview permissions={this.props.permissions} config={this.props.config}/>
          <madekLayoutSeparator mod="light" spacing="mvl" />
          <PermissionsSettings permissions={this.props.permissions} config={this.props.config}/>
        </form>
    );
  }
});

// ## Permissions: Overview
// collection of specific overviews
var PermissionsOverview = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col1of2">
          <ResponsibleOwnerOverview permissions={this.props.permissions} />
        </div>
        <div className="col1of2">
          <UserPermissionsOverview permissions={this.props.permissions} config={this.props.config}/>
        </div>
      </div>
    );
  }
});

// ### Responsible Owner Overview
// shows explanation and who the responsible user is.
var ResponsibleOwnerOverview = React.createClass({
  render: function () {
    var responsibleUser = this.props.permissions._responsibleUser;
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
            {this.props.permissions._responsibleUser.name}
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
    var config = this.props.config;
    var permissions = this.props.permissions
    
    var currentUserRights = [];
    config.rights.forEach(function (right) {
      var userHasRight = null;
      permissions._resources.map(function (resource) {
        if (userHasRight !== false) {
          userHasRight = permissions.you[right.id].indexOf(resource) !== -1;
        }
      });
      if (userHasRight) {
        currentUserRights.push(right.name)
      }
    });
    
    return (
      <div className="ui-info-box">
      <h2 className="title-l ui-info-box-title">
        Ihre Berechtigungen
      </h2>
      <p className="ui-info-box-intro">
        Sie, {permissions.you.name} haben gegenwärtig als Person oder als Mitglied einer Gruppe folgende Berechtigungen
      </p>
      <p className="ui-info-box-intro"></p>
      <madekList mod="inline" data={currentUserRights}/>
    </div>
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
          key={'sgroup-'+group.id}
          config={config}
          resources={permissions._resources}
          group={group}
          subjects={permissions[group.id]} />
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
        resources={permissions._resources}
        group={config.primarySubject}
        subjects={[primaryPermissions]} />
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
    var resources = this.props.resources;
    var group = this.props.group;
    var subjects = this.props.subjects;
    
    // build list of rights for this group
    var groupRights = config.rights.map(function(right){
      // TODO: _.extend with all props…
      var groupRight = {
        'id': right.id,
        'name': right.name
      };
      // is this right in the list of allowed rights for this group?
      // TODO: use _
      group.allowed.forEach(function (allowed) {
        if (right.id === allowed) {
          groupRight.allowed = true;
        }
      });
      return groupRight;
    });
    
    // build the table headers…
    var tableHeaders = groupRights.map(function (right) {
      // make the header grey if right not allowed for group. 
      // TODO: stylesheet or hide completely
      var style = {
        color: (right.allowed? 'inherit' : '#aaa')
      };
      return (
        <td className="ui-rights-check-title" 
          style={style}
          key={'header-'+right.id}>
            {right.name}
        </td>
      );
    });
    
    // build list of subjects from data
    if (subjects) {
      var subjectList = subjects.map(function (subject) {
        return (
          <PermissionsSubject
            key={'subj-'+subject.id}
            subject={subject}
            rights={groupRights}
            resources={resources}
            config={config} />
        );
      });
    };
    
    // TODO: config. >component?
    var adder = this.props.group.adder;
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
      <div className={"ui-rights-management-"+this.props.group.id}>
        <div className="ui-rights-body">
          <table className="ui-rights-group">
            <thead>
              <tr>
                <td className="ui-rights-user-title">
                  {this.props.group.name} <i className={this.props.group.iconClass}></i>
                </td>
                <td className="ui-rights-role-title">Berechtigung</td>
                {tableHeaders}
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
    var resources = this.props.resources;
    var rights = this.props.rights;
    var subject = this.props.subject;
    // use 'id' if there is no 'name'
    subject.name = subject.name || subject.id;
    
    // build table cells with checkboxes for each right
    // TODO: check true/false/mixed???
    // TODO: cleanup!
    var rightsRow = rights.map(function (right) {
      
      // check if the subject has that right!
      var subjectHasPermission = null;
      
      // if it is allowed at all, …
      if (right.allowed) {
        
        // and if the user has a list of resources for that right…
        if (subject[right.id] && subject[right.id].length) {
          
          // check for each resource, …    // TODO: use _
          resources.forEach(function (resource) {
            // only if state is NOT already false! (if any is false, all is false…)
            if (subjectHasPermission !== false) {
              // does subject has that right for that resource?
              if (subject[right.id].indexOf(resource) !== -1) {
                subjectHasPermission = true;
              } else {
                subjectHasPermission = false;
              }
            }
          });
        }
      }
      // make sure its a bool
      subjectHasPermission = !!subjectHasPermission;
      
      // add cell to row
      return (
        <PermissionCheckBox
          key={'i-'+subject.id+'-'+right.id}
          userSelection={subjectHasPermission}
          name={right}
          title={right} />
      );
    });
    
    // build the complete row
    return (
      <tr data-id={subject.id}
        data-is-current-user-group="" // TODO: set from data
        data-is-current-user="false" // TODO: set from data
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
    
    // build checkbox input
    var checkboxInput = (
      <input 
        name={this.props.name}
        title={this.props.title}
        
        // read-only for now
        checked={this.props.userSelection}
        readOnly={true} // just a hint to react
        // onChange={this.props.CheckBoxHandler} // TODO for interaction
        type="checkbox" />
    );
    
    
    // build complete component
    return (
      <td className="ui-rights-check view">
        <i className="ui-right-overwritten-by-public" title="Betrachten (überschrieben durch die Öffentlichen Berechtigungen)">
           <i className="icon-privacy-open"></i>
        </i>
        <label className="ui-rights-check-label">
          {checkboxInput}
        </label>
      </td>
    );
  }
});

