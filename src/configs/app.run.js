import { PRIMARY_DOMAIN_STATES, SUB_DOMAIN_STATE, GROUP_SECURITY_STATE, CLEAR_AUTH_STATE, DONT_CHECK_DOMAIN_PATH } from 'configs/app.constant';
import { WorkspaceObject, SettingObject } from 'objects';

class Application {

  static $inject = ['$translate', '$rootScope', '$anchorScroll', '$location', '$state', 'SecurityService', 'StoreService', '$window', 'AuthService', '$filter', 'MeetingSettingService'];
  static instance;

  static getInstance($translate, $rootScope, $anchorScroll, $location, $state, SecurityService, StoreService, $window, AuthService, $filter, MeetingSettingService) {
    if (!Application.instance) {
      Application.instance = new Application($translate, $rootScope, $anchorScroll, $location, $state, SecurityService, StoreService, $window, AuthService, $filter, MeetingSettingService);
    }
    return Application.instance;
  }

  constructor($translate, $rootScope, $anchorScroll, $location, $state, SecurityService, StoreService, $window, AuthService, $filter, MeetingSettingService) {
    this.$location = $location;
    this.$state = $state;
    this.SecurityService = SecurityService;
    this.StoreService = StoreService;
    this.$window = $window;
    this.AuthService = AuthService;
    this.$filter = $filter;
    this.MeetingSettingService = MeetingSettingService;
    this.workspaceName = window.location.hostname.split('.').shift();
    this.isHasWorkspace = this.$window.location.origin !== APP_URL;
    this.workspaceUrl = /^(http(s)?:\/\/)?(.+)$/i.exec(APP_URL);

    const currentLanguage = angular.getCurrentLanguage(StoreService.get('currentLanguage'));
    const deRegisterInterceptor = $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState) => {
      $anchorScroll('scroll-top');

      event.preventDefault();
      deRegisterInterceptor();

      const dontCheckDomain = DONT_CHECK_DOMAIN_PATH.some(item => this.$location.path().indexOf(item) === 0);
      if (dontCheckDomain || !this.isHasWorkspace) {
        this.middlewares(toState, toParams, fromState);
      } else {
        AuthService.preLogin({ name: this.workspaceName })
          .then(() => this.middlewares(toState, toParams, fromState))
          .catch((error) => {
            switch (error.status_code) {
              case 403: {
                if (error.errors && error.errors.is_blocked) {
                  this.$state.transitionTo('redirect-url.workspace-blocked');
                } else {
                  this.$state.transitionTo('redirect-url.404');
                }
                break;
              }
              case 404: {
                this.$state.transitionTo('redirect-url.404');
                break;
              }
              default:
            }
          });
      }
    });

    $translate.use(currentLanguage);

    $rootScope.$on('$locationChangeStart', () => {
      if (SecurityService.isAuthenticated()) {
        if ($location.path() === '/') {
          $location.path('/home');
        }
      }
    });
  }

  middlewares(toState, toParams, fromState) {
    if (toState.name === 'embedPreSignUp') {
      this.$state.transitionTo(toState.name, toParams);
      return;
    }

    if (toState.name === 'document-preview') {
      this.$state.transitionTo(toState.name, toParams);
      return;
    }

    if (toState.name === 'userProfile') {
      this.$state.transitionTo(toState.name, toParams);
      return;
    }

    if (toState.name === 'share-records') {
      this.$state.transitionTo(toState.name, toParams);
      return;
    }

    // NOTE: Some pages need logout user to access
    if (this.SecurityService.isAuthenticated() && CLEAR_AUTH_STATE.indexOf(toState.name) !== -1) {
      this.SecurityService.revokeUser();
    }

    // NOTE: If hasn't preSignIn
    if (!this.SecurityService.isAuthenticated() && !this.isHasWorkspace) {
      return this.middlewareNotPreSignInAndNotSignIn(toState, toParams, fromState);
    }

    // NOTE:  If has preSignIn and hasn't signIn
    if (!this.SecurityService.isAuthenticated() && this.isHasWorkspace) {
      return this.middlewareHasPreSignInAndNotSignIn(toState, toParams, fromState);
    }

    // NOTE: If has both preSignIn and signIn but URL doesn't have workspace
    if (this.SecurityService.isAuthenticated() && !this.isHasWorkspace) {
      return this.middlewareHasAuthenticaButNoWorkspace(toState, toParams, fromState);
    }

    // NOTE: If has both preSignIn and signIn and URL has workspace
    if (this.SecurityService.isAuthenticated() && this.isHasWorkspace) {
      return this.middlewareHasAuthenticaAndHasWorkspace(toState, toParams, fromState);
    }
  }

  middlewareNotPreSignInAndNotSignIn(toState, toParams, fromState) {
    // NOTE: Goto some pages require workspace ---> 404
    if (SUB_DOMAIN_STATE.indexOf(toState.name) !== -1) {
      this.$state.transitionTo('redirect-url.404');
      return;
    }

    // NOTE: Goto permission login pages
    if (
      PRIMARY_DOMAIN_STATES.indexOf(toState.name) === -1
      && ['redirect-url.workspace-blocked'].indexOf(toState.name) !== -1
    ) {
      this.$state.transitionTo('redirect-url.404');
      return;
    }

    this.$state.transitionTo(toState.name, toParams);
  }

  middlewareHasPreSignInAndNotSignIn(toState, toParams, fromState) {
    // NOTE: Goto some pages doesn't require workspace (Ex: Request workspace,...) ---> Back to preSignIn
    if (PRIMARY_DOMAIN_STATES.indexOf(toState.name) !== -1) {
      this.$state.transitionTo('signIn');
      return;
    }

    // NOTE: Goto path '/' from URL ---> Redirect to signIn, not preSignIn
    if (this.$location.path() === '/') {
      this.$state.transitionTo('signIn');
      return;
    }

    // NOTE: Goto permission page require signin inside platform ---> Back to signIn page
    // Permission pages -> urlRouterProvider don't redirect to 404
    // Otherwise, arbitrary pages -> urlRouterProvider redirect to 404
    if (
      SUB_DOMAIN_STATE.indexOf(toState.name) === -1
      && ['redirect-url.404', 'redirect-url.workspace-blocked'].indexOf(toState.name) === -1
    ) {
      this.$state.transitionTo('signIn');
      return;
    }

    this.$state.transitionTo(toState.name, toParams);
  }

  middlewareHasAuthenticaButNoWorkspace(toState, toParams, fromState) {
    // NOTE: If goto route outside signIn or goto '/' ---> Redirect to home
    // Else if goto wrong route ---> Redirect to 404
    // HACK: $location.path() will never is '/', it's '/home'
    if ([...PRIMARY_DOMAIN_STATES, ...SUB_DOMAIN_STATE].indexOf(toState.name) !== -1 || this.$location.path() === '/home') {
      const workspaceLink = this.workspaceUrl[1] + this.SecurityService.getWorkSpace() + '.' + this.workspaceUrl[3];
      this.$window.location.href = workspaceLink + '/home';
      return;
    }

    this.$state.transitionTo('redirect-url.404');
    return;
  }

  middlewareHasAuthenticaAndHasWorkspace(toState, toParams, fromState) {
    // NOTE: Update every time stateChangeStart
    const workspaceInfo = new WorkspaceObject(this.SecurityService.getWorkspaceInfo());

    if (
      this.SecurityService.getWorkSpace() && this.workspaceName !== this.SecurityService.getWorkSpace()
      && toState.name === 'signUp'
    ) {
      this.$window.location.href = this.workspaceUrl[1] + this.SecurityService.getWorkSpace() + '.' + this.workspaceUrl[3] + '/home';
      return;
    }

    if (
      this.SecurityService.getWorkSpace() && this.workspaceName !== this.SecurityService.getWorkSpace()
      && ['invite', 'inviteSwitchWorkspace'].indexOf(toState.name) !== -1
    ) {
      this.$window.location.href = this.workspaceUrl[1] + this.SecurityService.getWorkSpace() + '.' + this.workspaceUrl[3] + `/invite-switch-workspace/${toParams.token}?workspace=${this.workspaceName}`;
      return;
    }

    // NOTE: Goto incorrect workspace ---> 404
    if (this.SecurityService.getWorkSpace() && this.workspaceName !== this.SecurityService.getWorkSpace()) {
      this.$state.transitionTo('redirect-url.404');
      return;
    }

    // NOTE: Goto page outside that doesn't require permission login
    if ([...PRIMARY_DOMAIN_STATES, ...SUB_DOMAIN_STATE].indexOf(toState.name) !== -1) {
      this.$state.transitionTo('calling-top.home');
      return;
    }

    // NOTE: Middleware for some pages inside platform
    const STATISTICS = (GROUP_SECURITY_STATE.STATISTICS.indexOf(toState.name) !== -1 && !workspaceInfo.isDisplayStatistic());
    const SALES = (GROUP_SECURITY_STATE.SALES.indexOf(toState.name) !== -1 && !workspaceInfo.isOnSales());
    const MEETING = (GROUP_SECURITY_STATE.MEETING.indexOf(toState.name) !== -1 && !workspaceInfo.isOnMeeting());
    const MEETING_AND_SALE = (GROUP_SECURITY_STATE.MEETING_AND_SALE.indexOf(toState.name) !== -1 && !workspaceInfo.isMeetingAndSales());
    const GROUP = (GROUP_SECURITY_STATE.GROUP.indexOf(toState.name) !== -1 && !workspaceInfo.isCreateEditGroup());
    const USER = (GROUP_SECURITY_STATE.USER.indexOf(toState.name) !== -1 && !workspaceInfo.isListUser());

    if (STATISTICS || SALES || MEETING || MEETING_AND_SALE || GROUP || USER) {
      this.$state.transitionTo('calling-top.home');
      return;
    }

    const MEMBER_MANAGEMENT_PAGE = (toState.name === 'calling-top.member.management' && !workspaceInfo.canManageMember());
    const INVITE_MEMBER_PAGE = (toState.name === 'calling-top.invite-member' && !workspaceInfo.isInviteUser());
    const TRANSFER_ADMIN_PAGE = (toState.name === 'calling-top.workspace.transfer-admin' && !workspaceInfo.isWorkspaceAdmin());
    const SETTING_PAGE = (toState.name === 'dashboard.setting') && !workspaceInfo.isWorkspaceAdmin();

    if (MEMBER_MANAGEMENT_PAGE || INVITE_MEMBER_PAGE || TRANSFER_ADMIN_PAGE || SETTING_PAGE) {
      this.$state.transitionTo('calling-top.home');
      return;
    }

    if (toState.name === 'calling-top.invite-member-success' && fromState.name !== 'calling-top.invite-member') {
      this.$state.transitionTo('calling-top.invite-member');
      return;
    }

    if (toState.name === 'calling-top.workspace.transfer-admin-success' && fromState.name !== 'calling-top.workspace.transfer-admin') {
      this.$state.transitionTo('calling-top.workspace.transfer-admin');
      return;
    }

    // NOTE: Set setting conference room password to StoreService if isWorkspaceAdmin
    if (workspaceInfo.isCreateEditRoom()) {
      this.MeetingSettingService.getMeetingSetting().then((response) => {
        const meetingSettingInfo = new SettingObject(response.data);
        this.StoreService.set('conferenceRoomPassword', meetingSettingInfo.getEnablePassword());
      });
    }

    if (['calling-top.workspace.register-paid-plan', 'calling-top.workspace.confirm-register-paid-plan'].indexOf(toState.name) !== -1) {
      if (!this.StoreService.get('packageSelected')) {
        this.$state.transitionTo('calling-top.workspace.choose-paid-plan');
        return;
      }
    }

    this.$state.transitionTo(toState.name, toParams);
  }
}

export default angular.module(`${APP_NAME}.run`, []).run(Application.getInstance).name;
