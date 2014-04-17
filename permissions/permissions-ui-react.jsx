/**
 * @jsx React.DOM
 */
 
// # UI Components
 
// ## General
// TODO

// ## Permissions: Overview

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
          <PermissionsSubject name="users"/>
          <PermissionsSubject name="groups"/>
          <PermissionsSubject name="apiapps"/>
          <PermissionsSubject name="public" 
                              general={true}
          />
        </div>
      </div>
    );
  }
});

var PermissionsSubject = React.createClass({
  render: function () {
    return (
      <div className="ui-rights-management-users">
        <div className="ui-rights-body">
          <table className="ui-rights-group">
            <thead>
              <tr>
                <td className="ui-rights-user-title">
                  Personen <i className="icon-privacy-private-alt"></i>
                </td>
                <td className="ui-rights-role-title">Berechtigung</td>
                <td className="ui-rights-check-title">Betrachten</td>
                <td className="ui-rights-check-title">Original exportieren</td>
                <td className="ui-rights-check-title">Metadaten editieren</td>
                <td className="ui-rights-check-title">Berechtigungen verwalten</td>
              </tr>
            </thead>
            <tbody>
              <tr data-id="08ba1f4f-0522-4a77-b087-4f3d1dd94532"
                data-is-current-user-group=""
                data-is-current-user="false"
                data-name="Normalo, Normin"
                data-type="userpermission"
               >
                <td className="ui-rights-user">
                  <a className="button small ui-rights-remove"
                    title="Berechtigung entfernen">
                    <i className="icon-close small"></i>
                  </a>
                  <span className="text" title="Normalo, Normin ">
                    <i className="current-user-icon icon-privacy-private"></i>
                      Normalo, Normin
                  </span>
                </td>
                <td className="ui-rights-role">
                  <div className="small">
                    <select className="ui-rights-role-select">
                      <option data-preset="{&quot;name&quot;:&quot;Bevollmächtigte/r&quot;,&quot;view&quot;:true,&quot;download&quot;:true,&quot;edit&quot;:true,&quot;manage&quot;:true}" value="Bevollmächtigte/r">
                        Bevollmächtigte/r
                      </option>
                      <option data-preset="{&quot;name&quot;:&quot;Betrachter/in&quot;,&quot;view&quot;:true,&quot;download&quot;:false,&quot;edit&quot;:false,&quot;manage&quot;:false}" value="Betrachter/in">
                        Betrachter/in
                      </option>
                      <option data-preset="{&quot;name&quot;:&quot;Betrachter/in &amp; Original&quot;,&quot;view&quot;:true,&quot;download&quot;:true,&quot;edit&quot;:false,&quot;manage&quot;:false}" selected="selected" value="Betrachter/in &amp; Original">
                        Betrachter/in &amp; Original
                      </option>
                      <option data-preset="{&quot;name&quot;:&quot;Gesperrt&quot;,&quot;view&quot;:false,&quot;download&quot;:false,&quot;edit&quot;:false,&quot;manage&quot;:false}" value="Gesperrt">
                        Gesperrt
                      </option>
                      <option data-preset="{&quot;name&quot;:&quot;Redakteur/in&quot;,&quot;view&quot;:true,&quot;download&quot;:true,&quot;edit&quot;:true,&quot;manage&quot;:false}" value="Redakteur/in">
                        Redakteur/in
                      </option>
                      <option data-mixed="" disabled="disabled">
                        Gemischte Werte
                      </option>
                      <option data-custom="" disabled="disabled">
                        Angepasste Werte
                      </option>
                    </select>
                  </div>
                </td>
                <td className="ui-rights-check view">
                  <i className="ui-right-overwritten-by-public" title="Betrachten (überschrieben durch die Öffentlichen Berechtigungen)">
                     <i className="icon-privacy-open"></i>
                  </i>
                  <label className="ui-rights-check-label">
                    <input checked="checked" name="view" title="Betrachten" value="true" type="checkbox"/>
                  </label>
                </td>
                <td className="ui-rights-check download">
                  <i className="ui-right-overwritten-by-public" title="Export original (überschrieben durch die Öffentlichen Berechtigungen)">
                    <i className="icon-privacy-open"></i>
                  </i>
                  <label className="ui-rights-check-label">
                    <input checked="checked" name="download" title="Export original" value="true" type="checkbox"/>
                  </label>
                </td>
                <td className="ui-rights-check edit">
                  <i className="ui-right-overwritten-by-public" title="Edit metadata (überschrieben durch die Öffentlichen Berechtigungen)">
                    <i className="icon-privacy-open"></i>
                  </i>
                  <label className="ui-rights-check-label">
                    <input name="edit" title="Edit metadata" value="true" type="checkbox"/>
                  </label>
                </td>
                <td className="ui-rights-check manage">
                  <i className="ui-right-overwritten-by-public" title="Manage permissions (überschrieben durch die Öffentlichen Berechtigungen)">
                    <i className="icon-privacy-open"></i>
                  </i>
                  <label className="ui-rights-check-label">
                    <input name="manage" title="Manage permissions" value="true" type="checkbox"/>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="ui-add-subject ptx row" id="addUser">
            <div className="col1of3">
              <input autocomplete="off" 
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

var Permissions = React.createClass({
  render: function () {
    return (
        <form data-manageable=""
              data-media-resource-id="5b8a97e9"
              data-redirect-url="/permissions/edit?_action=view&amp;media_resource_id=5b8a97e9-84a2-46a9-b0f3-7c59af3fc4cb"
              id="ui-rights-management">
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
  <Permissions/>,
  document.getElementById('ux-permissions')
);
