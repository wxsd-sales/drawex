
const appContextUpdateEvent = 'application:displayContextChanged'; 
const appShareStateUpdateEvent = 'application:shareStateChanged';
const appThemeUpdateEvent = 'application:themeChanged';
const meetingInfoUpdateEvent = 'meeting:infoChanged';
const meetingRoleUpdateEvent = 'meeting:roleChanged';
const spaceInfoUpdateEvent = 'space:infoChanged';

export default class EmbeddedAppSDK {
  constructor() {
    this.app = new window.Webex.Application();
  }

  subscribe(callback) {
    this.app.listen(appContextUpdateEvent, (payload) => {callback(payload)});
    this.app.listen(appShareStateUpdateEvent, (payload) => {callback(payload)});
    this.app.listen(appThemeUpdateEvent, (payload) => {callback(payload)});
    this.app.listen(meetingInfoUpdateEvent, (payload) => {callback(payload)});
    this.app.listen(meetingRoleUpdateEvent, (payload) => {callback(payload)});
    this.app.listen(spaceInfoUpdateEvent, (payload) => {callback(payload)});
  }

  async onReady() {
    return this.app.onReady();
  }

  isAppBeingShared() {
    return this.app.isShared;
  }

  async getUser() {
    return this.app.context.getUser();
  }

  async getMeeting() {
    return this.app.context.getMeeting();
  }

  async getSpace() {
    return this.app.context.getSpace();
  }

  shareApp(url) {
    this.app.setShareUrl(url);
  }

  stopSharingApp(){
    this.app.clearShareUrl();
  }

}